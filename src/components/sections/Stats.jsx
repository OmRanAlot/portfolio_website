import { PROFILE } from '../../data/profile.js';
import Section from './Section.jsx';

const PLACE_COLOR = { '1st': 'accent', '2nd': undefined, '3rd': 'muted' };

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
        <div key={label} className="stat-count-item" data-gsap-card>
          <span className="stat-count-value accent">{value}</span>
          <span className="stat-count-label muted label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Stats() {
  const { hackathons, counts } = PROFILE.stats;

  return (
    <Section path="~/stats" command="cat wins.log" title="Hackathon wins">
      <div className="stats-wrap">
        <div className="hack-list">
          {hackathons.map((h) => (
            <div key={h.project} className="hack-row" data-gsap-card>
              <PlaceBadge place={h.place} />
              <span className="hack-project accent">{h.project}</span>
              <span className="hack-event muted">
                {h.event}
                <span className="hack-track"> · {h.track}</span>
                <span className="hack-teams"> ({h.teams} teams)</span>
              </span>
              <span className="hack-date muted label">{h.date}</span>
            </div>
          ))}
        </div>
        <CountGrid counts={counts} />
      </div>
    </Section>
  );
}
