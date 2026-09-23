import { useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { useSectionMotion } from '../../hooks/useSectionMotion.js';
import './sections.css';

export default function Section({ path, command, title, children }) {
  const rootRef = useRef(null);
  const reduce = usePrefersReducedMotion();
  useSectionMotion(rootRef);

  return (
    <section ref={rootRef} className="term-section" aria-label={title}>
      <div className="muted label section-path">{path}</div>
      <div className="term-prompt">
        <span className="accent">$&nbsp;</span>
        <span
          className="terminal-print"
          data-gsap-command
          data-text={command}
          aria-label={command}
        >
          {reduce ? command : ''}
        </span>
        <span className="terminal-caret" aria-hidden="true" />
      </div>
      {title && (
        <h2 className="section-heading" aria-label={title}>
          <span data-gsap-heading data-text={title} className="terminal-print">
            {reduce ? title : ''}
          </span>
          <span className="terminal-caret" aria-hidden="true" />
        </h2>
      )}
      {children}
    </section>
  );
}
