import { PROFILE } from '../../data/profile.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import Section from './Section.jsx';

export default function Projects() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section path="~/projects" command="ls projects/" title="Selected work">
      <ul className="project-list">
        {PROFILE.projects.map((project) => (
          <li key={project.name}>
            <a className="project-card" href={project.href} data-gsap-card>
              <div className="project-head">
                <span className="project-name">{project.name}</span>
                <span className="project-tags muted label">{project.tags}</span>
              </div>
              <div className="project-desc">
                <span
                  className="terminal-print"
                  data-gsap-print
                  data-text={project.description}
                  aria-label={project.description}
                >
                  {reduce ? project.description : ''}
                </span>{' '}
                <span className="muted">$ ./run</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
