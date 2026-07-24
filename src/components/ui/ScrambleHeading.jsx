import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = '#$%&@!?/\\<>*+=';
const SCRAMBLE_FRAMES = 12;
const FRAME_MS = 26;
const VISIBLE_THRESHOLD = 0.6;

function scrambleFrame(text, frame) {
  const reveal = Math.floor((text.length * frame) / SCRAMBLE_FRAMES);
  return [...text]
    .map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i < reveal) return ch;
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    })
    .join('');
}

export default function ScrambleHeading({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce || !('IntersectionObserver' in window)) return undefined;
    const el = ref.current;
    let interval;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          let frame = 0;
          interval = setInterval(() => {
            frame += 1;
            setDisplay(frame >= SCRAMBLE_FRAMES ? text : scrambleFrame(text, frame));
            if (frame >= SCRAMBLE_FRAMES) clearInterval(interval);
          }, FRAME_MS);
        });
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [text, reduce]);

  return (
    <h2 ref={ref} className="section-heading" aria-label={text}>
      {display}
    </h2>
  );
}
