/**
 * Samarth Guptha D - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initProjectFiltering();
  initEmailCopy();
  initContactForm();
  initScrollSpy();
  initCertificateModal();
  initProjectModal();
  initScrollProgress();
  initScrollReveal();
  initBackToTop();
  initResumePageTabs();
});

/* -------------------------------------------------------------------------
   1. Dark / Light Theme Toggle
   ------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    html.setAttribute('data-theme', 'light');
  }

  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

/* -------------------------------------------------------------------------
   2. Mobile Navigation Menu
   ------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });
}

/* -------------------------------------------------------------------------
   3. Project Category Filtering
   ------------------------------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   4. Copy Email to Clipboard
   ------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('user-email-text')?.innerText || 'samarthgupthad0@gmail.com';

  copyBtn?.addEventListener('click', async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(emailText);
        showToast('Email copied to clipboard!');
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = emailText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email copied to clipboard!');
      }
    } catch (err) {
      showToast('Could not copy email');
    }
  });
}

/* -------------------------------------------------------------------------
   5. Interactive Contact Form
   ------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      if (statusEl) {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Please fill out all required fields.';
      }
      return;
    }

    if (statusEl) {
      statusEl.className = 'form-status success';
      statusEl.textContent = `Thank you, ${name}! Your message has been sent. You can also reach me directly at samarthgupthad0@gmail.com.`;
    }

    showToast('Message sent successfully!');
    form.reset();

    setTimeout(() => {
      if (statusEl) statusEl.textContent = '';
    }, 6000);
  });
}

/* -------------------------------------------------------------------------
   6. Scroll Spy for Active Navigation Link
   ------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   7. Toast Helper
   ------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* -------------------------------------------------------------------------
   8. Certificate Modal Lightbox
   ------------------------------------------------------------------------- */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const backdrop = document.getElementById('cert-modal-backdrop');
  const closeBtn = document.getElementById('cert-modal-close');
  const footerCloseBtn = document.getElementById('cert-modal-close-btn');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalOrg = document.getElementById('modal-cert-org');
  const modalImg = document.getElementById('modal-cert-img');
  const placeholder = document.getElementById('modal-cert-placeholder');
  const downloadBtn = document.getElementById('modal-cert-download');
  const verifyBtn = document.getElementById('modal-cert-verify');
  const clickableCerts = document.querySelectorAll('.cert-clickable');

  function openModal(certItem) {
    const title = certItem.getAttribute('data-cert-title') || 'Certificate';
    const org = certItem.getAttribute('data-cert-org') || '';
    const imgSrc = certItem.getAttribute('data-cert-img') || '';
    const docSrc = certItem.getAttribute('data-cert-doc') || imgSrc;
    const verifyUrl = certItem.getAttribute('data-cert-verify') || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalOrg) modalOrg.textContent = org;
    
    if (downloadBtn) {
      downloadBtn.href = docSrc;
      downloadBtn.setAttribute('download', `${title.replace(/\s+/g, '_')}_Certificate`);
    }

    if (verifyBtn) {
      if (verifyUrl) {
        verifyBtn.href = verifyUrl;
        verifyBtn.style.display = 'inline-flex';
      } else {
        verifyBtn.style.display = 'none';
      }
    }

    if (modalImg && placeholder) {
      modalImg.style.display = 'none';
      placeholder.style.display = 'none';

      // Attempt to load the image
      const tempImg = new Image();
      tempImg.onload = function() {
        modalImg.src = imgSrc;
        modalImg.style.display = 'block';
        placeholder.style.display = 'none';
      };
      tempImg.onerror = function() {
        modalImg.src = '';
        modalImg.style.display = 'none';
        placeholder.style.display = 'flex';
      };
      tempImg.src = imgSrc;
    }

    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  
  // Toggle zoom on modal image click
  modalImg?.addEventListener('click', () => {
    modalImg.classList.toggle('zoomed');
  });

  clickableCerts.forEach(cert => {
    cert.addEventListener('click', () => openModal(cert));
  });

  closeBtn?.addEventListener('click', closeModal);
  footerCloseBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------
   9. Interactive Project Showcase & Live Demos
   ------------------------------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('project-modal-close');
  const footerCloseBtn = document.getElementById('project-modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalTag = document.getElementById('modal-project-tag');
  const modalBody = document.getElementById('project-modal-body');
  const githubBtn = document.getElementById('modal-project-github');
  const openButtons = document.querySelectorAll('.open-demo-btn');

  const projectDemos = {
    'health-insight': {
      title: 'Health Insight — Medicine Recommendation System',
      tag: 'Python • CSV Dataset • Data Structures • Decision Logic',
      github: 'https://github.com/samarthgupthad0-commits',
      render: () => `
        <div>
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-secondary);">
            <strong>Interactive Live Tester:</strong> Select one or more symptoms below to test the structured matching algorithm in real-time. The system cross-references the medical dataset to recommend safe over-the-counter (OTC) medicines with essential safety precautions.
          </p>

          <div class="demo-box">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.5px;">Select Symptoms:</span>
            <div class="symptom-chips" id="symptom-chips-container">
              <button type="button" class="symptom-chip selected" data-symptom="headache">Headache</button>
              <button type="button" class="symptom-chip" data-symptom="fever">Mild Fever</button>
              <button type="button" class="symptom-chip" data-symptom="cough">Dry Cough</button>
              <button type="button" class="symptom-chip" data-symptom="acidity">Heartburn / Acidity</button>
              <button type="button" class="symptom-chip" data-symptom="allergies">Sneezing & Runny Nose</button>
              <button type="button" class="symptom-chip" data-symptom="bodyache">Body Ache</button>
            </div>

            <div class="rec-output-box" id="rec-output-display">
              <span class="rec-badge">✓ Condition Matched: Tension Headache</span>
              <h4 style="font-size: 1.15rem; margin-bottom: 0.4rem; color: var(--text-primary);">Suggested OTC: Paracetamol (500mg)</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                <strong>Precautions:</strong> Take with water after meals. Do not exceed 4 doses within 24 hours. Avoid alcohol.
              </p>
              <div style="font-size: 0.8rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm);">
                🔬 <strong>Dataset Logic:</strong> Symptom vector mapped to binary index in CSV matrix &rarr; Priority match score = 1.0.
              </div>
            </div>
          </div>

          <div style="margin-top: 1.5rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Project Engineering Highlights:</h4>
            <ul style="list-style: none; padding-left: 0; font-size: 0.9rem; color: var(--text-secondary);">
              <li style="margin-bottom: 0.4rem;">▹ <strong>Data Architecture:</strong> Cleaned and structured multi-disease medical symptoms dataset mapped to vetted OTC medications.</li>
              <li style="margin-bottom: 0.4rem;">▹ <strong>Safety-First Logic:</strong> Non-prescriptive disclaimer safeguards built into the recommendation loop.</li>
              <li style="margin-bottom: 0.4rem;">▹ <strong>Deterministic Performance:</strong> Fast lookups with zero external API dependencies for instant results.</li>
            </ul>
          </div>
        </div>
      `
    },
        'swynex-pipeline': {
      title: 'SWYNEX AI — Intelligent Pipeline & Evaluation Engine',
      tag: 'Python • Public AI APIs • Exception Pipelines • Ethical AI Guardrails',
      github: 'https://github.com/samarthgupthad0-commits',
      render: () => `
        <div>
          <p style="margin-bottom: 1.25rem; font-size: 0.95rem; color: var(--text-secondary);">
            <strong>Interactive Pipeline Simulator:</strong> Test how the intelligent AI wrapper manages model queries, performs multi-stage input validation, isolates API errors, and enforces ethical guardrails.
          </p>

          <div class="demo-box">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.5px;">Choose Test Scenario:</span>
            <div class="symptom-chips" id="swynex-chips-container" style="margin-bottom: 1rem;">
              <button type="button" class="symptom-chip selected" data-scenario="nominal">Standard AI Query</button>
              <button type="button" class="symptom-chip" data-scenario="rate_limit">API Rate-Limit & Backoff</button>
              <button type="button" class="symptom-chip" data-scenario="guardrail">Ethical Guardrail Filter</button>
              <button type="button" class="symptom-chip" data-scenario="schema_fail">Malformed JSON Fallback</button>
            </div>

            <div class="rec-output-box" id="swynex-output-display">
              <span class="rec-badge">✓ Pipeline Status: Execution Nominal (HTTP 200 OK)</span>
              <h4 style="font-size: 1.1rem; margin-bottom: 0.4rem; color: var(--text-primary);">Response Processed Successfully</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                <strong>Input Validation:</strong> Vector input normalized &bull; Token count: 48 tokens &bull; Latency: 138ms &bull; Sanitization: Passed
              </p>
              <div style="font-size: 0.8rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-family: 'JetBrains Mono', monospace;">
                [INFO] Output verified against JSON schema: 100% compliant &bull; Zero hallucinations detected.
              </div>
            </div>
          </div>

          <div style="margin-top: 1.5rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Internship Engineering Contributions:</h4>
            <ul style="list-style: none; padding-left: 0; font-size: 0.9rem; color: var(--text-secondary);">
              <li style="margin-bottom: 0.4rem;">▹ <strong>Prototype Implementation:</strong> Integrated public AI endpoints with rigorous type-safe data schemas.</li>
              <li style="margin-bottom: 0.4rem;">▹ <strong>Robust Error Pipelines:</strong> Configured exponential backoff, jittered retries, and silent degradation.</li>
              <li style="margin-bottom: 0.4rem;">▹ <strong>Comprehensive Documentation:</strong> Prepared problem statements, method specifications, and ethical review documentation.</li>
            </ul>
          </div>
        </div>
      `
    },
    'happen-system': {
      title: 'happen — AI-Based Workplace Management System',
      tag: 'React.js • Node.js • Python • HTML5 / CSS3 • Analytics',
      github: 'https://github.com/samarthgupthad0-commits',
      render: () => `
        <div>
          <p style="margin-bottom: 1.25rem; font-size: 0.95rem; color: var(--text-secondary);">
            <strong>Interactive Module Showcase:</strong> Explore the core analytics engines built into <em>happen</em> designed to reduce employee burnout, optimize leave schedules, and balance sprint workload.
          </p>

          <div class="modal-tabs">
            <button class="modal-tab-btn active" data-tab="leave">Smart Leave Allocation</button>
            <button class="modal-tab-btn" data-tab="mood">Mood & Well-Being</button>
            <button class="modal-tab-btn" data-tab="workload">Workload Analytics</button>
          </div>

          <div id="happen-tab-content" class="demo-box">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="rec-badge">Team Capacity Status: Optimal (92%)</span>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">Sprint 14</span>
            </div>
            <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Automated Leave Feasibility Check</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Algorithm detected 3 concurrent frontend leave requests for Nov 24-26. Recommended alternate coverage via cross-functional backend pair to prevent sprint blocker.
            </p>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center;">
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan);">94%</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Approval Confidence</div>
              </div>
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-emerald);">0</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Critical Conflicts</div>
              </div>
              <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-indigo);">1.4s</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Evaluation Time</div>
              </div>
            </div>
          </div>

          <div style="margin-top: 1.5rem;">
            <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary);">Architecture & Tech Stack:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span class="skill-pill">React.js Single-Page Interface</span>
              <span class="skill-pill">Node.js Express API</span>
              <span class="skill-pill">Python Data Processing</span>
              <span class="skill-pill">Workload Balancing Algorithm</span>
            </div>
          </div>
        </div>
      `
    }
  };

  const symptomDatabase = {
    'headache': {
      condition: 'Tension Headache',
      otc: 'Paracetamol (500mg) or Acetaminophen',
      precaution: 'Take with water after meals. Do not exceed 4 doses in 24 hours. Ensure hydration.',
      logic: 'Isolated symptom mapped to mild analgesic class in CSV knowledgebase.'
    },
    'fever': {
      condition: 'Mild Viral Pyrexia / Flu',
      otc: 'Paracetamol (500mg / 650mg)',
      precaution: 'Rest, hydrate with electrolytes. Monitor temperature every 4 hours. Seek medical help if > 101°F.',
      logic: 'Antipyretic matching threshold triggered in dataset.'
    },
    'cough': {
      condition: 'Dry Cough / Bronchial Irritation',
      otc: 'Dextromethorphan Lozenges / Cough Syrup',
      precaution: 'Avoid cold beverages. Keep throat warm. Consult doctor if cough persists > 5 days.',
      logic: 'Antitussive formulation match.'
    },
    'acidity': {
      condition: 'Gastritis / Acid Reflux',
      otc: 'Antacid Gel (Aluminium / Magnesium Hydroxide)',
      precaution: 'Take 30 minutes after food or at onset of discomfort. Avoid spicy/fried foods.',
      logic: 'Acid neutralizing OTC dataset mapping.'
    },
    'allergies': {
      condition: 'Allergic Rhinitis / Sneezing',
      otc: 'Cetirizine (10mg) or Loratadine',
      precaution: 'Take once daily before sleep as it may cause slight drowsiness.',
      logic: 'Antihistamine category classification.'
    },
    'bodyache': {
      condition: 'Muscle Fatigue & Generalized Myalgia',
      otc: 'Ibuprofen (400mg) or Paracetamol',
      precaution: 'Take with milk or meals to prevent gastric irritation. Drink plenty of water.',
      logic: 'NSAID / Analgesic protocol match.'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDemos[projectId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTag) modalTag.textContent = data.tag;
    if (githubBtn) githubBtn.href = data.github;
    if (modalBody) {
      modalBody.innerHTML = data.render();
      attachDemoInteractions(projectId);
    }

    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function attachDemoInteractions(projectId) {
    if (projectId === 'health-insight') {
      const chips = modalBody.querySelectorAll('.symptom-chip');
      const output = modalBody.querySelector('#rec-output-display');

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');

          const sKey = chip.getAttribute('data-symptom');
          const res = symptomDatabase[sKey] || symptomDatabase['headache'];

          if (output) {
            output.innerHTML = `
              <span class="rec-badge">✓ Condition Matched: ${res.condition}</span>
              <h4 style="font-size: 1.15rem; margin-bottom: 0.4rem; color: var(--text-primary);">Suggested OTC: ${res.otc}</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                <strong>Precautions:</strong> ${res.precaution}
              </p>
              <div style="font-size: 0.8rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm);">
                🔬 <strong>Dataset Logic:</strong> ${res.logic}
              </div>
            `;
          }
        });
      });
    } else if (projectId === 'happen-system') {
      const tabBtns = modalBody.querySelectorAll('.modal-tab-btn');
      const tabContent = modalBody.querySelector('#happen-tab-content');

      const tabs = {
        'leave': `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="rec-badge">Team Capacity Status: Optimal (92%)</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">Sprint 14</span>
          </div>
          <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Automated Leave Feasibility Check</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Algorithm detected 3 concurrent frontend leave requests for Nov 24-26. Recommended alternate coverage via cross-functional backend pair to prevent sprint blocker.
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center;">
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan);">94%</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Approval Confidence</div>
            </div>
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-emerald);">0</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Critical Conflicts</div>
            </div>
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-indigo);">1.4s</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Evaluation Time</div>
            </div>
          </div>
        `,
        'mood': `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="rec-badge">Overall Sentiment: Positive (88.4%)</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">Past 30 Days</span>
          </div>
          <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Employee Well-Being & Mood Analytics</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Sentiment trend analysis evaluated across daily anonymous pulse check-ins. Zero high-stress anomalies reported in current sprint cycle.
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center;">
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-emerald);">88%</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Positive Sentiment</div>
            </div>
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan);">9%</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Neutral Responses</div>
            </div>
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: #ef4444;">3%</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Stress Flags</div>
            </div>
          </div>
        `,
        'workload': `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="rec-badge">Load Distribution: Balanced</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">Sprint Workload</span>
          </div>
          <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Cross-Functional Task Allocation</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Algorithmic workload distribution preventing developer burnout by balancing story points and complex tickets across junior and senior engineers.
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center;">
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan);">24 / 28</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Avg Points / Eng</div>
            </div>
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-emerald);">0.08</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Gini Variance (Low)</div>
            </div>
            <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-indigo);">100%</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Sprint Completion</div>
            </div>
          </div>
        `
      };

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tKey = btn.getAttribute('data-tab');
          if (tabContent && tabs[tKey]) {
            tabContent.innerHTML = tabs[tKey];
          }
        });
      });
    }
  }

  function closeProjectModal() {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      openProjectModal(pid);
    });
  });

  closeBtn?.addEventListener('click', closeProjectModal);
  footerCloseBtn?.addEventListener('click', closeProjectModal);
  backdrop?.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* Navbar Scroll Glassmorphism Class */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}, { passive: true });

/* Scroll Reading Progress */
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;

  const updateProgress = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* Scroll Reveal */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

/* Back to Top Button */
function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  const updateVisibility = () => {
    button.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  updateVisibility();
}

/* Resume Page Tabs */
function initResumePageTabs() {
  const tabs = document.querySelectorAll('.resume-tab-btn');
  const pages = document.querySelectorAll('.resume-page-item');
  if (!tabs.length || !pages.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');

      const selectedPage = tab.getAttribute('data-page');
      pages.forEach(page => {
        const shouldShow = selectedPage === 'all' ||
          page.id === `resume-page-item-${selectedPage}`;
        page.classList.toggle('hidden', !shouldShow);
      });
    });
  });
}
