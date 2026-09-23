import { gsap, useGSAP } from '../lib/gsapSetup.js';
import { typeChars } from '../lib/terminalType.js';

/**
 * Scroll-triggered section entrance:
 * slide-in cards + terminal-style typing for commands / headings / print nodes.
 * Tuned for mobile speed and recruiter skim time (capped type duration, once: true).
 */
export function useSectionMotion(rootRef) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        root
          .querySelectorAll(
            '[data-gsap-print], [data-gsap-command], [data-gsap-heading]',
          )
          .forEach((el) => {
            const full = el.getAttribute('data-text');
            if (full != null) el.textContent = full;
          });
      });

      mm.add(
        {
          isMobile:
            '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
          isDesktop:
            '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { isMobile } = context.conditions;
          const commandEl = root.querySelector('[data-gsap-command]');
          const headingEl = root.querySelector('[data-gsap-heading]');
          const printEls = gsap.utils.toArray('[data-gsap-print]', root);
          const cards = gsap.utils.toArray('[data-gsap-card]', root);

          const commandText = commandEl?.getAttribute('data-text') ?? '';
          const headingText = headingEl?.getAttribute('data-text') ?? '';

          if (commandEl) commandEl.textContent = '';
          if (headingEl) headingEl.textContent = '';
          printEls.forEach((el) => {
            el.textContent = '';
          });

          if (cards.length) {
            gsap.set(cards, {
              autoAlpha: 0,
              y: isMobile ? 14 : 22,
              x: isMobile ? -10 : -20,
            });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top 92%',
              once: true,
            },
          });

          tl.from(root, {
            autoAlpha: 0,
            y: isMobile ? 12 : 18,
            duration: isMobile ? 0.32 : 0.42,
            ease: 'power2.out',
          });

          if (commandEl && commandText) {
            tl.add(
              typeChars(commandEl, commandText, {
                cps: isMobile ? 90 : 70,
                maxDuration: 0.4,
              }),
              '-=0.12',
            );
          }

          if (headingEl && headingText) {
            tl.add(
              typeChars(headingEl, headingText, {
                cps: isMobile ? 80 : 60,
                maxDuration: 0.45,
              }),
              '+=0.04',
            );
          }

          if (cards.length) {
            tl.addLabel('cards');
            tl.to(
              cards,
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: isMobile ? 0.3 : 0.4,
                stagger: isMobile ? 0.05 : 0.08,
                ease: 'power2.out',
              },
              'cards',
            );
          }

          printEls.forEach((el, i) => {
            const full = el.getAttribute('data-text') ?? '';
            if (!full) return;
            const stagger = isMobile ? 0.05 : 0.08;
            const at = cards.length
              ? `cards+=${0.1 + Math.min(i, Math.max(cards.length - 1, 0)) * stagger}`
              : '+=0.05';
            tl.add(
              typeChars(el, full, {
                cps: isMobile ? 95 : 78,
                maxDuration: isMobile ? 0.65 : 0.85,
              }),
              at,
            );
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );
}
