import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { LEFT_STREAM, RIGHT_STREAM } from './streams.js';
import './ascii.css';

const PARALLAX_SLOW = -0.12;
const PARALLAX_FAST = -0.22;

export default function AsciiBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yLeft = useTransform(scrollY, (v) => v * PARALLAX_SLOW);
  const yRight = useTransform(scrollY, (v) => v * PARALLAX_FAST);

  return (
    <div className="ascii-bg" aria-hidden="true">
      <motion.div
        className="ascii-bg-col ascii-bg-left"
        style={reduce ? undefined : { y: yLeft }}
      >
        <pre className="ascii-bg-stream">{`${LEFT_STREAM}\n${LEFT_STREAM}`}</pre>
      </motion.div>
      <motion.div
        className="ascii-bg-col ascii-bg-right"
        style={reduce ? undefined : { y: yRight }}
      >
        <pre className="ascii-bg-stream">{`${RIGHT_STREAM}\n${RIGHT_STREAM}`}</pre>
      </motion.div>
    </div>
  );
}
