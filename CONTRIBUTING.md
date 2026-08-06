# 🤝 Contributing to Malik Tayyab Jamil's Portfolio

Thank you for taking the time to review or contribute to the **Malik Tayyab Jamil Engineering Portfolio Application**!

---

## 🚀 How to Get Started

1. **Fork the Repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Portfolio-Website.git
   cd Portfolio-Website
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 🛠️ Code Standards & Rules

- **HTML:** Maintain semantic HTML5 markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`). Ensure all interactive controls have accessible `aria-*` attributes.
- **CSS:** Use CSS custom properties defined in `css/variables.css`. Maintain strict WCAG 2.1 AA color contrast compliance.
- **JavaScript:** Native Vanilla ES6+ modules without heavy third-party framework overhead. Keep event listeners passive where possible.
- **Type Checking & Linting:** Run `npm run lint` prior to submitting any Pull Request.

---

## 📬 Submitting Pull Requests

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/amazing-improvement
   ```
2. Commit your changes following conventional commit syntax (`feat:`, `fix:`, `docs:`, `perf:`):
   ```bash
   git commit -m "docs: update AWS deployment guide credentials"
   ```
3. Push to your branch and open a Pull Request against `main`.
