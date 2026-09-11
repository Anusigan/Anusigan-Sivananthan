import { useState } from 'react';
import { sendContactMessage } from './api.js';

export function Profile({ profile }) {
  return (
    <section className="section" id="profile">
      <div className="section__head">
        <span className="tag">§01</span>
        <h2>Profile</h2>
      </div>
      <div className="section__body grid-2">
        <p className="lead-p">{profile.summary}</p>
        <div className="profile__facts">
          <div className="fact">
            <span className="fact__label">Certified</span>
            <span className="fact__value">{profile.certified}</span>
          </div>
          <div className="fact">
            <span className="fact__label">Interested in</span>
            <span className="fact__value">{profile.interests.join(' · ')}</span>
          </div>
          <div className="fact">
            <span className="fact__label">Next</span>
            <span className="fact__value">{profile.next}</span>
          </div>
          <div className="fact">
            <span className="fact__label">Languages</span>
            <span className="fact__value">{profile.languages}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Log({ experience }) {
  return (
    <section className="section section--alt" id="log">
      <div className="section__head">
        <span className="tag">§02</span>
        <h2>Log</h2>
        <p className="section__note">Work experience, read like a changelog — newest entry first.</p>
      </div>
      <div className="log">
        {experience.map((entry) => (
          <article className="log__entry" key={entry.title}>
            <div className="log__meta">
              <span className="log__ver">{entry.period}</span>
              {entry.active && <span className="pill pill--active">active</span>}
            </div>
            <h3 className="log__title">{entry.title}</h3>
            <p className="log__org">{entry.org}</p>
            <ul className="log__list">
              {entry.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="log__stack">
              {entry.stack.map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
            {entry.footnote && <p className="log__footnote">{entry.footnote}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Builds({ projects, githubUrl }) {
  return (
    <section className="section" id="builds">
      <div className="section__head">
        <span className="tag">§03</span>
        <h2>Builds</h2>
        <p className="section__note">Independent and team projects, outside the day job.</p>
      </div>
      <div className="builds">
        {projects.map((p) => (
          <article className="build" key={p.idx}>
            <div className="build__idx">{p.idx}</div>
            <div className="build__body">
              <h3>{p.name}</h3>
              <p className="build__tagline">{p.tagline}</p>
              <p>{p.description}</p>
              <div className="build__stack">
                {p.stack.map((s) => (
                  <span className="chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <a className="more-link" href={githubUrl} target="_blank" rel="noopener noreferrer">
        More builds on GitHub →
      </a>
    </section>
  );
}

export function Stack({ skills }) {
  return (
    <section className="section section--alt" id="stack">
      <div className="section__head">
        <span className="tag">§04</span>
        <h2>Stack</h2>
        <p className="section__note">What I build with, grouped by dependency type.</p>
      </div>
      <div className="stack-grid">
        {skills.map((group) => (
          <div className="stack-group" key={group.group}>
            <h4>{group.group}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Record({ education, achievements, certifications, leadership }) {
  return (
    <section className="section" id="record">
      <div className="section__head">
        <span className="tag">§05</span>
        <h2>Record</h2>
      </div>
      <div className="record-grid">
        <div className="record-col">
          <h3 className="record-col__title">Education</h3>
          {education.map((e) => (
            <div className="record-item" key={e.title}>
              <span className="record-item__date">{e.date}</span>
              <p className="record-item__title">{e.title}</p>
              <p className="record-item__org">{e.org}</p>
              {e.meta && <p className="record-item__meta">{e.meta}</p>}
            </div>
          ))}
        </div>

        <div className="record-col">
          <h3 className="record-col__title">Achievements</h3>
          <ul className="record-list">
            {achievements.map((a) => (
              <li key={a.text}>
                <span className="record-list__year">{a.year}</span>
                {a.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="record-col">
          <h3 className="record-col__title">Certifications</h3>
          <ul className="record-list">
            {certifications.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>

      <div className="leadership">
        <h3 className="record-col__title">Leadership &amp; volunteering</h3>
        <div className="leadership__row">
          {leadership.map((l) => (
            <span className="chip chip--line" key={l}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await sendContactMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '', honeypot: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  return (
    <section className="section section--signoff" id="contact">
      <div className="section__head">
        <span className="tag">§06</span>
        <h2>Contact</h2>
      </div>

      <div className="signoff">
        <p className="signoff__lede">
          Open to conversations about graduate roles, consulting-track opportunities at IFS,
          or collaborating on a build. Reach me directly, or send a message below.
        </p>

        <div className="signoff__grid">
          <a className="signoff__item" href={`mailto:${profile.email}`}>
            <span className="signoff__k">Email</span>
            <span className="signoff__v">{profile.email}</span>
          </a>
          <a className="signoff__item" href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
            <span className="signoff__k">Phone</span>
            <span className="signoff__v">{profile.phone}</span>
          </a>
          <a className="signoff__item" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="signoff__k">LinkedIn</span>
            <span className="signoff__v">/in/anusigan-sivananthan</span>
          </a>
          <a className="signoff__item" href={profile.github} target="_blank" rel="noopener noreferrer">
            <span className="signoff__k">GitHub</span>
            <span className="signoff__v">/Anusigan</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* honeypot — hidden from real users, catches simple bots */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            className="contact-form__honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="contact-form__row">
            <label>
              <span>Name</span>
              <input type="text" name="name" required value={form.name} onChange={handleChange} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required value={form.email} onChange={handleChange} />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" required value={form.message} onChange={handleChange} />
          </label>

          <div className="contact-form__footer">
            <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'sent' && <span className="contact-form__status contact-form__status--ok">Sent — thanks, I'll reply soon.</span>}
            {status === 'error' && <span className="contact-form__status contact-form__status--err">{errorMsg}</span>}
          </div>
        </form>

        <p className="signoff__refs">References available on request.</p>
      </div>

      <footer className="footer">
        <span>© 2026 Anusigan Sivananthan</span>
        <span>{profile.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
