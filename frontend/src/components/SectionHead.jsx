import { useInView } from 'react-intersection-observer'

export default function SectionHead({ eyebrow, title, sub }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <div ref={ref} className={`section-head ${inView ? 'in' : ''}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-heading px-wipe">{title}<span className="accent">.</span></h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}
