/**
 * ====================================================================
 * RACING ECU TELEMETRY CLI TERMINAL
 * ====================================================================
 * Interactive developer command-line terminal with real-time CAN-bus
 * telemetry diagnostics, ECU commands, tab completion & history.
 */

class CyberTerminal {
  constructor(containerId = 'terminal-output', inputId = 'terminal-input') {
    this.output = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.history = [];
    this.historyIndex = -1;
    this.cfg = window.PORTFOLIO_CONFIG || {};

    this.commands = {
      help: () => this.cmdHelp(),
      whoami: () => this.cmdWhoami(),
      telemetry: () => this.cmdTelemetry(),
      dyno: () => this.cmdTelemetry(),
      nitro: () => this.cmdNitro(),
      rev: () => this.cmdNitro(),
      laptime: () => this.cmdLaptime(),
      cars: () => this.cmdCars(),
      skills: () => this.cmdSkills(),
      projects: () => this.cmdProjects(),
      academics: () => this.cmdAcademics(),
      education: () => this.cmdAcademics(),
      experience: () => this.cmdExperience(),
      contact: () => this.cmdContact(),
      socials: () => this.cmdContact(),
      stats: () => this.cmdStats(),
      resume: () => this.cmdResume(),
      clear: () => this.cmdClear(),
      cls: () => this.cmdClear(),
      theme: (args) => this.cmdTheme(args),
      mode: (args) => this.cmdMode(args),
      sound: (args) => this.cmdSound(args),
      matrix: () => this.cmdMatrix(),
      sudo: () => `<span class="text-rose-400">ECU Security Override: Access restricted to Lead Race Engineer. Nice try! 🏎️💨</span>`,
      date: () => `<span class="text-cyan-400">Track Time: ${new Date().toLocaleString()}</span>`,
      ping: () => `<span class="text-emerald-400">64 bytes from CAN-BUS.telemetry.node: icmp_seq=1 ttl=64 time=0.28 ms (Telemetry Latency: Optimal)</span>`,
    };

    this.init();
  }

  init() {
    if (!this.input || !this.output) return;

    this.printWelcome();

    this.input.addEventListener('keydown', (e) => {
      if (window.soundEngine) window.soundEngine.playKeystroke();

      if (e.key === 'Enter') {
        const commandLine = this.input.value.trim();
        this.input.value = '';
        if (commandLine) {
          this.history.push(commandLine);
          this.historyIndex = this.history.length;
          this.execute(commandLine);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete();
      }
    });
  }

  printWelcome() {
    const welcomeHtml = `
      <div class="text-slate-400 mb-2 leading-relaxed">
        <span class="text-rose-500 font-bold">🏁 APEX RACING ECU DIAGNOSTICS v4.2</span> [Telemetry Online • 60 FPS]<br/>
        Type <span class="text-amber-400 font-semibold">'help'</span> to view commands or try <span class="text-cyan-400 font-semibold">'nitro'</span>, <span class="text-rose-400 font-semibold">'telemetry'</span>, <span class="text-emerald-400 font-semibold">'whoami'</span>, or <span class="text-purple-400 font-semibold">'projects'</span>.
      </div>
    `;
    this.output.innerHTML = welcomeHtml;
  }

  execute(commandLine) {
    const tokens = commandLine.split(' ').filter(Boolean);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    // Print command line prompt to output
    const promptEntry = document.createElement('div');
    promptEntry.className = 'flex items-center gap-2 text-xs font-mono my-1 text-slate-300';
    promptEntry.innerHTML = `
      <span class="text-rose-400 font-bold">driver@apex-telemetry</span>:<span class="text-cyan-400 font-bold">~</span>$ 
      <span class="text-white">${this.escapeHtml(commandLine)}</span>
    `;
    this.output.appendChild(promptEntry);

    // Execute or error
    let result = '';
    if (this.commands[cmd]) {
      result = this.commands[cmd](args);
    } else {
      result = `<span class="text-rose-400">ECU Command not recognized: "${this.escapeHtml(cmd)}". Type <span class="text-amber-300 font-semibold">'help'</span> for command list.</span>`;
    }

    if (result) {
      const responseEntry = document.createElement('div');
      responseEntry.className = 'text-xs font-mono text-slate-300 my-1 leading-relaxed pl-3 border-l-2 border-rose-500/60';
      responseEntry.innerHTML = result;
      this.output.appendChild(responseEntry);
    }

    this.scrollToBottom();
  }

  autocomplete() {
    const current = this.input.value.trim().toLowerCase();
    if (!current) return;

    const available = Object.keys(this.commands);
    const match = available.find(c => c.startsWith(current));
    if (match) {
      this.input.value = match;
    }
  }

  scrollToBottom() {
    const termContainer = document.getElementById('terminal-card');
    if (termContainer) {
      termContainer.scrollTop = termContainer.scrollHeight;
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  cmdHelp() {
    return `
      <div class="space-y-1">
        <div class="text-rose-400 font-bold mb-1">🏁 Apex Motorsport ECU Commands:</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">nitro / rev</span> - Fire exhaust flame burners & rev 3D engine</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">telemetry</span> - Live dyno output, horsepower & aero downforce</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">laptime</span> - Formula circuit telemetry & benchmark times</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">whoami</span> - Driver identity, B.Tech CSE details & CGPA</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">skills</span> - Automotive systems & software engineering stack</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">projects</span> - 3D telemetry, simulation & cloud projects</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">academics</span> - 4-Year B.Tech engineering curriculum</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">experience</span> - Formula Student lead & internship roles</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">stats</span> - LeetCode, GitHub commits & hackathon wins</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">contact</span> - Direct pit-wall radio & networking channels</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">mode &lt;name&gt;</span> - 3D Viewport mode: [car | track | engine]</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">theme &lt;name&gt;</span> - Color theme: [corsa | nitro | monaco | stealth]</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">sound &lt;on|off&gt;</span> - V8 exhaust sound synthesizer</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">matrix</span> - Launch neon speed stream</div>
        <div><span class="text-amber-300 w-28 inline-block font-semibold">clear</span> - Flush the telemetry console buffer</div>
      </div>
    `;
  }

  cmdTelemetry() {
    const t = this.cfg.telemetry || {};
    return `
      <div class="space-y-1">
        <div class="text-rose-400 font-bold">🏎️ Live Vehicle Telemetry & Dyno Stats:</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2 text-slate-300">
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-slate-500 text-[10px]">PEAK POWER</span>
            <div class="text-rose-400 font-bold text-sm">${t.horsepower || '820 HP'}</div>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-slate-500 text-[10px]">MAX RPM</span>
            <div class="text-amber-400 font-bold text-sm">${t.maxRpm || '9,500 RPM'}</div>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-slate-500 text-[10px]">0-100 KM/H</span>
            <div class="text-emerald-400 font-bold text-sm">${t.zeroToHundred || '2.4s'}</div>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-slate-500 text-[10px]">TOP SPEED</span>
            <div class="text-cyan-400 font-bold text-sm">${t.topSpeed || '348 km/h'}</div>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-slate-500 text-[10px]">DOWNFORCE</span>
            <div class="text-purple-400 font-bold text-sm">${t.aeroDownforce || '650 kg'}</div>
          </div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800">
            <span class="text-slate-500 text-[10px]">WEIGHT BIAS</span>
            <div class="text-white font-bold text-sm">${t.weightDistribution || '42 : 58'}</div>
          </div>
        </div>
      </div>
    `;
  }

  cmdNitro() {
    if (window.portfolioScene) {
      window.portfolioScene.triggerNitroBoost();
    }
    return `
      <span class="text-cyan-300 font-bold">⚡ NITRO BOOST ACTIVATED!</span>
      <span class="text-rose-400">Exhaust flame ignited, RPM climbing to 9,500 RPM, disc brakes glowing red!</span>
    `;
  }

  cmdLaptime() {
    return `
      <div class="space-y-1">
        <div class="text-amber-400 font-bold">🏁 Circuit Lap Records:</div>
        <div>• <span class="text-white font-semibold">Autodromo Nazionale Monza:</span> <span class="text-emerald-400 font-bold">1:18.42s</span> (P1 Leader)</div>
        <div>• <span class="text-white font-semibold">Silverstone GP:</span> <span class="text-cyan-400 font-bold">1:24.15s</span> (Optimal Sector 2)</div>
        <div>• <span class="text-white font-semibold">Circuit de Spa-Francorchamps:</span> <span class="text-purple-400 font-bold">1:42.80s</span> (Eau Rouge Full Throttle)</div>
        <div>• <span class="text-white font-semibold">Nürburgring Nordschleife:</span> <span class="text-rose-400 font-bold">6:32.40s</span> (Sub-7 Benchmark)</div>
      </div>
    `;
  }

  cmdCars() {
    return `
      <div class="space-y-1">
        <div class="text-rose-400 font-bold">🏎️ 3D Supercar Garage:</div>
        <div>1. <span class="text-white font-bold">Apex Hypercar GT-1</span> (Twin-Turbo V8 • 820 HP • Active Aero)</div>
        <div>2. <span class="text-cyan-300 font-bold">Formula Student Electric (FSE-25)</span> (Quad In-Wheel Motors • 1:18 Lap)</div>
        <div>3. <span class="text-amber-400 font-bold">Autonomous Track Prototype</span> (LiDAR + Computer Vision)</div>
      </div>
    `;
  }

  cmdWhoami() {
    const p = this.cfg.personal || {};
    return `
      <div class="space-y-1">
        <div class="text-rose-400 font-bold text-sm">${p.name}</div>
        <div class="text-amber-300 font-semibold">${p.title}</div>
        <div class="text-slate-400">🏫 Institution: <span class="text-white">${p.institution}</span></div>
        <div class="text-slate-400">🎓 Year: <span class="text-white">${p.year}</span></div>
        <div class="text-slate-400">📊 Academic CGPA: <span class="text-emerald-400 font-bold">${p.cgpa}</span></div>
        <div class="text-slate-400">🏎️ Role: <span class="text-cyan-300">${p.role}</span></div>
        <div class="text-slate-300 mt-2 italic">"${p.bio}"</div>
      </div>
    `;
  }

  cmdSkills() {
    const skills = this.cfg.skills || {};
    let html = `<div class="text-rose-400 font-bold mb-2">Technical Proficiency & Motorsport Arsenal:</div><div class="space-y-2">`;

    Object.keys(skills).forEach(category => {
      html += `<div><span class="text-amber-400 font-semibold">${category}</span>:</div>`;
      html += `<div class="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">`;
      skills[category].forEach(s => {
        const barLength = 12;
        const filled = Math.round((s.level / 100) * barLength);
        const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
        html += `
          <div class="flex items-center justify-between text-slate-300">
            <span>${s.name}</span>
            <span class="font-mono text-rose-400">[${bar}] ${s.level}%</span>
          </div>
        `;
      });
      html += `</div>`;
    });
    html += `</div>`;
    return html;
  }

  cmdProjects() {
    const list = this.cfg.projects || [];
    let html = `<div class="text-rose-400 font-bold mb-2">Featured Engineering & Motorsport Projects:</div><div class="space-y-2">`;
    list.forEach((p, idx) => {
      html += `
        <div class="border-b border-slate-800 pb-1">
          <span class="text-amber-400 font-semibold">${idx + 1}. ${p.title}</span> 
          <span class="text-slate-400 text-[11px]">(${p.technologies.join(', ')})</span>
          <div class="text-slate-300">${p.description}</div>
        </div>
      `;
    });
    html += `</div>`;
    return html;
  }

  cmdAcademics() {
    const milestones = this.cfg.academicMilestones || [];
    let html = `<div class="text-rose-400 font-bold mb-2">B.Tech Engineering Curriculum Progression:</div><div class="space-y-2">`;
    milestones.forEach(m => {
      html += `
        <div>
          <div class="text-purple-300 font-semibold">${m.year} <span class="text-emerald-400">(${m.status})</span></div>
          <div class="text-slate-400 text-xs">${m.highlights.slice(0, 2).map(h => `• ${h}`).join('<br/>')}</div>
        </div>
      `;
    });
    html += `</div>`;
    return html;
  }

  cmdExperience() {
    const exp = this.cfg.experiences || [];
    let html = `<div class="text-rose-400 font-bold mb-2">Motorsport Leadership & Experience:</div><div class="space-y-2">`;
    exp.forEach(e => {
      html += `
        <div>
          <div class="text-cyan-300 font-semibold">${e.role} @ <span class="text-white">${e.organization}</span> (${e.period})</div>
          <div class="text-slate-300 text-xs">${e.description}</div>
        </div>
      `;
    });
    html += `</div>`;
    return html;
  }

  cmdStats() {
    const stats = this.cfg.stats || [];
    let html = `<div class="text-rose-400 font-bold mb-1">Telemetry Metrics & Track Record:</div><div class="grid grid-cols-2 gap-2">`;
    stats.forEach(s => {
      html += `<div><span class="text-white font-bold">${s.value}</span> <span class="text-slate-400">${s.label}</span> <span class="text-emerald-400 text-[10px]">(${s.sub})</span></div>`;
    });
    html += `</div>`;
    return html;
  }

  cmdContact() {
    const p = this.cfg.personal || {};
    const s = this.cfg.socials || {};
    return `
      <div class="space-y-1">
        <div class="text-rose-400 font-bold">Pit-Wall Radio Channels:</div>
        <div>📧 Email: <a href="mailto:${p.email}" class="text-rose-400 underline">${p.email}</a></div>
        <div>🐙 GitHub: <a href="${s.github}" target="_blank" class="text-purple-400 underline">${s.github}</a></div>
        <div>💼 LinkedIn: <a href="${s.linkedin}" target="_blank" class="text-blue-400 underline">${s.linkedin}</a></div>
        <div>⚡ LeetCode: <a href="${s.leetcode}" target="_blank" class="text-amber-400 underline">${s.leetcode}</a></div>
      </div>
    `;
  }

  cmdResume() {
    const resumeUrl = this.cfg.personal?.resumeUrl || '#';
    window.open(resumeUrl, '_blank');
    return `<span class="text-emerald-400">Opening resume credentials in new window... (${resumeUrl})</span>`;
  }

  cmdClear() {
    this.output.innerHTML = '';
    return '';
  }

  cmdTheme(args) {
    const valid = ['corsa', 'nitro', 'monaco', 'stealth', 'cyber', 'space', 'matrix', 'glass'];
    const themeName = args[0] ? args[0].toLowerCase() : '';
    if (!valid.includes(themeName)) {
      return `<span class="text-amber-400">Usage: theme &lt;corsa | nitro | monaco | stealth&gt;</span>`;
    }
    if (window.switchTheme) {
      window.switchTheme(themeName);
    }
    return `<span class="text-emerald-400">Theme updated to: <b>${themeName.toUpperCase()}</b></span>`;
  }

  cmdMode(args) {
    const valid = ['car', 'track', 'engine', 'core', 'matrix', 'particles'];
    const rawMode = args[0] ? args[0].toLowerCase() : '';
    let modeName = rawMode;
    if (rawMode === 'core') modeName = 'car';
    if (rawMode === 'matrix') modeName = 'track';
    if (rawMode === 'particles') modeName = 'engine';

    if (!valid.includes(rawMode)) {
      return `<span class="text-amber-400">Usage: mode &lt;car | track | engine&gt;</span>`;
    }
    if (window.portfolioScene) {
      window.portfolioScene.setMode(modeName);
    }
    return `<span class="text-emerald-400">3D Viewport mode switched to: <b>${modeName.toUpperCase()}</b></span>`;
  }

  cmdSound(args) {
    const state = args[0] ? args[0].toLowerCase() : '';
    if (state === 'on') {
      window.soundEngine.toggleSound(true);
      return `<span class="text-emerald-400">V8 Exhaust Sound [ENABLED]</span>`;
    } else if (state === 'off') {
      window.soundEngine.toggleSound(false);
      return `<span class="text-rose-400">V8 Exhaust Sound [MUTED]</span>`;
    } else {
      const isNowOn = window.soundEngine.toggleSound();
      return `<span class="text-rose-400">Exhaust sound toggled: <b>${isNowOn ? 'ENABLED' : 'MUTED'}</b></span>`;
    }
  }

  cmdMatrix() {
    const matrixModal = document.getElementById('matrix-rain-overlay');
    if (matrixModal) {
      matrixModal.classList.remove('hidden');
      if (window.startMatrixRain) window.startMatrixRain();
      return `<span class="text-emerald-400 font-bold">Speed telemetry stream launched! (Press ESC or click anywhere to exit)</span>`;
    }
    return `<span class="text-emerald-400">Speed stream triggered.</span>`;
  }
}

window.CyberTerminal = CyberTerminal;
