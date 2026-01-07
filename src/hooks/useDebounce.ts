import { useState, useEffect } from 'react';

interface UseDebounceProps<T> {
  value: T;
  delay?: number;
}

export const useDebounce = <T>({ value, delay = 500 }: UseDebounceProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timer if value or delay changes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Alternative simpler API for single parameter
export const useDebounceValue = <T>(value: T, delay = 500): T => {
  return useDebounce({ value, delay });
};
