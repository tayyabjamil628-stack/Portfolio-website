/**
 * ============================================================================
 * MAIN APPLICATION ENTRY POINT - SCRIPT.JS
 * Project: Malik Tayyab Jamil - Portfolio Architecture (Phase 1)
 * Target Environment: AWS S3 Static Website Hosting
 * Standards: Clean Vanilla JS, Zero-Framework Modular Init
 * ============================================================================
 */

(function () {
  'use strict';

  /**
   * Hide initial loading screen gracefully once assets & DOM are fully parsed
   */
  function removeLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.4s ease';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 400);
    }
  }

  /**
   * Phase 1 Blueprint Inspector Interactions (Tabs, Copy Code snippet, Token Preview)
   */
  function initBlueprintInspector() {
    const copyButtons = document.querySelectorAll('[data-copy-code]');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy-code');
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied! ✓';
          btn.classList.add('btn-primary');
          setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('btn-primary');
          }, 2000);
        });
      });
    });
  }

  /**
   * App Initialization
   */
  function initApp() {
    console.log('🚀 [Portfolio Engine]: Initializing Malik Tayyab Jamil Portfolio Architecture (Phase 1)');
    initBlueprintInspector();
    
    // Remove loading screen on full load
    window.addEventListener('load', removeLoadingScreen);
    // Fallback timer if load takes too long
    setTimeout(removeLoadingScreen, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
