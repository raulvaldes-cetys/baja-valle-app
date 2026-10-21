import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { clearTokens, getTokens, saveTokens } from '../lib/session-storage';
import ENDPOINTS from './endpoints';
import { AuthTokens } from './types/api-types';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Con esta respuesta el token es válido, así que no hay nada que refrescar
const WRONG_CURRENT_PASSWORD = 'La contraseña actual es incorrecta';

type RetryableConfig = InternalAxiosRequestConfig & { retried?: boolean };

// AuthContext lo registra para volver a modo invitado cuando la sesión ya no se puede renovar
let onSessionExpired: (() => void) | null = null;

export function setSessionExpiredHandler(handler: (() => void) | null) {
  onSessionExpired = handler;
}

// Varias peticiones que fallan a la vez comparten un solo refresh
let refreshing: Promise<string> | null = null;

async function refreshAccessToken() {
  const tokens = getTokens();
  if (!tokens) throw new Error('No hay sesión');
  const { data } = await axios.post<AuthTokens>(
    `${api.defaults.baseURL}${ENDPOINTS.AUTH_REFRESH}`,
    { refreshToken: tokens.refreshToken },
  );
  await saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
  return data.accessToken;
}

api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens && config.url !== ENDPOINTS.AUTH_REFRESH) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const request = error.config as RetryableConfig | undefined;
  const tokens = getTokens();
  const isWrongPassword = (error.response?.data as { message?: string } | undefined)?.message === WRONG_CURRENT_PASSWORD;
  if (error.response?.status !== 401 || isWrongPassword || !request || request.retried || !tokens) {
    throw error;
  }
  request.retried = true;

  // Si otra petición ya renovó el token, basta con reintentar con el nuevo
  if (request.headers.Authorization !== `Bearer ${tokens.accessToken}`) {
    request.headers.Authorization = `Bearer ${tokens.accessToken}`;
    return api(request);
  }

  try {
    refreshing ??= refreshAccessToken().finally(() => {
      refreshing = null;
    });
    request.headers.Authorization = `Bearer ${await refreshing}`;
  } catch (refreshError) {
    // Sin conexión se conserva la sesión; si el servidor rechaza el refresh, se cierra
    if (isAxiosError(refreshError) && refreshError.response) {
      await clearTokens();
      onSessionExpired?.();
    }
    throw error;
  }
  return api(request);
});

export default api;
