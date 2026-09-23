import { PROFILE } from '../../data/profile.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import Section from './Section.jsx';

export default function About() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section path="~/about" command="cat about.txt" title="About">
      <p className="about-text">
        <span
          className="terminal-print"
          data-gsap-print
          data-text={PROFILE.about}
          aria-label={PROFILE.about}
        >
          {reduce ? PROFILE.about : ''}
        </span>
        <span className="terminal-caret" aria-hidden="true" />
      </p>
      <p className="about-note muted label">
        <span
          className="terminal-print"
          data-gsap-print
          data-text={PROFILE.aboutNote}
          aria-label={PROFILE.aboutNote}
        >
          {reduce ? PROFILE.aboutNote : ''}
        </span>
      </p>
    </Section>
  );
}
