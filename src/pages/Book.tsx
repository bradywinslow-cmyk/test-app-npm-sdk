import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { bookingService, type Booking } from "../lib/bookingService";
import { useExitIntent } from "../hooks/useExitIntent";

export default function Book() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState<Booking["service"]>("Walk");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [durationMins, setDurationMins] = useState(30);
  const [pets, setPets] = useState(1);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useExitIntent('BOOKING_ABANDONED');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date || !time) return alert("Incomplete details.");

    setSaving(true);
    
    // 1. Create the booking
    const booking = bookingService.create({ 
      userId: user.id, service, date, time, durationMins, pets, notes 
    });

    // 2. Track event in Sprig
    window.Sprig?.track('book_a_service', { 
      serviceType: service, 
      petCount: pets 
    });

    setSaving(false);
    alert(`Confirmed for ${booking.date}!`);
    navigate("/profile");
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Book a service</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Service</label>
          <select 
            className="w-full border rounded-xl p-2" 
            value={service} 
            onChange={(e) => setService(e.target.value as Booking["service"])}
          >
            <option>Walk</option>
            <option>Drop-in</option>
            <option>Overnight</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-xl p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="border rounded-xl p-2" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-xl p-2" type="number" value={durationMins} onChange={(e) => setDurationMins(Number(e.target.value))} />
          <input className="border rounded-xl p-2" type="number" value={pets} onChange={(e) => setPets(Number(e.target.value))} />
        </div>
        <textarea 
          className="w-full border rounded-xl p-2" 
          rows={3} 
          placeholder="Notes..." 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
        />
        <button 
          disabled={saving} 
          className="w-full px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Confirm Booking"}
        </button>
      </form>
    </main>
  );
}
