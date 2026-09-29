import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export type FeedbackType = "thumbs_up" | "thumbs_down";

type FeedbackCounts = Record<FeedbackType, number>;

const EMPTY_COUNTS: FeedbackCounts = { thumbs_up: 0, thumbs_down: 0 };

// Counts are stored per user so each user's clicks are tallied separately
const storageKey = (userId: string) => `testimonial_feedback_${userId}`;

function readCounts(userId: string): FeedbackCounts {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? { ...EMPTY_COUNTS, ...JSON.parse(raw) } : EMPTY_COUNTS;
  } catch {
    return EMPTY_COUNTS;
  }
}

export function useTestimonialFeedback() {
  const { user } = useAuth();
  const userId = user?.id ?? "anonymous";
  const [counts, setCounts] = useState<FeedbackCounts>(() => readCounts(userId));

  useEffect(() => {
    setCounts(readCounts(userId));
  }, [userId]);

  const trackFeedback = useCallback(
    (type: FeedbackType) => {
      const current = readCounts(userId);
      const updated = { ...current, [type]: current[type] + 1 };
      localStorage.setItem(storageKey(userId), JSON.stringify(updated));
      setCounts(updated);

      // Send the click event to Sprig
      window.Sprig?.track(`testimonial_${type}_clicked`, {
        page: "testimonials",
        clickCount: updated[type],
      });

      // Keep the running per-user totals on the Sprig user profile
      window.Sprig?.setAttributes({
        testimonial_thumbs_up_count: updated.thumbs_up,
        testimonial_thumbs_down_count: updated.thumbs_down,
      });
    },
    [userId]
  );

  return { counts, trackFeedback };
}
