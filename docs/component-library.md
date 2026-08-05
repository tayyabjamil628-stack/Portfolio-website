# Zero-Framework Component Library Specifications

**Project:** Personal Engineering Portfolio  
**Owner:** Malik Tayyab Jamil  
**Architecture:** Pure HTML5 + CSS Custom Properties (No React / No Tailwind / No Dependencies)  

---

## 🧩 Component Progress Tracker

Tracking component execution status across build phases. Components transition to `● Built` as phases complete.

- ● **Navigation Bar & Scroll Spy** — *Built (Phase 2 & 7)*
- ● **Hero Section & Portrait Polish** — *Built (Phase 2 & 7)*
- ● **About Section** — *Built (Phase 3 & 8)*
- ● **Skills Matrix** — *Built (Phase 3 & 8)*
- ● **Engineering Journey Timeline** — *Built (Phase 4 & 7)*
- ● **Project Showcase Cards** — *Built (Phase 4 & 7)*
- ● **Experience & Education Cards** — *Built (Phase 5 & 7)*
- ● **Certificates & Credential Gallery** — *Built (Phase 5 & 7)*
- ● **Contact Form & Channels** — *Built (Phase 6 & 7)*
- ● **Production Footer** — *Built (Phase 6 & 7)*
- ● **Buttons & Micro-interactions** — *Polished (Phase 7)*
- ● **Scroll Reveal & Progress System** — *Built (Phase 7)*
- ● **Floating Back-to-Top Control** — *Built (Phase 7)*
- ● **Standalone Custom 404 Error Engine** — *Built (Phase 8)*
- ● **SEO & Structured Data JSON-LD Schema** — *Built (Phase 8)*
- ● **PWA WebManifest & Favicons** — *Built (Phase 8)*

---

## 1. Button Components

### Primary CTA Button (Metallic Gold)
```html
<a href="#projects" class="btn btn-primary">
  <span>Explore Engineering Projects</span>
  <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</a>
```

### Secondary Outline Button
```html
<a href="assets/resume/Malik_Tayyab_Jamil_Resume.pdf" download class="btn btn-secondary">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
  <span>Download Resume</span>
</a>
```

---

## 2. Badge & Status Components

### AWS Certification Pill
```html
<span class="badge badge-aws">
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
  <span>AWS Cloud Practitioner Certified</span>
</span>
```

### Live Availability Status Indicator
```html
<div class="meta-pill">
  <span class="pulse-dot"></span>
  <span>Available for <strong>Cloud & Software Engineering Internships</strong></span>
</div>
```

---

## 3. Navigation Bar Component

```html
<nav class="navbar" data-navbar aria-label="Main Navigation">
  <div class="scroll-progress-bar" data-scroll-progress role="progressbar" aria-label="Reading Progress"></div>
  <div class="container navbar-container">
    <a href="#" class="navbar-logo" aria-label="Malik Tayyab Jamil Home">
      <span class="logo-accent">M</span>alik Tayyab Jamil
    </a>

    <div class="nav-menu" data-mobile-menu id="primary-navigation">
      <ul class="nav-list">
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#skills" class="nav-link">Skills</a></li>
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#experience" class="nav-link">Experience</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
    </div>

    <button data-theme-toggle aria-pressed="false" class="btn btn-secondary theme-btn" aria-label="Toggle Dark Mode">
      <span class="theme-toggle-icon">🌙</span>
      <span class="theme-toggle-text sr-only">Dark Mode</span>
    </button>
  </div>
</nav>
```

---

## 4. Hero Portrait Frame Blueprint Specification

```html
<!-- Hero Portrait Frame Blueprint Structure -->
<div class="hero-portrait-container">
  <div class="portrait-backdrop-glow"></div>
  <div class="portrait-image-wrapper">
    <img 
      src="assets/images/profile/malik-tayyab-jamil.png" 
      alt="Malik Tayyab Jamil - Cloud Computing Intern at DecodeLabs" 
      width="480" 
      height="640"
      loading="eager"
      fetchpriority="high"
      class="portrait-img"
    />
  </div>
  <!-- Floating Badge Overlays -->
  <div class="portrait-badge portrait-badge--top-right">
    <span class="badge badge-aws">AWS Architecture</span>
  </div>
  <div class="portrait-badge portrait-badge--bottom-left">
    <span class="badge badge-gold">BS Software Engineering</span>
  </div>
</div>
```

---

## 5. Engineering Project Card Component

```html
<article class="card project-card reveal-on-scroll">
  <div class="project-card__image-box">
    <img src="assets/images/projects/aws-serverless.png" alt="AWS Cloud Infrastructure Diagram" loading="lazy">
    <span class="badge badge-aws project-card__tag">AWS S3 + CloudFront</span>
  </div>
  <div class="project-card__content">
    <h3 class="project-card__title">Serverless Cloud Portfolio</h3>
    <p class="project-card__desc">Zero-framework high performance web application deployed to AWS S3, CloudFront and ACM.</p>
    <div class="project-card__tech-stack">
      <span class="tech-pill">Vanilla JS</span>
      <span class="tech-pill">CSS Tokens</span>
      <span class="tech-pill">AWS CLI</span>
    </div>
    <div class="project-card__actions">
      <a href="#" class="btn btn-primary btn-sm">Live Demo</a>
      <a href="#" class="btn btn-secondary btn-sm">GitHub Repository</a>
    </div>
  </div>
</article>

---

## 6. Engineering Journey Timeline Component (Phase 5)

```html
<div class="timeline-container stagger-container">
  <div class="timeline-track" aria-hidden="true"></div>
  
  <div class="timeline-item timeline-left stagger-item">
    <div class="timeline-node" aria-hidden="true">🎓</div>
    <div class="timeline-card">
      <div class="timeline-card-header">
        <span class="badge badge-gold">Academic Milestone</span>
        <span class="timeline-date">2022 – Present</span>
      </div>
      <h3 class="timeline-title">BS Software Engineering</h3>
      <div class="timeline-org">PAF-IAST</div>
      <p class="timeline-desc">Specializing in software architecture and cloud systems.</p>
    </div>
  </div>
</div>
```

---

## 7. Education & Experience Cards (Phase 5)

```html
<div class="edu-exp-grid">
  <article class="edu-card">
    <div class="edu-header">
      <div class="edu-icon-badge">🎓</div>
      <div>
        <span class="badge badge-gold">UNIVERSITY DEGREE</span>
        <h3>BS Software Engineering</h3>
        <div class="edu-institution">PAF-IAST</div>
      </div>
    </div>
  </article>

  <article class="exp-card">
    <div class="exp-header">
      <div class="exp-icon-badge">☁️</div>
      <div>
        <span class="badge badge-success">INDUSTRY INTERNSHIP</span>
        <h3>Cloud Computing Intern</h3>
        <div class="exp-company">DecodeLabs</div>
      </div>
    </div>
  </article>
</div>
```

---

## 8. Certification Gallery & Credential Verification (Phase 5)

```html
<div class="certifications-grid">
  <article class="cert-card" data-category="cloud internship">
    <div class="cert-logo-frame">☁️</div>
    <div class="cert-body">
      <span class="badge badge-success">Verified Credential</span>
      <h3 class="cert-title">Cloud Computing Internship Certificate</h3>
      <div class="cert-provider">DecodeLabs</div>
      <div class="cert-action">
        <a href="https://github.com/tayyabjamil628" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          Verify Credential
        </a>
      </div>
    </div>
  </article>
</div>
```
```
