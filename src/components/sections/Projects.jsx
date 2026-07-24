import { motion } from 'framer-motion';
import { PROFILE } from '../../data/profile.js';
import Section from './Section.jsx';

export default function Projects() {
  return (
    <Section path="~/projects" command="ls projects/" title="Selected work">
      <ul className="project-list">
        {PROFILE.projects.map((project) => (
          <li key={project.name}>
            <motion.a
              className="project-card"
              href={project.href}
              whileTap={{ scale: 0.98 }}
            >
              <div className="project-head">
                <span className="project-name">{project.name}</span>
                <span className="project-tags muted label">{project.tags}</span>
              </div>
              <div className="project-desc">
                {project.description} <span className="muted">$ ./run</span>
              </div>
            </motion.a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
