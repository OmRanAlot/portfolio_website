import { gsap } from './gsapSetup.js';

/**
 * Types `text` into `el` like a terminal printer.
 * Duration is capped so recruiters never wait long on mobile.
 */
export function typeChars(el, text, { cps = 72, maxDuration = 0.85 } = {}) {
  if (!el) return gsap.timeline();

  const full = text ?? '';
  if (!full) {
    el.textContent = '';
    return gsap.timeline();
  }

  const state = { n: 0 };
  const duration = Math.min(full.length / cps, maxDuration);
  el.textContent = '';
  el.classList.add('is-printing');

  return gsap.to(state, {
    n: full.length,
    duration,
    ease: 'none',
    onUpdate() {
      el.textContent = full.slice(0, Math.round(state.n));
    },
    onComplete() {
      el.textContent = full;
      el.classList.remove('is-printing');
    },
  });
}
