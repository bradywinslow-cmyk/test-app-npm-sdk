import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @param eventName - The name of the Sprig event to track
 * @param active - Optional boolean to disable/enable the tracker
 */
export function useExitIntent(eventName: string = 'EXIT_INTENT_TRACKED', active: boolean = true) {
  const location = useLocation();

  useEffect(() => {
    if (!active) return;

    let hasTracked = false;

    const onExitIntent = () => {
      if (hasTracked) return;

      hasTracked = true;
      console.log(`Exit Intent Detected on ${location.pathname} - Triggering Sprig: ${eventName}`);

      if (window.Sprig) {
        window.Sprig.track(eventName, {
          pagePath: location.pathname
        });
      }
    };

    const trackFirstExit = (event: MouseEvent | Event) => {
      if (event.type === 'mouseout') {
        const mouseEvent = event as MouseEvent;
        // Check if mouse left the window (moved toward tabs/address bar)
        const element = mouseEvent.relatedTarget || (mouseEvent as any).toElement;
        if (!element || (element as HTMLElement).nodeName === "HTML") {
          onExitIntent();
        }
      } 
      else if (document.visibilityState === 'hidden') {
        onExitIntent();
      }
    };

    window.addEventListener("mouseout", trackFirstExit);
    document.addEventListener("visibilitychange", trackFirstExit);

    // Cleanup: removes the listeners when the user navigates to a new page
    return () => {
      window.removeEventListener("mouseout", trackFirstExit);
      document.removeEventListener("visibilitychange", trackFirstExit);
    };
  }, [location.pathname, eventName, active]); 
}
