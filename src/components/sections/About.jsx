import { PROFILE } from '../../data/profile.js';
import Section from './Section.jsx';

export default function About() {
  return (
    <Section path="~/about" command="cat about.txt" title="About">
      <p className="about-text">{PROFILE.about}</p>
      <p className="about-note muted label">{PROFILE.aboutNote}</p>
    </Section>
  );
}
