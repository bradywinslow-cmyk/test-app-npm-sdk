import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    login(email, firstName, lastName);
    navigate("/profile");
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className="w-full border rounded-xl p-2"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className="w-full border rounded-xl p-2"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full border rounded-xl p-2"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="w-full px-4 py-2 rounded-xl bg-black text-white font-medium">
          Continue
        </button>
      </form>
    </main>
  );
}
