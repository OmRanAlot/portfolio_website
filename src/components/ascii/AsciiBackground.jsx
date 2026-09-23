import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapSetup.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { LEFT_STREAM, RIGHT_STREAM } from './streams.js';
import './ascii.css';

const PARALLAX_SLOW = -0.12;
const PARALLAX_FAST = -0.22;

export default function AsciiBackground() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const reduce = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduce) return undefined;

      const left = leftRef.current;
      const right = rightRef.current;
      if (!left || !right) return undefined;

      const setLeft = gsap.quickSetter(left, 'y', 'px');
      const setRight = gsap.quickSetter(right, 'y', 'px');

      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate() {
          const y = window.scrollY;
          setLeft(y * PARALLAX_SLOW);
          setRight(y * PARALLAX_FAST);
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [reduce] },
  );

  return (
    <div className="ascii-bg" aria-hidden="true">
      <div ref={leftRef} className="ascii-bg-col ascii-bg-left">
        <pre className="ascii-bg-stream">{`${LEFT_STREAM}\n${LEFT_STREAM}`}</pre>
      </div>
      <div ref={rightRef} className="ascii-bg-col ascii-bg-right">
        <pre className="ascii-bg-stream">{`${RIGHT_STREAM}\n${RIGHT_STREAM}`}</pre>
      </div>
    </div>
  );
}
