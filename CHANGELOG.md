# Engineering Changelog

All notable changes and architectural milestones for Malik Tayyab Jamil's Portfolio project will be documented in this file.

---

## [Phase 9.0.0] - AWS Cloud Deployment & DevOps Architecture (Completed)

### Added
- **AWS Serverless Architecture Blueprint (`ARCHITECTURE.md`):**
  - Full end-to-end cloud infrastructure specification: Route 53 DNS Alias records ➔ CloudFront CDN Anycast Edge POPs ➔ Private Amazon S3 Origin Access Control (OAC) ➔ AWS Certificate Manager (ACM) TLS 1.3 ➔ CloudWatch Monitoring.
  - Interactive ASCII architecture diagrams and network topologies.
- **Amazon S3 Production Deployment Guide (`AWS-DEPLOYMENT.md`):**
  - Step-by-step S3 bucket creation, naming conventions (`tayyabjamil.com`), region selection (`us-east-1`), S3 Object Versioning, and lifecycle expiration rules.
  - Bucket policy enforcing CloudFront Origin Access Control (OAC) with SigV4 signatures while blocking all direct public S3 access (`BlockPublicAccess = True`).
  - Production deployment CLI commands distinguishing 1-year immutable caching for static JS/CSS/WebP assets from zero-cache revalidation for HTML documents.
- **CloudFront CDN Caching & Edge Network Guide (`CLOUDFRONT.md`):**
  - Edge caching strategy across 300+ POPs, TTL matrix configuration, Brotli compression, and zero-cost cache invalidations (`/*`).
- **AWS Security, IAM & Security Headers Architecture (`SECURITY.md`):**
  - Principle of Least Privilege (PoLP) IAM policy definitions and comparison of legacy OAI vs modern OAC.
  - Edge security headers configuration (HSTS, X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy).
- **Traffic-Tiered AWS Financial Model & Cost Optimization (`COST.md`):**
  - Cost analysis for 100, 1,000, and 10,000 visitors/day demonstrating total monthly costs of **$0.50 – $1.94/month** utilizing AWS Always Free Tier limits.
  - Billing alerts, AWS Budgets ($2.00 threshold), and CloudWatch Alarm configuration.
- **CI/CD Deployment Automation Design (`ARCHITECTURE.md`):**
  - GitHub Actions pipeline blueprint (`.github/workflows/deploy.yml`) using OpenID Connect (OIDC) federated IAM roles, automated linting, Vite production builds, S3 atomic sync, and CloudFront cache invalidations.
- **AWS Cloud & DevOps Technical Interview Study Guide (`docs/interview-notes.md`):**
  - Added 25 Senior AWS Cloud & DevOps interview Q&As (Questions 26 to 50) covering S3, CloudFront, Route 53, IAM PoLP, HTTPS TLS 1.3, OAC vs OAI, Versioning, TTL, Brotli compression, CORS, DDoS mitigation, and Cloud Monitoring.

---

## [Phase 8.0.0] - Production Readiness, Performance & SEO (Completed)

### Added
- **Image Optimization & Zero-CLS Architecture:**
  - Added explicit HTML `width="600"` and `height="800"` attributes on all profile image tags to calculate aspect ratio before bytes arrive, achieving a CLS score of `0.000`.
  - Added `<link rel="preload" as="image" fetchpriority="high">` for hero portrait image to optimize LCP.
  - Implemented `loading="lazy"` and `decoding="async"` for non-critical portrait assets.
- **Comprehensive Production SEO & Metadata:**
  - Full metadata suite in `index.html`: page title, description, keywords, author, canonical URL (`https://tayyabjamil.com/`), and theme color meta tag.
  - Social OpenGraph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`) and Twitter Summary Large Image cards.
  - Validated Schema.org `JSON-LD` structured data (`Person` and `WebSite` schema) embedding Malik Tayyab Jamil's credentials, DecodeLabs role, and PAF-IAST degree details.
  - Production `robots.txt` and XML `sitemap.xml` referencing all section anchors.
- **Progressive Web App Manifest & Vector Favicon:**
  - Vector SVG logo favicon (`/public/favicon.svg`), Apple Touch Icon link, and WebManifest (`/public/site.webmanifest`).
- **Custom Design-System 404 Error Engine (`404.html`):**
  - Standalone custom 404 page sharing design tokens, variables, theme switcher, AWS CloudFront message, search suggestions, and Return Home primary CTA.
- **Font Preconnection & Performance Tweaks:**
  - Preconnected Google Fonts origin (`fonts.gstatic.com`) with `font-display: swap` to eliminate FOIT (Flash of Invisible Text).
  - Configured Vite Rollup multi-page input to bundle `404.html` alongside `index.html`.
- **AWS S3 & CloudFront Deployment Guides & Documentation:**
  - Created standalone guides: `DEPLOYMENT.md` (AWS S3, CloudFront OAC, ACM SSL, Route 53, GitHub Actions CI/CD), `SEO.md`, `PERFORMANCE.md`, and `ACCESSIBILITY.md`.
  - Added 5 senior frontend interview Q&As (Questions 21-25) in `docs/interview-notes.md`.

---

## [Phase 7.0.0] - Professional Animations, Micro-interactions & UX Polish (Completed)

### Added
- **Scroll Reveal Animation System:**
  - Standardized Intersection Observer scroll reveal engine (`js/animations.js`) with single-execution unobserve triggers.
  - Smooth 700ms `ease-out` reveal transition (`opacity: 0 -> 1`, `translateY(30px) -> translateY(0)`).
  - Preserves immediate rendering on hero section while revealing all subsequent sections seamlessly.
  - Complete `prefers-reduced-motion` compliance instantly bypassing all entry transitions when reduced motion is requested.
- **Zero-Polling Active Navigation (Scroll Spy):**
  - Refactored section observer in `js/navbar.js` using Intersection Observer rather than scroll event polling.
  - Real-time active class (`.active`) and ARIA pagination updates (`aria-current="page"`) as users enter sections (`#about`, `#skills`, `#projects`, `#journey`, `#experience`, `#education`, `#certifications`, `#contact`).
- **GPU-Accelerated Reading Progress Bar:**
  - Transformed reading progress calculator to use CSS `transform: scaleX()` with `transform-origin: left center` on a 3px fixed header bar.
  - Eliminates DOM layout recalculation and CPU repaints during scroll.
- **FOUC-Free Production Theme Persistence:**
  - Dual-phase theme initialization reading `localStorage` or `prefers-color-scheme` at script parse time in `<head>`.
  - Guarantees zero Flash of Unstyled Content (FOUC) while providing smooth CSS token transitions during manual toggles.
- **Tactile Button & Card Micro-interactions:**
  - Standardized button states across all CTA actions: slight lift (`translateY(-2px) scale(1.02)`), gold glow shadow, active press (`translateY(1px) scale(0.98)`), and high-contrast gold `:focus-visible` ring.
  - Project, Certificate, Education, Experience, and Skill card hover effects featuring 4px lift, soft shadow expansion, and accent border highlights.
  - Social icon button hover animation (`translateY(-3px) rotate(4deg)`) with accessible keyboard focus rings.
- **Hero Polish & Subtle Blinking Subtitle Cursor:**
  - Added CSS pseudo-element blinking cursor after `.hero-subtitle` (`::after` keyframe animation).
  - Gentle portrait frame hover lift (`translateY(-4px)` with soft shadow) without visual rotation.
- **Smooth Anchor Navigation & Sticky Header Offset:**
  - Integrated `scroll-margin-top: calc(72px + var(--space-6))` across all sections to prevent sticky header content occlusion.
  - Floating Back-to-Top button appearing after 500px scroll with keyboard focus recovery to main header navigation.
- **Documentation & Frontend Interview Guide:**
  - Comprehensive documentation updates across `README.md`, `docs/architecture.md`, `docs/component-library.md`, `docs/style-guide.md`, and 10 newly added senior frontend interview Q&As in `docs/interview-notes.md`.

---

## [Phase 6.0.0] - Contact, Footer & Final Call-to-Action (Completed)

### Added
- **Final Call-to-Action Section (`#cta`):**
  - High-impact CTA banner card with "Open for Engineering Opportunities & Internships" gold badge & live pulse indicator.
  - Action buttons group: Download Resume (PDF), Contact Me scroll trigger, GitHub profile link, and LinkedIn connection link.
- **Get In Touch Contact Section & Interactive Form (`#contact`):**
  - Responsive 2-column contact layout featuring a contact form on the left and direct contact channels panel on the right.
  - Client-side form engine (`js/form.js`) with state-machine validation (`is-valid`, `is-invalid`), real-time error messages, loading state spinner, success/error feedback alerts, and simulated async submit.
  - One-click "Copy Email" button (`tayyabjamil628@gmail.com`) with instant clipboard feedback.
  - Direct contact channels list: Email, LinkedIn, GitHub, Location (Haripur, KPK, Pakistan - PAF-IAST), and Green Availability Status indicator.
  - Platform social icons bar with hover effects and analytics tracking hooks (`data-analytics-track`).
- **Production Site Footer (`#footer`):**
  - Full 4-column structured footer featuring Brand & Tagline with AWS hosting badge, Quick Navigation links, Direct Links & Assets, and Key Accreditations (DecodeLabs, PAF-IAST, AWS Cloud Practitioner).
  - Copyright bar with social icon buttons (`github`, `linkedin`, `email`).
- **Scroll Utilities & Enhancements:**
  - Integrated Scroll Progress Bar (`data-scroll-progress`) tracking page depth at the top of the viewport.
  - Active Navigation Highlight (Scroll Spy) automatically highlighting the current section link in the header as the user scrolls.
  - Floating Back-to-Top Button (`#back-to-top`) smoothly fading in after 400px scroll and scrolling back to top on click.
  - Analytics event tracking pipeline (`window.trackPortfolioEvent`) logging engagement events.
- **Documentation Updates:**
  - Finalized component library, style guide, architecture, and deployment specifications across all `docs/` files.

---

## [Phase 5.0.0] - Education, Experience & Certifications (Completed)

### Added
- **Engineering Journey Timeline Section (`#journey`):**
  - Modern vertical timeline component with central animated track line drawing effect (`scaleY` CSS animation on viewport entry via IntersectionObserver).
  - Alternating left/right timeline cards on desktop/tablet, single-column alignment on mobile.
  - Sequentially animated timeline nodes with distinct milestone icons (`🎓` BS Software Engineering, `☁` Cloud Computing Internship, `🚀` Portfolio Engineering & Architecture).
- **Recruiter-Friendly Key Achievements Panel:**
  - At-a-glance summary highlight card displaying key career milestones (Cloud Computing Intern @ DecodeLabs, BS SE @ PAF-IAST, Production Portfolio 100/100, IoT & Parallel Computing).
- **Education Card Component (`#education`):**
  - Comprehensive degree card for PAF-IAST (Pak-Austria Fachhochschule) BS Software Engineering program.
  - Coursework badges grid: Operating Systems, Database Systems, Software Engineering, Cloud Computing, Computer Networks, Artificial Intelligence, High Performance Computing.
- **Professional Experience Card Component (`#experience`):**
  - Industry experience card detailing Cloud Computing Intern role @ DecodeLabs.
  - In-depth responsibilities (AWS Lambda, S3, API Gateway, CloudFront, IAM policies, Docker microservices, Linux server maintenance).
  - Tech stack badges: AWS, Linux, Git, GitHub, Docker, Cloud Infrastructure.
- **Licenses & Certifications Gallery (`#certifications`):**
  - Filter-ready certification card grid (`data-category="cloud internship"`, `data-category="linux sql"`, `data-category="general software"`, `data-category="aws coming-soon"`).
  - Verified credentials for DecodeLabs Cloud Internship, Coursera Linux and SQL, LinkedIn Learning, and AWS Certified Cloud Practitioner.
  - "Verify Credential" action buttons with verified external triggers and graceful "⏳ Verification Link Coming Soon" disabled state for upcoming exams.
- **Navigation Updates:**
  - Added "Journey" and "Certifications" navigation links to both desktop navbar and mobile slide-down drawer.

---

## [Phase 4.0.0] - Featured Engineering Projects (Completed)

### Added
- **Featured Projects Showcase Section (`#projects`):**
  - Filter-ready 2-column responsive project grid (`data-category="iot embedded"`, `data-category="cloud devops"`, `data-category="hpc parallel"`, `data-category="cybersecurity"`).
  - Custom inline vector SVG graphics for project thumbnails (IoT ESP8266 MQ-2 Gas Detection diagram, AWS Serverless Cloud Architecture pipeline, CUDA GPU Parallel Matrix multiplication grid, PyTorch Cyber Threat Neural Network graph).
  - Project completion status badges ("Completed", "Active System", "Research Lab", "Coming Soon") with animated live pulse indicator.
  - Featured ribbons ("★ Featured Project") for flagship projects.
  - Source code GitHub buttons with SVG icons, live demo triggers, and disabled coming soon state.

---

## [Phase 3.1.0] - About & Skills Visual & Interaction Enhancements (Completed)

### Enhanced
- **Subtle Scroll Reveal Animations (`css/animations.css` & `js/animations.js`):**
  - Added IntersectionObserver stagger container (`.stagger-container`, `.stagger-item`) triggering gentle 60ms staggered entrances for cards and skills.
- **Technology Icons Inside Badges (`index.html`):**
  - Prepended domain icons (`☁ AWS`, `🐳 Docker`, `🐧 Linux`, `🐍 Python`, `⚡ C++`, `🐙 Git`, `📦 S3`, `🔒 IAM`, `🛡️ VPC`, `🔥 PyTorch`, etc.) inside all technology badges for instant visual recognition.
- **Enhanced Hover Elevation & Border Accents (`css/style.css`):**
  - Upgraded card hover interactions to 6–8px lift (`translateY(-8px)`), deeper shadow elevation (`var(--shadow-xl)`), and subtle gold border highlights on hover.
- **Balanced Two-Column About Layout (`index.html` & `css/style.css`):**
  - Restructured About section into a balanced 60/40 grid (`.about-grid`) featuring narrative text & info cards on the left, and an executive profile portrait card with gold border framing and floating credentials on the right.
- **Quick Facts Count-Up Animation (`js/animations.js`):**
  - Implemented real-time counter count-up animation (`data-count-target="3+"`, `data-count-target="5+"`, `data-count-target="1"`, `data-count-target="150+"`) triggering dynamically when scrolled into view.
- **Richer Skill Cards & Categories (`index.html`):**
  - Added clear domain icons to category headers and expanded technical badges (CloudFormation, EC2, S3, IAM, DevSecOps, Docker, Kubernetes, etc.).
- **Subtle Gradient Dividers (`css/animations.css` & `index.html`):**
  - Inserted faded gradient dividers (`<hr class="section-divider">`) between Hero, About, and Skills sections for visual section separation.

---

## [Phase 2.0.0] - Header, Navigation & Hero Section (Completed)

### Added
- **Skip to Main Content Link (`.skip-link`):** Accessible keyboard bypass link at top of document for WCAG 2.1 AAA screen reader compliance.
- **Sticky Glassmorphism Site Header (`.site-header`):**
  - Sticky header with 12px blur backdrop and dynamic scroll shadow elevation.
  - Brand logo with customized mark ("MTJ") and title subtitle.
  - Centered desktop navigation links (About, Skills, Projects, Experience, Education, Certificates, Contact).
  - Right-aligned Dark/Light theme toggle button with Sun/Moon icon and ARIA state updates.
- **Accessible Mobile Navigation Drawer (`.mobile-nav-drawer`):**
  - Responsive hamburger toggle button with CSS animated cross transformation (`aria-expanded`, `aria-controls`).
  - Slide-down mobile menu drawer with smooth link highlighting, body scroll lock, and ESC key listener.
- **Hero Section Component (`#hero`):**
  - **Left Column**: "Cloud Computing Intern" gold badge with live pulse dot, AWS Cloud Infrastructure badge, H1 title "Malik Tayyab Jamil", H2 "Software Engineering Student", professional bio statement.
  - **Action Group**: Download Resume button (`assets/resume.pdf`), View Projects button, Contact Me outline button, and GitHub/LinkedIn/Email social icon buttons with hover lifts.
  - **Statistics Grid**: 4 key metric cards (`3+` Projects, `5+` Certificates, `1` Internship, `4+` Domains Studied) integrated with JS scroll counter animations.
  - **Right Column**: Professional executive portrait frame (`assets/images/profile/profile.png`) with metallic gold border framing, 3:4 aspect ratio, fallback handler to vector SVG, and floating "DecodeLabs Intern • AWS Cloud" badge.
- **Responsive Layout Adjustments (`css/responsive.css`):**
  - Smooth stacking on Tablet (<1024px) and Mobile (<640px) with desktop nav hiding and hamburger menu activation.

---

## [Phase 1.0.0] - Architecture, Design System & AWS Deployment Blueprint (Completed)

### Added
- **Project Folder Architecture:** Standardized 100% AWS S3 compatible directory layout (`css/`, `js/`, `assets/`, `docs/`, `screenshots/`).
- **CSS Design Token Matrix (`css/variables.css`):**
  - Brand Palette: Primary Slate (`#0F172A`), Secondary Slate (`#1E293B`), Metallic Gold Accent (`#D4AF37`).
  - Typography Scale: Poppins headings and Inter body text using a 1.125 Major Second mathematical scale.
  - 4px Grid Spacing System (`--space-1` to `--space-24`).
  - Light & Dark Theme Variables (`data-theme="dark"`).
- **Core CSS Base System (`css/style.css`, `css/responsive.css`, `css/animations.css`):**
  - Modern CSS reset, focus-visible accessibility outlines, and container system (`1280px` max width).
  - Responsive breakpoints for Mobile (<640px), Tablet (640px-1024px), Laptop (1024px-1280px), and Ultra-wide screens.
  - GPU-accelerated keyframe animations (`fadeInUp`, `pulseGlow`).
- **Vanilla JavaScript Modules (`js/`):**
  - `theme.js`: Dark/Light theme switching with OS preference detection and zero-FOUC state persistence.
  - `navbar.js`: Sticky navbar elevation, reading scroll progress bar, and mobile menu toggle.
  - `animations.js`: `IntersectionObserver` scroll reveal system and animated stats counters.
  - `script.js`: Application bootstrapper and Phase 1 inspector script.
- **Hero Portrait Asset Blueprint:**
  - Technical specification for Malik Jamil's portrait (`assets/images/profile/malik-tayyab-jamil.png`).
  - Recommended dimensions (1200x1600px PNG/WebP), chest-up cropping, 2-column desktop desktop layout, and floating AWS badge overlay.
- **Engineering Documentation Suite (`docs/`):**
  - `docs/architecture.md`: Full architecture, technology stack, folder breakdown, and AWS S3/CloudFront pipeline.
  - `docs/design-system.md`: Design tokens, typography rules, color contrast matrix (WCAG AAA), and BEM conventions.
  - `docs/deployment-notes.md`: AWS S3 bucket policies, CloudFront OAC, Route 53 DNS, ACM SSL, and deployment scripts.
  - `docs/component-library.md`: Pure HTML/CSS specifications for Buttons, Badges, Nav, Project Cards, and Hero Frame.
  - `docs/interview-notes.md`: Senior technical Q&A covering zero-framework architecture, CSS token strategy, accessibility, and AWS cloud hosting.
- **Phase 1 Live Interactive Preview Canvas (`index.html`):**
  - Interactive Phase 1 Architecture Blueprint Studio displaying live CSS design token swatches, typography specimen preview, portrait strategy, documentation index, and approval gateway.
