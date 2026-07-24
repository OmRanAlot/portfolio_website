export const PROFILE = {
  name: 'Om Rana',
  handle: 'om@njit',
  title: 'CS + Math @ NJIT',
  sessionTitle: 'om@njit: ~/session',
  email: 'omjrana1010@gmail.com',
  neofetch: [
    { key: 'host', value: 'NJIT' },
    { key: 'os', value: 'CS + Mathematics' },
    { key: 'shell', value: 'bash / build-in-public' },
    { key: 'focus', value: 'Systems · ML · Quant' },
    { key: 'langs', value: 'Python · C++ · JS' },
    { key: 'status', value: 'open to opportunities', tone: 'crimson' },
  ],
  links: [
    {
      short: 'github',
      label: 'github.com/OmRanAlot',
      href: 'https://github.com/OmRanAlot',
      external: true,
      icon: 'github',
    },
    {
      short: 'linkedin',
      label: 'linkedin.com/in/om-rana',
      href: 'https://www.linkedin.com/in/om-rana-597695284/',
      external: true,
      icon: 'linkedin',
    },
    {
      short: 'instagram',
      label: 'instagram.com/omranakilometer',
      href: 'https://instagram.com/omranakilometer',
      external: true,
      icon: 'instagram',
    },
    {
      short: 'email',
      label: 'omjrana1010@gmail.com',
      href: 'mailto:omjrana1010@gmail.com',
    },
  ],
  projects: [
  {
    name: 'break/',
    tags: '[ Android · Kotlin · AccessibilityService ]',
    description: 'Surgically blocks Instagram Reels and YouTube Shorts without blocking the full apps — no willpower required, just architecture.',
    href: '#',
  },
  {
    name: 'drift/',
    tags: '[ C++ · pybind11 · React · Supabase ]',
    description: 'Monte Carlo stock trend simulator combining regime-switching GBM, GARCH volatility, and jump-diffusion — C++ core exposed to a Python/React dashboard.',
    href: '#',
  },
  {
    name: 'seamless/',
    tags: '[ Python · MCP · Snowflake ]',
    description: '🏆 1st place, DevFest 2026 (Columbia). Turns streaming scenes into shoppable moments with scene-aware, non-disruptive brand overlays.',
    href: 'https://github.com/utk7arsh/Seamless',
  },
  {
    name: 'battlesnake/',
    tags: '[ C++ · Python · FastAPI ]',
    description: 'Competitive Battlesnake bot — bitboard-based minimax with alpha-beta pruning and Voronoi territory evaluation, called from Python via ctypes.',
    href: 'https://github.com/OmRanAlot/njit-battlesnake',
  },
],
  about:
    'CS + Math student at NJIT. Love solving problems and puzzles. Math enthusiast. Chess player. Currently learning machine learning, Putnam, and ICPC.',
  aboutNote: '// currently exploring ML research',
  processes: [
    { pid: '1337', stat: 'R+', command: 'gdg-tech-lead', flag: '--active' },
    { pid: '0451', stat: 'D', command: 'ml-research', flag: '--seeking' },
    { pid: '2048', stat: 'R+', command: './break', flag: '--building' },
  ],
  footerNote: '// om rana — 2026',
  stats: {
    hackathons: [
      { place: '1st', track: 'Overall',         event: 'Columbia DevFest',     teams: '70+', project: 'Seamless',            date: 'Feb 2026' },
      { place: '1st', track: 'Financial Track',  event: 'Rutgers HackHers',    teams: '40+', project: 'The Spirited Oracle',  date: 'Feb 2026' },
      { place: '2nd', track: 'Featherless AI',   event: 'QuackHacks · Stevens',teams: '40+', project: 'Orbit',                date: 'Mar 2026' },
      { place: '1st', track: 'Overall',          event: 'NJIT Battlesnake',    teams: '30+', project: 'C++ Minimax AI',       date: 'Mar 2026' },
      { place: '3rd', track: 'Overall',          event: 'NJIT GirlHacks',      teams: '50+', project: "Athena's Journal",     date: 'Sep 2025' },
    ],
    counts: [
      { label: 'projects shipped', value: '5+'   },
      { label: 'github commits',   value: '400+' },
      { label: 'gpa',              value: '3.95' },
      { label: 'hackathons',       value: '5'    },
    ],
  },
};
