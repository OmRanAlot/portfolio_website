import AsciiBackground from './components/ascii/AsciiBackground.jsx';
import AsciiRail from './components/ascii/AsciiRail.jsx';
import TerminalHeader from './components/terminal/TerminalHeader.jsx';
import Hero from './components/hero/Hero.jsx';
import Stats from './components/sections/Stats.jsx';
import Projects from './components/sections/Projects.jsx';
import About from './components/sections/About.jsx';
import Status from './components/sections/Status.jsx';
import Footer from './components/sections/Footer.jsx';
import { PROFILE } from './data/profile.js';

export default function App() {
  return (
    <>
      <AsciiBackground />
      <AsciiRail />
      <div className="crt-scanline" aria-hidden="true" />
      <main className="site-main">
        <div className="terminal-card">
          <TerminalHeader title={PROFILE.sessionTitle} />
          <Hero />
          <About />
          <Projects />
          <Stats />
          <Status />
          <Footer />
        </div>
      </main>
    </>
  );
}
