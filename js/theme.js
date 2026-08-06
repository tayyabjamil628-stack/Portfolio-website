/**
 * ============================================================================
 * THEME MANAGER MODULE - THEME.JS
 * Project: Malik Tayyab Jamil - Portfolio Architecture
 * Functionality: Dark/Light Mode Switcher, System Preference Listener, LocalStorage
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'malik_portfolio_theme';
  const HTML_ATTR = 'data-theme';

  /**
   * Get preferred theme based on localStorage or system prefers-color-scheme
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Apply theme to html root node and update ARIA attributes
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute(HTML_ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update theme toggle buttons if present
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(toggle => {
      const isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      toggle.setAttribute('aria-label', `Switch to ${isDark ? 'Light' : 'Dark'} Mode`);
      
      const iconContainer = toggle.querySelector('.theme-toggle-icon');
      if (iconContainer) {
        iconContainer.textContent = isDark ? '☀️' : '🌙';
      }
      
      const textContainer = toggle.querySelector('.theme-toggle-text');
      if (textContainer) {
        textContainer.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    });

    // Dispatch custom event for charts or components needing theme updates
    window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme } }));
  }

  /**
   * Toggle between dark and light theme
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(HTML_ATTR) || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  /**
   * Initialize Theme System
   */
  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    // Attach click listeners to theme toggles
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-theme-toggle]')) {
        toggleTheme();
      }
    });

    // Listen for OS system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Execute immediate theme apply to prevent FOUC (Flash of Unstyled Content)
  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute(HTML_ATTR, initialTheme);

  // Bind full initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Expose global namespace for debugging or external calls
  window.PortfolioTheme = {
    apply: applyTheme,
    toggle: toggleTheme,
    get: () => document.documentElement.getAttribute(HTML_ATTR)
  };
})();
