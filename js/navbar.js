/**
 * ============================================================================
 * NAVBAR & NAVIGATION CONTROLLER - NAVBAR.JS
 * Project: Malik Tayyab Jamil - Portfolio Architecture
 * Functionality: Sticky Nav Elevation, Scroll Progress Calculator, Mobile Menu, Active Section
 * ============================================================================
 */

(function () {
  'use strict';

  function initNavbar() {
    const navbar = document.querySelector('[data-navbar]');
    const progressBar = document.querySelector('[data-scroll-progress]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const navLinks = document.querySelectorAll('.nav-link');

    /* 1. Scroll Progress & Sticky Navbar Handler */
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      // Update scroll progress bar using scaleX transform (GPU composited)
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollPercent})`;
      }

      // Elevate navbar with shadow when scrolled > 20px
      if (navbar) {
        if (scrollTop > 20) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
      }
    }

    /* 2. Accessible Mobile Menu Toggle Handler */
    function toggleMobileMenu() {
      if (!menuToggle || !mobileMenu) return;

      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('is-active');

      if (!isExpanded) {
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      } else {
        document.body.style.overflow = '';
      }
    }

    /* 3. IntersectionObserver Active Navigation Highlighting (Zero Scroll Polling) */
    function initActiveNavObserver() {
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length || !('IntersectionObserver' in window)) return;

      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
      };

      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            const correspondingLinks = document.querySelectorAll(`.nav-link[href*="#${sectionId}"], .mobile-nav-link[href*="#${sectionId}"]`);

            // Clear active status on all nav links first
            navLinks.forEach(link => {
              link.classList.remove('active');
              link.removeAttribute('aria-current');
            });

            // Set active status on current section links
            correspondingLinks.forEach(link => {
              link.classList.add('active');
              link.setAttribute('aria-current', 'page');
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => navObserver.observe(section));
    }

    // Attach Event Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    initActiveNavObserver();

    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on ESC key press
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-active')) {
        toggleMobileMenu();
      }
    });

    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('is-active')) {
          toggleMobileMenu();
        }
      });
    });

    // Initial check on page load
    handleScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();
