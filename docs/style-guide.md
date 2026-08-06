# Frontend Style Guide & Coding Standards

**Project:** Malik Tayyab Jamil - Portfolio Architecture  
**Standards:** WCAG 2.1 AAA, Zero-Framework Vanilla HTML5/CSS3/ES6+  

---

## 1. HTML Markup Standards

1. **Semantic Landmarks:**
   - Every page MUST contain `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` landmarks.
   - Use `aria-label` or `aria-labelledby` on `<nav>` and `<section>` elements to distinguish landmarks for screen reader users.

2. **Heading Hierarchy:**
   - Exactly ONE `<h1>` tag per page (used for "Malik Tayyab Jamil" in Hero).
   - Never skip heading levels (e.g., `<h1>` directly to `<h2>`, `<h2>` to `<h3>`).

3. **Accessibility Attributes:**
   - All interactive controls MUST have explicit `aria-label`, `aria-expanded`, or `aria-controls` attributes where appropriate.
   - Every image MUST contain an `alt` attribute describing its visual content.
   - Include `referrerpolicy="no-referrer"` on all external or placeholder images.

4. **Skip Link:**
   - Always place `<a href="#main-content" class="skip-link">Skip to main content</a>` as the first focusable child inside `<body>`.

---

## 2. CSS Styling Guidelines

1. **Token First:**
   - NEVER hardcode hex colors, pixel paddings, or font sizes in CSS component rules.
   - Always use CSS Custom Properties from `variables.css` (e.g., `var(--color-accent)`, `var(--space-4)`, `var(--font-size-base)`).

2. **No Inline Style Attributes:**
   - Component layout and styling must reside exclusively in CSS files (`style.css`, `responsive.css`, `animations.css`).

3. **BEM Naming Structure:**
   - Block: `.site-header`, `.hero-section`, `.stat-card`
   - Element: `.site-header__logo`, `.stat-card__number`
   - Modifier: `.btn--primary`, `.nav-link--active`

4. **Performance Rules:**
   - Animate ONLY GPU-accelerated CSS properties: `transform` (`translateY`, `scaleX`) and `opacity`.
   - Avoid animating `width`, `height`, `margin`, or `top/left` to prevent browser reflows and layout thrashing.
   - Use `transform: scaleX()` for progress indicators.
   - Use `IntersectionObserver` for viewport reveal and active section tracking to eliminate scroll polling.
   - Support `@media (prefers-reduced-motion: reduce)` across all animated components.

---

## 3. JavaScript Standards

1. **Vanilla ES6+ Strict Mode:**
   - Wrap JavaScript modules in IIFE `(function() { 'use strict'; ... })();` or native ES modules.
   - Zero external npm framework dependencies.

2. **Passive Event Listeners:**
   - Pass `{ passive: true }` when attaching `scroll` or `touch` event listeners for 60fps scrolling.

3. **Non-Blocking Execution:**
   - Add `defer` attribute on all `<script>` tags in `<head>` to prevent DOM parsing blockages.

4. **FOUC Prevention:**
   - Execute synchronous theme detection script prior to rendering body to eliminate Flash of Unstyled Content.
