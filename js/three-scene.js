/**
 * ====================================================================
 * THREE.JS 3D SPORTS CAR & MOTORSPORT SCENE ENGINE
 * ====================================================================
 * Renders high-performance interactive 3D WebGL motorsport graphics:
 * 1. Hypercar 3D (Full Procedural Aerodynamic Supercar with Carbon Aero,
 *    Rotating Alloy Wheels, Glowing Brake Rotors, LED Lights & Nitro Exhausts)
 * 2. Neon Circuit (High-Speed Curving Expressway with 300km/h Speed Streaks)
 * 3. V12 Twin-Turbo Engine (Mechanical Engine Core with Spinning Impellers & Tachometer)
 */

class PortfolioScene {
  constructor(containerId = 'canvas-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentMode = 'car'; // 'car' | 'track' | 'engine'
    this.animationFrameId = null;

    // Mouse tracking with lerp dampening
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;

    // Groups for different modes
    this.carGroup = new THREE.Group();
    this.trackGroup = new THREE.Group();
    this.engineGroup = new THREE.Group();
    this.speedParticlesGroup = new THREE.Group();

    // Wheel references for continuous rotation
    this.wheels = [];
    this.brakeDiscs = [];
    this.exhaustFlames = [];

    // Animation variables
    this.clock = new THREE.Clock();
    this.nitroEnergy = 0;
    this.carSpeed = 1.0;
    this.rpmValue = 3500;

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070a12, 0.018);

    // 2. Camera setup
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 3.5, 15);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this.setupLighting();

    // 5. Build Global Racing Speed Streaks
    this.createSpeedParticles();

    // 6. Build the 3 Motorsport Modes
    this.buildHypercar();
    this.buildNeonCircuit();
    this.buildTwinTurboEngine();

    // Add groups to scene
    this.scene.add(this.carGroup);
    this.scene.add(this.trackGroup);
    this.scene.add(this.engineGroup);
    this.scene.add(this.speedParticlesGroup);

    // Set initial mode
    this.setMode('car');

    // 7. Event listeners
    this.bindEvents();

    // 8. Start render loop
    this.animate();
  }

  setupLighting() {
    // Ambient light with midnight blue tint
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.2);
    this.scene.add(ambientLight);

    // Main Studio Overhead Key Light
    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.5);
    overheadLight.position.set(5, 15, 8);
    this.scene.add(overheadLight);

    // Rosso Corsa Red Key Accent
    this.redKeyLight = new THREE.PointLight(0xff1e27, 4.5, 35);
    this.redKeyLight.position.set(-8, 6, 8);
    this.scene.add(this.redKeyLight);

    // Nitro Cyan Rim / Underglow Light
    this.cyanFillLight = new THREE.PointLight(0x00f0ff, 4.0, 35);
    this.cyanFillLight.position.set(8, -2, -6);
    this.scene.add(this.cyanFillLight);

    // Gold Apex Accent
    this.goldAccentLight = new THREE.PointLight(0xffb703, 3.0, 25);
    this.goldAccentLight.position.set(0, -6, 10);
    this.scene.add(this.goldAccentLight);
  }

  createSpeedParticles() {
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = [];

    const palette = [
      new THREE.Color(0xff1e27), // Red
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xffb703), // Gold
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.3) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 55;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      speeds.push(0.3 + Math.random() * 0.7);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    this.speedParticles = new THREE.Points(geometry, material);
    this.speedParticles.userData = { speeds };
    this.speedParticlesGroup.add(this.speedParticles);
  }

  // =================================================================
  // 1. HYPERCAR 3D BUILDER (Procedural Aerodynamic Sports Car)
  // =================================================================
  buildHypercar() {
    this.carRoot = new THREE.Group();
    this.carGroup.add(this.carRoot);

    // Material Palette
    const carPaintMat = new THREE.MeshStandardMaterial({
      color: 0x111625, // Deep Carbon Black
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.0,
    });

    const carbonFiberMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c12,
      metalness: 0.85,
      roughness: 0.35,
    });

    const rossoRedMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      emissive: 0x99000a,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x004466,
      emissiveIntensity: 0.25,
      metalness: 0.95,
      roughness: 0.05,
      transparent: true,
      opacity: 0.65,
    });

    const headLightMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const tailLightMat = new THREE.MeshBasicMaterial({
      color: 0xff1e27,
    });

    // -------------------------------------------------------------
    // A. Main Chassis & Sculpted Aerodynamic Body
    // -------------------------------------------------------------
    // Lower Main Monocoque
    const lowerBodyGeom = new THREE.BoxGeometry(3.6, 0.75, 7.8);
    const lowerBody = new THREE.Mesh(lowerBodyGeom, carPaintMat);
    lowerBody.position.y = 0.65;
    this.carRoot.add(lowerBody);

    // Front Sloping Hood / Nosecone
    const hoodGeom = new THREE.CylinderGeometry(1.6, 1.8, 2.6, 4);
    hoodGeom.rotateY(Math.PI / 4);
    hoodGeom.scale(1, 0.35, 1.2);
    const hood = new THREE.Mesh(hoodGeom, rossoRedMat);
    hood.position.set(0, 0.85, 2.6);
    this.carRoot.add(hood);

    // Hood Aerodynamic Center Air Scoop / Heat Extractor
    const scoopGeom = new THREE.BoxGeometry(0.8, 0.15, 1.4);
    const scoop = new THREE.Mesh(scoopGeom, carbonFiberMat);
    scoop.position.set(0, 1.0, 2.4);
    this.carRoot.add(scoop);

    // Aerodynamic Cockpit / Canopy Glass Roof
    const cockpitGeom = new THREE.CylinderGeometry(1.2, 1.6, 3.2, 8);
    cockpitGeom.scale(1, 0.65, 1.3);
    const cockpit = new THREE.Mesh(cockpitGeom, glassMat);
    cockpit.position.set(0, 1.45, 0.1);
    this.carRoot.add(cockpit);

    // Carbon Fiber Roof Stripe
    const roofStripGeom = new THREE.BoxGeometry(0.7, 0.1, 2.8);
    const roofStrip = new THREE.Mesh(roofStripGeom, carbonFiberMat);
    roofStrip.position.set(0, 1.8, 0.1);
    this.carRoot.add(roofStrip);

    // Rear Mid-Engine Deck & Slatted Louvers
    const rearDeckGeom = new THREE.BoxGeometry(3.3, 0.6, 2.6);
    const rearDeck = new THREE.Mesh(rearDeckGeom, carPaintMat);
    rearDeck.position.set(0, 1.0, -2.4);
    this.carRoot.add(rearDeck);

    // Translucent Engine Bay Cover with glowing engine core underneath
    const engineCoverGeom = new THREE.BoxGeometry(1.5, 0.1, 1.8);
    const engineCover = new THREE.Mesh(engineCoverGeom, glassMat);
    engineCover.position.set(0, 1.32, -2.2);
    this.carRoot.add(engineCover);

    // Engine Block Core Glow inside bay
    const engineBlockGeom = new THREE.BoxGeometry(1.1, 0.4, 1.3);
    const engineBlockMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      emissive: 0xff1e27,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
    });
    const engineBlock = new THREE.Mesh(engineBlockGeom, engineBlockMat);
    engineBlock.position.set(0, 1.05, -2.2);
    this.carRoot.add(engineBlock);

    // -------------------------------------------------------------
    // B. Aerodynamic Carbon Aero: Splitter, Side Skirts, Wing & Diffuser
    // -------------------------------------------------------------
    // Front Carbon Splitter & Air Dam
    const splitterGeom = new THREE.BoxGeometry(4.0, 0.12, 1.4);
    const splitter = new THREE.Mesh(splitterGeom, carbonFiberMat);
    splitter.position.set(0, 0.22, 3.8);
    this.carRoot.add(splitter);

    // Front Aero Canards (Left & Right)
    [-1.9, 1.9].forEach(x => {
      const canardGeom = new THREE.BoxGeometry(0.4, 0.08, 0.8);
      const canard = new THREE.Mesh(canardGeom, rossoRedMat);
      canard.position.set(x, 0.5, 3.5);
      canard.rotation.z = x > 0 ? -0.25 : 0.25;
      canard.rotation.y = x > 0 ? 0.2 : -0.2;
      this.carRoot.add(canard);
    });

    // Side Skirts with Aero Ground Effect Blades
    [-1.85, 1.85].forEach(x => {
      const skirtGeom = new THREE.BoxGeometry(0.25, 0.15, 5.0);
      const skirt = new THREE.Mesh(skirtGeom, carbonFiberMat);
      skirt.position.set(x, 0.25, 0);
      this.carRoot.add(skirt);

      // Side Air Intakes / Cooling Ducts for Brakes & Turbos
      const intakeGeom = new THREE.BoxGeometry(0.35, 0.6, 1.2);
      const intake = new THREE.Mesh(intakeGeom, carbonFiberMat);
      intake.position.set(x * 0.95, 0.85, -1.2);
      this.carRoot.add(intake);

      // Rosso Side Stripe Accent
      const stripeGeom = new THREE.BoxGeometry(0.05, 0.1, 4.4);
      const stripe = new THREE.Mesh(stripeGeom, rossoRedMat);
      stripe.position.set(x * 1.02, 0.55, 0.1);
      this.carRoot.add(stripe);
    });

    // Rear Carbon Diffuser with Vertical Aero Fins
    const diffuserGeom = new THREE.BoxGeometry(3.6, 0.2, 1.2);
    const diffuser = new THREE.Mesh(diffuserGeom, carbonFiberMat);
    diffuser.position.set(0, 0.25, -3.8);
    this.carRoot.add(diffuser);

    // Diffuser vertical fins
    [-1.2, -0.4, 0.4, 1.2].forEach(x => {
      const finGeom = new THREE.BoxGeometry(0.08, 0.35, 1.1);
      const fin = new THREE.Mesh(finGeom, carbonFiberMat);
      fin.position.set(x, 0.32, -3.8);
      this.carRoot.add(fin);
    });

    // Big GT Rear Wing / Spoiler
    const wingMainGeom = new THREE.BoxGeometry(4.2, 0.1, 1.1);
    const wingMain = new THREE.Mesh(wingMainGeom, carbonFiberMat);
    wingMain.position.set(0, 2.05, -3.6);
    wingMain.rotation.x = 0.08; // Downforce angle of attack
    this.carRoot.add(wingMain);

    // Wing Endplates (Left & Right)
    [-2.1, 2.1].forEach(x => {
      const endplateGeom = new THREE.BoxGeometry(0.08, 0.55, 1.2);
      const endplate = new THREE.Mesh(endplateGeom, rossoRedMat);
      endplate.position.set(x, 2.05, -3.6);
      this.carRoot.add(endplate);
    });

    // Dual Wing Stanchions / Swan Neck Mounts
    [-0.85, 0.85].forEach(x => {
      const mountGeom = new THREE.BoxGeometry(0.1, 0.85, 0.2);
      const mount = new THREE.Mesh(mountGeom, carbonFiberMat);
      mount.position.set(x, 1.6, -3.5);
      mount.rotation.x = -0.3;
      this.carRoot.add(mount);
    });

    // -------------------------------------------------------------
    // C. LED Lights: Headlights, Taillight Bar & Underglow
    // -------------------------------------------------------------
    // Dual Aggressive LED Matrix Headlights
    [-1.25, 1.25].forEach(x => {
      const hlGeom = new THREE.BoxGeometry(0.7, 0.15, 0.3);
      const hl = new THREE.Mesh(hlGeom, headLightMat);
      hl.position.set(x, 0.85, 3.82);
      this.carRoot.add(hl);

      // Projector light beam cone
      const beamGeom = new THREE.ConeGeometry(0.8, 4.0, 16, 1, true);
      beamGeom.rotateX(-Math.PI / 2);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeom, beamMat);
      beam.position.set(x, 0.85, 5.8);
      this.carRoot.add(beam);
    });

    // Full-Width Rear LED Taillight Bar
    const tailBarGeom = new THREE.BoxGeometry(3.2, 0.12, 0.15);
    const tailBar = new THREE.Mesh(tailBarGeom, tailLightMat);
    tailBar.position.set(0, 1.05, -3.92);
    this.carRoot.add(tailBar);

    // Neon Chassis Underglow Plane
    const underglowGeom = new THREE.PlaneGeometry(3.6, 7.2);
    this.underglowMat = new THREE.MeshBasicMaterial({
      color: 0xff1e27,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const underglow = new THREE.Mesh(underglowGeom, this.underglowMat);
    underglow.rotation.x = -Math.PI / 2;
    underglow.position.y = 0.05;
    this.carRoot.add(underglow);

    // -------------------------------------------------------------
    // D. 4 High-Performance Wheels with Alloy Rims & Brake Rotors
    // -------------------------------------------------------------
    const wheelPositions = [
      { x: -1.8, y: 0.65, z: 2.3, isFront: true },  // Front Left
      { x: 1.8, y: 0.65, z: 2.3, isFront: true },   // Front Right
      { x: -1.85, y: 0.72, z: -2.2, isFront: false }, // Rear Left (wider)
      { x: 1.85, y: 0.72, z: -2.2, isFront: false },  // Rear Right (wider)
    ];

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x0d0f14,
      metalness: 0.3,
      roughness: 0.75,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xddb040, // Bronze / Monaco Gold Alloy Rims
      metalness: 0.95,
      roughness: 0.15,
    });

    const brakeRotorMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x000000,
      emissiveIntensity: 0,
    });

    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27, // Rosso Corsa Red Brake Caliper
      metalness: 0.8,
      roughness: 0.2,
    });

    wheelPositions.forEach((pos, idx) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      const tireRadius = pos.isFront ? 0.65 : 0.72;
      const tireWidth = pos.isFront ? 0.45 : 0.55;

      // Tire Rubber Ring
      const tireGeom = new THREE.CylinderGeometry(tireRadius, tireRadius, tireWidth, 24);
      tireGeom.rotateZ(Math.PI / 2);
      const tire = new THREE.Mesh(tireGeom, tireMat);
      wheelGroup.add(tire);

      // Rim Center Hub
      const rimGeom = new THREE.CylinderGeometry(tireRadius * 0.72, tireRadius * 0.72, tireWidth * 1.02, 16);
      rimGeom.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeom, rimMat);
      wheelGroup.add(rim);

      // 5 Rim Spokes
      for (let s = 0; s < 5; s++) {
        const spokeGeom = new THREE.BoxGeometry(tireWidth * 1.04, tireRadius * 1.3, 0.08);
        const spoke = new THREE.Mesh(spokeGeom, rimMat);
        spoke.rotation.x = (s * Math.PI) / 5;
        wheelGroup.add(spoke);
      }

      // Drilled Disc Brake Rotor inside wheel
      const rotorGeom = new THREE.CylinderGeometry(tireRadius * 0.55, tireRadius * 0.55, 0.05, 16);
      rotorGeom.rotateZ(Math.PI / 2);
      const rotor = new THREE.Mesh(rotorGeom, brakeRotorMat.clone());
      rotor.position.x = pos.x > 0 ? -0.12 : 0.12;
      wheelGroup.add(rotor);
      this.brakeDiscs.push(rotor);

      // Red Sport Brake Caliper
      const caliperGeom = new THREE.BoxGeometry(0.18, tireRadius * 0.35, 0.3);
      const caliper = new THREE.Mesh(caliperGeom, caliperMat);
      caliper.position.set(pos.x > 0 ? -0.12 : 0.12, tireRadius * 0.3, 0);
      wheelGroup.add(caliper);

      this.wheels.push(wheelGroup);
      this.carRoot.add(wheelGroup);
    });

    // -------------------------------------------------------------
    // E. Dual High-Flow Exhaust Pipes & Nitro Flame Jets
    // -------------------------------------------------------------
    [-0.65, 0.65].forEach(x => {
      const tipGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.5, 16);
      tipGeom.rotateX(Math.PI / 2);
      const tipMat = new THREE.MeshStandardMaterial({
        color: 0x222630,
        metalness: 0.95,
        roughness: 0.1,
      });
      const tip = new THREE.Mesh(tipGeom, tipMat);
      tip.position.set(x, 0.5, -3.95);
      this.carRoot.add(tip);

      // Nitro Flame Cone
      const flameGeom = new THREE.ConeGeometry(0.25, 1.4, 12);
      flameGeom.rotateX(-Math.PI / 2);
      const flameMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const flame = new THREE.Mesh(flameGeom, flameMat);
      flame.position.set(x, 0.5, -4.7);
      this.exhaustFlames.push(flame);
      this.carRoot.add(flame);
    });

    // -------------------------------------------------------------
    // F. Asphalt Turntable Platform & Telemetry Rings
    // -------------------------------------------------------------
    const padGeom = new THREE.CylinderGeometry(7.5, 7.5, 0.15, 48);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x080c16,
      roughness: 0.6,
      metalness: 0.5,
    });
    this.carPad = new THREE.Mesh(padGeom, padMat);
    this.carPad.position.y = -0.08;
    this.carGroup.add(this.carPad);

    // Glowing telemetry circular rings
    const ringGeom1 = new THREE.RingGeometry(7.2, 7.35, 64);
    ringGeom1.rotateX(-Math.PI / 2);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff1e27,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.position.y = 0.02;
    this.carGroup.add(ring1);

    const ringGeom2 = new THREE.RingGeometry(5.0, 5.1, 48);
    ringGeom2.rotateX(-Math.PI / 2);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.position.y = 0.02;
    this.carGroup.add(ring2);
  }

  // =================================================================
  // 2. NEON CIRCUIT MODE BUILDER (High-Speed Expressway)
  // =================================================================
  buildNeonCircuit() {
    this.trackRoot = new THREE.Group();
    this.trackGroup.add(this.trackRoot);

    // 3D Curving Highway Plane
    const trackWidth = 14;
    const trackLength = 120;
    const segmentsX = 20;
    const segmentsZ = 80;

    this.trackGeom = new THREE.PlaneGeometry(trackWidth, trackLength, segmentsX, segmentsZ);
    this.trackGeom.rotateX(-Math.PI / 2);

    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.4,
      metalness: 0.7,
      wireframe: true,
      emissive: 0x002233,
      emissiveIntensity: 0.5,
    });

    this.trackMesh = new THREE.Mesh(this.trackGeom, trackMat);
    this.trackMesh.position.set(0, -2.5, -20);
    this.trackRoot.add(this.trackMesh);

    // Speed Tunnel Arches / Telemetry Gates
    this.trackArches = [];
    for (let i = 0; i < 6; i++) {
      const archGeom = new THREE.TorusGeometry(6.5, 0.08, 8, 32, Math.PI);
      const archMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xff1e27 : 0x00f0ff,
        transparent: true,
        opacity: 0.8,
      });
      const arch = new THREE.Mesh(archGeom, archMat);
      arch.position.set(0, -2.5, -i * 18 + 10);
      this.trackArches.push(arch);
      this.trackRoot.add(arch);
    }

    // High Speed Road Markings
    const markerCount = 25;
    const markerGeom = new THREE.BoxGeometry(0.3, 0.05, 3.5);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.roadMarkers = [];

    for (let i = 0; i < markerCount; i++) {
      const m = new THREE.Mesh(markerGeom, markerMat);
      m.position.set(0, -2.4, (i - markerCount / 2) * 5.5);
      this.roadMarkers.push(m);
      this.trackRoot.add(m);
    }
  }

  // =================================================================
  // 3. TWIN-TURBO V12 ENGINE CORE MODE BUILDER
  // =================================================================
  buildTwinTurboEngine() {
    this.engineRoot = new THREE.Group();
    this.engineGroup.add(this.engineRoot);

    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x1a2233,
      metalness: 0.95,
      roughness: 0.2,
    });

    const manifoldMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      emissive: 0xaa1015,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.25,
    });

    const turboSnailMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x005577,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Central V-Engine Block
    const vBlockGeom = new THREE.BoxGeometry(3.2, 2.4, 4.2);
    const vBlock = new THREE.Mesh(vBlockGeom, blockMat);
    this.engineRoot.add(vBlock);

    // Left & Right Angled Cylinder Valve Covers
    [-1.3, 1.3].forEach(x => {
      const coverGeom = new THREE.BoxGeometry(1.4, 0.6, 4.4);
      const cover = new THREE.Mesh(coverGeom, manifoldMat);
      cover.position.set(x, 1.3, 0);
      cover.rotation.z = x > 0 ? -0.45 : 0.45;
      this.engineRoot.add(cover);
    });

    // Twin Turbochargers (Left & Right Snail Housings)
    this.turbines = [];
    [-2.4, 2.4].forEach(x => {
      const snailGeom = new THREE.TorusGeometry(1.1, 0.45, 16, 32);
      const snail = new THREE.Mesh(snailGeom, turboSnailMat);
      snail.position.set(x, 0.2, 0.8);
      snail.rotation.y = Math.PI / 2;
      this.engineRoot.add(snail);

      // Spinning Impeller Fan inside turbo
      const fanGeom = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 8);
      fanGeom.rotateX(Math.PI / 2);
      const fanMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const fan = new THREE.Mesh(fanGeom, fanMat);
      fan.position.set(x, 0.2, 0.8);
      this.turbines.push(fan);
      this.engineRoot.add(fan);

      // Intercooler Charge Pipes
      const pipeGeom = new THREE.CylinderGeometry(0.3, 0.3, 3.2, 16);
      const pipe = new THREE.Mesh(pipeGeom, blockMat);
      pipe.position.set(x * 0.75, 1.4, -0.6);
      pipe.rotation.z = x > 0 ? -0.7 : 0.7;
      pipe.rotation.x = 0.4;
      this.engineRoot.add(pipe);
    });

    // Orbiting 3D Holographic RPM Tachometer Ring
    const tachoGeom = new THREE.RingGeometry(4.2, 4.35, 64);
    const tachoMat = new THREE.MeshBasicMaterial({
      color: 0xff1e27,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    this.tachoRing = new THREE.Mesh(tachoGeom, tachoMat);
    this.tachoRing.rotation.x = Math.PI / 4;
    this.engineRoot.add(this.tachoRing);

    // Digital RPM Needle
    const needleGeom = new THREE.BoxGeometry(0.12, 3.6, 0.05);
    const needleMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    this.tachoNeedle = new THREE.Mesh(needleGeom, needleMat);
    this.tachoNeedle.position.set(0, 1.8, 0.05);
    this.tachoRing.add(this.tachoNeedle);
  }

  // =================================================================
  // MODE CONTROLLER & SOUND TRIGGERS
  // =================================================================
  setMode(modeName) {
    if (this.currentMode === modeName) return;
    this.currentMode = modeName;

    // Trigger sports car turbo blowoff sound
    if (window.soundEngine) {
      window.soundEngine.playTurboBlowoff();
    }

    // Toggle visibility
    this.carGroup.visible = modeName === 'car';
    this.trackGroup.visible = modeName === 'track';
    this.engineGroup.visible = modeName === 'engine';

    // Camera adjustment per mode
    if (modeName === 'track') {
      this.camera.position.set(0, 2.2, 14);
      this.camera.lookAt(0, 0, -10);
    } else if (modeName === 'engine') {
      this.camera.position.set(0, 2.0, 12);
      this.camera.lookAt(0, 0, 0);
    } else {
      // Default Sports Car View
      this.camera.position.set(0, 3.5, 15);
      this.camera.lookAt(0, 0.8, 0);
    }

    // Update active UI indicator buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      const btnMode = btn.getAttribute('data-mode');
      if (btnMode === modeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  triggerNitroBoost() {
    this.nitroEnergy = 1.0;
    this.carSpeed = 3.5;

    // Trigger sports car rev / throttle launch sound
    if (window.soundEngine) {
      window.soundEngine.playNitroBoost();
    }
  }

  // Alias for backward compatibility
  triggerEnergyPulse() {
    this.triggerNitroBoost();
  }

  bindEvents() {
    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.mouse.targetX = (e.clientX / w) * 2 - 1;
      this.mouse.targetY = -(e.clientY / h) * 2 + 1;
    });

    // Touch support for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.mouse.targetX = (touch.clientX / w) * 2 - 1;
        this.mouse.targetY = -(touch.clientY / h) * 2 + 1;
      }
    }, { passive: true });

    // Scroll progress tracking
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    // Interactive canvas click -> Nitro Launch!
    this.container.addEventListener('click', () => {
      this.triggerNitroBoost();
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });

    // Hook mode switcher buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-mode');
        if (mode) this.setMode(mode);
      });
    });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // =================================================================
  // MAIN 60 FPS RENDER LOOP
  // =================================================================
  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth lerp mouse coordinates
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Decay nitro energy
    if (this.nitroEnergy > 0) {
      this.nitroEnergy = Math.max(0, this.nitroEnergy - delta * 1.6);
      this.carSpeed = 1.0 + this.nitroEnergy * 2.5;
    } else {
      this.carSpeed = 1.0;
    }

    // Orbit dynamic point lights
    if (this.redKeyLight) {
      this.redKeyLight.position.x = Math.sin(elapsedTime * 0.8) * 12;
      this.redKeyLight.position.z = Math.cos(elapsedTime * 0.8) * 12;
    }
    if (this.cyanFillLight) {
      this.cyanFillLight.position.x = Math.cos(elapsedTime * 0.6) * 12;
      this.cyanFillLight.position.y = Math.sin(elapsedTime * 0.6) * 6;
    }

    // Animate Speed Particles rushing past (300 km/h sensation)
    if (this.speedParticles) {
      const geom = this.speedParticles.geometry;
      const pos = geom.attributes.position;
      const speeds = this.speedParticles.userData.speeds;
      const count = pos.count;

      for (let i = 0; i < count; i++) {
        let z = pos.getZ(i);
        z += speeds[i] * 0.45 * this.carSpeed;
        if (z > 25) {
          z = -30;
          pos.setX(i, (Math.random() - 0.5) * 45);
          pos.setY(i, (Math.random() - 0.3) * 20);
        }
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }

    // -------------------------------------------------------------
    // MODE 1: HYPERCAR 3D ANIMATION
    // -------------------------------------------------------------
    if (this.currentMode === 'car' && this.carGroup.visible) {
      // Rotate sports alloy wheels
      const wheelSpinSpeed = 0.15 * this.carSpeed;
      this.wheels.forEach(w => {
        w.children.forEach(part => {
          part.rotation.x += wheelSpinSpeed;
        });
      });

      // Disc brakes heat glow up on nitro pulse
      this.brakeDiscs.forEach(rotor => {
        if (this.nitroEnergy > 0.05) {
          rotor.material.emissive.setHex(0xff3300);
          rotor.material.emissiveIntensity = this.nitroEnergy * 1.5;
        } else {
          rotor.material.emissiveIntensity = 0;
        }
      });

      // Exhaust nitro flames burst & flicker
      this.exhaustFlames.forEach(flame => {
        if (this.nitroEnergy > 0.05) {
          flame.material.opacity = this.nitroEnergy * (0.6 + Math.random() * 0.4);
          flame.scale.set(
            1.0 + Math.random() * 0.3,
            1.0 + Math.random() * 0.5 * this.nitroEnergy,
            1.0 + this.nitroEnergy * 1.2
          );
        } else {
          flame.material.opacity = 0;
        }
      });

      // Underglow intensity pulse
      if (this.underglowMat) {
        this.underglowMat.opacity = 0.4 + this.nitroEnergy * 0.5 + Math.sin(elapsedTime * 4) * 0.08;
      }

      // Smooth vehicle chassis suspension sway & mouse parallax
      this.carRoot.position.y = Math.sin(elapsedTime * 2.4) * 0.05;
      this.carRoot.rotation.z = Math.sin(elapsedTime * 1.8) * 0.015 - this.mouse.x * 0.04;
      
      // Rotate entire turntable & car with mouse + scroll progress
      const targetRotationY = elapsedTime * 0.18 + this.mouse.x * 0.8 + (this.scrollProgress * Math.PI * 1.5);
      this.carGroup.rotation.y = targetRotationY;
      this.carGroup.rotation.x = -this.mouse.y * 0.25;
    }

    // -------------------------------------------------------------
    // MODE 2: NEON CIRCUIT ANIMATION
    // -------------------------------------------------------------
    if (this.currentMode === 'track' && this.trackGroup.visible) {
      // Move road dash markings continuously
      const markerSpeed = 0.6 * this.carSpeed;
      this.roadMarkers.forEach(m => {
        m.position.z += markerSpeed;
        if (m.position.z > 20) {
          m.position.z = -55;
        }
      });

      // Animate track undulating waves
      const pos = this.trackGeom.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const wave = Math.sin(y * 0.15 + elapsedTime * 4.0 * this.carSpeed) * 0.6;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;

      // Pulse track arches
      this.trackArches.forEach((arch, idx) => {
        arch.position.z += 0.35 * this.carSpeed;
        if (arch.position.z > 25) {
          arch.position.z = -80;
        }
      });

      this.trackGroup.rotation.y = this.mouse.x * 0.3;
      this.trackGroup.rotation.x = this.mouse.y * 0.15;
    }

    // -------------------------------------------------------------
    // MODE 3: TWIN-TURBO V12 ENGINE ANIMATION
    // -------------------------------------------------------------
    if (this.currentMode === 'engine' && this.engineGroup.visible) {
      // Spin turbocharger impeller fans at high RPM
      const turboRpm = 0.25 * this.carSpeed;
      this.turbines.forEach(fan => {
        fan.rotation.y += turboRpm;
      });

      // Tachometer needle sweep with engine RPM throttle
      if (this.tachoNeedle) {
        const needleAngle = -Math.PI / 3 + (Math.sin(elapsedTime * 3) * 0.3 + this.nitroEnergy * 1.4);
        this.tachoNeedle.rotation.z = needleAngle;
      }

      // Rotate engine core with mouse parallax
      this.engineRoot.rotation.y = elapsedTime * 0.25 + this.mouse.x * 0.6;
      this.engineRoot.rotation.x = Math.sin(elapsedTime * 1.5) * 0.1 - this.mouse.y * 0.3;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}

// Attach to window
window.PortfolioScene = PortfolioScene;
