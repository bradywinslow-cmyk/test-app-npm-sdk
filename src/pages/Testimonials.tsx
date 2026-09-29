const items = [
  { 
    name: "Bailey & Max", 
    text: "Our golden can’t wait for his walker—best part of his day!", 
    rating: 5 
  },
  { 
    name: "Luna’s family", 
    text: "Super reliable and communicative. The photo updates are everything.", 
    rating: 5 
  },
  { 
    name: "Ollie", 
    text: "They handled our reactive pup with patience and skill. 10/10.", 
    rating: 5 
  },
];

//import { useTestimonialFeedback } from "../hooks/useTestimonialFeedback";

export default function Testimonials() {
    // window.Sprig?.track('new_event_four');
  //const { counts, trackFeedback } = useTestimonialFeedback();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-semibold mb-2">Happy Paws, Happy Humans</h2>
        <p className="text-gray-600 dark:text-gray-400">See what our community is saying about Winston's Walkers.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <div
            key={t.name}
            className="border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex text-yellow-400 mb-3" aria-hidden="true">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4 italic">
                “{t.text}”
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-neutral-700 pt-3">
              — {t.name}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-16 text-center bg-gray-50 dark:bg-neutral-800 rounded-2xl p-8 border border-dashed border-gray-300 dark:border-neutral-600">
        <h3 className="font-medium text-lg mb-2">Want to share your story?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">We love hearing about your experience with our walkers.</p>
        <button className="px-5 py-2 rounded-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors text-sm">
          Submit a Review
        </button>
      </section>
    
      <section className="mt-10 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">Was this page helpful?</p>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Yes, this page was helpful"
            // onClick={() => trackFeedback("thumbs_up")}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            👍
          </button>
          <button
            type="button"
            aria-label="No, this page was not helpful"
            // onClick={() => trackFeedback("thumbs_down")}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            👎
          </button>
        </div>
      </section>
    </main>
  );
}
