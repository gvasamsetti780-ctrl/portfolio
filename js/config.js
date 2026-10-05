/**
 * ====================================================================
 * PORTFOLIO CONFIGURATION FILE - SPORTS CAR & MOTORSPORT EDITION
 * ====================================================================
 * Customize personal details, racing telemetry, projects, skills,
 * and academic milestones. The entire site updates automatically!
 */

const PORTFOLIO_CONFIG = {
  // Personal & Academic Identity
  personal: {
    name: "Aarav Sharma",
    preferredName: "Aarav",
    title: "B.Tech Computer Science & Automotive Systems",
    role: "Full-Stack Engineer, 3D Telemetry & Motorsport Tech Specialist",
    statusBadge: "Track-Ready: Available for Internships & Projects",
    location: "New Delhi, India",
    institution: "Delhi Technological University (DTU)",
    department: "Department of Computer Science & Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    year: "3rd Year Undergraduate (Class of 2027)",
    cgpa: "8.92 / 10.0",
    bio: "Undergraduate computer science engineer engineered for speed and precision. Specializing in high-performance web systems, real-time 3D racing telemetry visualizers, autonomous vehicle algorithms, and low-latency distributed cloud architecture. Formula Student telemetry engineer and 3D graphics enthusiast.",
    avatarUrl: "", 
    resumeUrl: "#resume-link", // Replace with your Google Drive / PDF link
    email: "aarav.sharma.tech@gmail.com",
    phone: "+91 98765 43210",
  },

  // Key stats shown in Hero & Overview (Motorsport / Telemetry themed)
  stats: [
    { label: "Top Lap Time", value: "1:18.42s", icon: "timer", sub: "Formula Student Lead" },
    { label: "DSA LeetCode", value: "480+", icon: "code", sub: "Top 8% Global Speed" },
    { label: "Engineered Projects", value: "18+", icon: "layers", sub: "3D, Telemetry & AI" },
    { label: "GitHub Commits", value: "950+", icon: "git-commit", sub: "High-RPM Builder" },
  ],

  // Telemetry Specs for Hero HUD
  telemetry: {
    maxRpm: "9,500 RPM",
    horsepower: "820 HP",
    zeroToHundred: "2.4s",
    topSpeed: "348 km/h",
    aeroDownforce: "650 kg @ 250km/h",
    weightDistribution: "42 : 58",
  },

  // Social & Professional Profiles
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    leetcode: "https://leetcode.com",
    twitter: "https://twitter.com",
    email: "mailto:aarav.sharma.tech@gmail.com",
  },

  // Technical Skills Matrix (Automotive, 3D, Systems & Web)
  skills: {
    "Automotive & Embedded Systems": [
      { name: "C / C++", level: 92, icon: "terminal", tag: "ECU / RTOS & DSA" },
      { name: "CAN Bus & Telemetry Protocols", level: 85, icon: "cpu", tag: "OBD-II / Serial" },
      { name: "Python & Data Telemetry", level: 90, icon: "activity", tag: "NumPy / Pandas" },
      { name: "Embedded Systems / ESP32", level: 82, icon: "zap", tag: "Sensors & Actuators" },
      { name: "Real-time Sockets (TCP/UDP)", level: 88, icon: "radio", tag: "Sub-10ms Streaming" },
    ],
    "3D Graphics & Spatial Web": [
      { name: "Three.js / WebGL", level: 94, icon: "box", tag: "Car Shaders & 3D" },
      { name: "GLSL Custom Shaders", level: 82, icon: "sparkles", tag: "PBR & Particle FX" },
      { name: "React.js / Next.js", level: 90, icon: "atom", tag: "Telemetry Dashboards" },
      { name: "Tailwind CSS & Carbon UI", level: 95, icon: "palette", tag: "Aero HUD Design" },
      { name: "HTML5 Canvas 2D/3D", level: 95, icon: "monitor", tag: "Gauges & Telemetry" },
      { name: "GSAP Motion Physics", level: 86, icon: "gauge", tag: "RPM & Gauge Physics" },
    ],
    "Backend & Cloud Infrastructure": [
      { name: "Node.js & Express", level: 88, icon: "server", tag: "Microservices" },
      { name: "FastAPI", level: 85, icon: "zap", tag: "High-Perf Async API" },
      { name: "PostgreSQL & TimeScaleDB", level: 86, icon: "database", tag: "Time-Series Telemetry" },
      { name: "Redis Cache", level: 88, icon: "hard-drive", tag: "In-Memory Speed" },
      { name: "Docker & Containerization", level: 80, icon: "container", tag: "DevOps & Deploy" },
      { name: "AWS (EC2, S3, IoT Core)", level: 78, icon: "cloud", tag: "Cloud Infrastructure" },
    ],
    "Computer Science Core": [
      { name: "Data Structures & Algorithms", level: 92, icon: "git-branch", tag: "Graph, DP, Trees" },
      { name: "Operating Systems & Kernels", level: 86, icon: "terminal", tag: "Threads, Concurrency" },
      { name: "Computer Networks & HTTP/3", level: 84, icon: "network", tag: "Low Latency Routing" },
      { name: "Database Management (DBMS)", level: 88, icon: "table", tag: "ACID, Index Tuning" },
      { name: "Low-Level System Design (LLD)", level: 82, icon: "layout", tag: "High-Throughput Arch" },
    ],
    "Engineering Toolchain": [
      { name: "Git & GitHub", level: 95, icon: "git-pull-request", tag: "Version Control" },
      { name: "Linux / Shell Mastery", level: 88, icon: "terminal-square", tag: "CLI & Systemd" },
      { name: "Postman & API Profilers", level: 90, icon: "send", tag: "Network Debugging" },
      { name: "Figma UI/UX Prototyping", level: 80, icon: "pen-tool", tag: "Cockpit HUD Design" },
      { name: "VS Code & Profiling Tools", level: 96, icon: "code-2", tag: "Primary Dev Studio" },
    ],
  },

  // Featured High-Performance & Automotive Projects
  projects: [
    {
      id: "apex-telemetry-3d",
      title: "ApexTelemetry 3D",
      category: "3d",
      tagline: "Real-time 3D Formula & Hypercar Spatial Telemetry Visualizer",
      description: "An immersive 3D racing telemetry platform rendered with Three.js that streams live tire temperature heatmaps, aerodynamic downforce vectors, and G-force spatial graphs at 60 FPS.",
      detailedDescription: "Engineered for Formula Student & track day racers. Ingests high-frequency CAN-bus sensor packets via WebSockets, parses throttle/brake traces, and generates an interactive 3D thermal chassis visualization with lap delta analytics.",
      technologies: ["Three.js", "WebGL", "TypeScript", "TailwindCSS", "WebSockets", "Canvas API"],
      metrics: ["60 FPS 3D Stream", "<12ms Ingestion Delay", "Used by 4 Racing Teams"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      featured: true,
      gradient: "from-red-500/20 via-orange-500/10 to-amber-500/20",
      accentColor: "#ff1e27",
    },
    {
      id: "apex-drive-ai",
      title: "ApexDrive AI Simulator",
      category: "ai",
      tagline: "Autonomous Sports Car Path Planning & Optimal Racing Line AI",
      description: "Deep reinforcement learning driving simulator that computes apex clipping points, dynamic braking zones, and collision avoidance trajectories on photorealistic 3D circuits.",
      detailedDescription: "Trained using Proximal Policy Optimization (PPO) and PyTorch. Simulates realistic vehicle dynamics including tire slip angles, weight transfer, and aero drag across 5 legendary international race circuits.",
      technologies: ["Python", "PyTorch", "OpenCV", "Three.js", "FastAPI", "Docker"],
      metrics: ["99.2% Track Completion", "0.4s Faster than Baseline", "1st Prize AutoTech 2025"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      featured: true,
      gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      accentColor: "#00f0ff",
    },
    {
      id: "turbodyno-cloud",
      title: "TurboDyno Cloud Engine",
      category: "fullstack",
      tagline: "High-Throughput Dyno & Engine Tuning Analytics Dashboard",
      description: "Cloud telemetry hub for dynamometer engine tests, charting real-time Horsepower, Torque, Air-Fuel Ratio (AFR), boost pressure, and exhaust gas temperatures.",
      detailedDescription: "Built with React, FastAPI, Redis, and TimeScaleDB to ingest 1,000+ data points per second with zero frame drops. Features interactive fuel map 3D surface graphs and automated ECU tuning suggestions.",
      technologies: ["React", "FastAPI", "TimeScaleDB", "Redis", "WebSockets", "Chart.js"],
      metrics: ["10k+ Data Points/sec", "Real-time 3D Fuel Maps", "Sub-15ms Latency"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      featured: true,
      gradient: "from-amber-500/20 via-red-500/10 to-purple-500/20",
      accentColor: "#ffb703",
    },
    {
      id: "aeroflow-3d-cfd",
      title: "AeroFlow 3D Wind Tunnel",
      category: "3d",
      tagline: "Spatial Computational Fluid Dynamics (CFD) Visualizer for Hypercars",
      description: "Interactive browser-based 3D wind tunnel visualizer simulating aerodynamic airflows, vortex shedding around rear wings, and ground-effect venturi downforce tunnels.",
      detailedDescription: "Utilizes GPU particle shaders and vector velocity fields in WebGL to render 50,000+ streamline particles interacting with custom 3D supercar CAD geometries in real time.",
      technologies: ["Three.js", "GLSL Shaders", "WebGL", "TypeScript", "MathJS"],
      metrics: ["50,000 GPU Particles", "60 FPS Fluid Stream", "Featured in SAE India"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      featured: false,
      gradient: "from-emerald-500/20 via-cyan-500/10 to-blue-500/20",
      accentColor: "#00ff88",
    },
    {
      id: "gearbox-monaco",
      title: "GearBox Monaco Marketplace",
      category: "fullstack",
      tagline: "Ultra-Fast Supercar Auction & Track Day Telemetry Exchange",
      description: "Decentralized high-performance auction marketplace with live bidding WebSockets, verified vehicle provenance, and embedded track day lap video records.",
      detailedDescription: "Engineered with Next.js, Node.js, and PostgreSQL. Integrates real-time bidding rooms, encrypted ownership certificates, and automated high-res 3D model vehicle previews.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io", "AWS S3"],
      metrics: ["$2.4M Simulated Volume", "99.9% Uptime", "Instant Bid Resolution"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      featured: false,
      gradient: "from-purple-500/20 via-pink-500/10 to-red-500/20",
      accentColor: "#a855f7",
    },
    {
      id: "ecu-forge",
      title: "ECU-Forge Calibration Tool",
      category: "ai",
      tagline: "Microcontroller Firmware & Ignition Timing Optimization Suite",
      description: "Desktop & Web CLI interface for flashing embedded ECU microcontrollers, monitoring CAN bus packet traffic, and tuning variable valve timing tables.",
      detailedDescription: "Includes automated diagnostic trouble code (DTC) scanner, real-time checksum validation, and safety rev-limiter governors configured in C++ and Python.",
      technologies: ["C++", "Python", "Qt / WebUI", "Serial/UART", "Linux"],
      metrics: ["Zero Packet Loss", "16-bit Hex Map Editor", "B.Tech Best Capstone"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      featured: false,
      gradient: "from-rose-500/20 via-red-500/10 to-orange-500/20",
      accentColor: "#f43f5e",
    },
  ],

  // Academic Journey & B.Tech Milestones
  academicMilestones: [
    {
      period: "2023 - 2024",
      year: "Year 1: Engineering Fundamentals & C/C++ Ignition",
      institution: "Delhi Technological University",
      status: "Completed (CGPA: 8.85)",
      highlights: [
        "Mastered C and C++ programming fundamentals, memory management & pointer mechanics.",
        "Engineering Mathematics (Multivariable Calculus, Linear Algebra, Differential Equations).",
        "Joined DTU Formula Student racing club as Junior Telemetry & Sensor Trainee.",
        "Engineered first CLI lap time calculator and mechanical stress computation tools.",
      ],
      badge: "Ignition Stage",
    },
    {
      period: "2024 - 2025",
      year: "Year 2: Core Computer Science, CAN Bus & Algorithms",
      institution: "Delhi Technological University",
      status: "Completed (CGPA: 8.95)",
      highlights: [
        "In-depth Data Structures & Algorithms: Solved 400+ problems on LeetCode & CodeChef.",
        "Computer Organization & Architecture (Assembly, micro-architecture, cache hierarchies).",
        "Object-Oriented Design with Java & C++ with design patterns for real-time telemetry.",
        "Built first 3D vehicle telemetry simulator for national collegiate motorsport competition.",
      ],
      badge: "Turbocharged Core",
    },
    {
      period: "2025 - 2026",
      year: "Year 3: Advanced Systems, 3D WebGL & Autonomous Tech",
      institution: "Delhi Technological University",
      status: "Currently Active (CGPA: 8.92)",
      highlights: [
        "Operating Systems (Kernel thread scheduling, real-time IPC, memory virtualization).",
        "Database Management Systems & Time-Series DBs for high-frequency telemetry storage.",
        "Computer Networks (Low-latency UDP/TCP sockets, packet inspection, HTTP/3).",
        "Specializing in Three.js GPU shaders, WebGL 3D spatial dynamics, and distributed backends.",
      ],
      badge: "Apex Telemetry & Scale",
    },
    {
      period: "2026 - 2027",
      year: "Year 4: Major Capstone & Autonomous Hypercar Launch",
      institution: "Delhi Technological University",
      status: "Upcoming Target",
      highlights: [
        "Final Year Major Capstone Project: High-Frequency Autonomous Vehicle Vision & Spatial Telemetry.",
        "Electives in Cloud Computing, Deep Reinforcement Learning, and Embedded Robotics.",
        "Industry Software Engineering Internship and open-source automotive contributions.",
      ],
      badge: "Checkered Flag Capstone",
    },
  ],

  // Experience & Leadership
  experiences: [
    {
      role: "Telemetry & Software Engineering Lead",
      organization: "DTU Formula Student / Racing Team",
      period: "Aug 2024 - Present",
      type: "Motorsport Leadership",
      description: "Spearheaded development of real-time wireless telemetry dashboard streaming 40+ sensor channels (tire temp, wheel speed, throttle, suspension travel) directly to pit wall laptops with sub-15ms latency.",
      technologies: ["C++", "Three.js", "WebSockets", "FastAPI", "CAN-bus", "Linux"],
    },
    {
      role: "Software Engineering Intern",
      organization: "Apex AutoTech Labs / Tech Innovations",
      period: "May 2025 - Jul 2025",
      type: "Internship",
      description: "Engineered scalable REST microservices in FastAPI, refactored high-traffic telemetry dashboard components with React & TypeScript, and decreased database query latency by 36% with Redis caching.",
      technologies: ["React", "FastAPI", "Redis", "Docker", "PostgreSQL", "Three.js"],
    },
    {
      role: "Open Source Contributor",
      organization: "WebGL & Automotive Simulation Community",
      period: "Oct 2024 - Present",
      type: "Open Source",
      description: "Contributed performance profiling tools, GLSL shader samples, and vehicle kinematics models to prominent JavaScript & 3D graphics open-source repositories.",
      technologies: ["Git", "GitHub", "WebGL", "Three.js", "GLSL"],
    },
  ],

  // Certifications & Honors
  certifications: [
    { title: "Formula Student National Engineering Design Award", issuer: "SAE India / Formula Bharat", date: "2025" },
    { title: "Meta Front-End Developer Professional Certificate", issuer: "Meta / Coursera", date: "2024" },
    { title: "DeepLearning.AI Autonomous Driving Specialization", issuer: "DeepLearning.AI / Coursera", date: "2025" },
    { title: "1st Place Winner - AutoTech National Hackathon", issuer: "IEEE & DTU Tech Fest", date: "2025" },
  ],
};

// Export to window object for global access
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
