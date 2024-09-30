import { useState, useEffect, useRef } from 'react';

export default function useDebouncedValue<T>(value: T | undefined, callback: (value: T) => void = () => {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log({ value });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
  }, [value]);

  useEffect(() => {
    if (debouncedValue) callback(debouncedValue);
  }, [debouncedValue, callback]);

  return debouncedValue;
}
