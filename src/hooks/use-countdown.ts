
"use client";

import { useState, useEffect } from 'react';
import { intervalToDuration, formatDuration } from 'date-fns';

export function useCountdown(targetDate: string) {
  const calculateCountdown = () => {
    const now = new Date();
    const end = new Date(targetDate);
    const duration = intervalToDuration({ start: now, end: end });

    if (now > end) {
      return 'Event has started';
    }

    const formatted = formatDuration(duration, {
      format: ['days', 'hours', 'minutes'],
      delimiter: ', ',
    })
    .replace(/,([^,]*)$/, ' and$1'); // "days, hours and minutes"
    
    return `Starts in ${formatted}`;
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return countdown;
}
