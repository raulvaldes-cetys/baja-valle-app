import { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Api } from "../api/api";
import { setSessionExpiredHandler } from "../api/axios";
import { AuthResponse, ChangeEmailBody, ChangePasswordBody, LoginBody, RegisterBody, UpdateProfileBody, UserProfile } from "../api/types/api-types";
import { clearTokens, getTokens, loadTokens, saveTokens } from "../lib/session-storage";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (body: LoginBody) => Promise<void>;
  signUp: (body: RegisterBody) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (body: UpdateProfileBody) => Promise<void>;
  changeEmail: (body: ChangeEmailBody) => Promise<void>;
  changePassword: (body: ChangePasswordBody) => Promise<void>;
  signOutEverywhere: () => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSessionExpiredHandler(() => setUser(null));
    return () => setSessionExpiredHandler(null);
  }, []);

  // Al abrir la app se restaura la sesión guardada
  useEffect(() => {
    async function restoreSession() {
      try {
        const stored = await loadTokens();
        if (!stored) return;
        const tokens = await Api.refresh(stored.refreshToken);
        await saveTokens(tokens);
        setUser(await Api.getProfile());
      } catch (error) {
        // Sin conexión se conserva la sesión guardada; si el servidor la rechaza, se borra
        if (isAxiosError(error) && error.response) await clearTokens();
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function startSession({ user, accessToken, refreshToken }: AuthResponse) {
    await saveTokens({ accessToken, refreshToken });
    setUser(user);
  }

  async function signIn(body: LoginBody) {
    await startSession(await Api.login(body));
  }

  async function signUp(body: RegisterBody) {
    await startSession(await Api.register(body));
  }

  async function endSession() {
    await clearTokens();
    setUser(null);
  }

  async function signOut() {
    try {
      if (getTokens()) await Api.logout();
    } catch {
      // Aunque el servidor no responda, la sesión se cierra en el dispositivo
    }
    await endSession();
  }

  async function updateProfile(body: UpdateProfileBody) {
    setUser(await Api.updateProfile(body));
  }

  async function changeEmail(body: ChangeEmailBody) {
    setUser(await Api.changeEmail(body));
  }

  async function changePassword(body: ChangePasswordBody) {
    await Api.changePassword(body);
  }

  async function signOutEverywhere() {
    await Api.logoutAll();
    await endSession();
  }

  async function deleteAccount(currentPassword: string) {
    await Api.deleteAccount(currentPassword);
    await endSession();
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateProfile, changeEmail, changePassword, signOutEverywhere, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
