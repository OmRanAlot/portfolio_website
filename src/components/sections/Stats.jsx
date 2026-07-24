import { motion, useReducedMotion } from 'framer-motion';
import { PROFILE } from '../../data/profile.js';
import Section from './Section.jsx';

const PLACE_COLOR = { '1st': 'accent', '2nd': undefined, '3rd': 'muted' };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

function PlaceBadge({ place }) {
  const cls = PLACE_COLOR[place];
  return (
    <span className={['hack-place', cls].filter(Boolean).join(' ')}>
      [{place}]
    </span>
  );
}

function CountGrid({ counts }) {
  return (
    <div className="stat-counts">
      {counts.map(({ label, value }) => (
        <div key={label} className="stat-count-item">
          <span className="stat-count-value accent">{value}</span>
          <span className="stat-count-label muted label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Stats() {
  const reduce = useReducedMotion();
  const { hackathons, counts } = PROFILE.stats;

  return (
    <Section path="~/stats" command="cat wins.log" title="Hackathon wins">
      <div className="stats-wrap">
        <motion.div
          className="hack-list"
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {hackathons.map((h) => (
            <motion.div
              key={h.project}
              className="hack-row"
              variants={reduce ? undefined : rowVariants}
            >
              <PlaceBadge place={h.place} />
              <span className="hack-project accent">{h.project}</span>
              <span className="hack-event muted">
                {h.event}
                <span className="hack-track"> · {h.track}</span>
                <span className="hack-teams"> ({h.teams} teams)</span>
              </span>
              <span className="hack-date muted label">{h.date}</span>
            </motion.div>
          ))}
        </motion.div>
        <CountGrid counts={counts} />
      </div>
    </Section>
  );
}
