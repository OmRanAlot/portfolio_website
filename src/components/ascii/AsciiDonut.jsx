import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './ascii.css';

const WIDTH = 30;
const HEIGHT = 15;
const FRAME_MS = 80;
const THETA_STEP = 0.07;
const PHI_STEP = 0.03;
const A_STEP = 0.07;
const B_STEP = 0.03;
const LUMINANCE = '.,-~:;=!*#$@';

/** One frame of the classic donut.c spinning torus, sized for a small pre. */
function renderDonut(A, B) {
  const size = WIDTH * HEIGHT;
  const depth = new Array(size).fill(0);
  const output = new Array(size).fill(' ');
  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < Math.PI * 2; theta += THETA_STEP) {
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) {
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);
      const ring = cosT + 2;
      const invZ = 1 / (sinP * ring * sinA + sinT * cosA + 5);
      const t = sinP * ring * cosA - sinT * sinA;
      const x = Math.floor(
        WIDTH / 2 + WIDTH * 0.38 * invZ * (cosP * ring * cosB - t * sinB),
      );
      const y = Math.floor(
        HEIGHT / 2 + HEIGHT * 0.44 * invZ * (cosP * ring * sinB + t * cosB),
      );
      if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) continue;
      const idx = x + WIDTH * y;
      if (invZ <= depth[idx]) continue;
      depth[idx] = invZ;
      const lum =
        8 *
        ((sinT * sinA - sinP * cosT * cosA) * cosB -
          sinP * cosT * sinA -
          sinT * cosA -
          cosP * cosT * sinB);
      const lumIdx = Math.min(LUMINANCE.length - 1, Math.max(0, Math.floor(lum)));
      output[idx] = LUMINANCE[lumIdx];
    }
  }

  return Array.from({ length: HEIGHT }, (_, row) =>
    output.slice(row * WIDTH, (row + 1) * WIDTH).join(''),
  ).join('\n');
}

export default function AsciiDonut() {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(() => renderDonut(1, 1));
  const anglesRef = useRef({ A: 1, B: 1 });

  useEffect(() => {
    if (reduce) return undefined;
    const interval = setInterval(() => {
      anglesRef.current = {
        A: anglesRef.current.A + A_STEP,
        B: anglesRef.current.B + B_STEP,
      };
      setFrame(renderDonut(anglesRef.current.A, anglesRef.current.B));
    }, FRAME_MS);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <pre className="ascii-donut" aria-hidden="true">
      {frame}
    </pre>
  );
}
