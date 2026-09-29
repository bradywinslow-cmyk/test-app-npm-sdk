import { Link } from "react-router-dom";

export default function Home() {
  // window.Sprig?.track('new_event_one');

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-700 p-8 bg-linear-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900">
        <h1 className="text-3xl font-semibold mb-2">
          Reliable dog walking, right when you need it
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Book trusted walkers for daily strolls, drop-ins, or overnight care.
        </p>
        <div className="flex gap-3">
          <Link to="/services" className="px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800">
            Explore services
          </Link>
          <Link to="/book" className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Book now
          </Link>
        </div>
      </div>
    </main>
  );
}
