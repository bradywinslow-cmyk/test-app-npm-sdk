import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { bookingService } from "../lib/bookingService";

export default function Profile() {
  const { user } = useAuth();

  // Trigger page view event on mount and send to Sprig
  useEffect(() => {
    if (user && window.Sprig) {
      window.Sprig("track", "viewed_profile_page");
    }
  }, [user]);
  
  if (!user) return null; // Protected route usually handles this, but safe to keep.

  const bookings = bookingService.listByUser(user.id);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <section className="border rounded-2xl p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-2">Your profile</h2>
        <p><span className="text-gray-500">Name:</span> {user.firstName} {user.lastName}</p>
        <p><span className="text-gray-500">Email:</span> {user.email}</p>
      </section>

      <section className="border rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your bookings</h3>
          <Link to="/book" className="text-sm text-blue-600 hover:underline">New booking</Link>
        </div>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500 italic">No bookings yet.</p>
        ) : (
          <ul className="divide-y">
            {bookings.map((b) => (
              <li key={b.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{b.service}</p>
                    <p className="text-sm text-gray-600">
                      {b.date} at {b.time} • {b.durationMins}m • {b.pets} {b.pets === 1 ? 'pet' : 'pets'}
                    </p>
                    {b.notes && <p className="text-xs text-gray-400 mt-1 italic">"{b.notes}"</p>}
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    ID: {b.id.slice(0, 8)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
