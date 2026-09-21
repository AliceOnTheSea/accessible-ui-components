import { useState, useCallback } from 'react';

/**
 * Screen Reader Live Announcer Hook (WCAG 4.1.3 - Status Messages)
 * Dynamic polite / assertive live region updates for assistive technology.
 */
export function useLiveAnnouncer() {
  const [announcement, setAnnouncement] = useState<{ message: string; mode: 'polite' | 'assertive' }>({
    message: '',
    mode: 'polite',
  });

  const announce = useCallback((message: string, mode: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement({ message: '', mode });
    // Trigger DOM update for screen reader detection
    setTimeout(() => {
      setAnnouncement({ message, mode });
    }, 50);
  }, []);

  return { announcement, announce };
}
