import { motion, useReducedMotion } from 'framer-motion';
import ScrambleHeading from '../ui/ScrambleHeading.jsx';
import './sections.css';

export default function Section({ path, command, title, children }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="term-section"
      aria-label={title}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="muted label section-path">{path}</div>
      <div className="term-prompt">
        <span className="accent">$&nbsp;</span>
        {command}
      </div>
      {title && <ScrambleHeading text={title} />}
      {children}
    </motion.section>
  );
}
