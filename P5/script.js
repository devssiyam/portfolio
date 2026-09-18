/* ============================================================
   MD SIYAM UZZAMAN — Portfolio JavaScript
   Author: Siyam Uzzaman
   Version: 1.0
   ============================================================ */

'use strict';

/* ============================================================
   1. LOADING SCREEN
   ============================================================ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader after animation completes
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
      // Re-enable scroll after load
      document.body.style.overflow = '';
      // Trigger initial AOS check
      checkAOS();
    }, 1800);
  });

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
})();


/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let animFrame;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower animation
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    animFrame = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .service-card, .social-btn, input, textarea'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--active');
      follower.classList.add('cursor-follower--active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--active');
      follower.classList.remove('cursor-follower--active');
    });
  });

  // Hide on window leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
})();


/* ============================================================
   3. STICKY NAVBAR
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
})();


/* ============================================================
   4. MOBILE HAMBURGER MENU
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const overlay   = document.getElementById('mobileOverlay');
  if (!hamburger || !navMenu || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ============================================================
   5. ACTIVE NAV LINK ON SCROLL
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Run on load
})();


/* ============================================================
   6. TYPING ANIMATION
   ============================================================ */
(function initTyping() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const phrases = [
    'HTML & CSS',
    'JavaScript',
    'Shopify Stores',
    'Responsive Layouts',
    'Modern UI/UX',
    'Liquid Templates',
    'Clean Code',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let typeSpeed   = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const displayed = isDeleting
      ? currentPhrase.substring(0, charIndex - 1)
      : currentPhrase.substring(0, charIndex + 1);

    typingEl.textContent = displayed;

    if (!isDeleting) {
      charIndex++;
      typeSpeed = 80;
      if (charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typeSpeed = 1800;
        isDeleting = true;
      }
    } else {
      charIndex--;
      typeSpeed = 40;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }
    }

    setTimeout(type, typeSpeed);
  }

  // Start after loader
  setTimeout(type, 2000);
})();


/* ============================================================
   7. SCROLL ANIMATIONS (AOS Replacement)
   ============================================================ */
function checkAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const threshold = 80;

    if (rect.top < windowHeight - threshold) {
      // Get delay from data attribute
      const delay = el.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, parseInt(delay));
    }
  });
}

window.addEventListener('scroll', checkAOS, { passive: true });
window.addEventListener('resize', checkAOS, { passive: true });


/* ============================================================
   8. SKILL BAR ANIMATION
   ============================================================ */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-card__fill');
  let animated = false;

  function animateBars() {
    if (animated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      animated = true;
      fills.forEach((fill, i) => {
        const width = fill.getAttribute('data-width') || 50;
        setTimeout(() => {
          fill.style.width = width + '%';
        }, i * 80);
      });
    }
  }

  window.addEventListener('scroll', animateBars, { passive: true });
  animateBars(); // Check on load
})();


/* ============================================================
   9. ANIMATED COUNTERS
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);

    function count() {
      start += step;
      if (start < target) {
        el.textContent = Math.floor(start);
        requestAnimationFrame(count);
      } else {
        el.textContent = target;
      }
    }
    count();
  }

  function checkCounters() {
    if (counted) return;
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      counted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        animateCounter(counter, target);
      });
    }
  }

  window.addEventListener('scroll', checkCounters, { passive: true });
  checkCounters();
})();


/* ============================================================
   10. CONTACT FORM
   ============================================================ */
(function initContactForm() {
  const sendBtn = document.getElementById('sendBtn');
  const successMsg = document.getElementById('contactSuccess');
  if (!sendBtn || !successMsg) return;

  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeInput(el) {
    el.style.borderColor = '#EF4444';
    el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
    el.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(0)' },
    ], { duration: 300, easing: 'ease-in-out' });

    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }, 1500);
  }

  sendBtn.addEventListener('click', () => {
    const name    = nameInput?.value.trim();
    const email   = emailInput?.value.trim();
    const message = messageInput?.value.trim();

    // Validate
    if (!name) { shakeInput(nameInput); return; }
    if (!email || !isValidEmail(email)) { shakeInput(emailInput); return; }
    if (!message) { shakeInput(messageInput); return; }

    // Simulate sending
    sendBtn.disabled = true;
    sendBtn.innerHTML = `
      <svg class="spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      Sending...
    `;

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `.spin { animation: spin360 1s linear infinite; } @keyframes spin360 { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    setTimeout(() => {
      // Success state
      sendBtn.style.display = 'none';
      successMsg.classList.add('visible');

      // Reset form fields
      if (nameInput)    nameInput.value    = '';
      if (emailInput)   emailInput.value   = '';
      if (messageInput) messageInput.value = '';
      document.getElementById('subject')?.value && (document.getElementById('subject').value = '');

      // Reset after 5 seconds
      setTimeout(() => {
        sendBtn.style.display = '';
        sendBtn.disabled = false;
        sendBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          Send Message
        `;
        successMsg.classList.remove('visible');
      }, 5000);
    }, 2000);
  });
})();


/* ============================================================
   11. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   12. SMOOTH SCROLL (for older browsers / enhanced)
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 70;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   13. BUTTON RIPPLE EFFECT
   ============================================================ */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // The CSS handles the ripple via ::after pseudo-element animation
      // We just trigger the animation class briefly
      this.classList.add('rippling');
      setTimeout(() => this.classList.remove('rippling'), 600);
    });
  });
})();


/* ============================================================
   14. GLASSMORPHISM CARD PARALLAX (subtle tilt)
   ============================================================ */
(function initCardTilt() {
  // Only on desktop
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const cards = document.querySelectorAll('.project-card, .service-card, .testimonial-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ============================================================
   15. NAVBAR PROGRESS BAR (reading indicator)
   ============================================================ */
(function initProgressBar() {
  // Create progress element
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #3B82F6, #8B5CF6);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(scrollPercent, 100) + '%';
  }, { passive: true });
})();


/* ============================================================
   16. INTERSECTION OBSERVER — Stagger Skill Cards
   ============================================================ */
(function initSkillCardObserver() {
  const skillCards = document.querySelectorAll('.skill-card');
  if (!skillCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
    observer.observe(card);
  });
})();


/* ============================================================
   17. HERO ORB MOUSE PARALLAX
   ============================================================ */
(function initOrbParallax() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const orbs = document.querySelectorAll('.hero__orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
})();


/* ============================================================
   18. ACTIVE SECTION HIGHLIGHT in Navbar
   ============================================================ */
(function initSectionHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  });

  sections.forEach(section => observer.observe(section));
})();


/* ============================================================
   19. INITIALIZATION ON DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Run initial AOS check (will re-run on scroll too)
  setTimeout(checkAOS, 100);

  // Log init
  console.log('%c🚀 Portfolio by MD Siyam Uzzaman', 'color:#3B82F6;font-size:14px;font-weight:bold;');
  console.log('%c Frontend Developer & Shopify Designer', 'color:#94A3B8;font-size:11px;');
});
