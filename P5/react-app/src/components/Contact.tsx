import { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import { siteConfig } from '../data/siteConfig';
import { GitHubIcon, LinkedInIcon, FacebookIcon, InstagramIcon } from './icons';

type SendState = 'idle' | 'sending' | 'success';

/**
 * Exact extraction of initContactForm() (module 10): same email regex
 * validation, same shake animation (Web Animations API, same keyframes/
 * duration/easing), same fake 2000ms send delay and 5000ms success-message
 * display before reset. No real backend is added — carried over unchanged,
 * per MIGRATION-PLAN.md §6.8 ("flagged separately for a real backend
 * decision", not part of this migration).
 */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * The original injected a <style> tag with the `.spin` class and
 * `@keyframes spin360` into document.head at send-time, since neither
 * exists in style.css. Replicated once (guarded) rather than adding it to
 * the global stylesheet, to keep style.css untouched per MIGRATION-PLAN.md
 * §6.7.
 */
function ensureSpinKeyframes() {
  if (document.getElementById('spin-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'spin-keyframes';
  style.textContent = `.spin { animation: spin360 1s linear infinite; } @keyframes spin360 { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

function shakeInput(el: HTMLElement | null) {
  if (!el) return;
  el.style.borderColor = '#EF4444';
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
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
  window.setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 1500);
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<SendState>('idle');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      shakeInput(nameRef.current);
      return;
    }
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      shakeInput(emailRef.current);
      return;
    }
    if (!trimmedMessage) {
      shakeInput(messageRef.current);
      return;
    }

    setState('sending');
    ensureSpinKeyframes();

    window.setTimeout(() => {
      setState('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      window.setTimeout(() => {
        setState('idle');
      }, 5000);
    }, 2000);
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact__bg"></div>
      <div className="container">
        <SectionHeader
          tag="Let's Work Together"
          title={<>Get In <span className="text-accent">Touch</span></>}
          subtitle="Have a project in mind? Let's make something amazing together."
        />

        <div className="contact__grid">
          <div className="contact__info" data-aos="fade-right">
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>{siteConfig.contactEmail}</p>
              </div>
            </div>
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>{siteConfig.location}</p>
              </div>
            </div>
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4>Response Time</h4>
                <p>{siteConfig.responseTime}</p>
              </div>
            </div>

            <div className="contact__socials">
              <h4>Find Me Online</h4>
              <div className="contact__social-links">
                <a href={siteConfig.social.github} className="social-btn" aria-label="GitHub">
                  <GitHubIcon size={24} />
                </a>
                <a href={siteConfig.social.linkedin} className="social-btn" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href={siteConfig.social.facebook} className="social-btn" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href={siteConfig.social.instagram} className="social-btn" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap" data-aos="fade-left">
            <div className="contact__form-card">
              <h3>Send Me a Message</h3>
              <div className="contact__form" id="contactForm">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Siyam Uzzaman"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="form-group__line"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="siyamuzzaman@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="form-group__line"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <span className="form-group__line"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <span className="form-group__line"></span>
                </div>

                {state !== 'success' && (
                  <button
                    type="button"
                    className="btn btn--primary btn--full"
                    id="sendBtn"
                    disabled={state === 'sending'}
                    onClick={handleSend}
                  >
                    {state === 'sending' ? (
                      <>
                        <svg
                          className="spin"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                )}

                <div className={`contact__success${state === 'success' ? ' visible' : ''}`} id="contactSuccess">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Message sent! I'll reply within 24 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
