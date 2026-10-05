# 🏎️ 3D Sports Car & Motorsport Telemetry Portfolio Website

A high-performance, interactive **3D Sports Car & Motorsport Telemetry personal portfolio website** designed for **B.Tech (Computer Science & Engineering)** undergraduates, automotive software engineers, and 3D graphics developers.

Built with **Three.js (WebGL)**, **Tailwind CSS**, **Web Audio API**, and modern web standards with **zero build dependencies** — works straight out of the box in any web browser!

---

## ✨ High-Octane Features

1. **Interactive 3D WebGL Motorsport Engine (Three.js)**:
   - **Mode 1: Hypercar 3D** — Full procedural aerodynamic supercar featuring carbon fiber aero (front splitter, canards, side air scoops, rear GT wing & diffuser), 4 rotating alloy wheels with bronze rims and red sport brake calipers, LED matrix projector headlights, full-width red taillight bar, chassis underglow, and exhaust tips that shoot glowing blue/orange nitro flames!
   - **Mode 2: Neon Circuit** — High-speed curving expressway with 300+ km/h motion streaks and speed arches.
   - **Mode 3: V12 Twin-Turbo Engine** — 3D engine block with spinning turbocharger impellers, tuned exhaust headers, and an orbiting holographic RPM tachometer needle.
   - **Nitro Boost Reaction**: Clicking the canvas or the "NITRO BOOST ⚡" button revs the engine, accelerates wheel rotation, heats the brake discs red-hot, and fires exhaust flames with synthesized audio!

2. **Apex Racing ECU Telemetry CLI Terminal**:
   - Built-in motorsport diagnostic terminal shell (`driver@apex-telemetry:~$`).
   - Supports commands: `nitro` / `rev`, `telemetry` / `dyno`, `laptime`, `cars`, `whoami`, `skills`, `projects`, `academics`, `stats`, `mode`, `theme`, `sound`, `matrix`, `resume`, `contact`, and `clear`.
   - Tab autocomplete and command history recall (Up/Down arrow keys).

3. **V8 Engine Sound Synthesizer (Web Audio API)**:
   - 100% native browser audio synthesis (zero external mp3 files required).
   - Throttle revs, turbo blow-off valve flutter ("pshh-tsu-tsu"), paddle shift clicks, nitro ignition sweeps, and a deep ambient V8 exhaust idle rumble.

4. **Motorsport Telemetry HUD & B.Tech Journey**:
   - Live Dyno Specs: 820 HP Peak Power, 9,500 Max RPM, 2.4s 0-100 km/h, 348 km/h Top Speed.
   - Four-year engineering progression from Ignition Stage to Capstone.
   - Formula Student team leadership, coursework grades, and telemetry projects.

5. **3D Interactive Project Showcase**:
   - Dynamic 3D card tilt tracking with cursor perspective physics.
   - Category filtering (`All`, `3D & WebGL`, `Full Stack`, `AI / Autonomous`).
   - Deep-dive architectural telemetry modal.

6. **Motorsport Color Themes**:
   - **Corsa Red**: Iconic Rosso Corsa Red & Carbon Fiber
   - **Nitro Blue**: Electric Cyan & High-Voltage Midnight
   - **Monaco Gold**: Titanium Gold & Grand Prix Luxury
   - **Stealth Carbon**: Matte Gunmetal & Smoked Carbon

---

## ⚡ Quick Start (Run Locally)

### Option 1: Direct Browser Launch (Simplest)
Open `index.html` in your browser:
- Double click [`index.html`](file:///c:/Users/lenovo/OneDrive/GALLERY/Documents/btech-3d-portfolio/index.html) in Windows File Explorer!
- Or in PowerShell:
  ```powershell
  Start-Process "c:\Users\lenovo\OneDrive\GALLERY\Documents\btech-3d-portfolio\index.html"
  ```

### Option 2: Local Web Server
If using VS Code, right-click `index.html` and choose **"Open with Live Server"**.

---

## 🛠️ How to Personalize Your Info

All personal details, telemetry metrics, projects, skills, education, and links are in:
📂 **[`js/config.js`](file:///c:/Users/lenovo/OneDrive/GALLERY/Documents/btech-3d-portfolio/js/config.js)**

To personalize:
1. Open `js/config.js`.
2. Update `personal`, `telemetry`, `skills`, `projects`, and `socials`.
3. Save and refresh the browser!

Alternatively, click the **"EDIT INFO"** button in the top navbar to edit live and export a new `config.js`.

---

## 📁 File Structure

```
btech-3d-portfolio/
│
├── index.html          # Main HTML5 layout, HUD telemetry & components
├── style.css           # Corsa red styles, carbon weave, racing buttons
├── README.md           # Documentation & guides
│
├── js/
│   ├── config.js       # Driver profile, telemetry specs & project data
│   ├── three-scene.js  # Three.js 3D Hypercar, Neon Circuit & V12 Engine
│   ├── audio.js        # Web Audio API V8 engine & turbo synthesizer
│   ├── terminal.js     # Racing ECU CLI diagnostic terminal
│   └── app.js          # App controller, tilt physics, modal logic
│
└── assets/             # Custom profile images / resume PDF
```
