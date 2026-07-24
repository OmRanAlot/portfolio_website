import { PROFILE } from '../../data/profile.js';
import SocialIcon from '../ui/SocialIcon.jsx';
import './sections.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        {PROFILE.links
          .filter((link) => !link.note)
          .map((link) =>
            link.icon ? (
              <a
                key={link.short}
                href={link.href}
                className="footer-icon-link"
                aria-label={link.short}
                title={link.label}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <SocialIcon name={link.icon} size={18} />
              </a>
            ) : (
              <a
                key={link.short}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {link.short}
              </a>
            )
          )}
      </div>
      <div className="footer-note muted label">{PROFILE.footerNote}</div>
    </footer>
  );
}
