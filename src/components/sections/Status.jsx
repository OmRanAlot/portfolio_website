import { PROFILE } from '../../data/profile.js';
import Section from './Section.jsx';

export default function Status() {
  return (
    <Section path="~/status" command="ps aux | grep om" title="Currently running">
      <div className="status-table" role="table" aria-label="Running processes">
        <div className="status-row status-row--head" role="row">
          <span className="muted" role="columnheader">
            USER
          </span>
          <span className="muted" role="columnheader">
            PID
          </span>
          <span className="muted" role="columnheader">
            STAT
          </span>
          <span className="muted status-cmd-label" role="columnheader">
            COMMAND
          </span>
        </div>
        {PROFILE.processes.map((proc) => (
          <div className="status-row" role="row" key={proc.pid} data-gsap-card>
            <span role="cell">om</span>
            <span role="cell">{proc.pid}</span>
            <span role="cell">{proc.stat}</span>
            <span className="status-cmd" role="cell">
              <span className="accent">{proc.command}</span>
              <span className="status-flag">{proc.flag}</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
