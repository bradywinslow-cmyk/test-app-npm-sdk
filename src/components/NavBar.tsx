import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
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
        <div>
          {user ? (
            <button onClick={logout} className="px-3 py-1 rounded-full border text-sm">Log out</button>
          ) : (
            <Link to="/login" className="px-3 py-1 rounded-full bg-black text-white text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
