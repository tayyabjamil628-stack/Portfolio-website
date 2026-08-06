/**
 * ============================================================================
 * CONTACT FORM ENGINE & ANALYTICAL HOOKS - FORM.JS
 * Project: Malik Tayyab Jamil - Portfolio Architecture (Phase 6)
 * Target Environment: AWS S3 Static Website Hosting
 * Functionality: Client-side Form Validation, State Machine, Analytics Tracking
 * ============================================================================
 */

(function () {
  'use strict';

  /**
   * Analytics Tracking Hook
   * Captures interaction events (e.g., Resume Downloads, Social Link Clicks)
   */
  function initAnalyticsHooks() {
    window.trackPortfolioEvent = function (eventName, eventData = {}) {
      const payload = {
        event: eventName,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        data: eventData
      };
      console.log('📊 [Portfolio Analytics Tracked]:', payload);
      
      // Dispatch custom DOM event for potential third-party integration (e.g. Google Analytics)
      window.dispatchEvent(new CustomEvent('portfolio_analytics', { detail: payload }));
    };

    // Attach tracking listener to elements with [data-analytics-track]
    document.addEventListener('click', function (e) {
      const trackTarget = e.target.closest('[data-analytics-track]');
      if (trackTarget) {
        const eventName = trackTarget.getAttribute('data-analytics-track');
        const label = trackTarget.getAttribute('aria-label') || trackTarget.innerText || 'button';
        window.trackPortfolioEvent(eventName, { label: label.trim() });
      }
    });
  }

  /**
   * Contact Form Validation & State Manager
   */
  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const subjectInput = form.querySelector('#contact-subject');
    const messageInput = form.querySelector('#contact-message');
    const submitBtn = form.querySelector('[data-submit-btn]');
    const feedbackBox = document.querySelector('[data-form-feedback]');

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper: Show validation error on an input field
    function setFieldError(input, errorMsg) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      const group = input.closest('.form-group');
      if (group) {
        let errEl = group.querySelector('.form-error-msg');
        if (!errEl) {
          errEl = document.createElement('span');
          errEl.className = 'form-error-msg';
          group.appendChild(errEl);
        }
        errEl.textContent = errorMsg;
      }
    }

    // Helper: Clear error on an input field
    function setFieldValid(input) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      const group = input.closest('.form-group');
      if (group) {
        const errEl = group.querySelector('.form-error-msg');
        if (errEl) errEl.remove();
      }
    }

    // Single Field Validator
    function validateField(input) {
      const val = input.value.trim();
      if (input === nameInput) {
        if (!val || val.length < 2) {
          setFieldError(input, 'Please enter your full name (at least 2 characters).');
          return false;
        }
      } else if (input === emailInput) {
        if (!val || !EMAIL_REGEX.test(val)) {
          setFieldError(input, 'Please enter a valid email address.');
          return false;
        }
      } else if (input === subjectInput) {
        if (!val || val.length < 3) {
          setFieldError(input, 'Please enter a subject (at least 3 characters).');
          return false;
        }
      } else if (input === messageInput) {
        if (!val || val.length < 10) {
          setFieldError(input, 'Please write a message (at least 10 characters).');
          return false;
        }
      }
      setFieldValid(input);
      return true;
    }

    // Attach real-time input event listeners for responsive feedback
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
      input.addEventListener('blur', () => {
        if (input.value.trim()) {
          validateField(input);
        }
      });
    });

    // Form Submit Handler
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput);
      const isSubjectValid = validateField(subjectInput);
      const isMsgValid = validateField(messageInput);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMsgValid) {
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.className = 'form-feedback-container feedback-error';
          feedbackBox.innerHTML = `
            <div class="feedback-inner">
              <span class="feedback-icon">⚠️</span>
              <div>
                <strong>Validation Error</strong>
                <p>Please fix the highlighted fields above before submitting your message.</p>
              </div>
            </div>
          `;
        }
        return;
      }

      // Transition to Loading State
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.innerHTML = `
        <span class="btn-spinner" aria-hidden="true"></span>
        <span>Sending Message...</span>
      `;

      if (feedbackBox) {
        feedbackBox.style.display = 'none';
      }

      // Track analytics event
      if (window.trackPortfolioEvent) {
        window.trackPortfolioEvent('contact_form_submit', {
          subject: subjectInput.value.trim()
        });
      }

      // Real network submission using FormSubmit API with mailto fallback
      const recipientEmail = 'tayyabjamil628@gmail.com';
      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const messageSubject = subjectInput.value.trim();
      const messageBody = messageInput.value.trim();

      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(messageSubject)}&body=${encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${messageBody}`)}`;

      function handleSuccess(customMsg) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.innerHTML = `
          <span>Message Sent Successfully! ✓</span>
        `;
        submitBtn.classList.add('btn-success');

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.className = 'form-feedback-container feedback-success';
          feedbackBox.innerHTML = `
            <div class="feedback-inner">
              <span class="feedback-icon">✅</span>
              <div>
                <strong>Thank You, ${senderName}!</strong>
                <p>${customMsg || `Your message regarding "<em>${messageSubject}</em>" has been sent to <strong>${recipientEmail}</strong>. I will review it and reply to <strong>${senderEmail}</strong> promptly.`}</p>
                <p style="margin-top: 6px; font-size: 12px; opacity: 0.9;">
                  Need to send via your email client directly? <a href="${mailtoUrl}" style="color: var(--color-accent); font-weight: bold; text-decoration: underline;">Click here to open mail app</a>.
                </p>
              </div>
            </div>
          `;
        }

        form.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
          if (inp) {
            inp.classList.remove('is-valid', 'is-invalid');
          }
        });

        setTimeout(() => {
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.classList.remove('btn-success');
        }, 5000);
      }

      function handleMailtoFallback() {
        window.location.href = mailtoUrl;

        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.innerHTML = `<span>Mail App Opened ✓</span>`;
        submitBtn.classList.add('btn-success');

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.className = 'form-feedback-container feedback-success';
          feedbackBox.innerHTML = `
            <div class="feedback-inner">
              <span class="feedback-icon">✉️</span>
              <div>
                <strong>Opening Email Client...</strong>
                <p>Your default mail app is pre-filling a message to <strong>${recipientEmail}</strong>. If your email app did not open, <a href="${mailtoUrl}" style="color: var(--color-accent); font-weight: bold; text-decoration: underline;">click here to send directly</a>.</p>
              </div>
            </div>
          `;
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.classList.remove('btn-success');
        }, 5000);
      }

      fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          _subject: `[Portfolio Contact] ${messageSubject}`,
          subject: messageSubject,
          message: messageBody,
          _replyto: senderEmail,
          _captcha: 'false'
        })
      })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
          if (result.message && result.message.includes('Activate')) {
            handleSuccess(`Your message was submitted. FormSubmit will send a 1-click activation link to <strong>${recipientEmail}</strong> to activate your inbox integration.`);
          } else {
            handleSuccess();
          }
        } else {
          handleMailtoFallback();
        }
      })
      .catch((err) => {
        console.warn('Network or CORS constraint on FormSubmit endpoint, triggering mailto fallback:', err);
        handleMailtoFallback();
      });
    });
  }

  /**
   * Email Copy to Clipboard Feature
   */
  function initEmailCopy() {
    const copyBtn = document.querySelector('[data-copy-email]');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-copy-email') || 'tayyabjamil628@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const textSpan = copyBtn.querySelector('.copy-btn-text');
        const originalText = textSpan ? textSpan.textContent : 'Copy Email';
        if (textSpan) textSpan.textContent = 'Copied to Clipboard! ✓';
        copyBtn.classList.add('is-copied');

        if (window.trackPortfolioEvent) {
          window.trackPortfolioEvent('copy_email', { email });
        }

        setTimeout(() => {
          if (textSpan) textSpan.textContent = originalText;
          copyBtn.classList.remove('is-copied');
        }, 2500);
      });
    });
  }

  // Initialize modules when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAnalyticsHooks();
      initContactForm();
      initEmailCopy();
    });
  } else {
    initAnalyticsHooks();
    initContactForm();
    initEmailCopy();
  }

  // Expose global form module API
  window.PortfolioForm = {
    track: window.trackPortfolioEvent
  };
})();
