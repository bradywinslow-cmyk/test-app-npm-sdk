import { useExitIntent } from '../hooks/useExitIntent';

const services = [
  { title: "Walk", desc: "30–60 min neighborhood walks to burn energy and sniff the roses." },
  { title: "Drop-in", desc: "Short home visits for water, feeding, and quick potty breaks." },
  { title: "Overnight", desc: "In-home care so your pup keeps their routine while you travel." },
];

export default function Services() {
    useExitIntent('SERVICES_EXIT_INTENT');

    return (
        <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
            <div key={s.title} className="border rounded-2xl p-6 bg-white hover:shadow-sm transition-shadow">
                <div className="text-3xl mb-3">
                {s.title === "Walk" ? "🐕" : s.title === "Drop-in" ? "🏠" : "🌙"}
                </div>
                <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
            ))}
        </div>
        </main>
    );
}
