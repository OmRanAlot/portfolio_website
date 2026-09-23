import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { RAIL_GLYPHS } from './streams.js';
import './ascii.css';

const RAIL_ROWS = 100;
const RAIL_TICK_MS = 90;

function randomGlyph() {
  return RAIL_GLYPHS[Math.floor(Math.random() * RAIL_GLYPHS.length)];
}

function seedRows() {
  return Array.from({ length: RAIL_ROWS }, randomGlyph);
}

export default function AsciiRail() {
  const reduce = usePrefersReducedMotion();
  const [rows, setRows] = useState(seedRows);

  useEffect(() => {
    if (reduce) return undefined;
    const interval = setInterval(() => {
      setRows((prev) => [randomGlyph(), ...prev.slice(0, prev.length - 1)]);
    }, RAIL_TICK_MS);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <pre className="ascii-rail" aria-hidden="true">
      {rows.join('\n')}
    </pre>
  );
}
