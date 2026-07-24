import './terminal.css';

export default function TerminalHeader({ title }) {
  return (
    <div className="term-header">
      <span className="term-dot term-dot--crimson" />
      <span className="term-dot term-dot--amber" />
      <span className="term-dot term-dot--sage" />
      <span className="term-title label">{title}</span>
    </div>
  );
}
