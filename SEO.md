# 🔍 SEO & Metadata Architecture Documentation

This document specifies the Search Engine Optimization (SEO), structured data, and social media sharing strategy implemented in the **Malik Tayyab Jamil Portfolio Application**.

---

## 🎯 Target Lighthouse Score: 100/100 SEO

### Key SEO Capabilities Implemented:
1. **Indexability & Crawling Control (`robots.txt` & `sitemap.xml`)**
2. **Canonical Domain Enforcement (`https://tayyabjamil.com/`)**
3. **Structured Data JSON-LD (`Schema.org/Person` & `Schema.org/WebSite`)**
4. **Social Sharing Cards (Open Graph & Twitter Summary Large Image)**
5. **Progressive Web App Manifest (`site.webmanifest`)**
6. **Custom Design-System 404 Error Engine (`404.html`)**

---

## 📄 Metadata Specification

### 1. Primary Page Metadata
```html
<title>Malik Tayyab Jamil | Software Engineer & Cloud Specialist Portfolio</title>
<meta name="description" content="Official Engineering Portfolio of Malik Tayyab Jamil - Cloud Computing Intern @ DecodeLabs, AWS Cloud Practitioner, BS Software Engineering @ PAF-IAST." />
<meta name="keywords" content="Malik Tayyab Jamil, Software Engineer, Cloud Engineer, AWS Cloud Practitioner, DecodeLabs, PAF-IAST, Web Development, Full Stack Developer, DevSecOps, Haripur Pakistan" />
<meta name="author" content="Malik Tayyab Jamil" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="https://tayyabjamil.com/" />
```

### 2. Open Graph (Facebook & LinkedIn Sharing)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://tayyabjamil.com/" />
<meta property="og:title" content="Malik Tayyab Jamil | Software Engineer & Cloud Specialist" />
<meta property="og:description" content="Official Engineering Portfolio of Malik Tayyab Jamil - Cloud Computing Intern @ DecodeLabs, AWS Cloud Practitioner, BS Software Engineering @ PAF-IAST." />
<meta property="og:image" content="https://tayyabjamil.com/assets/images/profile/profile.png" />
<meta property="og:site_name" content="Malik Tayyab Jamil Portfolio" />
```

### 3. Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Malik Tayyab Jamil | Software Engineer & Cloud Specialist" />
<meta name="twitter:description" content="Official Engineering Portfolio of Malik Tayyab Jamil - Cloud Computing Intern @ DecodeLabs, AWS Cloud Practitioner, BS Software Engineering @ PAF-IAST." />
<meta name="twitter:image" content="https://tayyabjamil.com/assets/images/profile/profile.png" />
<meta name="twitter:creator" content="@tayyabjamil628" />
```

---

## Structured Data Schema (`JSON-LD`)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Malik Tayyab Jamil",
  "jobTitle": "Cloud Computing Intern & Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "DecodeLabs"
  },
  "almaMater": {
    "@type": "CollegeOrUniversity",
    "name": "Pak-Austria Fachhochschule: Institute of Applied Sciences and Technology (PAF-IAST)"
  },
  "url": "https://tayyabjamil.com/",
  "sameAs": [
    "https://github.com/TayyabJamil-628",
    "https://linkedin.com/in/tayyabjamil628"
  ],
  "knowsAbout": [
    "Cloud Computing",
    "AWS Architecture",
    "Software Engineering",
    "Cybersecurity",
    "Artificial Intelligence",
    "High Performance Computing",
    "Embedded AI"
  ],
  "email": "tayyabjamil628@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Haripur",
    "addressRegion": "KPK",
    "addressCountry": "Pakistan"
  }
}
```

---

## 🗺️ Sitemap & Search Console Strategy

The XML sitemap (`/sitemap.xml`) indexes all core section anchors:
- `https://tayyabjamil.com/` (Priority: 1.0)
- `https://tayyabjamil.com/#projects` (Priority: 0.9)
- `https://tayyabjamil.com/#about` (Priority: 0.8)
- `https://tayyabjamil.com/#skills` (Priority: 0.8)
- `https://tayyabjamil.com/#experience` (Priority: 0.8)
- `https://tayyabjamil.com/#education` (Priority: 0.8)
- `https://tayyabjamil.com/#certifications` (Priority: 0.8)
- `https://tayyabjamil.com/#contact` (Priority: 0.8)

---

## 🟢 SEO Verification Criteria
- [x] Title tags under 60 characters
- [x] Meta descriptions under 160 characters
- [x] Valid JSON-LD schema passing Google Rich Results Test
- [x] Valid XML sitemap linked in `robots.txt`
- [x] Semantic HTML5 headings (`h1` -> `h2` -> `h3`) with zero heading level skips
