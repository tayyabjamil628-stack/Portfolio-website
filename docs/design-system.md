# Design System Specifications & CSS Tokens

**Project:** Personal Engineering Portfolio  
**Owner:** Malik Tayyab Jamil  
**Design Persona:** Professional Corporate, Modern, Minimal, AWS Cloud Authority  

---

## 1. Color System & Contrast Matrix

The design system utilizes a high-contrast corporate palette with dark slate primaries, warm metallic gold accents, and pure neutral light/dark background canvases.

### Primary Tokens:
- **Primary Slate (`#0F172A`):** Used for primary headings, hero text, light mode text, and dark mode card surfaces.
- **Secondary Slate (`#1E293B`):** Used for secondary cards, navbar surfaces, subtle borders, and dark mode hover states.
- **Metallic Gold Accent (`#D4AF37`):** Brand accent used for call-to-actions, active navigation indicators, key metrics, and hover highlights.
- **Hover Gold (`#C59B27`):** Darkened gold used for button active states and mouse hover focus loops.

### Light & Dark Canvas Matrix:

| Token Name | Light Mode Value | Dark Mode Value | WCAG Contrast Ratio (Text vs Bg) |
| :--- | :--- | :--- | :--- |
| `var(--color-bg)` | `#FFFFFF` (Pure White) | `#020617` (Obsidian Slate) | Baseline Background |
| `var(--color-surface)` | `#F8FAFC` (Slate 50) | `#0F172A` (Slate 900) | 1.05:1 Surface contrast |
| `var(--color-border)` | `#E2E8F0` (Slate 200) | `#1E293B` (Slate 800) | Distinct border contrast |
| `var(--color-text-primary)` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | **15.8:1 (WCAG AAA Pass)** |
| `var(--color-text-secondary)` | `#475569` (Slate 600) | `#94A3B8` (Slate 400) | **4.8:1 (WCAG AA Pass)** |
| `var(--color-accent)` | `#D4AF37` (Gold) | `#D4AF37` (Gold) | High visual punch on dark/light |

---

## 2. Typography System

The typography pairs **Poppins** (Geometric display font for strong authority headings) with **Inter** (Highly legible neutral body sans-serif font).

```
Display Headings: Poppins (700 Bold / 600 SemiBold)
Body & UI Text:  Inter (400 Regular / 500 Medium)
Monospace Code:  JetBrains Mono / System Monospace (400 Regular)
```

### Type Scale (Major Second Ratio 1.125):

| Scale Level | CSS Variable | Rem / Pixel Size | Usage Context |
| :--- | :--- | :--- | :--- |
| **xs** | `var(--font-size-xs)` | `0.75rem` (12px) | Badges, Timestamps, Captions |
| **sm** | `var(--font-size-sm)` | `0.875rem` (14px) | Navigation, Buttons, Meta tags |
| **base** | `var(--font-size-base)` | `1.00rem` (16px) | Body text, Paragraphs, Inputs |
| **lg** | `var(--font-size-lg)` | `1.125rem` (18px) | Subtitles, Large buttons |
| **xl** | `var(--font-size-xl)` | `1.25rem` (20px) | Card Headings (H4) |
| **2xl** | `var(--font-size-2xl)` | `1.50rem` (24px) | Section Subheadings (H3) |
| **3xl** | `var(--font-size-3xl)` | `1.875rem` (30px) | Section Headings (H2) |
| **4xl** | `var(--font-size-4xl)` | `2.25rem` (36px) | Hero Subtitle |
| **5xl** | `var(--font-size-5xl)` | `3.00rem` (48px) | Hero Title (H1 Desktop) |

---

## 3. Spacing Grid (4px Grid System)

All margin, padding, gap, and dimension tokens follow a strict 4px / 8px grid mathematical scale to maintain visual rhythm:

- `--space-1`: 4px (`0.25rem`)
- `--space-2`: 8px (`0.5rem`)
- `--space-3`: 12px (`0.75rem`)
- `--space-4`: 16px (`1.0rem`) - Standard container padding minimum
- `--space-6`: 24px (`1.5rem`) - Card padding & default grid gap
- `--space-8`: 32px (`2.0rem`) - Large card padding & section gaps
- `--space-12`: 48px (`3.0rem`) - Major section padding top/bottom
- `--space-16`: 64px (`4.0rem`) - Hero & major divider padding

---

## 4. Elevation, Radii & Shadow System

```css
--radius-sm: 0.375rem; /* 6px - Buttons & Inputs */
--radius-md: 0.5rem;   /* 8px - Small cards & badges */
--radius-lg: 0.75rem;  /* 12px - Project & Feature cards */
--radius-xl: 1.0rem;   /* 16px - Hero containers & Spec frames */
--radius-pill: 9999px; /* Badges & Circular Buttons */
```

### Shadows:
- `var(--shadow-sm)`: Subtle card elevation.
- `var(--shadow-md)`: Default hover card elevation.
- `var(--shadow-gold)`: `0 10px 25px -5px rgba(212, 175, 55, 0.25)` (Call-to-action hover glow).

---

## 5. CSS Naming Conventions (BEM + Functional Data Attributes)

To maintain zero CSS duplication and prevent scope leaks without build tools, the architecture enforces **Block-Element-Modifier (BEM)** class naming combined with functional `data-*` state attributes:

```html
<!-- BEM Pattern -->
<article class="project-card project-card--featured">
  <div class="project-card__header">
    <h3 class="project-card__title">AWS Serverless Architecture</h3>
  </div>
  <div class="project-card__body">
    <p class="project-card__description">...</p>
  </div>
</article>

<!-- Functional Data Attributes for JavaScript State Handling -->
<button data-theme-toggle aria-pressed="false" class="btn btn-secondary">
  <span class="theme-toggle-icon">🌙</span>
</button>
```
