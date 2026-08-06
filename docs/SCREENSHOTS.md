# 📸 Screenshots & Visual Preview Catalog

This document defines the responsive viewports, visual theme states, and key component preview specifications for the **Malik Tayyab Jamil Portfolio Application**.

---

## 🖥️ Viewport Matrix & Devices

| Viewport Category | Screen Width | Aspect Ratio | Target Device Reference |
| :--- | :--- | :--- | :--- |
| **Desktop Ultra-Wide / Monitor** | `1920px` x `1080px` | 16:9 | 27" 4K Monitor |
| **Desktop Standard / Laptop** | `1440px` x `900px` | 16:10 | 14" MacBook Pro |
| **Tablet Vertical** | `768px` x `1024px` | 3:4 | iPad Air / Mini |
| **Mobile Standard** | `375px` x `812px` | 9:19.5 | iPhone 14 / 15 |

---

## 🎨 Theme & Section Showcase Map

### 1. Hero Section & Header Navigation
- **Desktop Light Theme:** High-contrast slate typography (`#0f172a`), metallic gold accent badges (`#d97706`), preloaded 600x800 portrait image, and live scroll-reading progress bar.
- **Desktop Dark Theme:** Slate dark canvas (`#0f172a`), amber glow buttons, and sticky navigation bar with active section scroll-spy indicator.

### 2. About Section & Skills Matrix
- **Light & Dark Views:** Dual-column layout featuring Malik Tayyab Jamil's DecodeLabs internship narrative, PAF-IAST academic background, and interactive skill category pill filters (Cloud & DevOps, Software Engineering, Languages, Tools).

### 3. Engineering Journey Timeline & Projects
- **Responsive Layout:**
  - **Desktop:** Vertical central timeline with staggering left/right milestone cards.
  - **Mobile:** Single-column layout with left border indicator and touch-friendly project tags.

### 4. Experience, Education & Certifications
- **Visual Design:** High-contrast cards showcasing BS Software Engineering at PAF-IAST, Cloud Computing Intern at DecodeLabs, and AWS Cloud Practitioner & Cybersecurity certifications.

### 5. Recruiter Contact Form & Interactive Status
- **Interactive States:** Accessible form controls with real-time field validation, active focus rings (`outline: 3px solid var(--color-accent)`), and screen-reader live alerts (`aria-live="polite"`).

### 6. Custom Design-System 404 Engine (`404.html`)
- **Error UI:** Custom error canvas featuring theme toggle, AWS CloudFront edge message, quick search navigation links, and primary "Return to Home" CTA.
