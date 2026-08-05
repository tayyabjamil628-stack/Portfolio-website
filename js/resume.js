/**
 * ============================================================================
 * DYNAMIC RESUME GENERATOR ENGINE - RESUME.JS
 * Project: Malik Tayyab Jamil Portfolio
 * Description: Dynamically extracts portfolio sections and builds a printable /
 *              downloadable executive resume (PDF & HTML format).
 * ============================================================================
 */

(function () {
  'use strict';

  /**
   * Scrape live data from the website DOM sections
   */
  function extractPortfolioData() {
    // 1. Contact / Header Info
    const name = document.querySelector('.hero-heading')?.textContent.trim() || 'Malik Tayyab Jamil';
    const email = 'tayyabjamil628@gmail.com';
    const location = 'Haripur, KPK, Pakistan';
    const github = 'https://github.com/tayyabjamil628-stack';
    const linkedin = 'https://www.linkedin.com/in/malik-tayyab-jamil-74187a333';
    
    // 2. Summary
    const heroDesc = document.querySelector('.hero-description')?.textContent.trim() || '';
    const summary = heroDesc || 'BS Software Engineering student at PAF-IAST with specialized experience in Cloud Computing, DevSecOps, Cybersecurity, High Performance Computing, and Embedded Systems.';

    // 3. Experience
    const experience = [
      {
        role: 'Cloud Computing Intern',
        company: 'DecodeLabs (1 Month | Active Internship)',
        location: 'Hybrid / Remote',
        points: [
          'Architecting serverless backend workflows utilizing AWS Lambda, S3 storage buckets, and API Gateway integration.',
          'Setting up least-privilege AWS IAM policies, security groups, and VPC networking controls for secure cloud assets.',
          'Deploying optimized static web applications with global CDN distribution via AWS CloudFront and custom SSL certificates.',
          'Containerizing microservices with Docker and maintaining Linux server runtime environments.'
        ]
      },
      {
        role: 'HPC Intern',
        company: 'CAID NAMAL University',
        location: 'Namal University',
        points: [
          'Hands-on research and laboratory development in High Performance Computing (HPC).',
          'Implementing parallel algorithms, thread synchronization, and CUDA GPU acceleration.'
        ]
      }
    ];

    // 4. Education
    const education = [
      {
        degree: 'BS Software Engineering',
        institution: 'Pak-Austria Fachhochschule: Institute of Applied Sciences and Technology (PAF-IAST)',
        status: 'Enrolled (6th Semester) • Expected Graduation: 2026',
        details: 'Rigorous software engineering curriculum covering Operating Systems, Database Systems, Software Architecture, Cloud Computing, Computer Networks, Artificial Intelligence, and High Performance Computing.'
      }
    ];

    // 5. Featured Projects (Extracted from DOM or structured defaults)
    const projectCards = document.querySelectorAll('.project-card');
    const projects = [];
    if (projectCards.length > 0) {
      projectCards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent.trim();
        const desc = card.querySelector('.project-description')?.textContent.trim();
        const tags = Array.from(card.querySelectorAll('.tech-badge')).map(b => b.textContent.trim());
        if (title && desc) {
          projects.push({ title, desc, tags });
        }
      });
    } else {
      projects.push(
        {
          title: 'Smart Gas Leakage Detection System',
          desc: 'Embedded IoT system with ESP8266 microcontroller and MQ-2 sensor. Features real-time SMS/Call alerts via Twilio API and live telemetry web dashboard.',
          tags: ['C++', 'ESP8266', 'Twilio API', 'IoT', 'WebSockets']
        },
        {
          title: 'Cloud Portfolio Website',
          desc: 'Production-ready engineering portfolio hosted on AWS S3 with CloudFront CDN distribution, Route53 DNS, custom design tokens, and accessibility standards.',
          tags: ['AWS S3', 'CloudFront', 'Route53', 'HTML5/CSS3', 'JavaScript']
        },
        {
          title: 'HPC Learning Journey',
          desc: 'High Performance Computing lab focusing on parallel processing benchmarks, shared-memory threads, CUDA GPU acceleration, and Linux system optimization.',
          tags: ['CUDA', 'C/C++', 'Linux', 'OpenMP', 'Parallel Computing']
        }
      );
    }

    // 6. Technical Skills (Extracted from DOM or defaults)
    const skills = [
      { category: 'Cloud Computing', items: ['AWS (S3, CloudFront, IAM, Lambda, EC2)', 'Serverless Architecture', 'CDN Delivery', 'VPC Networking'] },
      { category: 'DevSecOps & Security', items: ['Linux Systems Administration', 'Network Security', 'Git/GitHub', 'Docker', 'IAM Policy Design'] },
      { category: 'Programming & Scripting', items: ['Python', 'C / C++', 'SQL (PostgreSQL, MySQL)', 'JavaScript (ES6+)', 'Bash Shell Scripting'] },
      { category: 'Web & Systems', items: ['HTML5 / CSS3', 'RESTful API Integration', 'Responsive Design', 'System Architecture'] },
      { category: 'High Performance & AI', items: ['CUDA Acceleration', 'OpenMP', 'Parallel Computing', 'Edge Computing', 'Embedded AI'] }
    ];

    // 7. Certifications (Extracted from DOM)
    const certCards = document.querySelectorAll('.cert-card');
    const certifications = [];
    certCards.forEach(card => {
      const title = card.querySelector('.cert-title')?.textContent.trim();
      const provider = card.querySelector('.cert-provider')?.textContent.trim();
      const meta = card.querySelector('.cert-meta')?.textContent.trim();
      if (title && provider) {
        certifications.push({ title, provider, meta });
      }
    });

    return {
      name,
      email,
      location,
      github,
      linkedin,
      summary,
      experience,
      education,
      projects,
      skills,
      certifications
    };
  }

  /**
   * Build clean HTML representation of the resume for printing/modal
   */
  function buildResumeHTML(data) {
    return `
      <div class="resume-paper" id="printable-resume-paper">
        <!-- Resume Header -->
        <header class="resume-header">
          <h1 class="resume-name">${data.name}</h1>
          <div class="resume-subtitle">Software Engineering Student | Cloud Computing & DevSecOps Specialist</div>
          <div class="resume-contact-bar">
            <span>📍 ${data.location}</span>
            <span>✉ <a href="mailto:${data.email}">${data.email}</a></span>
            <span>💻 <a href="${data.github}" target="_blank">GitHub</a></span>
            <span>💼 <a href="${data.linkedin}" target="_blank">LinkedIn</a></span>
          </div>
        </header>

        <!-- Professional Summary -->
        <section class="resume-section">
          <h2 class="resume-section-title">Professional Summary</h2>
          <p class="resume-text">${data.summary}</p>
        </section>

        <!-- Education -->
        <section class="resume-section">
          <h2 class="resume-section-title">Education</h2>
          ${data.education.map(edu => `
            <div class="resume-item">
              <div class="resume-item-header">
                <span class="resume-item-title">${edu.degree}</span>
                <span class="resume-item-date">${edu.status}</span>
              </div>
              <div class="resume-item-sub">${edu.institution}</div>
              <p class="resume-text">${edu.details}</p>
            </div>
          `).join('')}
        </section>

        <!-- Technical Skills -->
        <section class="resume-section">
          <h2 class="resume-section-title">Technical Skills</h2>
          <div class="resume-skills-grid">
            ${data.skills.map(skill => `
              <div class="resume-skill-cat">
                <strong>${skill.category}:</strong> ${skill.items.join(', ')}
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Professional & Academic Experience -->
        <section class="resume-section">
          <h2 class="resume-section-title">Experience & Roles</h2>
          ${data.experience.map(exp => `
            <div class="resume-item">
              <div class="resume-item-header">
                <span class="resume-item-title">${exp.role}</span>
                <span class="resume-item-date">${exp.location}</span>
              </div>
              <div class="resume-item-sub">${exp.company}</div>
              <ul class="resume-list">
                ${exp.points.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </section>

        <!-- Key Engineering Projects -->
        <section class="resume-section">
          <h2 class="resume-section-title">Featured Projects</h2>
          ${data.projects.map(proj => `
            <div class="resume-item">
              <div class="resume-item-header">
                <span class="resume-item-title">${proj.title}</span>
                <span class="resume-item-tags">[${proj.tags.join(', ')}]</span>
              </div>
              <p class="resume-text">${proj.desc}</p>
            </div>
          `).join('')}
        </section>

        <!-- Verified Certifications -->
        <section class="resume-section">
          <h2 class="resume-section-title">Verified Certifications</h2>
          <div class="resume-certs-list">
            ${data.certifications.map(c => `
              <div class="resume-cert-item">
                <strong>${c.title}</strong> — ${c.provider} (${c.meta.replace(/[\n\r\s]+/g, ' ')})
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  /**
   * Inject print container into document body
   */
  function ensurePrintContainer(data) {
    let container = document.getElementById('printable-resume-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'printable-resume-container';
      document.body.appendChild(container);
    }
    container.innerHTML = buildResumeHTML(data);
  }

  /**
   * Show Resume Preview & Options Modal
   */
  function showResumeModal() {
    const data = extractPortfolioData();
    ensurePrintContainer(data);

    // Remove existing modal if open
    const existingModal = document.getElementById('resume-modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'resume-modal-overlay';
    modal.className = 'resume-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Generated Resume Preview');

    modal.innerHTML = `
      <div class="resume-modal-card">
        <div class="resume-modal-header">
          <div>
            <h3 class="resume-modal-title">📄 Dynamic Resume Generated</h3>
            <div class="resume-modal-subtitle">Auto-compiled from live portfolio sections</div>
          </div>
          <button type="button" class="resume-modal-close" id="close-resume-modal" aria-label="Close modal">&times;</button>
        </div>

        <div class="resume-modal-body">
          ${buildResumeHTML(data)}
        </div>

        <div class="resume-modal-footer">
          <button type="button" class="btn btn-primary" id="trigger-print-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Save as PDF / Print
          </button>
          
          <button type="button" class="btn btn-secondary" id="download-html-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download HTML Resume
          </button>

          <button type="button" class="btn btn-outline" id="cancel-resume-modal">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Fade in animation
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });

    // Event Handlers
    document.getElementById('close-resume-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-resume-modal')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.getElementById('trigger-print-btn')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('download-html-btn')?.addEventListener('click', () => {
      downloadHTMLResume(data);
    });

    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 250);
    }
  }

  /**
   * Download standalone printable HTML resume file
   */
  function downloadHTMLResume(data) {
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${data.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 20px; line-height: 1.5; }
    .resume-paper { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .resume-name { font-size: 28px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0; letter-spacing: -0.02em; }
    .resume-subtitle { font-size: 14px; font-weight: 600; color: #0284c7; margin-bottom: 12px; }
    .resume-contact-bar { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #475569; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; }
    .resume-contact-bar a { color: #0284c7; text-decoration: none; }
    .resume-section { margin-bottom: 24px; }
    .resume-section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px; }
    .resume-text { font-size: 13.5px; color: #334155; margin: 0 0 8px 0; }
    .resume-item { margin-bottom: 14px; }
    .resume-item-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: #0f172a; }
    .resume-item-sub { font-size: 13px; font-weight: 500; color: #0284c7; margin-bottom: 4px; }
    .resume-item-date { font-size: 12px; color: #64748b; font-weight: normal; }
    .resume-list { margin: 4px 0 0 0; padding-left: 18px; font-size: 13px; color: #334155; }
    .resume-list li { margin-bottom: 3px; }
    .resume-skill-cat { font-size: 13px; margin-bottom: 6px; color: #334155; }
    .resume-cert-item { font-size: 13px; margin-bottom: 6px; color: #334155; }
    @media print { body { background: #fff; padding: 0; } .resume-paper { box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  ${buildResumeHTML(data)}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Malik_Tayyab_Jamil_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Bind event listeners to all resume links across portfolio
   */
  function initResumeButtons() {
    const selectors = [
      'a[href*="resume.pdf"]',
      'a[download*="Resume"]',
      'a[download*="resume"]',
      '[data-analytics-track*="download_resume"]'
    ];

    const resumeLinks = document.querySelectorAll(selectors.join(', '));
    resumeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showResumeModal();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResumeButtons);
  } else {
    initResumeButtons();
  }
})();
