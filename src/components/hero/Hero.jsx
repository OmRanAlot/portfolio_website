import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PROFILE } from '../../data/profile.js';
import { FIGLET_NAME } from '../../data/figlet.js';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import AsciiDonut from '../ascii/AsciiDonut.jsx';
import InteractiveTerminal from '../terminal/InteractiveTerminal.jsx';
import SocialIcon from '../ui/SocialIcon.jsx';
import './hero.css';

const TOTAL_STEPS = 8;
const LINE_HOLD_MS = 90;
const NEOFETCH_KEY_WIDTH = 7;

function BootBlock({ idx, step, advance, children }) {
  const isCurrent = step === idx;

  useEffect(() => {
    if (!isCurrent) return undefined;
    const timer = setTimeout(advance, LINE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [isCurrent, advance]);

  if (step < idx) return null;
  return <div className="boot-block">{children}</div>;
}

function UptimeTicker() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return (
    <span>
      {mm}:{ss} this session
    </span>
  );
}

function BootPrompt({ idx, step, advance, command }) {
  const typed = useTypewriter(command, step === idx, advance);

  if (step < idx) return null;
  return (
    <div className="boot-block term-prompt hero-prompt">
      <span className="accent">$&nbsp;</span>
      <span>{step > idx ? command : typed}</span>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(() => (reduce ? TOTAL_STEPS : 0));
  const advance = useCallback(() => setStep((s) => s + 1), []);

  return (
    <section className="hero" aria-label="Introduction">
      <BootPrompt idx={0} step={step} advance={advance} command="whoami" />
      <BootBlock idx={1} step={step} advance={advance}>
        <h1 className="sr-only">{PROFILE.name}</h1>
        <div className="figlet-wrap" aria-hidden="true">
          <pre className="figlet-name">{FIGLET_NAME}</pre>
        </div>
      </BootBlock>
      <BootBlock idx={2} step={step} advance={advance}>
        <p className="hero-title">{PROFILE.title}</p>
      </BootBlock>

      <BootPrompt idx={3} step={step} advance={advance} command="neofetch" />
      <BootBlock idx={4} step={step} advance={advance}>
        <div className="neofetch">
          <AsciiDonut />
          <div className="neofetch-info">
            {PROFILE.neofetch.map(({ key, value, tone }) => (
              <div key={key}>
                <span className="accent neofetch-key">
                  {key.padEnd(NEOFETCH_KEY_WIDTH, ' ')}
                </span>
                <span className="muted">·&nbsp;</span>
                <span className={tone === 'crimson' ? 'crimson' : undefined}>
                  {value}
                </span>
              </div>
            ))}
            <div>
              <span className="accent neofetch-key">
                {'uptime'.padEnd(NEOFETCH_KEY_WIDTH, ' ')}
              </span>
              <span className="muted">·&nbsp;</span>
              <UptimeTicker />
            </div>
          </div>
        </div>
      </BootBlock>

      <BootPrompt idx={5} step={step} advance={advance} command="cat links.txt" />
      <BootBlock idx={6} step={step} advance={advance}>
        <ul className="hero-links">
          {PROFILE.links.map((link) => (
            <li key={link.short}>
              <span className="accent">→&nbsp;</span>
              <a
                href={link.href}
                className={link.icon ? 'hero-link-with-icon' : undefined}
                {...(link.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {link.icon && <SocialIcon name={link.icon} size={14} />}
                {link.label}
              </a>
              {link.note && (
                <span className="muted label hero-link-note">
                  &nbsp;{link.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </BootBlock>

      <BootBlock idx={7} step={step} advance={advance}>
        <InteractiveTerminal />
      </BootBlock>
    </section>
  );
}
