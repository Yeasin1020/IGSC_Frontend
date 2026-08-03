import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tokenStore } from "../lib/api";
import { authApi, usersApi } from "../lib/endpoints";
import type { User } from "../types/api";

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  setSession: (accessToken: string, user?: User | null) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    tokenStore.get(),
  );
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = tokenStore.get();
    if (!token) {
      setUser(null);
      setAccessToken(null);
      return;
    }

    try {
      const res = await usersApi.me();
      setUser(res.data);
      setAccessToken(token);
    } catch {
      tokenStore.clear();
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  useEffect(() => {
    refreshProfile().finally(() => setLoading(false));
  }, [refreshProfile]);

  const setSession = useCallback(
    async (token: string, nextUser?: User | null) => {
      tokenStore.set(token);
      setAccessToken(token);
      if (nextUser) {
        setUser(nextUser);
        return;
      }
      await refreshProfile();
    },
    [refreshProfile],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login({ email, password });
      await setSession(res.data.accessToken, res.data.user);
      return res.data.user;
    },
    [setSession],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore network failures on logout
    }
    tokenStore.clear();
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      loading,
      isAdmin: user?.role === "admin" || user?.role === "superAdmin",
      login,
      logout,
      setSession,
      refreshProfile,
    }),
    [user, accessToken, loading, login, logout, setSession, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
