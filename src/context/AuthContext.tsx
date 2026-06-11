import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bookingCount: number;
};

interface AuthContextValue {
  user: User | null;
  login: (email: string, firstName: string, lastName: string) => void;
  logout: () => void;
  incrementBookingCount: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("dw_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (email: string, firstName: string, lastName: string) => {
    const fakeUser: User = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      bookingCount: 0
    };
    
    localStorage.setItem("dw_user", JSON.stringify(fakeUser));
    setUser(fakeUser);

    // Sprig Tracking
    window.Sprig?.setUserId(fakeUser.id);
    window.Sprig?.setEmail(fakeUser.email);
    window.Sprig?.setAttributes({
      firstName: fakeUser.firstName,
      total_bookings: 0
    });
  };

  // Helper function to increment the count in state & storage
  const incrementBookingCount = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      bookingCount: (user.bookingCount || 0) + 1
    };

    localStorage.setItem("dw_user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    window.Sprig?.setAttributes({
      total_bookings: updatedUser.bookingCount
    })
  };

  const logout = () => {
    localStorage.removeItem("dw_user");
    setUser(null);
    window.Sprig?.logoutUser();
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    incrementBookingCount
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
