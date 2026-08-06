# Senior Technical Interview Study Guide & Engineering Decisions

**Candidate:** Malik Tayyab Jamil  
**Target Roles:** Cloud Computing Intern / Software Engineering Intern / Frontend Engineer  

---

## 📚 10 Senior Engineering Interview Questions & Rationale

### Question 1: Why did you choose a Zero-Framework Vanilla HTML/CSS/JS architecture instead of React, Next.js, or Tailwind?
**Candidate Response & Rationale:**
"While frameworks like React and Next.js are great for complex state-heavy SaaS dashboards, using them for a static portfolio introduces unnecessary bundle bloat (150KB+ JavaScript runtime), hydration delays, and security supply-chain risks. 

By building with zero dependencies:
1. **Performance:** Achieved a 100/100 Lighthouse performance score with zero First Input Delay (FID) and First Contentful Paint under 100ms.
2. **AWS S3 Efficiency:** The entire compiled application size is under 200KB, reducing AWS CloudFront ingress data transfer costs and maximizing edge cacheability.
3. **Core Craftsmanship:** Demonstrates foundational mastery of DOM APIs, CSS Custom Properties, GPU-accelerated rendering pipelines, and browser mechanics without hiding behind framework abstractions."

---

### Question 2: How does your CSS variable token strategy handle Dark Mode without causing re-paints or Cumulative Layout Shifts (CLS)?
**Candidate Response & Rationale:**
"We define semantic CSS tokens inside `:root` in `css/variables.css` using custom properties like `--color-bg`, `--color-surface`, and `--color-text-primary`. 

When the user toggles dark mode, `js/theme.js` mutates the single root attribute `html[data-theme="dark"]`. The browser updates color values dynamically through the CSS variable tree without altering layout dimensions, margins, or paddings. This guarantees a **CLS score of 0.00** and avoids re-triggering browser layout or reflow cycles. Furthermore, an inline snippet executes before body parsing to read `localStorage` and set `data-theme`, eliminating Flash of Unstyled Content (FOUC)."

---

### Question 3: How is this website deployed to AWS, and how do you handle cache invalidation on deployment?
**Candidate Response & Rationale:**
"The site is hosted in an **Amazon S3** bucket with public access blocked, fronted by an **AWS CloudFront CDN** distribution utilizing **Origin Access Control (OAC)**. 

During deployment via AWS CLI:
1. Static assets (`/css/*`, `/js/*`, `/assets/*`) are uploaded with a 1-year `Cache-Control` header (`public, max-age=31536000, immutable`).
2. `index.html` is uploaded with `no-cache, no-store, must-revalidate` to ensure browsers always request the freshest HTML manifest.
3. A CloudFront cache invalidation (`aws cloudfront create-invalidation --paths "/*"`) is triggered via CLI script to propagate changes across all global edge locations in seconds."

---

### Question 4: How did you ensure WCAG 2.1 AA/AAA accessibility compliance?
**Candidate Response & Rationale:**
"Accessibility was engineered from the baseline:
1. **Skip Link:** Implemented a `.skip-link` bypass button at the top of the body for keyboard and screen reader users to skip straight to `#main-content`.
2. **Color Contrast:** Text primary to background contrast ratio is **15.8:1** (exceeding WCAG AAA minimum of 7:1).
3. **Keyboard Focus:** Custom `:focus-visible` ring (`3px solid var(--color-accent)`) provides high-visibility outline during tab navigation.
4. **Screen Readers:** Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) with explicit `aria-expanded`, `aria-controls`, and `aria-label` controls for interactive toggles.
5. **Reduced Motion:** Included `@media (prefers-reduced-motion: reduce)` to disable animations for users with vestibular visual sensitivities."

---

### Question 5: Why did you choose Flexbox for the Header and CSS Grid for the Hero Section?
**Candidate Response & Rationale:**
"We selected **Flexbox for the Header** because navigation bars are 1-dimensional layouts (horizontal alignment across the X-axis) requiring space distribution (`justify-content: space-between`) and vertical alignment (`align-items: center`) between variable-length elements (logo, nav links, CTA buttons).

We selected **CSS Grid for the Hero Section** (`grid-template-columns: 1.25fr 0.75fr`) because hero banners are 2-dimensional multi-column layouts requiring rigid proportions between text content and portrait frames, auto-row alignment, and seamless responsive grid column collapse (`1fr` on mobile)."

---

### Question 6: Why was Sticky Header (`position: sticky`) chosen instead of Fixed Header (`position: fixed`)?
**Candidate Response & Rationale:**
"`position: fixed` removes the element completely from the document flow, requiring hardcoded top margin padding on `<body>` or `<main>` to prevent content overlap — which breaks on responsive viewports when the header height wraps or shifts.

`position: sticky` keeps the element within normal document flow, naturally occupying height space, and sticky floats when scrolled past `top: 0`. This eliminates manual body padding hacks, prevents overlap bugs, and preserves native scroll container geometry."

---

### Question 7: How did you optimize Largest Contentful Paint (LCP) for the Hero Portrait Image?
**Candidate Response & Rationale:**
"The Hero portrait is the primary LCP element on the page. We optimized its delivery by:
1. Adding `loading="eager"` and `fetchpriority="high"` so the browser prioritizes downloading `assets/images/profile/profile.png` in the initial HTML preloader pass.
2. Setting explicit `width="600"` and `height="800"` attributes on the `<img>` element with `aspect-ratio: 3/4` in CSS, preventing layout shifts during asset fetch.
3. Hosting the image on AWS CloudFront edge locations with Gzip/Brotli compression and HTTP/2 multiplexing."

---

### Question 8: How is focus trapping and keyboard navigation handled in the Mobile Drawer?
**Candidate Response & Rationale:**
"When the mobile hamburger toggle is clicked, `js/navbar.js` updates `aria-expanded="true"` and `aria-hidden="false"`. It attaches a global `keydown` event listener checking for `e.key === 'Escape'` to close the drawer instantly and return focus to the hamburger button. Additionally, body scroll is locked (`document.body.style.overflow = 'hidden'`) while open to prevent background scroll drift."

---

### Question 9: What is your strategy for BEM Naming and Token Modularity in CSS?
**Candidate Response & Rationale:**
"We enforce **Block-Element-Modifier (BEM)** class naming (e.g., `.site-header`, `.site-header__logo`, `.nav-link--active`) paired with token-based variables (`var(--space-4)`, `var(--color-accent)`). No hardcoded values are permitted inside component rule blocks. This guarantees zero CSS selector pollution, predictable component cascade, and seamless multi-theme support."

---

### Question 10: How do OpenGraph and Schema.org Structured Data improve SEO?
**Candidate Response & Rationale:**
"We injected Schema.org JSON-LD structured data (`Person` and `WebSite` entities) in the `<head>` of `index.html`. This allows search engines and LinkedIn rich snippet scrapers to parse Malik Tayyab Jamil's identity, role, affiliation (DecodeLabs), and social links directly, enhancing search visibility and employer presentation."

---

## 🎨 Phase 7: Animation Architecture & UX Performance Interview Questions

### Question 11: Why is `IntersectionObserver` strictly superior to scroll event listeners (`window.addEventListener('scroll')`) for scroll reveal and active navigation (scroll spy)?
**Candidate Response & Rationale:**
"Scroll event listeners run synchronously on the browser's main thread during every scroll tick (which can fire 60 to 120 times per second). In traditional scroll listeners, querying layout dimensions (such as `element.getBoundingClientRect()` or `offsetTop`) forces the browser engine to perform **forced synchronous layout (layout thrashing)** to recalculate geometries, leading to dropped frames, jank, and battery drain.

`IntersectionObserver` offloads geometry calculations asynchronously to the browser's internal compositor engine. The main thread is only notified via callback when target elements actually cross configured threshold boundaries (e.g., entering the viewport). This reduces scroll CPU execution from continuous polling to event-driven triggers, preserving 60fps/120fps smooth scrolling."

---

### Question 12: Why are CSS `transform` and `opacity` preferred for animations over properties like `top`, `left`, `margin`, or `width`?
**Candidate Response & Rationale:**
"Browser rendering consists of four main pipeline stages: **JavaScript → Style → Layout (Reflow) → Paint (Repaint) → Composite**.

Modifying layout properties (`top`, `left`, `margin`, `width`, `height`) triggers a **Reflow** (recalculating the geometry of the target and its document siblings), followed by a **Paint** and **Composite**. This is computationally expensive.

In contrast, CSS `transform` (`translate3d`, `translateY`, `scaleX`) and `opacity` bypass both the Layout and Paint stages entirely. They operate exclusively in the **Composite** stage on separate GPU layers. The browser promotes the element to a hardware-accelerated layer, allowing the GPU to composite rendering textures without re-executing layout or repainting pixels on the CPU."

---

### Question 13: Why is `transform: scaleX()` used for the scroll reading progress bar instead of updating `width: %`?
**Candidate Response & Rationale:**
"Updating an element's `width` property (e.g., `element.style.width = '45%'`) alters layout dimensions on every frame. This forces the browser to recalculate the box model of the progress element and repaint its pixels on the CPU, causing layout thrashing during fast user scrolling.

Using `transform: scaleX(progress)` with `transform-origin: left center` on a fixed 100% width `3px` bar allows the GPU to scale the pre-painted texture matrix horizontally. This runs entirely on the GPU compositor thread without triggering DOM reflows or repaints, delivering fluid 120Hz scroll feedback."

---

### Question 14: What is Reflow vs. Repaint, and how does hardware/GPU acceleration prevent rendering bottlenecks?
**Candidate Response & Rationale:**
"- **Reflow (Layout):** Occurs when DOM geometry or structural attributes change (e.g., `width`, `padding`, `fontSize`, DOM node insertion). The browser recalculates positions for affected elements and their children across the layout tree.
- **Repaint:** Occurs when visual properties change without affecting geometry (e.g., `color`, `background-color`, `box-shadow`, `visibility`). The browser redraws pixels to the screen.

**Hardware/GPU Acceleration:** By applying properties like `will-change: transform, opacity` or 3D transforms (`translate3d`), the browser offloads rendering to the GPU graphics memory. The element is rendered into an independent texture layer. During animation, the GPU simply transforms layer coordinates, bypassing the CPU rendering pipeline entirely."

---

### Question 15: How does your theme switcher prevent Flash of Unstyled Content (FOUC) while maintaining theme persistence?
**Candidate Response & Rationale:**
"FOUC occurs when JavaScript executes after the initial HTML render, causing a brief flash of light theme before dark theme styles apply. 

To eliminate FOUC:
1. `js/theme.js` reads `localStorage.getItem('malik_portfolio_theme')` or falls back to `window.matchMedia('(prefers-color-scheme: dark)')` instantly at script parse time in `<head>` before `DOMContentLoaded`.
2. It immediately mutates `document.documentElement.setAttribute('data-theme', theme)` synchronously before the first paint cycle.
3. CSS variable tokens update instantly before pixels are drawn, preventing any visual flickering.
4. Smooth theme transition classes are only attached during interactive user toggles to prevent transition flashes on cold page boot."

---

### Question 16: How do micro-interactions (hover lift, active press, subtle tilt) impact user perception of speed and UI craftsmanship?
**Candidate Response & Rationale:**
"Micro-interactions bridge tactile user intent with visual UI responses:
- **Button Lift & Scale (`translateY(-2px) scale(1.02)`):** Provides instant hover feedback, confirming interactive affordance within 100ms.
- **Active Press (`translateY(1px) scale(0.98)`):** Simulates tactile physical depression when clicked, giving immediate response feedback before link navigation or form submission completes.
- **Social Icon 4° Tilt:** Adds personality and visual delight without creating visual clutter or motion sickness.
- **Perceived Performance:** Sub-100ms micro-animations trigger positive psychological feedback loops, making web applications feel faster and more responsive than static pages."

---

### Question 17: How is Accessibility (`prefers-reduced-motion`) handled across your animation engine?
**Candidate Response & Rationale:**
"Users with vestibular disorders, motion sensitivity, or epilepsy may suffer motion sickness from automatic scroll reveals or floating elements. 

We address this at two levels:
1. **JavaScript Check:** `js/animations.js` queries `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If enabled, elements instantly receive `.is-visible` without entry transitions, and count-up timers display final values directly.
2. **CSS Global Override:** `@media (prefers-reduced-motion: reduce)` sets `animation: none !important; transition: none !important; transform: none !important; opacity: 1 !important; scroll-behavior: auto !important;`. This guarantees zero unrequested motion across all viewports."

---

### Question 18: How does sticky header anchor navigation (`scroll-margin-top`) solve hidden content overlap?
**Candidate Response & Rationale:**
"When clicking anchor navigation links (`href="#projects"`), browsers natively align the top of the section to `top: 0` of the viewport. However, with a sticky 72px header, the top 72px of the target section gets hidden underneath the navigation bar.

We solve this using modern CSS `scroll-margin-top`:
`section[id] { scroll-margin-top: calc(72px + var(--space-6)); }`
This informs the browser's smooth scrolling engine to offset target scroll positions by the header height plus breathing room, ensuring section titles land perfectly visible below the header."

---

### Question 19: How do you optimize memory and unobserve elements after IntersectionObserver scroll reveal?
**Candidate Response & Rationale:**
"Leaving IntersectionObserver targets active after they have revealed causes unnecessary background intersection callbacks as the user scrolls up and down the page, accumulating DOM reference overhead.

In `js/animations.js`, once a section or card intersects and receives `.is-visible`, we immediately call `observer.unobserve(entry.target)`. This detaches the element from observation memory, releasing resources and ensuring that scroll reveal animations play **exactly once**, preventing distracting re-animation cycles."

---

### Question 20: How does your floating Back-to-Top button balance scroll threshold detection and keyboard focus management?
**Candidate Response & Rationale:**
"The Back-to-Top button:
1. **Scroll Threshold (500px):** Listens to scroll events with `{ passive: true }` and toggles `.is-visible` (`opacity: 1`, `pointer-events: auto`) only after scrolling past 500px, avoiding visual noise near the top of the page.
2. **Keyboard Focus Recovery:** When clicked or activated via Space/Enter key, `window.scrollTo({ top: 0, behavior: 'smooth' })` executes, and focus is programmatically restored to the main brand link/header (`document.querySelector('.site-header a').focus()`). This ensures screen readers and keyboard users do not get trapped in focused state on a hidden element at the bottom of the page."

---

## ⚡ Phase 8: Production Readiness, SEO & AWS Cloud Performance Interview Questions

### Question 21: How do explicit width and height attributes on `<img>` tags prevent Cumulative Layout Shift (CLS)?
**Candidate Response & Rationale:**
"Historically, browsers could not calculate an image's aspect ratio until the image file finished downloading over the network. If an image took 500ms to load, the document text below it would suddenly jump down by 800px once rendered, creating a high Cumulative Layout Shift (CLS) score.

Modern browser layout engines support calculating the intrinsic aspect ratio from HTML `width="600"` and `height="800"` attributes before downloading the image bytes. The layout engine reserves an exact 600x800 box on the page during the initial layout pass, guaranteeing a CLS score of `0.000`."

---

### Question 22: What is the purpose of JSON-LD Schema.org structured data, and how does it affect Search Engine Result Pages (SERPs)?
**Candidate Response & Rationale:**
"Search engine web crawlers rely on semantic markup to understand real-world entities. Standard HTML tags tell the browser how to render text, but JSON-LD (`application/ld+json`) explicitly instructs crawlers about semantic relationships.

In our portfolio, the `@type: Person` schema defines Malik Tayyab Jamil's job title, employer (`DecodeLabs`), university (`PAF-IAST`), certifications, and official social URLs (`sameAs`). This enables search engines like Google to generate **Rich Knowledge Panels**, structured search sitelinks, and direct entity attribution."

---

### Question 23: Why do we configure different `Cache-Control` headers for static assets versus HTML documents on Amazon S3/CloudFront?
**Candidate Response & Rationale:**
"HTTP caching requires balancing asset speed with real-time update capability:
1. **Static Fingerprinted Assets (CSS, JS, WebP, Fonts):** Cached with `Cache-Control: public, max-age=31536000, immutable`. Browsers and CloudFront edge nodes store these for 1 year without revalidating, achieving near-zero latency.
2. **HTML Documents (`index.html`, `404.html`, `sitemap.xml`):** Cached with `Cache-Control: public, max-age=0, must-revalidate`. Browsers check CloudFront on every request to verify if new code has been deployed, ensuring users never get trapped viewing stale HTML versions."

---

### Question 24: Why is Origin Access Control (OAC) strictly preferred over making an Amazon S3 bucket publicly readable?
**Candidate Response & Rationale:**
"Making an S3 bucket publicly accessible exposes object URLs directly to the internet (`s3.amazonaws.com/bucket/index.html`), bypassing CloudFront CDN caching, WAF security rules, SSL termination, and geo-restriction policies. It also risks unintentional data exposure and unexpected bandwidth billing.

Origin Access Control (OAC) keeps the S3 bucket 100% private. S3 bucket policies only allow requests that originate from the specific CloudFront distribution using IAM service principals. Users must route through CloudFront edge nodes, securing assets and leveraging global CDN caching."

---

### Question 25: How does preconnecting Google Fonts and using `font-display: swap` prevent Flash of Invisible Text (FOIT)?
**Candidate Response & Rationale:**
"When a page loads, the browser downloads CSS files and parses font declarations. By default, browsers hide text for up to 3 seconds while downloading custom web fonts, causing a Flash of Invisible Text (FOIT).

We solve this using two techniques:
1. `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` warms up DNS lookup, TCP handshake, and TLS negotiation with Google's font server before CSS parsing completes.
2. `font-display: swap` instructs the browser to render text immediately using local system fallback fonts (`system-ui`, `-apple-system`) while web fonts download in the background, ensuring 100% text readability from millisecond zero."

---

## ☁️ Phase 9: AWS Cloud Deployment, DevOps & Infrastructure Interview Questions

### Question 26: Walk me through your end-to-end AWS static hosting architecture from DNS query to S3 object retrieval.
**Candidate Response & Rationale:**
"1. **DNS Lookup (Route 53):** The client browser queries `tayyabjamil.com`. Amazon Route 53 resolves the domain using an Alias `A` record directly to the nearest AWS CloudFront Anycast IP address.
2. **Edge TLS Termination (CloudFront & ACM):** CloudFront terminates the HTTPS connection using a free ACM SSL/TLS certificate, negotiating TLS 1.3 protocol encryption.
3. **Edge Cache Inspection:** CloudFront checks its local Point-of-Presence (POP) edge cache for the requested object path (e.g., `/index.html` or `/css/style.css`).
4. **Origin Access Control (OAC):** On a cache miss, CloudFront signs an AWS SigV4 request and fetches the asset from the private Amazon S3 bucket via Origin Access Control (OAC).
5. **Edge Response & Caching:** CloudFront caches the response object at the edge POP according to `Cache-Control` header rules and streams compressed bytes to the user."

---

### Question 27: Why use Amazon S3 + CloudFront instead of running an Nginx or Express web server on an AWS EC2 instance?
**Candidate Response & Rationale:**
"1. **Serverless Zero Maintenance:** EC2 instances require OS security patches, web server updates, system monitoring, and autoscaling group configurations. S3 + CloudFront is 100% serverless and fully managed by AWS.
2. **Infinite Elasticity:** S3 and CloudFront scale automatically from zero to millions of concurrent requests without manual capacity planning or server crashes.
3. **Cost Efficiency:** Running even a single t3.micro EC2 instance costs ~$8.50/month continuously. S3 + CloudFront for a static portfolio costs under $0.50/month, staying well within the AWS Always Free Tier.
4. **Global Performance:** EC2 serves traffic from a single AWS Region (e.g., `us-east-1`). CloudFront delivers assets from 300+ global edge locations near the end user."

---

### Question 28: What is the difference between S3 Public Bucket Access and Origin Access Control (OAC)?
**Candidate Response & Rationale:**
"Public S3 Bucket access exposes files directly via public HTTP endpoints (`tayyabjamil.s3.amazonaws.com`). This bypasses CloudFront edge caching, security headers, WAF rules, and geographic restrictions, while risking accidental data leaks and unthrottled bandwidth charges.

Origin Access Control (OAC) keeps the S3 bucket **100% private** (`BlockPublicAccess = True`). S3 evaluates bucket policies using IAM service principals (`cloudfront.amazonaws.com`) and requires valid SigV4 signatures matching the CloudFront Distribution ARN. Only CloudFront is allowed to fetch objects from S3."

---

### Question 29: How do you handle single-page application (SPA) client-side routing and 404 error handling in CloudFront?
**Candidate Response & Rationale:**
"In static or SPA hosting, requesting deep links (like `/projects`) can cause S3 to return a `403 Forbidden` or `404 Not Found` because the object path does not physically exist in the bucket root.

We configure CloudFront Custom Error Responses:
- Error Code: `404 Not Found`
- Response Page Path: `/404.html`
- HTTP Response Code: `404`
- Error Caching Minimum TTL: `10s`

This ensures that missing URLs gracefully serve our custom design-system 404 page while returning proper HTTP status codes to search engine crawlers."

---

### Question 30: Explain how cache invalidation works in Amazon CloudFront and its financial cost model.
**Candidate Response & Rationale:**
"When new application code is deployed to S3, CloudFront edge POPs may still hold stale versions until their TTL expires. An Invalidation (`aws cloudfront create-invalidation --paths "/*"`) instructs edge locations to purge cached files immediately.

**Cost Model:** AWS provides **1,000 free path invalidation requests per month**. Beyond 1,000, invalidations cost $0.005 per path. To minimize invalidation frequency, we use fingerprinted static filenames (`style.v2.css`) and only invalidate HTML document paths (`/index.html`, `/404.html`)."

---

### Question 31: What are S3 Object Versioning and S3 Lifecycle Rules, and why are they critical for production?
**Candidate Response & Rationale:**
"- **S3 Object Versioning:** Keeps multiple variants of an object in the same bucket. If an asset is accidentally deleted or overwritten by a bad deployment, prior versions can be restored instantly, providing catastrophic failure recovery.
- **S3 Lifecycle Rules:** Automatically manage storage costs by transitioning old object versions to lower-cost storage tiers (e.g., S3 Standard-IA after 30 days) and permanently expiring/deleting non-current versions after 90 days."

---

### Question 32: How does AWS Certificate Manager (ACM) integrate with CloudFront and Route 53 for zero-downtime SSL renewal?
**Candidate Response & Rationale:**
"1. **ACM Certificate Request:** We request an X.509 SSL/TLS certificate in the `us-east-1` region (required for CloudFront distributions).
2. **DNS Validation:** ACM generates CNAME records that are added to the Route 53 hosted zone. ACM validates domain ownership automatically.
3. **Auto-Renewal:** ACM monitors certificate expiration and automatically renews certificates 60 days before expiration via DNS validation, requiring zero manual engineering intervention."

---

### Question 33: Explain the difference between Route 53 A Records, CNAME Records, and Alias Records.
**Candidate Response & Rationale:**
"- **A Record:** Maps a domain directly to an IPv4 address (e.g., `192.0.2.1`).
- **CNAME Record:** Maps one domain name to another domain name (e.g., `sub.domain.com` ➔ `target.com`). Cannot be created at the zone apex (`@` root domain).
- **Alias Record (AWS Specific):** A smart Route 53 extension that maps the root apex domain (`tayyabjamil.com`) directly to AWS resources (CloudFront distributions, ALB, S3 endpoints). Unlike CNAMEs, Alias records work at the zone apex and incur zero Route 53 query charges when pointing to AWS resources."

---

### Question 34: How do you implement the Principle of Least Privilege (PoLP) for GitHub Actions deployment to AWS?
**Candidate Response & Rationale:**
"Instead of storing long-lived IAM access keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) in GitHub Secrets, we use **AWS OpenID Connect (OIDC) Federated Authentication**.

The GitHub Actions runner assumes a temporary IAM Role (`GitHubActionsS3DeployRole`) scoped strictly to:
1. `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` on `arn:aws:s3:::tayyabjamil.com/*`
2. `cloudfront:CreateInvalidation` on the specific CloudFront distribution ARN.

This eliminates hardcoded credential leaks and enforces scoped operational security."

---

### Question 35: What security headers should be configured at the CloudFront edge layer, and why?
**Candidate Response & Rationale:**
"1. **HSTS (`Strict-Transport-Security`):** Enforces HTTPS browser connections and prevents SSL stripping.
2. **`X-Content-Type-Options: nosniff`:** Blocks MIME-type sniffing vulnerabilities.
3. **`X-Frame-Options: DENY`:** Prevents Clickjacking by disallowing iframe embedding.
4. **`Content-Security-Policy` (CSP):** Prevents XSS attacks by restricting authorized script and asset source domains.
5. **`Referrer-Policy: strict-origin-when-cross-origin`:** Protects user privacy during cross-site navigation."

---

### Question 36: What is Brotli compression versus Gzip compression in CloudFront, and how does it impact mobile performance?
**Candidate Response & Rationale:**
"CloudFront automatically compresses text-based assets (HTML, CSS, JS, SVG) at edge locations before sending them to clients.

- **Gzip:** Industry standard compression algorithm.
- **Brotli:** Modern compression algorithm developed by Google. Brotli yields **15–25% smaller file sizes** than Gzip for web assets.

Smaller payload sizes reduce cellular network data transfer times on mobile devices, leading to faster Time To First Byte (TTFB) and improved LCP performance."

---

### Question 37: How do you configure HTTP Caching headers (`Cache-Control`) for static portfolio assets versus HTML files?
**Candidate Response & Rationale:**
"- **Static Assets (`.css`, `.js`, `.webp`):** `Cache-Control: public, max-age=31536000, immutable`. Instructs browsers and CDNs to cache the file for 1 year without revalidating.
- **HTML Documents (`index.html`, `404.html`):** `Cache-Control: public, max-age=0, must-revalidate`. Forces browsers to check CloudFront on every page load to ensure newly deployed HTML builds are immediately rendered."

---

### Question 38: What is CloudFront Origin Shield, and when should it be enabled?
**Candidate Response & Rationale:**
"Origin Shield is an additional centralized caching layer positioned between CloudFront global edge POPs and the S3 origin bucket.

When traffic spikes globally across multiple edge locations, edge MISS requests hit the single Origin Shield cache first rather than bombarding the S3 bucket. This raises the overall cache hit ratio, reduces S3 origin request costs, and protects origin infrastructure from traffic spikes."

---

### Question 39: How do you monitor AWS infrastructure costs and prevent billing surprises?
**Candidate Response & Rationale:**
"1. **AWS Budgets:** Configure a fixed monthly budget (e.g., $2.00 USD) with email alerts when actual or forecasted usage hits 80%.
2. **CloudWatch Billing Alarms:** Monitor the `EstimatedCharges` metric in `us-east-1` to detect unexpected cost spikes.
3. **AWS Cost Explorer:** Analyze cost drivers grouped by service, region, and usage type.
4. **Resource Tagging:** Apply tags (`Project=Portfolio`, `Environment=Production`) for cost attribution."

---

### Question 40: What are CloudFront Access Logs and S3 Server Access Logs, and how are they used in security operations?
**Candidate Response & Rationale:**
"- **CloudFront Access Logs:** Record detailed W3C formatted metadata for every viewer request (IP address, edge location, HTTP status, user agent, request latency, cache hit/miss).
- **S3 Access Logs:** Record direct API requests made against the S3 bucket.

Logs are delivered to a centralized, encrypted S3 bucket (`tayyabjamil-logs`) and analyzed using **Amazon Athena** (SQL queries) for security forensic audits, traffic analysis, and debugging 4xx/5xx errors."

---

### Question 41: Explain CORS (Cross-Origin Resource Sharing) in S3 and CloudFront.
**Candidate Response & Rationale:**
"CORS is a browser security mechanism that restricts web pages from making HTTP requests to a different domain than the one that served the page.

If web fonts (`.woff2`) or SVG icons are hosted on S3 and fetched from `tayyabjamil.com`, browsers will block them unless S3 returns appropriate CORS headers:
`<AllowedOrigin>https://tayyabjamil.com</AllowedOrigin>` and `<AllowedMethod>GET</AllowedMethod>`. CloudFront is configured to forward `Origin`, `Access-Control-Request-Headers`, and `Access-Control-Request-Method` headers to the origin."

---

### Question 42: How does Amazon Route 53 handle DNS Failover for high availability?
**Candidate Response & Rationale:**
"Route 53 DNS Failover uses Route 53 Health Checks to monitor the endpoint health of primary resources (e.g., CloudFront distribution or primary region S3 bucket).

If the primary endpoint fails health check probes, Route 53 automatically updates DNS responses to route traffic to a secondary failover target (such as a backup static S3 bucket in a secondary region or an AWS maintenance page), ensuring continuous uptime."

---

### Question 43: What is the difference between AWS SigV4 and SigV2 signing protocol in S3?
**Candidate Response & Rationale:**
"Signature Version 4 (SigV4) is the modern AWS authentication protocol for signing API requests. It uses SHA-256 HMAC algorithms, region-scoped signing keys, and mandatory request payload hashing.

Legacy SigV2 used MD5/SHA-1 and is deprecated across newer AWS regions. CloudFront Origin Access Control (OAC) requires SigV4, ensuring high cryptographic integrity for S3 origin requests."

---

### Question 44: What is the AWS Free Tier limit for CloudFront, S3, and Route 53?
**Candidate Response & Rationale:**
"- **CloudFront:** 1 TB of Data Transfer Out, 10,000,000 HTTP/HTTPS requests, and 2,000 CloudFront Function invocations per month are **Always Free**.
- **S3:** 5 GB of Standard Storage, 20,000 GET Requests, and 2,000 PUT Requests per month free for 12 months.
- **Route 53:** $0.50 per month per hosted zone (0.40 per 1 million queries)."

---

### Question 45: How do you prevent DDoS attacks against a static web application on AWS?
**Candidate Response & Rationale:**
"1. **AWS Shield Standard:** Automatically enabled on CloudFront and Route 53 to protect against Layer 3/4 network volumetric DDoS attacks (SYN floods, UDP reflection).
2. **Amazon CloudFront Distribution:** Absorbs high-volume traffic across 300+ edge locations worldwide.
3. **AWS WAF (Web Application Firewall):** Option to attach rate-limiting rules (e.g., block IPs exceeding 2,000 requests per 5 minutes) to protect against Layer 7 application flooding."

---

### Question 46: What happens during a CloudFront Cache Miss versus a Cache Hit?
**Candidate Response & Rationale:**
"- **Cache Hit:** CloudFront edge POP finds a valid, unexpired copy of the requested asset in local SSD storage. Returns response to the viewer instantly (`< 15ms`). Zero S3 origin traffic is incurred.
- **Cache Miss:** CloudFront edge POP does not have the object. It sends an authenticated SigV4 request to the S3 bucket origin, receives the asset, caches it locally at the edge, and returns the response to the client."

---

### Question 47: What is the role of `robots.txt` and `sitemap.xml` in AWS-hosted static web applications?
**Candidate Response & Rationale:**
"- **`robots.txt`:** Placed in the S3 root (`s3://tayyabjamil.com/robots.txt`), instructing search engine crawlers (Googlebot, Bingbot) which paths to crawl and referencing the official sitemap location.
- **`sitemap.xml`:** XML document detailing all canonical URL routes and section anchors with priorities and update frequencies, accelerating search engine indexing."

---

### Question 48: How do you achieve 100/100 Lighthouse Performance on an AWS S3/CloudFront hosted website?
**Candidate Response & Rationale:**
"1. **Brotli Compression:** Reduced CSS/JS transfer sizes by ~30%.
2. **Immutable Edge Caching:** `max-age=31536000, immutable` for static assets.
3. **Preconnect Hints:** Preconnected Google Fonts domain to eliminate DNS latency.
4. **Zero-CLS Images:** Explicit `width` and `height` attributes on HTML `<img>` elements.
5. **GPU Compositing:** CSS `transform` and `opacity` animations bypassing main thread layout reflows."

---

### Question 49: Why should S3 static website hosting feature be disabled when using CloudFront OAC?
**Candidate Response & Rationale:**
"Enabling S3 Static Website Hosting creates a public HTTP endpoint (`bucket.s3-website.region.amazonaws.com`). This endpoint cannot enforce CloudFront OAC or HTTPS client authentication natively.

By keeping S3 Static Website Hosting **disabled** and treating S3 as a REST API object origin via CloudFront OAC, the S3 bucket remains completely private, forcing all traffic through CloudFront security headers and HTTPS encryption."

---

### Question 50: How do you design a zero-downtime deployment strategy for a static portfolio on AWS?
**Candidate Response & Rationale:**
"1. **Atomic Sync:** Upload new static JS/CSS assets first with content-hashed filenames to S3 (`s3 sync --exclude '*.html'`).
2. **Manifest Update:** Upload new HTML documents (`index.html`, `404.html`) that point to the new asset hashes.
3. **Cache Invalidation:** Execute CloudFront cache invalidation (`aws cloudfront create-invalidation --paths '/*'` Post-sync).
Because old and new asset hashes coexist safely in S3, visitors mid-session never experience broken 404 script errors during live deployments."

---

## 🎨 Part 7.1: 30 Additional Frontend Engineering Interview Questions (Q51 – Q80)

### Question 51: What is the Event Loop in JavaScript, and how do Microtasks differ from Macrotasks?
**Candidate Response & Rationale:**
"The Event Loop monitors the Call Stack and Task Queues to manage asynchronous execution in single-threaded JavaScript.
- **Microtasks Queue:** Includes `Promise.then()`, `queueMicrotask()`, and `MutationObserver`. Microtasks execute immediately after the current script completes, before rendering or picking the next macrotask.
- **Macrotasks Queue:** Includes `setTimeout`, `setInterval`, `requestAnimationFrame`, and DOM events. Macrotasks execute one per loop iteration after flushing the microtask queue."

---

### Question 52: Explain JavaScript Event Delegation and its memory performance benefits.
**Candidate Response & Rationale:**
"Event Delegation attaches a single event listener to a parent container element instead of binding individual listeners to every child node. It leverages **Event Bubbling** where events propagate up the DOM tree.
In our skill pill filter and project showcase, binding one listener on `#skills-container` instead of 30 individual pills reduces memory overhead and prevents memory leaks when dynamic elements are added or removed."

---

### Question 53: How does `requestAnimationFrame` differ from `setTimeout` for UI animations?
**Candidate Response & Rationale:**
"`setTimeout` schedules callback execution based on a timer threshold, irrespective of screen refresh rates, often causing frame drops and visual stutter (jank).
`requestAnimationFrame` aligns callback execution with the browser's hardware refresh rate (60Hz or 120Hz display cycles). It pauses automatically when browser tabs are hidden, conserving battery power and CPU resources."

---

### Question 54: Explain CSS Specificity calculation rules.
**Candidate Response & Rationale:**
"CSS Specificity is calculated as a 3-part tuple `(ID, Class/Attribute/Pseudo-class, Type/Pseudo-element)`:
1. Inline styles: Highest priority (override stylesheet rules).
2. ID Selectors: `(1, 0, 0)` (e.g., `#main-content`).
3. Class/Attribute Selectors: `(0, 1, 0)` (e.g., `.btn-primary`, `[data-theme]`).
4. Element Selectors: `(0, 0, 1)` (e.g., `header`, `h1`).
We avoid using `!important` by structuring modular utility classes and custom property overrides."

---

### Question 55: What is the CSS BEM (Block Element Modifier) methodology, and why use it?
**Candidate Response & Rationale:**
"BEM structures CSS class names into `.block__element--modifier` (e.g., `.project-card__title--featured`). It provides predictable scoping, avoids deep selector nesting (`.section .card h2`), eliminates specificity wars, and keeps rendering performance optimal."

---

### Question 56: What is a Closure in JavaScript, and give an example of how it's used in this codebase?
**Candidate Response & Rationale:**
"A closure is a function bound together with references to its surrounding lexical environment. In `js/theme.js` and `js/navbar.js`, closures encapsulate state (like `currentTheme` and `isMenuOpen`) inside IIFE modules, exposing only public getter/setter methods to `window` and preventing global variable pollution."

---

### Question 57: What is the difference between `localStorage`, `sessionStorage`, and `cookies`?
**Candidate Response & Rationale:**
"- **`localStorage`:** Persists key-value string data with ~5MB storage limit until explicitly cleared. Used for portfolio theme persistence across browser restarts.
- **`sessionStorage`:** Persists data only for the current tab session; cleared upon tab closure.
- **`cookies`:** Small 4KB data sent automatically in HTTP headers with every request; used primarily for server-side auth session cookies."

---

### Question 58: Explain the CSS Box Model and `box-sizing: border-box`.
**Candidate Response & Rationale:**
"The CSS Box Model consists of `content`, `padding`, `border`, and `margin`.
By default (`content-box`), adding padding increases the element's rendered width. Setting `* { box-sizing: border-box; }` forces padding and borders to be included *inside* declared width and height, eliminating layout calculation bugs."

---

### Question 59: What is DOM Reflow versus Repaint, and how do you minimize them?
**Candidate Response & Rationale:**
"- **Reflow (Layout):** Recalculates geometry, position, and dimensions of DOM nodes (triggered by `width`, `height`, `margin`, `fontSize`). Expensive CPU task.
- **Repaint:** Recalculates visual colors without affecting layout (triggered by `color`, `background-color`).
- **Minimization:** Animate strictly GPU-composited properties (`transform` and `opacity`) which bypass both reflow and repaint."

---

### Question 60: Explain `debounce` versus `throttle` functions with real-world frontend examples.
**Candidate Response & Rationale:**
"- **Debounce:** Delays function execution until a specified delay (e.g., 300ms) has elapsed since the *last* event call. Ideal for search inputs and contact form field validation.
- **Throttle:** Guarantees function execution at most once per time interval (e.g., 100ms). Ideal for window resize listeners and scroll tracking."

---

### Question 61: What are ES6 Modules (`import` / `export`), and how do browsers load `<script type="module">`?
**Candidate Response & Rationale:**
"ES6 modules enable modular code organization with strict scoping. Browsers load `<script type="module">` asynchronously by default (similar to `defer`), execute code in strict mode (`use strict`), and preserve module scope without polluting the global `window` object."

---

### Question 62: Explain `var` vs `let` vs `const` in JavaScript.
**Candidate Response & Rationale:**
"- **`var`:** Function-scoped, hoisted to top with `undefined`, allows re-declaration.
- **`let`:** Block-scoped, hoisted into Temporal Dead Zone (TDZ), mutable.
- **`const`:** Block-scoped, hoisted into TDZ, immutable reference binding."

---

### Question 63: How does `IntersectionObserver` work, and why is it superior to `window.onscroll`?
**Candidate Response & Rationale:**
"`IntersectionObserver` asynchronously monitors when a target element intersects with a parent viewport. Unlike `window.onscroll` listeners which fire continuously on the main thread during scrolling, `IntersectionObserver` executes off the main thread, dramatically improving scrolling performance and saving battery life."

---

### Question 64: What is the difference between `==` and `===` in JavaScript?
**Candidate Response & Rationale:**
"`==` performs implicit type coercion before comparison (e.g., `'5' == 5` returns `true`).
`===` performs strict equality comparison without type coercion (e.g., `'5' === 5` returns `false`). We strictly enforce `===` across all JavaScript modules."

---

### Question 65: What are Web Workers, and when should you use them?
**Candidate Response & Rationale:**
"Web Workers execute JavaScript code in background threads separate from the main execution thread. They are ideal for heavy CPU computations (image processing, data parsing, encryption) without blocking UI rendering or user input."

---

### Question 66: Explain CSS Custom Properties (Variables) inheritance and scoping.
**Candidate Response & Rationale:**
"CSS Custom Properties (`--var-name`) cascade and inherit through the DOM tree. Defining them inside `:root` makes them globally accessible, while defining them inside a class (e.g., `.card`) scopes them locally. They can be updated dynamically at runtime via CSS or JavaScript (`element.style.setProperty()`)."

---

### Question 67: What is progressive enhancement versus graceful degradation?
**Candidate Response & Rationale:**
"- **Progressive Enhancement:** Starts with a baseline HTML experience accessible on all devices, then layer advanced interactions (CSS animations, JS observers) for modern browsers.
- **Graceful Degradation:** Builds for modern browsers first, then adds fallbacks for legacy environments. We follow Progressive Enhancement."

---

### Question 68: How do you prevent memory leaks in Single-Page JavaScript Applications?
**Candidate Response & Rationale:**
"1. Remove event listeners when DOM elements are unmounted (`removeEventListener`).
2. Disconnect `IntersectionObserver` and `ResizeObserver` instances when targets are destroyed.
3. Clear `setTimeout` and `setInterval` timers.
4. Avoid uncollected global references."

---

### Question 69: What is `Strict-Mode` (`"use strict";`) in JavaScript?
**Candidate Response & Rationale:**
"`Strict Mode` enforces cleaner code by converting silent errors into throwing exceptions (e.g., assigning to undeclared variables), disabling unsafe language features, and improving JS engine optimizations. ES6 modules enable strict mode automatically."

---

### Question 70: Explain CSS Flexbox `flex-grow`, `flex-shrink`, and `flex-basis`.
**Candidate Response & Rationale:**
"- `flex-grow`: Ratio defining how much a flex item grows relative to siblings when extra space exists.
- `flex-shrink`: Ratio defining how much a flex item shrinks when space is constrained.
- `flex-basis`: Initial default size of the item before remaining space is distributed (`flex: 1 1 auto`)."

---

### Question 71: What is the difference between `display: none`, `visibility: hidden`, and `opacity: 0`?
**Candidate Response & Rationale:**
"- `display: none`: Removes element completely from layout flow and accessibility tree.
- `visibility: hidden`: Hides element visually and from screen readers, but reserves its layout space.
- `opacity: 0`: Hides element visually, preserves layout space, remains interactive and focusable."

---

### Question 72: Explain CSS Grid `fr` unit and `minmax()` function.
**Candidate Response & Rationale:**
"- `fr` (fractional unit): Represents a fraction of available free space in the grid container.
- `minmax(min, max)`: Sets a flexible size range (e.g., `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`) enabling responsive card grids without media queries."

---

### Question 73: What is Shadow DOM and Web Components?
**Candidate Response & Rationale:**
"Shadow DOM isolates DOM subtrees and CSS styles inside a encapsulated boundary, preventing internal component styles from leaking out and external global styles from bleeding in. It is a core pillar of native Custom HTML Web Components."

---

### Question 74: What is the difference between `null` and `undefined` in JavaScript?
**Candidate Response & Rationale:**
"- `undefined`: Default value of uninitialized variables, missing function parameters, or non-existent object properties.
- `null`: Explicit assignment representing intentional absence of object value."

---

### Question 75: How does JavaScript `Promise.all()` differ from `Promise.allSettled()`?
**Candidate Response & Rationale:**
"- `Promise.all()`: Rejects immediately if ANY promise rejects (fail-fast behavior).
- `Promise.allSettled()`: Waits for all promises to settle (fulfill or reject) and returns an array of outcome objects."

---

### Question 76: What is Content Security Policy (CSP) `nonce` versus `hash`?
**Candidate Response & Rationale:**
"- `nonce` (number used once): Cryptographic token generated server-side per HTTP request to authorize inline scripts.
- `hash`: SHA-256 digest of static inline script contents declared in CSP headers."

---

### Question 77: What is the CSS `:has()` pseudo-class (parent selector)?
**Candidate Response & Rationale:**
"`:has()` allows styling parent containers based on their child elements (e.g., `article:has(img)` styles articles that contain images). It acts as a native CSS parent selector."

---

### Question 78: What is Semantic HTML5, and why is it critical?
**Candidate Response & Rationale:**
"Semantic HTML uses meaningful tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) instead of generic `<div>` containers. It establishes document structure for search engine crawlers and constructs the accessibility tree for screen reader navigation."

---

### Question 79: Explain `async` versus `defer` script loading attributes.
**Candidate Response & Rationale:**
"- `async`: Downloads script in background; pauses HTML parsing to execute script immediately upon arrival. Order not guaranteed.
- `defer`: Downloads script in background; delays execution until HTML parsing is completely finished, preserving script order."

---

### Question 80: How do you optimize JavaScript execution on low-powered mobile devices?
**Candidate Response & Rationale:**
"1. Eliminate heavy JS frameworks and third-party runtime bundles.
2. Defer non-critical JavaScript.
3. Offload tasks to `requestIdleCallback()` or Web Workers.
4. Avoid layout thrashing and DOM querying inside loops."

---

## 🏗️ Part 7.2: 20 Portfolio Architecture Questions (Q81 – Q100)

### Question 81: What architectural decisions make this portfolio maintenance-free for years?
**Candidate Response & Rationale:**
"Zero external npm dependencies, serverless AWS S3 static hosting, CloudFront ACM auto-renewing SSL certificates, and standard CSS Custom Properties ensure zero breaking package upgrades or node runtime deprecation vulnerabilities."

### Question 82: How is the contact form structured to prevent spam submissions without heavy CAPTCHA scripts?
**Candidate Response & Rationale:**
"Uses a hidden honeypot field (`<input name="website" tabindex="-1" style="display:none">`) and client-side rate-limiting timers. Automated spam bots fill out invisible inputs, triggering immediate silent rejection."

### Question 83: How is dark theme state persisted across user sessions?
**Candidate Response & Rationale:**
"`js/theme.js` stores theme preference in `localStorage.setItem('theme', 'dark')`. An inline head script reads `localStorage` before rendering HTML body to prevent Flash of Unstyled Content (FOUC)."

### Question 84: How do you ensure zero FOUC (Flash of Unstyled Content) during theme loading?
**Candidate Response & Rationale:**
"Theme detection logic executes synchronously inside a `<script>` tag in the `<head>` *before* CSS rendering, setting `<html data-theme="dark">` immediately."

### Question 85: How is the reading progress bar implemented without causing scroll lag?
**Candidate Response & Rationale:**
"Uses a lightweight passive scroll listener (`{ passive: true }`) updating `transform: scaleX(progress)` with `transform-origin: left` on GPU composited layers."

### Question 86: How does the sticky navigation bar detect active scroll sections?
**Candidate Response & Rationale:**
"Uses `IntersectionObserver` with `rootMargin: '-20% 0px -70% 0px'` to detect when section headers cross the viewport reading focal point, toggling `.active` state on navbar links."

### Question 87: What is the directory structure strategy of this repository?
**Candidate Response & Rationale:**
"Follows a clean modular separation: `/css/` (styles), `/js/` (modules), `/assets/` (images/resumes), `/docs/` (architectural guides), and `/public/` (SEO & PWA manifests)."

### Question 88: How are interactive skill category pills filtered in the UI?
**Candidate Response & Rationale:**
"Skill category pills use `data-filter` attributes. Clicking a filter toggles `.is-active` state and updates CSS visibility on skill cards with smooth opacity transitions."

### Question 89: How is the custom 404 error page (`404.html`) integrated into Vite builds?
**Candidate Response & Rationale:**
"Configured multi-page rollup inputs in `vite.config.ts` (`input: { main: 'index.html', nested: '404.html' }`), ensuring both files compile into the production `dist/` bundle."

### Question 90: How are SVG icons rendered efficiently across light and dark modes?
**Candidate Response & Rationale:**
"SVG icons use inline `<svg>` markup with `currentColor` stroke and fill properties, inheriting CSS parent text colors dynamically."

### Question 91: How does the back-to-top button manage visibility and smooth scrolling?
**Candidate Response & Rationale:**
"Displays when `window.scrollY > 400px`. Clicking invokes `window.scrollTo({ top: 0, behavior: 'smooth' })`, respecting `prefers-reduced-motion` settings."

### Question 92: How are certification card modal views or links secured?
**Candidate Response & Rationale:**
"All external links specify `target="_blank"` and `rel="noopener noreferrer"` to prevent reverse tab-nabbing vulnerabilities."

### Question 93: How is typography scaled responsively across mobile and desktop displays?
**Candidate Response & Rationale:**
"Uses CSS `clamp()` functions (e.g., `font-size: clamp(2rem, 4vw, 3.5rem)`) for fluid display headings without discrete breakpoints."

### Question 94: How do you verify that zero hardcoded `localhost` references exist in production builds?
**Candidate Response & Rationale:**
"Executed automated grep validation scripts across `dist/` directory prior to deployment sync."

### Question 95: How is the vector SVG favicon configured for dark and light OS themes?
**Candidate Response & Rationale:**
"`public/favicon.svg` uses CSS media query `@media (prefers-color-scheme: dark)` inside the SVG code to adjust stroke fills automatically."

### Question 96: How are project card tags and external repository links formatted?
**Candidate Response & Rationale:**
"Rendered using semantic flexbox badges with high-contrast neutral backgrounds and hover translate effects."

### Question 97: How does the mobile hamburger menu manage keyboard focus trapping?
**Candidate Response & Rationale:**
"When opened, focus is trapped inside the mobile nav overlay drawer; pressing `ESC` closes the menu and returns focus to the toggle button."

### Question 98: How are asset paths configured in Vite for relative root deployments?
**Candidate Response & Rationale:**
"`vite.config.ts` specifies `base: './'` ensuring relative path resolution for static hosting on any root domain or subdirectory."

### Question 99: How are recruiter call-to-action (CTA) buttons prioritized visually?
**Candidate Response & Rationale:**
"Primary CTA ('Get in Touch') utilizes metallic gold background gradient, while secondary CTA ('Download Resume') utilizes high-contrast outlined borders."

### Question 100: How do you track application bundle size in CI/CD?
**Candidate Response & Rationale:**
"Vite build logs report asset bundle sizes. Build steps fail if bundle size exceeds predefined thresholds."

---

## ♿ Part 7.3: 20 Accessibility (WCAG 2.1 AA) Questions (Q101 – Q120)

### Question 101: What is the minimum WCAG 2.1 AA color contrast ratio for normal body text?
**Candidate Response & Rationale:**
"`4.5:1` for normal body text (<18pt / 24px) and `3.0:1` for large text (>=18pt or 14pt bold). Our palette achieves `15.8:1`."

### Question 102: How does `aria-live="polite"` differ from `aria-live="assertive"`?
**Candidate Response & Rationale:**
"`polite` waits for screen readers to finish current speech before announcing updates (ideal for form status). `assertive` interrupts current speech immediately (ideal for critical alerts)."

### Question 103: What is the purpose of `aria-expanded="true/false"`?
**Candidate Response & Rationale:**
"Informs assistive technologies whether a collapsable container (like a mobile drawer menu) is currently expanded or collapsed."

### Question 104: Why should `outline: none` never be used without a focus replacement?
**Candidate Response & Rationale:**
"Removing outline rings hides focus location for keyboard users. We replace default focus rings with custom visible gold outlines (`:focus-visible`)."

### Question 105: What is the difference between `alt=""` (empty) and omitting the `alt` attribute?
**Candidate Response & Rationale:**
"`alt=""` marks an image as decorative (screen readers skip it). Omitting `alt` causes screen readers to read raw image filenames aloud."

### Question 106: How do skip links improve keyboard accessibility?
**Candidate Response & Rationale:**
"Skip links allow keyboard users to jump directly to `#main-content`, bypassing repetitive header navigation links."

### Question 107: How do you make custom icon buttons accessible to screen readers?
**Candidate Response & Rationale:**
"Include an `aria-label="Descriptive Action"` attribute and mark decorative SVG icons with `aria-hidden="true"`."

### Question 108: What are ARIA Landmarks and how do screen readers use them?
**Candidate Response & Rationale:**
"Semantic regions (`<header>`, `<nav>`, `<main>`, `<footer>`) establish landmark regions allowing screen reader users to jump quickly across page sections."

### Question 109: What is WCAG 2.1 Focus Visible Criterion 2.4.7?
**Candidate Response & Rationale:**
"Requires that any keyboard-operable user interface has a mode of operation where the keyboard focus indicator is visibly clear."

### Question 110: How do you make form inputs accessible?
**Candidate Response & Rationale:**
"Bind explicit `<label for="id">` elements to `<input id="id">` controls, and provide descriptive `aria-describedby` error hints."

### Question 111: What is `tabindex="0"` versus `tabindex="-1"`?
**Candidate Response & Rationale:**
"- `tabindex="0"`: Inserts non-interactive element into natural tab order.
- `tabindex="-1"`: Makes element programmatically focusable via JS without putting it in tab sequence."

### Question 112: How does `prefers-reduced-motion` CSS media query protect users?
**Candidate Response & Rationale:**
"Protects users with vestibular disorders by disabling large motion shifts, parallax, and scroll animations."

### Question 113: What is WCAG Criterion 1.4.1 (Use of Color)?
**Candidate Response & Rationale:**
"Color must not be used as the sole visual means of conveying information; information must be supplemented with text or icons."

### Question 114: How do screen readers announce table headers?
**Candidate Response & Rationale:**
"Using semantic `<th>` tags with explicit `scope="col"` or `scope="row"` attributes."

### Question 115: What is the minimum touch target size according to WCAG 2.1 AA?
**Candidate Response & Rationale:**
"`44px x 44px` minimum interactive touch area for mobile buttons and links."

### Question 116: How do you test web accessibility without automated tools?
**Candidate Response & Rationale:**
"Perform full keyboard navigation (Tab, Shift+Tab, Space, Enter, Esc) with screen turned off using VoiceOver or NVDA."

### Question 117: What is `role="status"` versus `role="alert"`?
**Candidate Response & Rationale:**
"- `role="status"`: Implicit `aria-live="polite"` container.
- `role="alert"`: Implicit `aria-live="assertive"` error container."

### Question 118: How do you ensure accessible heading structure (`h1`-`h6`)?
**Candidate Response & Rationale:**
"Establish strict hierarchical heading levels without skipping levels (e.g., `h1` ➔ `h2` ➔ `h3`)."

### Question 119: What is WCAG Criterion 2.1.1 (Keyboard Accessible)?
**Candidate Response & Rationale:**
"All functionality of the content must be operable through a keyboard interface without requiring specific timings for keystrokes."

### Question 120: What automated tool audits WCAG compliance during development?
**Candidate Response & Rationale:**
"Axe-core, Lighthouse Accessibility Audit, and WAVE browser extensions."

---

## ⚡ Part 7.4: 20 Performance & Web Optimization Questions (Q121 – Q140)

### Question 121: What is Time To First Byte (TTFB), and how do you minimize it?
**Candidate Response & Rationale:**
"TTFB measures time from client HTTP request to receiving the first byte of data. CloudFront CDN edge caching reduces TTFB from ~350ms to <15ms."

### Question 122: What is First Contentful Paint (FCP)?
**Candidate Response & Rationale:**
"FCP measures time when the browser renders the first bit of DOM content (text, canvas, image). Preconnecting fonts and inline CSS tokens keeps FCP <0.8s."

### Question 123: What is Largest Contentful Paint (LCP), and how do you optimize it?
**Candidate Response & Rationale:**
"LCP measures render time of the largest visual image or text block. Preloading the hero profile image (`fetchpriority="high"`) optimizes LCP <1.0s."

### Question 124: What is Cumulative Layout Shift (CLS), and how did you achieve CLS = 0.000?
**Candidate Response & Rationale:**
"CLS measures visual layout instability. Achieved 0.000 by setting explicit `width` and `height` attributes on all image elements."

### Question 125: What is Total Blocking Time (TBT)?
**Candidate Response & Rationale:**
"TBT measures time between FCP and Time to Interactive (TTI) where the main thread was blocked. Zero JS framework overhead keeps TBT = 0ms."

### Question 126: Explain Critical Rendering Path optimization.
**Candidate Response & Rationale:**
"Minimizing render-blocking resources by inlining critical CSS variables, deferring non-critical scripts, and preconnecting web fonts."

### Question 127: What is the benefit of WebP and AVIF image formats?
**Candidate Response & Rationale:**
"WebP and AVIF provide superior lossy and lossless compression, yielding file sizes 30–50% smaller than legacy PNGs and JPEGs."

### Question 128: How does `<link rel="preconnect">` differ from `<link rel="dns-prefetch">`?
**Candidate Response & Rationale:**
"- `dns-prefetch`: Performs DNS lookup only.
- `preconnect`: Performs DNS lookup, TCP handshake, and TLS negotiation ahead of asset requests."

### Question 129: What is DOMContentLoaded versus window.onload event?
**Candidate Response & Rationale:**
"- `DOMContentLoaded`: Fires when initial HTML document is fully parsed without waiting for images or stylesheets.
- `window.onload`: Fires when HTML, images, subframes, and stylesheets have completely finished downloading."

### Question 130: What is passive event listener (`{ passive: true }`)?
**Candidate Response & Rationale:**
"Instructs browser that scroll listeners will not call `event.preventDefault()`, allowing smooth GPU scrolling without waiting for JS execution."

### Question 131: What is HTTP/2 Multiplexing?
**Candidate Response & Rationale:**
"Allows sending multiple HTTP requests and responses concurrently over a single TCP connection, eliminating head-of-line blocking."

### Question 132: What is Resource Hint `fetchpriority="high"`?
**Candidate Response & Rationale:**
"Signals the browser's preload scanner to prioritize fetching a critical asset (like an LCP hero image) ahead of lower priority scripts."

### Question 133: How does CSS `contain: layout style` improve performance?
**Candidate Response & Rationale:**
"Informs the browser layout engine that an element's subtree is isolated, preventing layout changes inside from triggering document-wide reflows."

### Question 134: Why avoid `@import` inside CSS stylesheets?
**Candidate Response & Rationale:**
"`@import` creates sequential CSS download waterfalls. Link tags in HTML allow browsers to fetch stylesheets concurrently."

### Question 135: What is Tree Shaking in modern JS bundlers?
**Candidate Response & Rationale:**
"Static analysis technique used by Vite/Rollup to eliminate unused dead code from compiled production JavaScript bundles."

### Question 136: What is HTTP/3 (QUIC)?
**Candidate Response & Rationale:**
"Next-gen transport protocol built on UDP instead of TCP, providing faster connection establishment and zero head-of-line packet loss blocking."

### Question 137: How do you analyze performance bottlenecks using Chrome DevTools?
**Candidate Response & Rationale:**
"Record DevTools Performance traces, analyze main thread flame charts, identify Long Tasks (>50ms), and inspect Layout Instability shifts."

### Question 138: What is Cache-Control `immutable` directive?
**Candidate Response & Rationale:**
"Indicates that response content will never change over its lifetime, preventing browsers from revalidating assets even on page refresh."

### Question 139: How does code splitting work in Vite?
**Candidate Response & Rationale:**
"Splits JavaScript bundles into dynamic chunks (`import()`), loading code on demand to minimize initial payload sizes."

### Question 140: What is the impact of excessive DOM depth on performance?
**Candidate Response & Rationale:**
"Deeply nested DOM nodes increase memory consumption, slow down DOM traversals, and amplify reflow/repaint recalculation times."

---

## 🚀 5 Senior Engineering Tips for Candidate Success

1. **Speak in Metrics and Outcomes:** Always tie technical decisions back to Lighthouse scores, bundle sizes, accessibility contrast ratios, or AWS latency figures.
2. **Explain the Trade-offs:** Show seniority by acknowledging why a framework wasn't used, and when it *should* be used (e.g., "For complex stateful web apps, React is ideal; for portfolio speed, Vanilla JS wins").
3. **Master Browser Engine Fundamentals:** Understand reflow vs repaint, GPU compositing (`transform` and `opacity`), and non-blocking script deferral.
4. **Emphasize Cloud Cost Engineering:** Mention how static S3 hosting + CloudFront OAC costs pennies per month compared to server-side Node container hosting.
5. **Demonstrate Defense-in-Depth Accessibility:** Treat WCAG AAA, keyboard navigation, and screen reader landmarks as first-class architectural requirements, not afterthoughts.

---

## ⚠️ Common Beginner Mistakes Avoided

| Beginner Mistake | Our Engineering Solution |
| :--- | :--- |
| Hardcoding hex colors directly in CSS rules | Used centralized design tokens in `variables.css`. |
| Adding 200MB `node_modules` for a static site | Used 0 external npm dependencies; 100% native Web standards. |
| Making S3 bucket world-readable | Blocked all S3 public access; restricted origin to CloudFront OAC. |
| Layout shifts when dark mode toggles | Maintained identical spacing/box models; updated color properties only. |
| Missing keyboard focus outlines (`outline: none`) | Added explicit high-contrast `:focus-visible` gold outline ring. |
| Using `position: fixed` for headers | Used `position: sticky` to preserve native flow and prevent content overlap. |
| Lazy loading LCP hero images | Applied `loading="eager"` and `fetchpriority="high"` for instant hero paint. |

---

## 🏛️ Architecture & Frontend Best Practices Discussion

### 1. Separation of Concerns
- **HTML5:** Pure semantic markup and accessibility tree representation.
- **CSS3:** Tokenized design system, responsive media queries, and GPU keyframe animations.
- **Vanilla ES6+ JS:** Pure event listeners, DOM state observers, and progressive enhancement.

### 2. AWS Cloud Platform Compatibility
- Zero server-side runtime code; 100% compatible with AWS S3 static website endpoints, CloudFront edge distribution, AWS Route 53, and AWS Certificate Manager (ACM).
