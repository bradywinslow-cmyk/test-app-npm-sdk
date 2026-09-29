// import { useExitIntent } from '../hooks/useExitIntent';

const rates = [
  { service: "Walk (30 min)", price: "$20" },
  { service: "Walk (60 min)", price: "$32" },
  { service: "Drop-in (20 min)", price: "$18" },
  { service: "Overnight (per night)", price: "$85" },
];

export default function Pricing() {
    // useExitIntent('PRICING_EXIT_INTENT');
    // window.Sprig?.track('new_event_three');

    return (
        <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Pricing & Coverage</h2>
        
        {/* Pricing Table */}
        <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden mb-10 bg-white dark:bg-neutral-800 shadow-sm">
            <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700">
                <tr>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-300">Service</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-300">Price</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {rates.map((r) => (
                <tr key={r.service} className="hover:bg-gray-50/50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="p-4 text-gray-800 dark:text-gray-200">{r.service}</td>
                    <td className="p-4 font-medium text-black dark:text-white">{r.price}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Map Section */}
        <div className="space-y-4">
            <h3 className="text-xl font-medium">Our Service Area</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">We currently serve the downtown and greater metro area.</p>
            <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-inner bg-gray-100 dark:bg-neutral-800">
            <iframe 
                title="Service Area Map"
                className="w-full h-[100]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.037902013252!2d-122.40233402333462!3d37.789151511330594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085816f4a6b2ae5%3A0x343a68ca27c52905!2s71%20Stevenson%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1770758839617!5m2!1sen!2sus" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            />
            </div>
        </div>
        </main>
    );
}
