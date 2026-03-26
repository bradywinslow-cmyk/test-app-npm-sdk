import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="rounded-2xl border p-8 bg-linear-to-br from-white to-gray-50">
        <h1 className="text-3xl font-semibold mb-2">
          Reliable dog walking, right when you need it
        </h1>
        <p className="text-gray-600 mb-6">
          Book trusted walkers for daily strolls, drop-ins, or overnight care.
        </p>
        <div className="flex gap-3">
          <Link to="/services" className="px-4 py-2 rounded-full border hover:bg-gray-50">
            Explore services
          </Link>
          <Link to="/book" className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800">
            Book now
          </Link>
        </div>
      </div>
    </main>
  );
}
