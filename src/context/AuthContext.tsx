import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

interface AuthContextValue {
  user: User | null;
  login: (email: string, firstName: string, lastName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("dw_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (email: string, firstName: string, lastName: string) => {
    const fakeUser: User = { id: crypto.randomUUID(), firstName, lastName, email };
    localStorage.setItem("dw_user", JSON.stringify(fakeUser));
    setUser(fakeUser);

    // Sprig Tracking
    window.Sprig?.setUserId(fakeUser.id);
    window.Sprig?.setEmail(fakeUser.email);
    window.Sprig?.setAttribute('firstName', fakeUser.firstName);
  };

  const logout = () => {
    localStorage.removeItem("dw_user");
    setUser(null);
    window.Sprig?.logoutUser();
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
