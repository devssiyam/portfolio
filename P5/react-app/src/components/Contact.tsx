import { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import { siteConfig } from '../data/siteConfig';
import { GitHubIcon, LinkedInIcon, FacebookIcon, InstagramIcon } from './icons';

/**
 * Phase 16 — Contact redesign ("direct").
 *
 * Only methods that actually exist are offered — nothing invented:
 * - EMAIL — devs.siyam@gmail.com: the real, verified address
 *   (his committed git author address; the old card showed
 *   'devs.siyam@email.com', a non-existent TLD — AUDIT risk #1).
 * - WHATSAPP — the existing verified deep link (number shown from
 *   the href, no reformatting assumptions).
 * - LOCATION + RESPONSE — the source's own facts (context, not
 *   claims).
 * - SOCIALS — the supplied GitHub/LinkedIn/Facebook/Instagram
 *   links (GitHub now points at the verified profile).
 * - NO CV line — no real CV file exists (a dead link is not a contact
 *   method; the old cvHref: '#' placeholder was removed as dead data
 *   in Phase 31). Re-add when a real file exists (established rule,
 *   Phase 09).
 *
 * The form is an HONEST MAILTO COMPOSER — AUDIT risk #2 resolved:
 * - no fake "Sending..." state, no fake "Message sent!" success,
 *   no timers, no spin keyframes;
 * - real frontend validation (honest, specific error messages +
 *   the existing shake pattern + focus on the first invalid field);
 * - the submit action is real: it opens the visitor's OWN mail
 *   client with To/Subject/Body pre-filled (mailto:), so the
 *   visitor sends it themselves — nothing is "sent" by the site,
 *   nothing is stored, and the UI says exactly that.
 *
 * Keyboard: every action is a real <a> or <button type="submit">
 * (Tab + Enter/Space), labels paired via htmlFor/id, invalid
 * fields announced with aria-invalid + an aria-live status line.
 */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeInput(el: HTMLElement | null) {
  if (!el) return;
  el.style.borderColor = '#EF4444';
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
  if (typeof el.animate === 'function') {
    el.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(0)' },
    ],
      { duration: 300, easing: 'ease-in-out' },
    );
  }
  window.setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 1500);
}

type FieldErrors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'opening'>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const whatsappNumber = siteConfig.whatsappDisplay;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honest frontend validation — specific, real errors.
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Add your name';
    if (!email.trim() || !isValidEmail(email.trim())) next.email = 'A valid email, so I can reply';
    if (!message.trim()) next.message = 'Tell me a little about the project';
    setErrors(next);

    const firstInvalid: Array<[string, HTMLElement | null]> = [
      ['name', nameRef.current],
      ['email', emailRef.current],
      ['message', messageRef.current],
    ];
    const invalid = firstInvalid.filter(([field, el]) => next[field as keyof FieldErrors] && el);
    if (invalid.length) {
      invalid.forEach(([, el]) => shakeInput(el));
      invalid[0][1]?.focus();
      return;
    }

    // The REAL action: compose the email in the visitor's own mail
    // client. Nothing is sent by this site; nothing is stored.
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`;
    const url =
      `mailto:${siteConfig.contactEmail}` +
      `?subject=${encodeURIComponent(subject.trim() || 'Project inquiry')}` +
      `&body=${encodeURIComponent(body)}`;
    setStatus('opening');
    const a = document.createElement('a');
    a.href = url;
    a.click();
  }

  return (
    <section className="contact section" id="contact">
      {/* Phase 26: the ambient radial tint (contact__bg) is gone —
          unnecessary glow. */}
      <div className="container">
        {/* Phase 26: the subtitle ("Let's make something amazing
            together" — the overused AI CTA) is gone; the section's
            direct channels are the pitch. */}
        <SectionHeader
          tag="Let's Work Together"
          title={<>Get In <span className="text-accent">Touch</span></>}
        />

        <div className="contact__grid">
          <div className="contact__direct" data-aos="fade-right">
            <p className="contact__direct-kicker">// direct</p>

            <div className="contact__row">
              <span className="contact__row-label">Email</span>
              <a className="contact__row-link" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
            </div>

            <div className="contact__row">
              <span className="contact__row-label">WhatsApp</span>
              <a className="contact__row-link" href={siteConfig.whatsappHref}>
                {whatsappNumber}
              </a>
            </div>

            <div className="contact__row">
              <span className="contact__row-label">Location</span>
              <span className="contact__row-value">{siteConfig.location}</span>
            </div>

            <div className="contact__row">
              <span className="contact__row-label">Response</span>
              <span className="contact__row-value">{siteConfig.responseTime}</span>
            </div>

            <div className="contact__socials">
              <span className="contact__row-label">Online</span>
              <div className="contact__social-links">
                <a
                  href={siteConfig.social.github}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon size={20} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="contact__form-card" data-aos="fade-left">
            {/* id referenced by the form's aria-labelledby (Phase 21 a11y) */}
            <h3 id="contactFormTitle">Send Me a Message</h3>
            <p className="contact__form-note">
              This composes an email in your own mail app — nothing is stored on this site.
            </p>

            <form
              className="contact__form"
              id="contactForm"
              noValidate
              aria-labelledby="contactFormTitle"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="c-name">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  id="c-name"
                  name="name"
                  placeholder="Your name"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'c-name-err' : undefined}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                />
                {errors.name && (
                  <p className="contact__error" id="c-name-err">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="c-email">Email</label>
                <input
                  ref={emailRef}
                  type="email"
                  id="c-email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'c-email-err' : undefined}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {errors.email && (
                  <p className="contact__error" id="c-email-err">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="c-subject">Subject (optional)</label>
                <input
                  type="text"
                  id="c-subject"
                  name="subject"
                  placeholder="Project inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-message">Message</label>
                <textarea
                  ref={messageRef}
                  id="c-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'c-message-err' : undefined}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                ></textarea>
                {errors.message && (
                  <p className="contact__error" id="c-message-err">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn--primary btn--full" id="composeBtn">
                Compose in email app →
              </button>

              <p className="contact__status" role="status" aria-live="polite">
                {status === 'opening'
                  ? 'Opening your email app — the message is ready there to send.'
                  : ''}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
