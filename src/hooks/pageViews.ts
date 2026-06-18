import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function trackPageViews() {
  const location = useLocation();

  useEffect(() => {
    const pageId = location.pathname
      .replace(/^\/|\/$/g, '')  // strip leading/trailing slashes
      .replace(/\//g, '-')      // slashes → dashes
      || 'home';                // fallback for "/"

    if (typeof Sprig !== 'undefined') {
      Sprig.track(`page-viewed-${pageId}`);
    }
  }, [location.pathname]);      // re-fires on every route change
}
