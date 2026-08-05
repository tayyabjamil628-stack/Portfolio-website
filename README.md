# Malik Tayyab Jamil - Personal Engineering Portfolio Architecture

> **Cloud Computing Intern @ DecodeLabs | BS Software Engineering**  
> Production-ready, zero-framework, WCAG 2.1 AAA accessible, AWS S3 & CloudFront compatible personal portfolio architecture.

---

## 🌟 Executive Overview

This repository contains the architecture, design tokens, component specifications, and baseline implementation for Malik Tayyab Jamil's personal portfolio website.

The project is built adhering to strict principal frontend engineering standards, eliminating framework bloat, guaranteeing sub-second load times, and providing full compatibility with **Amazon S3 Static Website Hosting** and **AWS CloudFront CDN**.

---

## 🎯 Target Lighthouse Benchmarks

Every phase of development is evaluated against the following strict quality benchmarks:

| Lighthouse Audit Category | Target Score Benchmark | Engineering Strategy & Rationale |
| :--- | :--- | :--- |
| **Performance** | **100** | Zero framework bundle bloat, sub-100ms FCP, 0.00 CLS, lazy-loaded media assets. |
| **Accessibility** | **100** | WCAG 2.1 AAA color contrast, semantic HTML5 landmarks, visible keyboard focus rings. |
| **Best Practices** | **100** | Modern vanilla ES6+, zero vulnerabilities, HTTPS, secure rel attributes on external links. |
| **SEO** | **100** | Structured metadata, OpenGraph tags, semantic headers (H1-H6), responsive viewports. |

---

## 🚀 Key Engineering Pillars

- **Zero Framework / Zero Bundler:** 100% Vanilla HTML5, CSS3 Custom Properties, and ES6+ JavaScript.
- **AWS S3 + CloudFront Ready:** Native relative asset resolution and S3 Origin Access Control (OAC) policies.
- **Sub-100ms FCP & 100/100 Lighthouse:** Zero JS bundle hydration delays.
- **High-Contrast Design System:** Metallic Gold (`#D4AF37`) & Slate (`#0F172A`) palette passing WCAG AAA contrast ratios.
- **FOUC-Free Theme Switching:** Instant Light/Dark mode transitions powered by `data-theme` attribute mutation.

---

## 🏗️ Architecture Pipeline Diagram

```
Browser
  ↓
HTML  ────► Semantic Structure & WCAG 2.1 AAA Accessibility
  ↓
CSS   ────► Design Tokens, Responsive Grids & Animations
  ↓
JavaScript  ► Vanilla ES6+ State & DOM Observers
  ↓
Assets ───► Compressed WebP Images & Media
  ↓
Amazon S3 ─► Private Bucket & Static Origin Storage
  ↓
CloudFront  ► Global CDN Edge Locations & ACM TLS SSL
  ↓
Visitors ──► High-Speed, Sub-100ms Experience Worldwide
```

---

## 🔮 Future Features Panel (Upcoming Modules)

Reserved interactive engineering capabilities planned across upcoming build phases:

- [x] **✓ Scroll Progress Bar:** Top document scroll depth indicator bar.
- [x] **✓ Scroll Reveal:** IntersectionObserver smooth entrance animations.
- [x] **✓ Active Navigation:** Scroll spy nav link highlighting engine.
- [x] **✓ Animated Counters:** Metric number incrementation triggers.
- [x] **✓ GitHub API Integration:** Dynamic repo stars & commit activity sync.
- [x] **✓ Contact Form Engine:** Client-side validation & dispatch state.
- [x] **✓ 404 Fallback Page:** Custom styled route fallback template.
- [x] **✓ Theme Persistence:** LocalStorage dark/light mode preference memory.
- [x] **✓ Preloader Screen:** Minimalist initial page loading animation.

---

## 🧩 Component Progress Tracker

Tracking component build status. As development progresses, components shift from planned status (`○ Planned`) to built status (`● Built`).

| Component Name | Status | Target Phase | Details |
| :--- | :--- | :--- | :--- |
| **Navigation Bar** | 🟢 Built | Phase 2 & 7 | Sticky header, mobile drawer, theme toggle, active scroll spy |
| **Hero Section** | 🟢 Built | Phase 2 & 7 | Suit portrait, DecodeLabs role, AWS badges, CTAs, subtitle cursor |
| **About Section** | 🟢 Built | Phase 3 & 7 | Engineering narrative, info cards, quick facts grid & reveal |
| **Skills Matrix** | 🟢 Built | Phase 3 & 7 | 7 Categorized skill cards & tech stack badges with hover lift |
| **Project Cards** | 🟢 Built | Phase 4 & 7 | 4 Interactive project cards, badges, ribbons & hover micro-interactions |
| **Experience Timeline** | 🟢 Built | Phase 5 & 7 | Vertical animated timeline & DecodeLabs internship role |
| **Education Card** | 🟢 Built | Phase 5 & 7 | BS Software Engineering PAF-IAST & coursework badges |
| **Certificates Gallery** | 🟢 Built | Phase 5 & 7 | Filter-ready certificates, verification links & hover tilt |
| **Contact Form** | 🟢 Built | Phase 6 & 7 | Contact form, state machine, social icons & copy email trigger |
| **Footer Component** | 🟢 Built | Phase 6 & 7 | Copyright, quick links, key accreditations & back-to-top trigger |
| **Buttons & Triggers** | 🟢 Built | Phase 1-7 | Metallic Gold Primary, Outline Secondary, Icon Buttons with lift & active press |
| **Cards & Surfaces** | 🟢 Built | Phase 1-7 | Elevated cards, info cards, skill cards, timeline cards with shadow expansion |
| **Badges & Status Pills** | 🟢 Built | Phase 1-7 | Tech badges, status dots, metadata indicators |

---

## 🗺️ Project Execution Roadmap

- [x] **✔ Phase 1 — Architecture** *(System layout, design tokens, documentation, AWS pipeline)*
- [x] **✔ Phase 2 — Header & Navigation** *(Sticky navigation bar, accessibility, theme switcher)*
- [x] **✔ Phase 3 — Hero, About & Skills** *(Malik Jamil portrait, DecodeLabs role, About Info Grid, Quick Facts & Categorized Skill Cards)*
- [x] **✔ Phase 4 — Featured Projects** *(4 engineering project cards, vector graphics, status badges & GitHub triggers)*
- [x] **✔ Phase 5 — Education, Experience & Certifications** *(Engineering Journey timeline, BS SE PAF-IAST card, DecodeLabs internship card, recruiter highlights & certification gallery)*
- [x] **✔ Phase 6 — Contact & Communication** *(Recruiter contact form, social links & status indicator)*
- [x] **✔ Phase 7 — Animations, Micro-interactions & UX Polish** *(Scroll reveal engine, active nav spy, GPU progress bar, theme persistence & interview guide)*
- [x] **✔ Phase 8 — Production Readiness, Performance & SEO** *(WebP image optimization, CLS = 0, JSON-LD Schema, robots.txt, sitemap.xml, custom 404.html & AWS deployment guides)*
- [x] **✔ Phase 9 — AWS Cloud Deployment & DevOps** *(S3 Origin Access Control, CloudFront CDN edge caching, security headers, Route 53 DNS, cost model & 50 technical interview Q&As)*

---

## 📁 Repository Structure

```
Portfolio-Website/
├── index.html                  # Main Portfolio Canvas with Full SEO & JSON-LD Schema
├── 404.html                    # Custom Design-System 404 Error Engine
├── public/
│   ├── favicon.svg             # Vector Logo Mark Favicon
│   ├── site.webmanifest        # PWA WebManifest
│   ├── robots.txt              # Production Search Engine Crawl Rules
│   └── sitemap.xml             # XML Indexing Map for Search Engines
├── css/
│   ├── variables.css           # CSS Custom Properties & Design Tokens
│   ├── style.css               # Base CSS Reset, Typography, Layout Containers
│   ├── responsive.css          # Mobile, Tablet, Laptop, Desktop Breakpoints
│   └── animations.css          # Keyframe Animations & GPU Scroll Reveal
├── js/
│   ├── script.js               # Application Bootstrap & Blueprint Inspector
│   ├── navbar.js               # Sticky Nav, Progress Bar & Mobile Menu
│   ├── theme.js                # Theme Engine (Dark/Light Mode + LocalStorage)
│   ├── animations.js           # Scroll Reveal Observer & Number Counters
│   └── form.js                 # Contact Form State Machine & Validation
├── assets/                     # Optimized profile images, logos, certificates & PDF resume
├── docs/                       # Comprehensive Engineering Documentation
│   ├── architecture.md         # Full System Architecture & Tech Stack
│   ├── design-system.md        # CSS Token Strategy & Color Palette
│   ├── style-guide.md          # CSS Formatting & Performance Guidelines
│   ├── component-library.md    # Reusable Component Specifications
│   └── interview-notes.md      # 50 Senior Frontend & AWS Technical Interview Questions
├── ARCHITECTURE.md             # Complete AWS Cloud Architecture & DevOps Blueprint
├── AWS-DEPLOYMENT.md           # Step-by-Step AWS S3 & Production Cloud Deployment Guide
├── CLOUDFRONT.md               # Amazon CloudFront CDN Architecture & Edge Caching Guide
├── SECURITY.md                 # AWS Cloud Security, IAM PoLP & Security Headers Policy
├── COST.md                     # AWS Cost Estimation, Billing & Infrastructure Financial Model
├── SEO.md                      # SEO Meta Tags, Social Cards & JSON-LD Schema
├── PERFORMANCE.md              # Lighthouse Score Optimization & GPU Compositing
├── ACCESSIBILITY.md            # WCAG 2.1 AA Compliance & Reduced Motion Rules
├── CHANGELOG.md                # Engineering Phase Changelog
└── README.md                   # This overview file
```

---

## ⚡ Local Development & Inspection

1. Clone or open the workspace.
2. Serve static files directly using any local web server or open `/index.html` in your browser.
3. Test Light/Dark theme toggling via the navbar toggle button.
4. Inspect design tokens, typography scales, and AWS deployment blueprints directly on the live Phase 1 page.
