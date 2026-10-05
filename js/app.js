/**
 * ====================================================================
 * MAIN APPLICATION LOGIC & UI CONTROLLER - SPORTS CAR EDITION
 * ====================================================================
 * Connects motorsport configuration, 3D scenes, engine audio & UI events.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.PORTFOLIO_CONFIG || {};

  // 1. Initialize 3D Scene
  let scene = null;
  try {
    scene = new PortfolioScene('canvas-container');
    window.portfolioScene = scene;
  } catch (err) {
    console.warn('WebGL initialization fallback:', err);
  }

  // 2. Initialize Terminal
  try {
    window.cyberTerminal = new CyberTerminal('terminal-output', 'terminal-input');
  } catch (err) {
    console.warn('Terminal initialization error:', err);
  }

  // 3. Hydrate Profile & Telemetry Data from config
  hydratePortfolio(cfg);

  // 4. Setup Project Filter & Render
  setupProjects(cfg.projects || []);

  // 5. Setup Skills
  setupSkills(cfg.skills || {});

  // 6. Setup Academic Roadmap & Experience
  setupAcademics(cfg.academicMilestones || []);
  setupExperience(cfg.experiences || []);
  setupCertifications(cfg.certifications || []);

  // 7. Setup 3D Card Tilt Effects
  initTiltEffects();

  // 8. Setup Theme Switcher (Corsa, Nitro, Monaco, Stealth)
  setupThemeSwitcher();

  // 9. Setup Audio Toggle (V8 Exhaust Synthesizer)
  setupAudioControls();

  // 10. Setup Customization Drawer
  setupCustomizerDrawer(cfg);

  // 11. Setup Contact Form & Clipboard
  setupContactForm(cfg);

  // 12. Setup Matrix Rain Easter Egg
  setupMatrixRain();

  // 13. Mobile Navigation Menu Toggle
  setupMobileNav();

  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Hydrates Hero, About, and Header from config.js
 */
function hydratePortfolio(cfg) {
  const p = cfg.personal || {};
  const t = cfg.telemetry || {};

  // Text fields
  setText('hero-greeting', `POLE POSITION // CSE '27`);
  setText('hero-name', p.name);
  setText('nav-brand-name', `${p.preferredName || p.name.split(' ')[0]}.apex`);
  setText('hero-tagline', p.title);
  setText('hero-role', p.role);
  setText('hero-status', p.statusBadge);
  setText('hero-institution', `${p.institution} • ${p.year}`);
  setText('hero-bio', p.bio);
  setText('about-full-bio', p.bio);
  setText('about-institution', p.institution);
  setText('about-department', p.department);
  setText('about-degree', p.degree);
  setText('about-year', p.year);
  setText('about-cgpa', p.cgpa);
  setText('about-location', p.location);

  // Telemetry Specs
  setText('telem-hp', t.horsepower || '820 HP');
  setText('telem-rpm', t.maxRpm || '9,500 RPM');
  setText('telem-0-100', t.zeroToHundred || '2.4s');
  setText('telem-top-speed', t.topSpeed || '348 km/h');

  // Resume Links
  const resumeBtns = document.querySelectorAll('.resume-link-btn');
  resumeBtns.forEach(btn => {
    btn.setAttribute('href', p.resumeUrl || '#');
  });

  // Social Links
  const s = cfg.socials || {};
  setHref('social-github', s.github);
  setHref('social-linkedin', s.linkedin);
  setHref('social-leetcode', s.leetcode);
  setHref('social-twitter', s.twitter);
  setHref('social-email', `mailto:${p.email}`);

  // Populate Key Metrics
  const statsContainer = document.getElementById('hero-stats-container');
  if (statsContainer && cfg.stats) {
    statsContainer.innerHTML = cfg.stats.map(stat => `
      <div class="glass-panel p-4 flex flex-col justify-between border-slate-800 hover:border-rose-500/60 group">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs uppercase font-mono tracking-wider text-slate-400">${stat.label}</span>
          <i data-lucide="${stat.icon}" class="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform"></i>
        </div>
        <div>
          <div class="text-2xl font-bold font-mono text-white group-hover:text-rose-400 transition-colors">${stat.value}</div>
          <div class="text-[11px] text-emerald-400 font-mono mt-0.5">${stat.sub}</div>
        </div>
      </div>
    `).join('');
  }
}

/**
 * Setup and render projects with category filtering and modal view
 */
function setupProjects(projects) {
  const container = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  if (!container) return;

  function render(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    container.innerHTML = filtered.map(p => `
      <div class="tilt-card-container group" data-project-id="${p.id}">
        <div class="tilt-card glass-panel h-full flex flex-col justify-between p-6 border-slate-800 hover:border-rose-500/60 relative">
          <!-- Background Glow Accent -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <!-- Category and Links -->
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 text-[11px] font-mono font-bold rounded bg-rose-950/80 text-rose-400 border border-rose-500/40 uppercase tracking-wider">
                🏎️ ${p.category.toUpperCase()}
              </span>
              <div class="flex items-center gap-2">
                ${p.githubUrl ? `
                  <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="View Source Code">
                    <i data-lucide="github" class="w-4 h-4"></i>
                  </a>
                ` : ''}
                ${p.liveUrl ? `
                  <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors" title="Live Telemetry Demo">
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- Title & Tagline -->
            <h3 class="text-xl font-bold text-white group-hover:text-rose-400 transition-colors mb-2">${p.title}</h3>
            <p class="text-xs font-mono text-amber-400/90 mb-3">${p.tagline}</p>
            <p class="text-sm text-slate-300 leading-relaxed mb-4">${p.description}</p>

            <!-- Metrics Badges -->
            <div class="flex flex-wrap gap-2 mb-4">
              ${p.metrics.map(m => `
                <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  🏁 ${m}
                </span>
              `).join('')}
            </div>
          </div>

          <div>
            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800">
              ${p.technologies.map(t => `
                <span class="text-[11px] font-mono text-slate-300 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                  ${t}
                </span>
              `).join('')}
            </div>

            <!-- View Details Button -->
            <button class="view-project-btn w-full py-2.5 px-4 rounded-lg bg-slate-900/90 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 text-xs font-mono font-bold border border-slate-700 hover:border-rose-500/50 flex items-center justify-center gap-2 transition-all" data-id="${p.id}">
              <span>TELEMETRY & SPECS</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Reattach modal open events
    document.querySelectorAll('.view-project-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const proj = projects.find(item => item.id === id);
        if (proj) openProjectModal(proj);
      });
    });

    initTiltEffects();
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
      filterBtns.forEach(b => b.classList.remove('active', 'border-rose-500', 'text-rose-400'));
      btn.classList.add('active', 'border-rose-500', 'text-rose-400');
      const category = btn.getAttribute('data-filter');
      render(category);
    });
  });

  // Initial render
  render('all');
}

/**
 * Open Project Detail Modal
 */
function openProjectModal(proj) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  if (window.soundEngine) window.soundEngine.playClick();

  document.getElementById('modal-title').textContent = proj.title;
  document.getElementById('modal-tagline').textContent = proj.tagline;
  document.getElementById('modal-desc').textContent = proj.detailedDescription || proj.description;

  const techContainer = document.getElementById('modal-techs');
  techContainer.innerHTML = proj.technologies.map(t => `
    <span class="px-2.5 py-1 text-xs font-mono text-rose-300 bg-rose-950/80 border border-rose-500/30 rounded-md">${t}</span>
  `).join('');

  const metricsContainer = document.getElementById('modal-metrics');
  metricsContainer.innerHTML = proj.metrics.map(m => `
    <div class="flex items-center gap-2 text-xs font-mono text-emerald-300">
      <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
      <span>${m}</span>
    </div>
  `).join('');

  const githubBtn = document.getElementById('modal-github');
  if (githubBtn) githubBtn.href = proj.githubUrl || '#';

  const liveBtn = document.getElementById('modal-live');
  if (liveBtn) liveBtn.href = proj.liveUrl || '#';

  if (window.lucide) window.lucide.createIcons();

  modal.classList.add('active');
}

/**
 * Close modal helper
 */
window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
};

/**
 * Setup Skills matrix
 */
function setupSkills(skillsObj) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = Object.keys(skillsObj).map(category => {
    const list = skillsObj[category];
    return `
      <div class="glass-panel p-6 border-slate-800 hover:border-rose-500/50">
        <div class="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#ff1e27]"></span>
            ${category}
          </h3>
          <span class="text-xs font-mono text-slate-500">${list.length} specs</span>
        </div>
        <div class="space-y-3.5">
          ${list.map(s => `
            <div>
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="font-medium text-slate-200">${s.name}</span>
                <span class="font-mono text-rose-400 font-semibold">${s.tag || `${s.level}%`}</span>
              </div>
              <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div class="bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 h-full rounded-full transition-all duration-1000" style="width: ${s.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Setup Academic Journey Timeline
 */
function setupAcademics(milestones) {
  const container = document.getElementById('academics-timeline');
  if (!container) return;

  container.innerHTML = milestones.map((m, idx) => `
    <div class="relative pl-8 pb-8 border-l-2 border-slate-800 last:border-transparent group">
      <!-- Glow Node Indicator -->
      <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-rose-500 group-hover:bg-rose-500 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(255,30,39,0.8)]"></div>

      <div class="glass-panel p-5 border-slate-800 hover:border-rose-500/50">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="text-xs font-mono text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40">${m.period}</span>
          <span class="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">${m.status}</span>
        </div>
        <h4 class="text-lg font-bold text-white group-hover:text-rose-400 transition-colors mb-1">${m.year}</h4>
        <p class="text-xs font-mono text-slate-400 mb-3">${m.institution} • <span class="text-amber-400">${m.badge}</span></p>

        <ul class="space-y-1.5 text-xs text-slate-300">
          ${m.highlights.map(h => `
            <li class="flex items-start gap-2">
              <span class="text-rose-500 font-bold">🏎️</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/**
 * Setup Experience and Leadership
 */
function setupExperience(expList) {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = expList.map(e => `
    <div class="glass-panel p-5 border-slate-800 hover:border-amber-400/50">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h4 class="text-base font-bold text-white">${e.role}</h4>
        <span class="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">${e.period}</span>
      </div>
      <div class="text-xs font-mono text-rose-400 mb-3">@ ${e.organization} (${e.type})</div>
      <p class="text-xs text-slate-300 leading-relaxed mb-4">${e.description}</p>
      <div class="flex flex-wrap gap-1.5">
        ${e.technologies.map(t => `
          <span class="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">${t}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Setup Certifications
 */
function setupCertifications(certs) {
  const container = document.getElementById('certifications-container');
  if (!container) return;

  container.innerHTML = certs.map(c => `
    <div class="glass-panel p-4 border-slate-800 hover:border-rose-500/40 flex items-center justify-between gap-4">
      <div>
        <h5 class="text-sm font-semibold text-white">${c.title}</h5>
        <div class="text-xs text-slate-400 font-mono">${c.issuer}</div>
      </div>
      <span class="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">${c.date}</span>
    </div>
  `).join('');
}

/**
 * 3D Card Tilt on Mouse Move
 */
function initTiltEffects() {
  const cards = document.querySelectorAll('.tilt-card-container');
  cards.forEach(card => {
    const inner = card.querySelector('.tilt-card');
    if (!inner) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/**
 * Theme Switcher
 */
function setupThemeSwitcher() {
  const buttons = document.querySelectorAll('.theme-btn');
  const storedTheme = localStorage.getItem('btech_portfolio_theme') || 'corsa';

  window.switchTheme = function(themeName) {
    document.body.classList.remove('theme-corsa', 'theme-nitro', 'theme-monaco', 'theme-stealth', 'theme-cyber', 'theme-space', 'theme-matrix', 'theme-glass');
    
    // Normalize aliases
    let activeTheme = themeName;
    if (themeName === 'cyber') activeTheme = 'corsa';
    if (themeName === 'space') activeTheme = 'nitro';
    if (themeName === 'matrix') activeTheme = 'monaco';
    if (themeName === 'glass') activeTheme = 'stealth';

    document.body.classList.add(`theme-${activeTheme}`);
    localStorage.setItem('btech_portfolio_theme', activeTheme);

    buttons.forEach(b => {
      const bTheme = b.getAttribute('data-theme');
      if (bTheme === activeTheme || (bTheme === 'corsa' && themeName === 'cyber')) {
        b.classList.add('border-rose-500', 'text-rose-400');
      } else {
        b.classList.remove('border-rose-500', 'text-rose-400');
      }
    });

    if (window.soundEngine) window.soundEngine.playClick();
  };

  buttons.forEach(b => {
    b.addEventListener('click', (e) => {
      const theme = e.currentTarget.getAttribute('data-theme');
      window.switchTheme(theme);
    });
  });

  // Apply stored theme
  window.switchTheme(storedTheme);
}

/**
 * Audio Controls (Web Audio API)
 */
function setupAudioControls() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const eqVisualizer = document.getElementById('eq-visualizer');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isPlaying = window.soundEngine.toggleSound();
    if (isPlaying) {
      toggleBtn.classList.add('text-rose-400', 'border-rose-500');
      if (eqVisualizer) eqVisualizer.classList.add('eq-active');
    } else {
      toggleBtn.classList.remove('text-rose-400', 'border-rose-500');
      if (eqVisualizer) eqVisualizer.classList.remove('eq-active');
    }
  });

  // Attach hover sounds to buttons and nav items
  document.querySelectorAll('button, a, .glass-panel').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.soundEngine) window.soundEngine.playHover();
    });
  });
}

/**
 * Slide-out Customizer Drawer
 */
function setupCustomizerDrawer(cfg) {
  const drawer = document.getElementById('profile-drawer');
  const toggleBtn = document.getElementById('open-customizer-btn');
  const closeBtn = document.getElementById('close-customizer-btn');
  const applyBtn = document.getElementById('apply-customizer-btn');
  const downloadBtn = document.getElementById('download-config-btn');

  if (!drawer || !toggleBtn) return;

  const p = cfg.personal || {};

  // Prefill inputs
  const nameInput = document.getElementById('cust-name');
  const branchInput = document.getElementById('cust-branch');
  const instInput = document.getElementById('cust-institution');
  const cgpaInput = document.getElementById('cust-cgpa');
  const yearInput = document.getElementById('cust-year');
  const emailInput = document.getElementById('cust-email');

  if (nameInput) nameInput.value = p.name || '';
  if (branchInput) branchInput.value = p.title || '';
  if (instInput) instInput.value = p.institution || '';
  if (cgpaInput) cgpaInput.value = p.cgpa || '';
  if (yearInput) yearInput.value = p.year || '';
  if (emailInput) emailInput.value = p.email || '';

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    if (window.soundEngine) window.soundEngine.playClick();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  // Live Apply
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playSuccess();

      cfg.personal.name = nameInput.value || cfg.personal.name;
      cfg.personal.title = branchInput.value || cfg.personal.title;
      cfg.personal.institution = instInput.value || cfg.personal.institution;
      cfg.personal.cgpa = cgpaInput.value || cfg.personal.cgpa;
      cfg.personal.year = yearInput.value || cfg.personal.year;
      cfg.personal.email = emailInput.value || cfg.personal.email;

      hydratePortfolio(cfg);
      showToast('Profile updated live in current telemetry view!');
    });
  }

  // Download Config File
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const dataStr = 'data:text/javascript;charset=utf-8,' + encodeURIComponent('window.PORTFOLIO_CONFIG = ' + JSON.stringify(cfg, null, 2) + ';\n');
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', 'config.js');
      dlAnchor.click();
      showToast('Downloaded customized config.js!');
    });
  }
}

/**
 * Contact Form Simulation & Quick Email Copy
 */
function setupContactForm(cfg) {
  const form = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = cfg.personal?.email || 'aarav.sharma.tech@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (window.soundEngine) window.soundEngine.playSuccess();
        showToast(`Copied ${email} to clipboard!`);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
        <span>TRANSMITTING TO PIT WALL...</span>
      `;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        if (window.soundEngine) window.soundEngine.playSuccess();
        showToast('Pit wall transmission confirmed! Aarav will respond shortly.');
      }, 1200);
    });
  }
}

/**
 * Matrix Rain / Speed Telemetry Stream Easter Egg
 */
function setupMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const overlay = document.getElementById('matrix-rain-overlay');
  const closeBtn = document.getElementById('close-matrix-btn');
  if (!canvas || !overlay) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;

  window.startMatrixRain = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '348KM/H9500RPMTURBOAPEXV12CANBUS820HPNITRO';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(7, 10, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff1e27';
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();
  };

  function stopMatrix() {
    if (animationId) cancelAnimationFrame(animationId);
    overlay.classList.add('hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', stopMatrix);
  overlay.addEventListener('click', stopMatrix);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') stopMatrix();
  });
}

/**
 * Mobile Navigation Toggle
 */
function setupMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (window.soundEngine) window.soundEngine.playClick();
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
  let toast = document.getElementById('system-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'system-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-slate-900/95 border border-rose-500 text-white font-mono text-xs shadow-2xl flex items-center gap-2 transform translate-y-20 opacity-0 transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i data-lucide="gauge" class="w-4 h-4 text-rose-500"></i> <span>${message}</span>`;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3500);
}

// Helper utilities
function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.setAttribute('href', href);
}
