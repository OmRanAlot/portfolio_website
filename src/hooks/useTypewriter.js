import { useEffect, useRef, useState } from 'react';

const TYPE_INTERVAL_MS = 34;
const DONE_HOLD_MS = 130;

/**
 * Types `text` one character at a time while `active` is true.
 * Calls `onDone` once, shortly after the final character lands.
 */
export function useTypewriter(text, active, onDone) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return undefined;
    if (count >= text.length) {
      doneRef.current = true;
      const timer = setTimeout(() => onDone?.(), DONE_HOLD_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCount((c) => c + 1), TYPE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [active, count, text, onDone]);

  return text.slice(0, count);
}
