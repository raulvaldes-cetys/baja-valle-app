import * as SecureStore from "expo-secure-store";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

// Copia en memoria para leer el token de forma síncrona; SecureStore guarda el respaldo
let current: Tokens | null = null;

export function getTokens() {
  return current;
}

export async function loadTokens() {
  const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  current = accessToken && refreshToken ? { accessToken, refreshToken } : null;
  return current;
}

export async function saveTokens(tokens: Tokens) {
  current = tokens;
  await SecureStore.setItemAsync(ACCESS_KEY, tokens.accessToken);
  await SecureStore.setItemAsync(REFRESH_KEY, tokens.refreshToken);
}

export async function clearTokens() {
  current = null;
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}
