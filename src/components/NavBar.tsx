import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export function NavBar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    if (!loggedOut) return;
    const timeout = window.setTimeout(() => setLoggedOut(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [loggedOut]);

  const handleLogout = () => {
    logout();
    setLoggedOut(true);
    // Deferred so this runs after ProtectedRoute's own redirect-to-/login
    // effect settles (it wins a same-tick race otherwise) and overrides it.
    setTimeout(() => navigate("/", { replace: true }), 0);
  };

  return (
    <>
      {loggedOut && (
        <div className="w-full bg-green-50 text-green-800 text-sm text-center py-2 border-b border-green-200">
          You've been logged out.
        </div>
      )}
      <nav className="w-full border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-semibold text-lg">Winston's Walkers</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/bonus_page">Bonus Page!!!</Link>
            <Link to="/book">Book</Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-full border text-sm border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            {user ? (
              <button onClick={handleLogout} className="px-3 py-1 rounded-full border text-sm border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800">Log out</button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-full border text-sm border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
