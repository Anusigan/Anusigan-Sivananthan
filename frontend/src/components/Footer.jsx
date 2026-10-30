import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from '../data'
import { unlock } from '../secrets'
import { scrollToId } from '../smoothScroll'

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.6 })
  useEffect(() => { if (inView) unlock('bottom') }, [inView])

  return (
    <footer ref={ref} className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-big">thanks for playing<span className="accent">.</span></p>
          <p className="pixel-label" style={{ color: 'var(--text-3)', marginTop: 10 }}>
            hand-built with react, canvas and a lot of fillRect() · {PROFILE.name} © {new Date().getFullYear()}
          </p>
        </div>
        <div className="footer-actions">
          <button className="btn-pixel btn-pixel--ghost" onClick={() => scrollToId('hero')}>↑ press start again</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { icon: Github, href: PROFILE.github, label: 'GitHub' },
              { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} className="icon-pixel"><Icon size={16} /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-ground" aria-hidden="true" />
    </footer>
  )
}
