import { useRef, useState } from 'react';
import { PROFILE } from '../../data/profile.js';
import './terminal.css';

const MAX_HISTORY_LINES = 80;

const HELP_LINES = [
  'available commands:',
  '  help          show this list',
  '  whoami        who is om?',
  '  ls            list projects',
  '  links         contact + socials',
  '  status        what om is up to',
  '  sudo hire-me  (recruiters only)',
  '  clear         wipe the screen',
];

function resolveCommand(raw) {
  const cmd = raw.toLowerCase();
  if (cmd === 'help') return HELP_LINES;
  if (cmd === 'whoami') return [`${PROFILE.name} — ${PROFILE.title}`];
  if (cmd === 'ls' || cmd === 'projects' || cmd === 'ls projects/') {
    return PROFILE.projects.map((p) => p.name);
  }
  if (cmd === 'links' || cmd === 'contact') {
    return PROFILE.links.filter((l) => !l.note).map((l) => `→ ${l.label}`);
  }
  if (cmd === 'status') {
    return [
      'open to opportunities — ML research · systems',
      `ping: ${PROFILE.email}`,
    ];
  }
  if (cmd === 'sudo hire-me' || cmd === 'sudo hire me') {
    return [
      '[sudo] password for recruiter: ********',
      `access granted ✓ — inbox: ${PROFILE.email}`,
    ];
  }
  return [`command not found: ${raw} — try \`help\``];
}

export default function InteractiveTerminal() {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const idRef = useRef(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const raw = value.trim();
    setValue('');
    if (!raw) return;
    if (raw.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    const nextId = () => {
      idRef.current += 1;
      return idRef.current;
    };
    const entry = [
      { id: nextId(), type: 'cmd', text: raw },
      ...resolveCommand(raw).map((text) => ({ id: nextId(), type: 'out', text })),
    ];
    setLines((prev) => [...prev, ...entry].slice(-MAX_HISTORY_LINES));
    requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({ block: 'nearest' });
    });
  };

  return (
    /* Clicking anywhere in the terminal area focuses the input, like a real shell. */
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className="iterm" onClick={() => inputRef.current?.focus()}>
      {lines.map((line) => (
        <div
          key={line.id}
          className={line.type === 'cmd' ? 'iterm-line' : 'iterm-line muted'}
        >
          {line.type === 'cmd' && <span className="accent">$ </span>}
          {line.text}
        </div>
      ))}
      <form className="iterm-row" onSubmit={handleSubmit}>
        <span className="accent">$&nbsp;</span>
        {value === '' && <span className="iterm-cursor" aria-hidden="true" />}
        <input
          ref={inputRef}
          className="iterm-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="type `help`"
          aria-label="Terminal command input"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          enterKeyHint="go"
        />
      </form>
    </div>
  );
}
