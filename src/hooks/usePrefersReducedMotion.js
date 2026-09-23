import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getInitial() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/** Subscribe to prefers-reduced-motion for non-GSAP UI (boot sequences, ASCII). */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(getInitial);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduce(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduce;
}
