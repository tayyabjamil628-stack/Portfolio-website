/**
 * ============================================================================
 * ANIMATION & INTERACTION ENGINE - ANIMATIONS.JS
 * Project: Malik Tayyab Jamil - Portfolio Architecture
 * Functionality: 60fps Particle Canvas, Typewriter Rotator, 3D Card Tilt,
 *                Button Click Ripples, IntersectionObserver Scroll Reveals,
 *                Eased Number Counters, & Circular Scroll Progress Ring.
 * ============================================================================
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 1. Dynamic Typewriter & Role Rotator Engine
   */
  function initTypewriter() {
    const typewriterEl = document.querySelector('[data-typewriter]');
    if (!typewriterEl) return;

    let roles = [
      'Software Engineering Student',
      'Cloud Computing Intern @ DecodeLabs',
      'AWS Certified Cloud Practitioner',
      'DevSecOps & Cybersecurity Enthusiast'
    ];

    try {
      const rawRoles = typewriterEl.getAttribute('data-typewriter');
      if (rawRoles) {
        roles = JSON.parse(rawRoles);
      }
    } catch (e) {
      // Use fallback defaults if JSON parse fails
    }

    if (prefersReducedMotion) {
      typewriterEl.textContent = roles[0];
      return;
    }

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeStep() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typingSpeed = 35;
      } else {
        charIdx++;
        typingSpeed = 75;
      }

      typewriterEl.textContent = currentRole.substring(0, charIdx);

      if (!isDeleting && charIdx === currentRole.length) {
        // Pause at full sentence before deleting
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        // Switch to next sentence after deletion
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeStep, typingSpeed);
    }

    // Start typewriter loop
    setTimeout(typeStep, 600);
  }

  /**
   * 2. Hero Interactive Particle & Constellation Mesh Canvas Engine
   */
  function initHeroParticleCanvas() {
    const canvas = document.getElementById('hero-particles-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: -1000, y: -1000, radius: 140 };

    function resizeCanvas() {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
      createParticles();
    }

    function createParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 14000), 45);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2.2 + 1,
          baseAlpha: Math.random() * 0.35 + 0.15
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
      const particleColor = isDarkTheme ? '212, 175, 55' : '34, 51, 84'; // Gold vs Navy Blue
      const lineBaseColor = isDarkTheme ? '212, 175, 55' : '100, 116, 139';

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interactivity - Repel & Glow
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let extraAlpha = 0;
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
          extraAlpha = force * 0.4;
        }

        // Draw individual particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${Math.min(p.baseAlpha + extraAlpha, 0.85)})`;
        ctx.fill();

        // Connect nearby particles with subtle constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 115) {
            const lineAlpha = (1 - ldist / 115) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    // Event Listeners for Canvas
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    const heroSection = canvas.closest('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
      }, { passive: true });
    }

    resizeCanvas();
    requestAnimationFrame(drawParticles);
  }

  /**
   * 3. Interactive 3D Tilt & Glare Reflection Card Engine
   */
  function init3DCards() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll(
      '.portrait-frame, .about-portrait-card, .stat-card, .fact-card, .project-card, .skill-category-card, .experience-card, .certification-card, .info-card, .contact-info-card'
    );

    cards.forEach(card => {
      card.classList.add('tilt-card');

      // Inject Glare Reflection element if not present
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      const glareEl = card.querySelector('.card-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 7.5; // max 7.5 deg tilt
        const rotateY = ((x - centerX) / centerX) * 7.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glareEl) {
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;
          glareEl.style.background = `radial-gradient(circle at ${percentX.toFixed(1)}% ${percentY.toFixed(1)}%, rgba(255, 255, 255, 0.24), transparent 75%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /**
   * 4. Interactive Click Ripple Effect Engine
   */
  function initRippleEffect() {
    if (prefersReducedMotion) return;

    document.addEventListener('click', (e) => {
      const target = e.target.closest('.btn, .icon-btn, .tech-badge, .nav-link, .stat-card');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-wave';

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  }

  /**
   * 5. IntersectionObserver Scroll Reveal & Eased Count-Ups
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .stagger-container, [data-count-target]'
    );

    if (prefersReducedMotion) {
      revealElements.forEach(el => {
        el.classList.add('is-visible');
        if (el.hasAttribute('data-count-target')) {
          const targetVal = el.getAttribute('data-count-target');
          if (targetVal) el.textContent = targetVal;
        }
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Find count-up elements
            const counters = entry.target.hasAttribute('data-count-target') 
              ? [entry.target] 
              : entry.target.querySelectorAll('[data-count-target]');

            counters.forEach(counter => {
              if (!counter.getAttribute('data-counter-started')) {
                counter.setAttribute('data-counter-started', 'true');
                animateCounter(counter);
              }
            });

            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => {
        el.classList.add('is-visible');
        if (el.hasAttribute('data-count-target')) {
          animateCounter(el);
        }
      });
    }
  }

  /**
   * 6. Smooth Eased Animated Number Counter (easeOutQuad)
   */
  function animateCounter(counterEl) {
    const targetVal = counterEl.getAttribute('data-count-target');
    if (!targetVal) return;

    const hasPlus = targetVal.includes('+');
    const numericTarget = parseInt(targetVal.replace(/\D/g, ''), 10);
    if (isNaN(numericTarget)) return;

    const duration = 1600; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.floor(easedProgress * numericTarget);

      counterEl.textContent = currentVal + (hasPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counterEl.textContent = numericTarget + (hasPlus ? '+' : '');
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * 7. Back to Top Button & Circular Scroll Progress Ring
   */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('[data-back-to-top]');
    if (!backToTopBtn) return;

    const circle = backToTopBtn.querySelector('.progress-ring-circle');
    const radius = circle ? circle.r.baseVal.value : 22;
    const circumference = 2 * Math.PI * radius;

    if (circle) {
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
    }

    function handleScrollState() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      // Update SVG circular progress ring offset
      if (circle) {
        const offset = circumference - (scrollPercent * circumference);
        circle.style.strokeDashoffset = offset;
      }

      // Toggle button visibility
      if (scrollTop > 450) {
        backToTopBtn.classList.add('is-visible');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.classList.remove('is-visible');
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      const mainHeader = document.querySelector('.site-header a');
      if (mainHeader) mainHeader.focus();
    });
  }

  /**
   * Master Animation Engine Initializer
   */
  function initAnimations() {
    initTypewriter();
    initHeroParticleCanvas();
    init3DCards();
    initRippleEffect();
    initScrollReveal();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  window.PortfolioAnimations = {
    init: initAnimations,
    reveal: initScrollReveal,
    counter: animateCounter
  };
})();

