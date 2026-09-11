import { useEffect, useRef, useState } from 'react';
import { getContent } from './api.js';
import { Profile, Log, Builds, Stack, Record, Contact } from './Sections.jsx';

const NAV_ITEMS = [
  { href: '#profile', tag: '§01', label: 'Profile' },
  { href: '#log', tag: '§02', label: 'Log' },
  { href: '#builds', tag: '§03', label: 'Builds' },
  { href: '#stack', tag: '§04', label: 'Stack' },
  { href: '#record', tag: '§05', label: 'Record' },
  { href: '#contact', tag: '§06', label: 'Contact' },
];

export default function App() {
  const [content, setContent] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [scrollPct, setScrollPct] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    getContent()
      .then(setContent)
      .catch((err) => setLoadError(err.message));
  }, []);

  // scroll progress ruler
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll-spy for nav active state
  useEffect(() => {
    if (!content) return;
    const sections = document.querySelectorAll('main section[id]');
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [content]);

  if (loadError) {
    return (
      <div className="load-state">
        <p><strong>Couldn't reach the API.</strong></p>
        <p>Is the backend running? Start it with <code>npm run dev</code> inside <code>/backend</code>, and check <code>VITE_API_URL</code> in the frontend's <code>.env</code>.</p>
        <p className="load-state__detail">{loadError}</p>
      </div>
    );
  }

  if (!content) {
    return <div className="load-state">Loading…</div>;
  }

  const { profile, experience, projects, skills, education, achievements, certifications, leadership } = content;

  return (
    <>
      <div className="ruler" aria-hidden="true">
        <div className="ruler__fill" style={{ height: `${scrollPct}%` }} />
      </div>

      <header className="topbar">
        <a href="#top" className="topbar__mark">A.S<span>/</span>2026</a>
        <nav className={`topbar__nav ${navOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? 'active' : ''}
              onClick={() => setNavOpen(false)}
            >
              <span className="tag">{item.tag}</span> {item.label}
            </a>
          ))}
        </nav>
        <a className="topbar__cta" href="/Anusigan_Sivananthan_CV.pdf" download>Download CV</a>
        <button
          className="topbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </header>

      <main id="top" ref={mainRef}>
        <section className="hero" id="hero">
          <div className="hero__field field--doc">DOC&nbsp;PORTFOLIO&#8209;2026</div>
          <div className="hero__field field--rev">REV&nbsp;2026.09</div>

          <div className="hero__main">
            <p className="hero__eyebrow-line">{profile.eyebrow}</p>
            <h1 className="hero__title">Anusigan<br />Sivananthan</h1>
            <p className="hero__lede">{profile.lede}</p>

            <div className="hero__meta">
              <div className="meta__row">
                <span className="meta__k">Role</span>
                <span className="meta__v">{profile.role}</span>
              </div>
              <div className="meta__row">
                <span className="meta__k">Based</span>
                <span className="meta__v">{profile.location}</span>
              </div>
              <div className="meta__row">
                <span className="meta__k">Status</span>
                <span className="meta__v"><span className="stamp">{profile.status}</span></span>
              </div>
            </div>

            <div className="hero__actions">
              <a href="#builds" className="btn btn--solid">See the builds</a>
              <a href="#contact" className="btn btn--line">Get in touch</a>
            </div>
          </div>

          <div className="hero__portrait">
            <img src="/profile.jpg" alt="Portrait of Anusigan Sivananthan" width="204" height="229" />
            <span className="hero__portrait-cap">FIG.&nbsp;01 — A.S.</span>
          </div>
        </section>

        <Profile profile={profile} />
        <Log experience={experience} />
        <Builds projects={projects} githubUrl={profile.github} />
        <Stack skills={skills} />
        <Record
          education={education}
          achievements={achievements}
          certifications={certifications}
          leadership={leadership}
        />
        <Contact profile={profile} />
      </main>
    </>
  );
}
