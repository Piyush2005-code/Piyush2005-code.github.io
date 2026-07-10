const RESUME_URL = "https://drive.google.com/file/d/1LAI1kfhdqLb9dbIbFyj0eLZaw3rWrrI8/view"

export function initPortfolioScripts() {
// ── SYSTEMS-HACKER PORTFOLIO ADDITIONS ──
    const pageStartTime = Date.now();
    let telemetryIntervalId = null;

    function getDynamicUptime() {
      const diffSecs = Math.floor((Date.now() - pageStartTime) / 1000);
      const secs = diffSecs % 60;
      const mins = Math.floor(diffSecs / 60) % 60;
      const hours = Math.floor(diffSecs / 3600);
      
      let str = '';
      if (hours > 0) str += `${hours}h `;
      if (mins > 0 || hours > 0) str += `${mins}m `;
      str += `${secs}s`;
      return str;
    }



    function colorizeAsciiArt(artText) {
      let colored = '';
      for (let i = 0; i < artText.length; i++) {
        const char = artText[i];
        if (char === ' ') {
          colored += ' ';
        } else if (char === '\n') {
          colored += '\n';
        } else if (['%', '8', 'B', '@'].includes(char)) {
          colored += `<span class="ascii-c1">${char}</span>`;
        } else if (['W', 'Z', 'Q', 'M', 'O', '#', 'a', 'd', '&'].includes(char)) {
          colored += `<span class="ascii-c2">${char}</span>`;
        } else if (['x', 'p', 'q', 'L', 'J', 'v', 'o', 'w', 't', 'u', 'Y', '1', '$', 'X', '?'].includes(char)) {
          colored += `<span class="ascii-c3">${char}</span>`;
        } else {
          colored += `<span class="ascii-c4">${char}</span>`;
        }
      }
      return colored;
    }

    // Global tracking of profile window references
    window.profileTabs = window.profileTabs || {
      github: null,
      linkedin: null
    };

    // ── NAV SCROLL ──
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    function updateScrollProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (scrollProgress) scrollProgress.style.width = progress + '%';
    }

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      updateScrollProgress();
    }, { passive: true });
    updateScrollProgress();

    // ── ACTIVE NAV SECTION ──
    const sectionIds = ['about', 'research', 'projects', 'skills', 'contact'];
    const navSectionLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile a[href^="#"]');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navSectionLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-80px 0px -55% 0px' });
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // ── PROJECT FILTER ──
    const projFilterBar = document.getElementById('proj-filter-bar');
    if (projFilterBar) {
      projFilterBar.addEventListener('click', e => {
        const btn = e.target.closest('.proj-filter-btn');
        if (!btn) return;
        const filter = btn.dataset.filter;
        projFilterBar.querySelectorAll('.proj-filter-btn').forEach(b => b.classList.toggle('active', b === btn));
        document.querySelectorAll('.proj-card[data-category]').forEach(card => {
          const cats = card.dataset.category.split(' ');
          card.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
        });
      });
    }

    // ── COPY TO CLIPBOARD ──
    document.querySelectorAll('.contact-copy-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.preventDefault();
        e.stopPropagation();
        const text = btn.dataset.copy;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          btn.classList.add('copied');
          const label = btn.getAttribute('aria-label');
          btn.setAttribute('aria-label', 'Copied!');
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.setAttribute('aria-label', label);
          }, 2000);
        } catch {
          /* clipboard unavailable */
        }
      });
    });

    // ── KEYBOARD SHORTCUTS OVERLAY ──
    const shortcutsOverlay = document.getElementById('shortcuts-overlay');
    function toggleShortcuts(show) {
      if (!shortcutsOverlay) return;
      const isOpen = show ?? !shortcutsOverlay.classList.contains('open');
      shortcutsOverlay.classList.toggle('open', isOpen);
    }
    window.toggleShortcuts = toggleShortcuts;

    function isTypingContext() {
      const active = document.activeElement;
      if (!active) return false;
      if (active.classList?.contains('term-widget-input')) return true;
      if (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT') return true;
      return false;
    }

    const SECTION_KEYS = { '1': 'about', '2': 'research', '3': 'projects', '4': 'skills', '5': 'contact' };

    document.addEventListener('keydown', e => {
      if (isTypingContext()) return;
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleShortcuts();
        return;
      }

      const sectionId = SECTION_KEYS[e.key];
      if (sectionId && !e.ctrlKey && !e.metaKey && !e.altKey) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    shortcutsOverlay?.addEventListener('click', e => {
      if (e.target === shortcutsOverlay) toggleShortcuts(false);
    });
    document.getElementById('shortcuts-close')?.addEventListener('click', () => toggleShortcuts(false));

    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');
    hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));
    function closeMobile() { navMobile.classList.remove('open') }

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── SMOOTH ANCHOR ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
      });
    });

    // ── ABOUT FLASHCARD ──
    const aboutFlashcard = document.getElementById('about-flashcard');
    aboutFlashcard?.addEventListener('click', () => {
      const isOpen = aboutFlashcard.classList.toggle('open');
      aboutFlashcard.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });


    // ── PROJECT MODALS ──
    const GH = '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';
    const PROJECTS = [
      {
        meta: '2025\u2013Ongoing \u00b7 Embedded Systems / OS', title: 'ARM64 Unikernel for ML Inference',
        imgs: ['/Embedded_Hardware.avif'],
        desc: 'Architected a bare-metal ARM64 unikernel (<256KB) for deterministic ML inference, featuring a custom zero-dependency ONNX runtime and optimized SIMD kernels for microsecond-level execution.',
        ach: ['Implemented ARMv8-A boot (EL3\u2192EL1), MMU setup, GICv2, and timer with full interrupt handling', 'Designed a cooperative priority scheduler with custom 104B context switching and sub-8\u00b5s switch latency', 'Developed a zero-dependency ONNX runtime (40+ ops) with custom protobuf parser and 128MB pre-allocated tensor arena (no runtime malloc)', 'Optimized Conv2D/GEMM kernels (cache-aligned, NEON SIMD) with hardware-timer profiling for \u00b5s-level analysis', 'Achieved ~269\u00b5s inference latency (Cortex-A53, QEMU), benchmarking against Linux/Unikraft baselines'],
        tags: ['C11', 'ARM64 Assembly', 'NEON SIMD', 'QEMU', 'GCC'], link: 'https://github.com/Piyush2005-code/MiniOS'
      },
      {
        meta: '2026 \u00b7 Deep Learning / LLMs / Backend / Deployment', title: 'Counsel.ai - Student Advisory Platform for College Counselling',
        imgs: ['/CounselAI.png'],
        desc: 'Counsel.AI is an AI-driven student advisory platform designed to help students make informed branch and college decisions through adaptive conversational guidance, personalized interest assessment, and data-driven recommendation systems.',
        ach: [
          'Engineered a Mistral-powered conversational engine with adaptive multi-turn counselling workflows',
          'Implemented DistilRoBERTa-based anomaly/relevance detection for real-time student response validation',
          'Developed an NCDM-based PyTorch model for dynamic 11D student trait estimation during conversations',
          'Built semantic recommendation pipelines using SentenceTransformers, Pinecone, and PostgreSQL filtering',
          'Integrated MCP-compatible retrieval and agentic reasoning workflows using FastMCP and vLLM infrastructure'
        ],
        tags: ['Deep Learning', 'vLLM', 'PostgreSQL', 'Model Context Protocol'], link: 'https://github.com/HerilMistry/Counsel.ai.git'
      },
      {
        meta: '2025 \u00b7 Systems Programming', title: 'OS Scheduling Algorithm Simulator',
        imgs: ['/os-scheduler.png'],
        desc: 'Implemented classical OS scheduling algorithms with interactive UI-based visualization. Features real-time Gantt chart generation for analyzing scheduling behavior and algorithm comparison.',
        ach: ['Implemented FCFS, Round Robin, and Priority scheduling algorithms with configurable parameters', 'Built real-time Gantt chart visualization for process scheduling analysis', 'Created interactive UI for comparing algorithm performance metrics', 'Developed desktop application using Electron for cross-platform support'],
        tags: ['React', 'TypeScript', 'Electron', 'Algorithm Visualization', 'Operating Systems'], link: 'https://github.com/Piyush2005-code/Operating-System-Scheduling-Algorithms.git'
      },
      {
        meta: '2025 \u00b7 AI/ML Project', title: 'JARVIS Voice Assistant',
        imgs: ['/jarvis-interface.png'],
        desc: 'Engineered a real-time voice assistant with sub-second latency leveraging GPU-accelerated inference pipelines. Built end-to-end ML infrastructure for audio processing, NLU, and context-aware response generation.',
        ach: ['Implemented GPU inference on NVIDIA A5000 with sub-second latency using optimized CUDA kernels', 'Deployed containerized ML inference stack supporting 500+ concurrent users with 98% uptime', 'Integrated Retrieval-Augmented Generation (RAG) for context-aware, knowledge-grounded responses', 'Built real-time audio processing pipeline using AudioFlamingo3 for voice-to-text transcription'],
        tags: ['NVIDIA AudioFlamingo3', 'vLLM', 'RAG', 'Docker', 'Kubernetes', 'PyTorch'], link: 'https://github.com/AISocietyIITJ/Jarvis2.O'
      },
      {
        meta: '2025 \u00b7 Deep Learning Project', title: 'LLM-Based Chart Generation Web App',
        imgs: ['/llm-chart-generator.png'],
        desc: 'Built an automated chart generation pipeline using LLMs to analyze uploaded PDF documents and generate meaningful data visualizations, leveraging NLP for document understanding and automated insight extraction.',
        ach: ['Implemented LLM-based document parsing using transformer architectures for semantic understanding', 'Built NLP pipeline for extracting structured data from unstructured PDF content', 'Designed automated chart selection algorithm using ML-based data type classification', 'Created responsive frontend-backend workflow with real-time data visualization rendering'],
        tags: ['LLMs', 'NLP', 'PDF Parsing', 'React', 'Node.js', 'Data Visualization'], link: 'https://github.com/Piyush2005-code/Chart-Generation-using-LLMs.git'
      },
      {
        meta: '2025 \u00b7 Computer Vision / Deep Learning', title: 'Crop Stress Detection \u2014 U-Net Semantic Segmentation',
        imgs: ['/Farm_top_image.jpg', '/Crop_Detection_Segmentation_mask.jpg', '/Crop_Detection_YOLO_Object_Detection.jpg', '/UNet model.png'],
        desc: 'A computer vision system for detecting and segmenting stressed crop regions from aerial imagery using a U-Net CNN generating pixel-wise binary masks, with a full pipeline from synthetic dataset generation to real-time video inference.',
        ach: ['Designed a U-Net-based segmentation model (~7.7M params) with skip connections for pixel-level crop stress detection', 'Built a synthetic dataset pipeline using Gaussian blending and rotational augmentation (4\u00d7 expansion)', 'Full training pipeline with AdamW optimizer, BCEWithLogitsLoss, Dice coefficient tracking, 80/10/10 split', 'Developed real-time video inference pipeline (OpenCV + batch processing) generating overlay MP4 outputs'],
        tags: ['PyTorch', 'U-Net', 'OpenCV', 'Semantic Segmentation', 'Synthetic Data', 'CUDA / MPS'], link: 'https://github.com/Piyush2005-code/Computer-Vision-for-stressed-crop-detection.git'
      },
      {
        meta: 'Inter IIT Tech Meet 14.0 \u00b7 Aeronautics', title: 'Fixed-Wing STOL Aircraft Wing Design',
        imgs: ['/Wing_Side_view.jpeg', '/wing-drawing.png', '/pressure-contours.png', '/cfd-simulation.png'],
        desc: 'Surveyed high-lift wing configurations targeting CL > 5, benchmarking against state-of-the-art designs. Designed complete end-to-end CAD model and validated aerodynamic performance through iterative CFD simulations.',
        ach: ['Studied fixed-wing flight dynamics and surveyed high-lift configurations achieving CL > 5', 'Achieved a maximum lift coefficient of 8.1258 under realistic thrust-device interaction conditions', 'Designed the complete end-to-end CAD model of the full wing assembly', 'Validated aerodynamic performance through iterative CFD simulations using ANSYS Fluent'],
        tags: ['CAD', 'CFD', 'ANSYS Fluent', 'Aerodynamics', 'Wing Design'], link: null
      },
      {
        meta: 'Personal Project \u00b7 Robotics', title: 'Quadcopter CAD Design & Development',
        imgs: ['/quadcopter-isometric.png', '/quadcopter-front.png'],
        desc: 'Complete design and development of a custom quadcopter with detailed CAD modeling, structural analysis, and modular component integration for autonomous flight capabilities.',
        ach: ['Designed full assembly CAD model with structural optimization for weight and rigidity', 'Optimized frame geometry for payload capacity and flight stability', 'Implemented modular component design for easy maintenance and upgrades'],
        tags: ['CAD', 'UAV Design', 'Fusion 360', 'Robotics', 'Autonomous Systems'], link: null
      },
      {
        meta: 'Machine Learning \u00b7 Benchmarking', title: 'WiLI-2018 Language Identification \u2014 Benchmark & Model Export',
        imgs: ['/detext1.jpeg'],
        desc: 'Benchmarking a comprehensive suite of language identification (LangID) models on the WiLI-2018 dataset, covering 235 languages. Compared classical machine learning approaches and modern neural architectures.',
        ach: ['Evaluated Classical ML (Complement NB, SGD, Passive Aggressive, Ridge, Linear SVC) and Neural models (fastText, GlotLID, CLD3, CharCNN)', 'GlotLID achieved the highest Macro F1 (0.9706) with a wider n-gram range and larger embedding dimension', 'Identified Passive Aggressive as the best efficiency trade-off with 0.963 F1 in just 108 seconds of training', 'Exported models for downstream use in an inference backend with FastAPI backend and React frontend'],
        tags: ['Machine Learning', 'NLP', 'PyTorch', 'scikit-learn', 'Language Identification'], link: 'https://github.com/Piyush2005-code/Language_Detection_PRML_Group_10'
      }
    ];
    function openModal(idx) {
      const p = PROJECTS[idx];
      const ia = document.getElementById('pm-img-area');
      if (p.imgs.length === 1) {
        ia.innerHTML = `<img class="proj-modal-img" src="${p.imgs[0]}" alt="${p.title}" onerror="this.style.display='none'"/>`;
      } else {
        ia.innerHTML = `<div class="proj-modal-imgs">${p.imgs.map(s => `<img src="${s}" alt="" onerror="this.style.display='none'"/>`).join('')}</div>`;
      }
      document.getElementById('pm-meta').textContent = p.meta;
      document.getElementById('pm-title').textContent = p.title;
      document.getElementById('pm-desc').textContent = p.desc;
      document.getElementById('pm-ach').innerHTML = p.ach.map(a => `<li>${a}</li>`).join('');
      document.getElementById('pm-tags').innerHTML = p.tags.map(t => `<span class="proj-modal-tag">${t}</span>`).join('');
      
      document.getElementById('pm-links').innerHTML = p.link ? `<a class="proj-modal-link" href="${p.link}" target="_blank">${GH} Source Code</a>` : '';

      document.getElementById('proj-modal').classList.add('open');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      document.getElementById('proj-modal').classList.remove('open');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (shortcutsOverlay?.classList.contains('open')) {
        toggleShortcuts(false);
        return;
      }
      closeModal();
    });




    // ── RETRO TERMINAL INTERACTIVE SHELL ──
    (function() {
      const COMMANDS = ['help', 'neofetch', 'ls', 'cd', 'cat', 'cowsay', 'matrix', 'theme', 'clear', 'scroll', 'open', 'social'];
      
      const VFS = {
        '/about.txt': `Piyush Singh Bhati
------------------
Systems & AI/Robotics Engineer
Undergraduate at Indian Institute of Technology (IIT) Jodhpur.

Key Focus Areas:
• Low-level systems software, bare-metal ARM64 unikernels, RTOS.
• Deep learning pipelines, vLLM, custom model deployment, computer vision.
• Autonomous systems, robotics simulation, aerodynamics (CAD/CFD).`,

        '/contact.txt': `Contact Information
-------------------
Email:    piyush.bhati680@gmail.com
GitHub:   github.com/Piyush2005-code
LinkedIn: linkedin.com/in/piyush-singh-bhati-5a074929a
Location: IIT Jodhpur, Rajasthan, India`,

        '/publications.txt': `Academic Foundations & Coursework
----------------------------------
Relevant Coursework:
• Data Structures & Algorithms (DSA)
• Linear Algebra & Ordinary Differential Equations (O.D.E)
• Probability & Stochastic Processes
• Introduction to Computer Science
• Software Engineering
• Pattern Recognition and Machine Learning

Achievements:
• STOL aircraft wing design achieving Lift Coefficient of 8.1258 (Inter IIT Tech Meet 14.0)`,

        '/skills.sh': `#!/bin/bash
# Piyush Singh Bhati - Core Skills & Technologies

LANGUAGES=(
  "C/C++" "Python" "ARM64 Assembly" "JavaScript" "TypeScript" "Bash" "HTML/CSS"
)
SYSTEMS=(
  "ARMv8-A Bare-metal" "Cooperative Schedulers" "Interrupt Controllers (GICv2)"
  "Memory Management Unit (MMU)" "vLLM Stack" "Docker" "Kubernetes" "Linux"
)
AI_ML_CV=(
  "PyTorch" "ONNX Runtime (custom)" "SentenceTransformers" "Pinecone"
  "U-Net Segmentation" "DistilRoBERTa Anomaly Detection" "NCDM Models"
)
CAD_CFD=(
  "ANSYS Fluent" "Fusion 360" "SolidWorks" "Aerodynamics Sim"
)

echo "Ready to build high-performance systems and intelligent agents."`,

        '/projects/01_unikernel.md': `# ARM64 Unikernel for ML Inference
----------------------------------
Architected a bare-metal ARM64 unikernel (<256KB) for deterministic ML inference.
• Developed a custom zero-dependency ONNX runtime and optimized cache-aligned NEON SIMD Conv2D/GEMM kernels.
• Cooperative priority scheduler with custom 104B context switching (<8us switch latency).
• Achieved ~269us inference latency (Cortex-A53, QEMU), benchmarking against Linux/Unikraft baselines.
• Technologies: C11, ARM64 Assembly, NEON SIMD, QEMU, GCC.`,

        '/projects/02_counsel_ai.md': `# Counsel.ai - Student Advisory Platform
---------------------------------------
AI-driven student advisory platform designed to help students make informed branch and college decisions.
• Mistral-powered conversational engine with adaptive multi-turn counselling workflows.
• PyTorch-based Neural Cognitive Diagnosis Model (NCDM) for estimating 11D student traits.
• SentenceTransformers + Pinecone + PostgreSQL semantic recommendation pipelines.
• Technologies: Deep Learning, PyTorch, vLLM, FastMCP, Pinecone, PostgreSQL.`,

        '/projects/03_os_simulator.md': `# OS Scheduling Algorithm Simulator
----------------------------------
Interactive desktop and web simulation of classical operating system scheduling algorithms.
• Visually models scheduling algorithms: FCFS, Round Robin, and Priority Scheduling.
• Generates real-time Gantt charts for profiling wait/turnaround times.
• Technologies: React, TypeScript, Electron, Tailwind CSS.`,

        '/projects/04_jarvis.md': `# JARVIS Voice Assistant
--------------------------
Voice assistant featuring GPU-accelerated inference pipelines and sub-second latency.
• GPU inference on NVIDIA A5000 with custom CUDA optimization.
• Real-time voice processing using AudioFlamingo3.
• RAG-enabled context-aware knowledge fetching.
• Technologies: CUDA, vLLM, PyTorch, RAG, Docker, Kubernetes.`,

        '/projects/05_chart_generator.md': `# LLM-Based Chart Generation Web App
---------------------------------------
Automated chart generation pipeline using LLMs to analyze uploaded PDF documents.
• Implemented LLM-based document parsing using transformer architectures for semantic understanding.
• Built NLP pipeline for extracting structured data from unstructured PDF content.
• Designed automated chart selection algorithm using ML-based data type classification.
• Created responsive frontend-backend workflow with real-time data visualization rendering.
• Technologies: LLMs, NLP, PDF Parsing, React, Node.js, Data Visualization.`,

        '/projects/06_crop_stress.md': `# Crop Stress Detection (U-Net)
-------------------------------
Computer vision system for semantic segmentation of crop stress from aerial drone imagery.
• Built a synthetic dataset pipeline with Gaussian blending and rotational augmentation (4x dataset expansion).
• Designed U-Net model (~7.7M params) achieving pixel-level crop stress detection.
• Real-time video inference pipeline using OpenCV and batch inference.
• Technologies: PyTorch, U-Net, OpenCV, CUDA / MPS.`,

        '/projects/07_wing_design.md': `# STOL Fixed-Wing Aircraft Wing Design
--------------------------------------
Aerodynamic wing design targeting high lift (CL > 5) for Short Take-Off and Landing (STOL) flight parameters.
• Designed full 3D wing CAD assembly and verified performance in ANSYS Fluent.
• Achieved record max lift coefficient of 8.1258 under simulated thrust conditions.
• Technologies: CAD, Fusion 360, CFD, ANSYS Fluent.`,

        '/projects/08_quadcopter.md': `# Quadcopter CAD Design & Development
-------------------------------------
Personal Project. Complete design and development of a custom quadcopter with detailed CAD modeling, structural analysis, and autonomous flight capabilities.
• Designed full assembly CAD model with structural optimization for weight and rigidity.
• Optimized frame geometry for payload capacity and flight stability.
• Technologies: CAD, UAV Design, Fusion 360, Robotics, Autonomous Systems.`
      };

      const dirs = new Set(['/', '/projects']);
      let currentDir = '/';
      const cmdHistory = [];
      let historyIdx = -1;
      let currentInputTemp = "";
      
      let isMatrixRunning = false;
      let matrixAnimFrameId = null;

      // tmux tiling state variables
      let isTiled = false;
      let htopIntervalId = null;

      function getHtopProcesses() {
        return [
          { pid: 102, user: 'guest', pr: 20, ni: 0, virt: '8.5M', res: '2.4M', cpu: isMatrixRunning ? (Math.random() * 4.5 + 8.5).toFixed(1) : '0.0', mem: '0.1', state: isMatrixRunning ? 'R' : 'S', cmd: 'matrix-canvas', control: isMatrixRunning ? 'KILL' : 'RUN' },
          { pid: 103, user: 'guest', pr: 20, ni: 0, virt: '12.8M', res: '4.0M', cpu: (telemetryIntervalId ? (Math.random() * 1.5 + 0.5) : 0).toFixed(1), mem: '0.3', state: telemetryIntervalId ? 'R' : 'S', cmd: 'hud-telemetry', control: 'SYS' },
          { pid: 104, user: 'guest', pr: 20, ni: 0, virt: '32.0M', res: '8.2M', cpu: (Math.random() * 0.8 + 1.2).toFixed(1), mem: '0.6', state: 'R', cmd: 'window-manager', control: 'SYS' }
        ];
      }

      window.toggleHtopProcess = function(pid) {
        if (pid === 102) {
          if (isMatrixRunning) {
            stopMatrixRain();
            writeLine("matrix screensaver terminated.", "term-out-dim");
          } else {
            startMatrixRain();
          }
          renderHtop();
        }
      };

      function renderHtop() {
        const container = document.getElementById('term-pane-htop');
        if (!container) return;
        
        let cpuTotal = 1.2 + (Math.random() * 0.8);
        if (isMatrixRunning) cpuTotal += 12.5;
        if (telemetryIntervalId) cpuTotal += 1.8;
        if (cpuTotal > 100) cpuTotal = 99.8;
        
        let memTotal = 29.4 + (Math.random() * 0.4);
        if (isMatrixRunning) memTotal += 0.8;
        
        const cpuBarCount = Math.min(Math.floor(cpuTotal / 5), 20);
        const cpuBar = '|'.repeat(cpuBarCount) + ' '.repeat(20 - cpuBarCount);
        
        const memBarCount = Math.min(Math.floor(memTotal / 5), 20);
        const memBar = '|'.repeat(memBarCount) + ' '.repeat(20 - memBarCount);
        
        let html = '';
        html += `<div style="color: var(--accent); font-weight: bold; margin-bottom: 0.3rem;">SYSTEM MONITOR (htop)</div>`;
        html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 0.4rem; font-size: 0.53rem;">`;
        html += `  <div>CPU [${cpuBar}] <span style="color: var(--accent); font-weight: bold;">${cpuTotal.toFixed(1)}%</span></div>`;
        html += `  <div>MEM [${memBar}] <span style="color: var(--cyan); font-weight: bold;">${memTotal.toFixed(1)}%</span></div>`;
        html += `</div>`;
        
        html += `<div style="border-top: 1px dashed var(--border); margin-bottom: 0.4rem;"></div>`;
        
        html += `<div style="display: grid; grid-template-columns: 24px 38px 14px 22px 24px 24px 75px 1fr; font-weight: bold; color: var(--accent); margin-bottom: 0.2rem;">`;
        html += `  <span>PID</span><span>USER</span><span>PR</span><span>NI</span><span>CPU%</span><span>MEM%</span><span>COMMAND</span><span>ACTION</span>`;
        html += `</div>`;
        
        const procs = getHtopProcesses();
        procs.forEach(p => {
          const actionText = p.control === 'SYS' ? `<span style="color: var(--dim); font-size: 0.5rem;">[system]</span>` :
            `<span onclick="toggleHtopProcess(${p.pid})" style="cursor: pointer; text-decoration: underline; color: ${p.control === 'KILL' ? '#ff5c5c' : '#00ff7f'}; font-weight: bold;">[${p.control.toLowerCase()}]</span>`;
          
          const rowStyle = p.state === 'R' ? `color: var(--txt); font-weight: 500;` : `color: var(--dim);`;
          
          html += `<div style="display: grid; grid-template-columns: 24px 38px 14px 22px 24px 24px 75px 1fr; margin-bottom: 0.15rem; ${rowStyle}">`;
          html += `  <span>${p.pid}</span>`;
          html += `  <span>${p.user}</span>`;
          html += `  <span>${p.pr}</span>`;
          html += `  <span>${p.ni}</span>`;
          html += `  <span style="color: ${parseFloat(p.cpu) > 40 ? '#ff5c5c' : 'inherit'}">${p.cpu}</span>`;
          html += `  <span>${p.mem}</span>`;
          html += `  <span>${p.cmd}</span>`;
          html += `  <span>${actionText}</span>`;
          html += `</div>`;
        });
        
        container.innerHTML = html;
      }

      function startHtopLoop() {
        if (htopIntervalId) return;
        renderHtop();
        htopIntervalId = setInterval(renderHtop, 1000);
      }
      
      function stopHtopLoop() {
        if (htopIntervalId) {
          clearInterval(htopIntervalId);
          htopIntervalId = null;
        }
      }

      function renderRanger() {
        const container = document.getElementById('term-pane-ranger');
        if (!container) return;
        
        let html = `<div style="color: var(--accent); font-weight: bold; margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: space-between;">`;
        html += `<span>RANGER v1.0.0 [dir: ${currentDir}]</span>`;
        html += `<span style="font-size: 0.5rem; color: var(--dim);">click file to cat / folder to cd</span>`;
        html += `</div>`;
        html += `<div style="border-top: 1px dashed var(--border); margin-bottom: 0.4rem;"></div>`;
        
        if (currentDir === '/projects') {
          html += `<div class="ranger-item" onclick="rangerCd('..')" style="cursor: pointer; display: flex; gap: 6px; align-items: center;"><span style="color: var(--cyan);">[d]</span> <span style="color: var(--txt);">..</span></div>`;
        }
        
        if (currentDir === '/') {
          html += `<div class="ranger-item" onclick="rangerCd('projects')" style="cursor: pointer; display: flex; gap: 6px; align-items: center;"><span style="color: var(--cyan);">[d]</span> <span style="color: var(--txt);">projects/</span></div>`;
          
          const files = ['about.txt', 'contact.txt', 'publications.txt', 'skills.sh'];
          files.forEach(f => {
            const isScript = f.endsWith('.sh');
            const icon = isScript ? '[*]' : '[-]';
            const color = isScript ? 'var(--accent)' : 'var(--txt2)';
            html += `<div class="ranger-item" onclick="rangerCat('${f}')" style="cursor: pointer; display: flex; gap: 6px; align-items: center;"><span>${icon}</span> <span style="color: ${color};">${f}</span></div>`;
          });
        } else if (currentDir === '/projects') {
          const files = [
            '01_unikernel.md',
            '02_counsel_ai.md',
            '03_os_simulator.md',
            '04_jarvis.md',
            '05_chart_generator.md',
            '06_crop_stress.md',
            '07_wing_design.md',
            '08_quadcopter.md'
          ];
          files.forEach(f => {
            html += `<div class="ranger-item" onclick="rangerCat('${f}')" style="cursor: pointer; display: flex; gap: 6px; align-items: center;"><span>[-]</span> <span style="color: var(--txt2);">${f}</span></div>`;
          });
        }
        
        container.innerHTML = html;
      }

      window.rangerCd = function(target) {
        if (target === '..') {
          runCommandFromPage('cd ..');
        } else {
          runCommandFromPage('cd ' + target);
        }
      };

      window.rangerCat = function(filename) {
        runCommandFromPage('cat ' + filename);
      };

      window.toggleTerminalTiling = function() {
        if (!win) return;
        isTiled = !isTiled;
        
        const column = document.getElementById('term-pane-column');
        const layoutBtn = document.getElementById('term-layout-btn');
        
        if (isTiled) {
          win.classList.add('tiled');
          if (column) column.style.display = 'flex';
          if (layoutBtn) {
            layoutBtn.textContent = 'tmux: on';
            layoutBtn.classList.add('active');
          }
          startHtopLoop();
          renderRanger();
          writeLine("tiled workspace layout enabled (tmux split)", "term-out-dim");
        } else {
          win.classList.remove('tiled');
          if (column) column.style.display = 'none';
          if (layoutBtn) {
            layoutBtn.textContent = 'tmux: off';
            layoutBtn.classList.remove('active');
          }
          stopHtopLoop();
          writeLine("tiled workspace layout disabled", "term-out-dim");
        }
        
        if (isMatrixRunning) {
          setTimeout(() => {
            const canvas = document.getElementById('term-matrix-canvas');
            if (canvas && body) {
              canvas.width = body.clientWidth;
              canvas.height = body.clientHeight;
            }
          }, 350);
        }
      };

      // DOM Elements
      let overlay, win, body, input, caret, measure, hint, select, layoutBtn;

      function initElements() {
        overlay = document.getElementById('term-widget-overlay');
        win = document.getElementById('term-widget-window');
        body = document.getElementById('term-widget-body');
        input = document.getElementById('term-widget-input');
        caret = document.getElementById('term-widget-caret');
        measure = document.getElementById('term-widget-measure');
        hint = document.getElementById('term-widget-hint');
        select = document.getElementById('term-theme-select');
        layoutBtn = document.getElementById('term-layout-btn');
        
        if (!input) return;

        // Event listeners
        input.addEventListener('input', () => {
          updateCaret();
          updateSuggestionHint();
        });
        
        input.addEventListener('keyup', () => {
          updateCaret();
        });

        input.addEventListener('click', updateCaret);
        input.addEventListener('select', updateCaret);
        
        body.addEventListener('click', (e) => {
          if (window.getSelection().toString() !== '') return;
          input.focus();
        });

        // Keydown handler inside terminal
        input.addEventListener('keydown', (e) => {
          if (isMatrixRunning) {
            stopMatrixRain();
            writeLine("matrix screensaver terminated.", "term-out-dim");
            input.value = '';
            updateCaret();
            updateSuggestionHint();
            e.preventDefault();
            return;
          }

          if (e.key === 'Enter') {
            const val = input.value;
            const label = body.querySelector('.term-widget-prompt-line .term-widget-prompt-lbl').textContent;
            writeLine(label + ' ' + val, "");
            
            if (val.trim()) {
              if (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== val) {
                cmdHistory.push(val);
              }
            }
            
            executeCommand(val);
            input.value = '';
            historyIdx = -1;
            updateCaret();
            updateSuggestionHint();
          } 
          else if (e.key === 'Tab') {
            e.preventDefault();
            handleAutocomplete();
            updateSuggestionHint();
          } 
          else if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleHistory('up');
            updateSuggestionHint();
          } 
          else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleHistory('down');
            updateSuggestionHint();
          } 
          else if (e.key === 'ArrowRight') {
            if (hint && hint.textContent && input.selectionStart === input.value.length) {
              input.value = hint.textContent;
              updateCaret();
              updateSuggestionHint();
              e.preventDefault();
            }
          }
        });


      }  // end initElements

      window.openTerminalWidget = function() {
        if (!overlay) initElements();
        if (!overlay) return;
        
        overlay.style.display = 'flex';
        overlay.offsetHeight; // force reflow
        overlay.classList.add('open');
        
        const hintBubble = document.getElementById('term-kbd-hint');
        if (hintBubble) {
          hintBubble.style.display = 'none';
        }
        
        if (isTiled) {
          startHtopLoop();
          renderRanger();
        }
        
        setTimeout(() => {
          if (input) {
            input.focus();
            updateCaret();
          }
        }, 50);
      };

      window.closeTerminalWidget = function() {
        if (!overlay) return;
        overlay.classList.remove('open');
        stopMatrixRain();
        stopHtopLoop();
        
        setTimeout(() => {
          if (!overlay.classList.contains('open')) {
            overlay.style.display = 'none';
          }
        }, 300);
      };

      window.toggleTerminalWidget = function() {
        if (!overlay) initElements();
        if (!overlay) return;
        
        if (overlay.classList.contains('open')) {
          closeTerminalWidget();
        } else {
          openTerminalWidget();
        }
      };

      window.maximizeTerminalWidget = function() {
        if (!win) return;
        win.classList.toggle('maximized');
        
        if (isMatrixRunning) {
          setTimeout(() => {
            const canvas = document.getElementById('term-matrix-canvas');
            if (canvas && body) {
              canvas.width = body.clientWidth;
              canvas.height = body.clientHeight;
            }
          }, 350);
        }
      };

      window.changeTerminalTheme = function(themeName) {
        if (!overlay) return;
        overlay.classList.remove(
          'term-theme-default',
          'term-theme-matrix',
          'term-theme-amber',
          'term-theme-steel',
          'term-theme-hack',
          'term-theme-cyberpunk'
        );
        overlay.classList.add('term-theme-' + themeName);
        document.body.dataset.theme = themeName;
        localStorage.setItem('portfolio-theme', themeName);
        if (select) select.value = themeName;
      };

      // Initialize terminal theme from localStorage
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        window.changeTerminalTheme(savedTheme);
      } else {
        window.changeTerminalTheme('default');
      }

      window.runCommandFromPage = function(cmdStr) {
        if (!overlay) initElements();
        if (!overlay) return;
        
        // Open the terminal overlay
        openTerminalWidget();
        
        if (!input) return;
        
        // Temporarily lock user input
        input.disabled = true;
        input.value = '';
        updateCaret();
        updateSuggestionHint();
        
        let charIdx = 0;
        const typeSpeed = 30; // 30ms typing velocity
        
        function typeNextChar() {
          if (charIdx < cmdStr.length) {
            input.value += cmdStr[charIdx];
            updateCaret();
            updateSuggestionHint();
            charIdx++;
            setTimeout(typeNextChar, typeSpeed);
          } else {
            // Finished typing, unlock and run
            input.disabled = false;
            setTimeout(() => {
              const label = body.querySelector('.term-widget-prompt-line .term-widget-prompt-lbl').textContent;
              writeLine(label + ' ' + cmdStr, "");
              
              if (cmdStr.trim()) {
                if (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== cmdStr) {
                  cmdHistory.push(cmdStr);
                }
              }
              
              executeCommand(cmdStr);
              input.value = '';
              historyIdx = -1;
              updateCaret();
              updateSuggestionHint();
              input.focus();
            }, 250);
          }
        }
        
        // Trigger typewriter after standard overlay open transitions complete
        setTimeout(typeNextChar, 350);
      };

      function updateCaret() {
        if (!input || !measure || !caret) return;
        const textBeforeCursor = input.value.slice(0, input.selectionStart);
        measure.textContent = textBeforeCursor;
        caret.style.left = measure.offsetWidth + 'px';
      }

      function updateSuggestionHint() {
        if (!input || !hint) return;
        const val = input.value;
        if (!val) {
          hint.textContent = '';
          return;
        }
        
        const trimmed = val.trimStart();
        const parts = trimmed.split(/\s+/);
        let suggestion = '';
        
        if (parts.length === 1) {
          const typedCmd = parts[0];
          const match = COMMANDS.find(c => c.startsWith(typedCmd) && c !== typedCmd);
          if (match) {
            suggestion = match;
          }
        } else {
          const cmd = parts[0];
          if (cmd === 'cat' || cmd === 'cd') {
            const pathPrefix = parts.slice(1).join(' ');
            const contents = listContents(currentDir);
            const cleanContents = contents.map(c => {
              if (c.startsWith('<span')) {
                const temp = document.createElement('div');
                temp.innerHTML = c;
                return temp.textContent || temp.innerText;
              }
              return c;
            });
            
            const match = cleanContents.find(c => c.startsWith(pathPrefix) && c !== pathPrefix);
            if (match) {
              suggestion = cmd + ' ' + match;
            }
          }
        }
        
        if (suggestion && suggestion.startsWith(val)) {
          hint.textContent = suggestion;
        } else {
          hint.textContent = '';
        }
      }

      function resolvePath(path) {
        if (!path) return currentDir;
        let target = path;
        if (!target.startsWith('/')) {
          if (currentDir === '/') target = '/' + target;
          else target = currentDir + '/' + target;
        }
        const parts = target.split('/').filter(Boolean);
        const stack = [];
        for (const part of parts) {
          if (part === '.') continue;
          if (part === '..') stack.pop();
          else stack.push(part);
        }
        return '/' + stack.join('/');
      }

      function isDirectory(path) {
        let p = path;
        if (p.endsWith('/') && p.length > 1) {
          p = p.slice(0, -1);
        }
        return dirs.has(p);
      }

      function listContents(dir) {
        let normDir = dir;
        if (!normDir.endsWith('/')) normDir += '/';
        const contents = [];
        
        if (normDir === '/') {
          contents.push('<span class="term-out-success">projects/</span>');
          for (const key in VFS) {
            if (key.startsWith('/') && !key.slice(1).includes('/')) {
              contents.push(key.slice(1));
            }
          }
        } else if (normDir === '/projects/') {
          for (const key in VFS) {
            if (key.startsWith('/projects/')) {
              contents.push(key.replace('/projects/', ''));
            }
          }
        }
        return contents;
      }

      function writeLine(text, className) {
        if (!body) return;
        const promptLine = body.querySelector('.term-widget-prompt-line');
        const div = document.createElement('div');
        div.className = 'term-out-line ' + (className || '');
        
        if (text.includes('<span') || text.includes('<br') || text.includes('\n')) {
          div.innerHTML = text.replace(/\n/g, '<br>');
        } else {
          div.textContent = text;
        }
        
        body.insertBefore(div, promptLine);
        scrollToBottom();
      }

      function scrollToBottom() {
        if (body) body.scrollTop = body.scrollHeight;
      }

      function handleHistory(dir) {
        if (!input || cmdHistory.length === 0) return;
        
        if (historyIdx === -1) {
          currentInputTemp = input.value;
        }
        
        if (dir === 'up') {
          if (historyIdx < cmdHistory.length - 1) {
            historyIdx++;
            input.value = cmdHistory[cmdHistory.length - 1 - historyIdx];
          }
        } else if (dir === 'down') {
          if (historyIdx > 0) {
            historyIdx--;
            input.value = cmdHistory[cmdHistory.length - 1 - historyIdx];
          } else if (historyIdx === 0) {
            historyIdx = -1;
            input.value = currentInputTemp;
          }
        }
        
        setTimeout(() => {
          input.selectionStart = input.selectionEnd = input.value.length;
          updateCaret();
        }, 0);
      }

      function handleAutocomplete() {
        if (!input) return;
        const value = input.value.trimStart();
        const parts = value.split(/\s+/);
        
        if (parts.length === 1) {
          const cmdPrefix = parts[0];
          const matches = COMMANDS.filter(c => c.startsWith(cmdPrefix));
          if (matches.length === 1) {
            input.value = matches[0] + ' ';
            updateCaret();
          } else if (matches.length > 1) {
            printAutocompleteOptions(matches);
          }
        } else {
          const cmd = parts[0];
          if (cmd === 'cat' || cmd === 'cd') {
            const pathPrefix = parts.slice(1).join(' ');
            const contents = listContents(currentDir);
            const cleanContents = contents.map(c => {
              if (c.startsWith('<span')) {
                const temp = document.createElement('div');
                temp.innerHTML = c;
                return temp.textContent || temp.innerText;
              }
              return c;
            });
            
            const matches = cleanContents.filter(c => c.startsWith(pathPrefix));
            if (matches.length === 1) {
              const match = matches[0];
              input.value = cmd + ' ' + match;
              updateCaret();
            } else if (matches.length > 1) {
              printAutocompleteOptions(matches);
            }
          }
        }
      }

      function printAutocompleteOptions(options) {
        const label = body.querySelector('.term-widget-prompt-line .term-widget-prompt-lbl').textContent;
        writeLine(label + ' ' + input.value, "");
        writeLine(options.join('    '), "term-out-info");
      }

      function updatePromptLabel() {
        const lbls = document.querySelectorAll('.term-widget-prompt-lbl');
        const path = currentDir === '/' ? '~' : '~' + currentDir;
        const labelText = `guest@piyush_os:${path}$`;
        lbls.forEach(lbl => {
          lbl.textContent = labelText;
        });
      }

      function cowsay(text) {
        const line = "_".repeat(text.length + 2);
        const border = "-".repeat(text.length + 2);
        return `  ${line}
 < ${text} >
  ${border}
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||`;
      }

      function startMatrixRain() {
        const canvas = document.getElementById('term-matrix-canvas');
        if (!canvas) return;
        
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        
        canvas.width = body.clientWidth;
        canvas.height = body.clientHeight;
        
        const fontSize = 11;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-=";
        
        function draw() {
          if (!isMatrixRunning) return;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          const computed = getComputedStyle(document.body);
          let textColor = computed.getPropertyValue('--cyan').trim() || '#00f0ff';
          
          ctx.fillStyle = textColor;
          ctx.font = fontSize + 'px monospace';
          
          for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
          
          matrixAnimFrameId = requestAnimationFrame(draw);
        }
        
        isMatrixRunning = true;
        matrixAnimFrameId = requestAnimationFrame(draw);
      }

      function stopMatrixRain() {
        isMatrixRunning = false;
        if (matrixAnimFrameId) {
          cancelAnimationFrame(matrixAnimFrameId);
          matrixAnimFrameId = null;
        }
        const canvas = document.getElementById('term-matrix-canvas');
        if (canvas) {
          canvas.style.display = 'none';
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      function executeCommand(cmdStr) {
        const trimmed = cmdStr.trim();
        if (trimmed === '') return;
        
        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        if (cmd === 'clear') {
          const promptLine = body.querySelector('.term-widget-prompt-line');
          const canvas = document.getElementById('term-matrix-canvas');
          body.innerHTML = '';
          if (canvas) body.appendChild(canvas);
          body.appendChild(promptLine);
          return;
        }
        
        if (cmd === 'help') {
          const helpText = `Available Commands:
  resume         Open my resume in a new tab
  scroll <sec>   Scroll to page section (about, research, projects, skills, contact)
  open <item>    Open project details or resume (e.g. open unikernel, open resume)
  social <plt>   Open external profile in new tab (github, linkedin, email)
  tmux           Toggle tiling window workspace layout (split panes)
  htop           Open system monitor in side pane (shows CPU/processes)
  ranger         Open file explorer in side pane (browse project source)
  neofetch       Display system information & ASCII art
  ls             List files and directories
  cd <dir>       Change virtual directory (e.g. cd projects, cd ..)
  cat <file>     Print file contents (e.g. cat about.txt, cat skills.sh)
  matrix         Start matrix digital rain screensaver (press any key to stop)
  cowsay <msg>   Make the retro ASCII cow say something
  theme <name>   Switch retro theme (default, matrix, amber, steel, hack, cyberpunk)
  clear          Clear the screen
  help           Show this menu`;
          writeLine(helpText, "term-out-info");
          return;
        }
        
        if (cmd === 'tmux' || cmd === 'split') {
          toggleTerminalTiling();
          return;
        }
        
        if (cmd === 'htop') {
          if (!isTiled) {
            toggleTerminalTiling();
          }
          writeLine("htop: system monitor active in sidebar pane", "term-out-success");
          return;
        }
        
        if (cmd === 'ranger') {
          if (!isTiled) {
            toggleTerminalTiling();
          }
          writeLine("ranger: file explorer active in sidebar pane", "term-out-success");
          return;
        }
        
        if (cmd === 'neofetch') {
          const artLines = [
            "                WB%%B8%%8%%%%%%W                ",
            "            k%8%Z              pBB%0            ",
            "          %%%                      @%@          ",
            "       xB%_                          X%B        ",
            "      %B>           Q#%%%%%Ba          cB@      ",
            "    {%%          xB%q        W%L         %%     ",
            "   J%v          %8             #8         o%Q   ",
            "   Bd          B&               q%         #B   ",
            "  B*          &@                 &          B%  ",
            " %%           %         ka_#x   Q#           %d ",
            " B*          %B               &%BBB%%W       hB ",
            " B         8%%>                    |         >% ",
            "@%       w%t 8                 u8%            %Y",
            "%%       M%B%                p%%&             %U",
            "Y%       %%%%%%B1           B%%B              8J",
            " %      x%B%%%%%%%B$      XB%%%%M             B ",
            " %>      BB Xp*    Q88    %%%%%%%*           p% ",
            " o@       B%B         jB @%%%%%%%B&          8) ",
            "  &      B%           B B%%%%%%%%%BB        *8  ",
            "   B    WB            % k%%%%%%%%%%B%      )%   ",
            "    W  {%J            % O%%%%%%%%%%%%M     &    ",
            "       %B             8 O%%% 8@%%%%%%%   x      ",
            "      M%              j O%%%%& x%%%%%%#         ",
            "      %w                %%%8x %%8%%%%%%         ",
            "      %                w%%%%%%%%    B%%         ",
            "     #&               d%%%%%%%%%%%%%%%%1        ",
            "     8|              %%%%%%%%%%%%%%%%%%?        ",
            "     8             @%%%%%%%%%%%%%%%%%%%         ",
            "     M       B%8%%B%dZWW$$Z@@%&%8%%%%%%         ",
            "     I   %d                         d@          "
          ];

          const specs = [
            { key: "OS:", val: "Arch of Chaos" },
            { key: "Kernel:", val: "caffeinated-v6.9" },
            { key: "Shell:", val: "zsh + questionable decisions" },
            { key: "Terminal:", val: "hyperfocus-terminal" },
            { key: "Uptime:", val: `survived another compile (${getDynamicUptime()})` },
            { key: "Battery:", val: "powered by curiosity" },
            { key: "Neural Nets:", val: "training responsibly" },
            { key: "Productivity:", val: "event-driven" },
            { key: "Cache:", val: "mostly coherent" },
            { key: "Simulation:", val: "faster than expected" },
            { key: "Scheduler:", val: "prioritizing cool projects" },
            { key: "Fork Count:", val: "increasing steadily" }
          ];

          const artHtml = artLines.join('\n');
          let infoHtml = '';
          specs.forEach(spec => {
            infoHtml += `<div class="neofetch-row"><span class="neofetch-key">${spec.key}</span><span class="neofetch-val">${spec.val}</span></div>`;
          });

          const neofetchHtml = `<div class="neofetch-container">` +
            `<div class="neofetch-art">${colorizeAsciiArt(artHtml)}</div>` +
            `<div class="neofetch-info">${infoHtml}</div>` +
            `</div>`;

          writeLine(neofetchHtml, "");
          return;
        }
        
        if (cmd === 'ls') {
          const contents = listContents(currentDir);
          if (contents.length > 0) {
            writeLine(contents.join('    '), "");
          }
          return;
        }
        
        if (cmd === 'cd') {
          const target = args.join(' ');
          if (!target || target === '.' || target === '~') {
            currentDir = '/';
            updatePromptLabel();
            if (isTiled) renderRanger();
            return;
          }
          const resolved = resolvePath(target);
          if (isDirectory(resolved)) {
            currentDir = resolved;
            updatePromptLabel();
            if (isTiled) renderRanger();
          } else {
            writeLine(`cd: no such file or directory: ${target}`, "term-out-error");
          }
          return;
        }
        
        if (cmd === 'cat') {
          const target = args.join(' ');
          if (!target) {
            writeLine("cat: missing file operand", "term-out-error");
            return;
          }
          const resolved = resolvePath(target);
          if (VFS[resolved] !== undefined) {
            writeLine(VFS[resolved], "");
          } else if (isDirectory(resolved)) {
            writeLine(`cat: ${target}: Is a directory`, "term-out-error");
          } else {
            writeLine(`cat: ${target}: No such file or directory`, "term-out-error");
          }
          return;
        }
        
        if (cmd === 'cowsay') {
          const msg = args.join(' ');
          if (!msg) {
            writeLine("cowsay: what do you want me to say?", "term-out-error");
            return;
          }
          writeLine(cowsay(msg), "");
          return;
        }
        
        if (cmd === 'matrix') {
          startMatrixRain();
          return;
        }
        
        if (cmd === 'theme') {
          const themeName = args[0];
          const validThemes = ['default', 'matrix', 'amber', 'steel', 'hack', 'cyberpunk'];
          if (!themeName) {
            writeLine(`Usage: theme <name>
Available themes: ${validThemes.join(', ')}`, "term-out-info");
            return;
          }
          if (validThemes.includes(themeName.toLowerCase())) {
            changeTerminalTheme(themeName.toLowerCase());
            writeLine(`Theme changed to '${themeName}'`, "term-out-success");
          } else {
            writeLine(`theme: unknown theme '${themeName}'`, "term-out-error");
          }
          return;
        }

        if (cmd === 'scroll' || cmd === 'goto') {
          const target = args[0] ? args[0].toLowerCase() : '';
          const validSections = ['hero', 'about', 'research', 'projects', 'skills', 'contact'];
          
          if (!target) {
            writeLine(`Usage: scroll <section>
Available sections: hero, about, research, projects, skills, contact`, "term-out-info");
            return;
          }
          
          if (validSections.includes(target)) {
            writeLine(`Navigating to section '${target}'...`, "term-out-success");
            const element = document.getElementById(target);
            if (element) {
              setTimeout(() => {
                closeTerminalWidget();
                element.scrollIntoView({ behavior: 'smooth' });
              }, 400);
            } else {
              writeLine(`Error: Section element #${target} not found on page.`, "term-out-error");
            }
          } else {
            writeLine(`scroll: unknown section '${target}'.
Available: hero, about, research, projects, skills, contact`, "term-out-error");
          }
          return;
        }
        
        if (cmd === 'resume') {
          writeLine("Opening resume in a new tab...", "term-out-success");
          window.open(RESUME_URL, "_blank");
          return;
        }

        if (cmd === 'open' || cmd === 'view') {
          const target = args.join(' ').toLowerCase();
          if (!target) {
            writeLine(`Usage: open <project_index_or_name> or open resume
Examples: open 0, open unikernel, open resume`, "term-out-info");
            return;
          }
          
          if (target === 'resume') {
            writeLine("Opening resume in a new tab...", "term-out-success");
            window.open(RESUME_URL, "_blank");
            return;
          }
          
          const projectMap = {
            '0': 0, 'unikernel': 0, 'arm64': 0, 'os': 0,
            '1': 1, 'counsel': 1, 'counsel.ai': 1, 'student': 1,
            '2': 2, 'scheduler': 2, 'os-scheduler': 2, 'simulator': 2,
            '3': 3, 'jarvis': 3, 'voice': 3, 'assistant': 3,
            '4': 4, 'chart': 4, 'generator': 4, 'charts': 4,
            '5': 5, 'crop': 5, 'unet': 5, 'detection': 5,
            '6': 6, 'wing': 6, 'aerospace': 6, 'fixed-wing': 6,
            '7': 7, 'quadcopter': 7, 'drone': 7, 'robotics': 7
          };
          
          let projectIdx = -1;
          if (projectMap[target] !== undefined) {
            projectIdx = projectMap[target];
          } else {
            PROJECTS.forEach((proj, idx) => {
              if (proj.title.toLowerCase().includes(target)) {
                projectIdx = idx;
              }
            });
          }
          
          if (projectIdx >= 0 && projectIdx < PROJECTS.length) {
            writeLine(`Opening project modal for '${PROJECTS[projectIdx].title}'...`, "term-out-success");
            setTimeout(() => {
              closeTerminalWidget();
              openModal(projectIdx);
            }, 400);
          } else {
            writeLine(`open: project '${target}' not found.
Type 'ls projects' or look at the main page for project names.`, "term-out-error");
          }
          return;
        }
        
        if (cmd === 'social') {
          const target = args[0] ? args[0].toLowerCase() : '';
          const socials = {
            'github': 'https://github.com/Piyush2005-code',
            'linkedin': 'https://linkedin.com/in/piyush-singh-bhati-5a074929a',
            'email': 'mailto:piyush.bhati680@gmail.com'
          };
          if (!target) {
            writeLine(`Usage: social <github|linkedin|email>`, "term-out-info");
            return;
          }
          if (socials[target]) {
            writeLine(`Opening Piyush's ${target} in a new tab...`, "term-out-success");
            setTimeout(() => {
              if (target === 'github') {
                window.profileTabs.github = window.open(socials[target], '_blank');
              } else if (target === 'linkedin') {
                window.profileTabs.linkedin = window.open(socials[target], '_blank');
              } else {
                window.open(socials[target], '_blank');
              }
            }, 400);
          } else {
            writeLine(`social: unknown platform '${target}'. Available: github, linkedin, email`, "term-out-error");
          }
          return;
        }
        
        writeLine(`zsh: command not found: ${cmd}`, "term-out-error");
      }

      // Keyboard Shortcut listener (global)
      document.addEventListener('keydown', (e) => {
        if (e.key === '`') {
          const active = document.activeElement;
          if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && !active.classList.contains('term-widget-input')) {
            return;
          }
          e.preventDefault();
          toggleTerminalWidget();
        }
        
        // Ctrl+Alt+T toggles tiling mode when terminal is open
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') {
          if (overlay && overlay.classList.contains('open')) {
            e.preventDefault();
            toggleTerminalTiling();
          }
        }
      });

      // Window resize listener
      window.addEventListener('resize', () => {
        if (isMatrixRunning) {
          const canvas = document.getElementById('term-matrix-canvas');
          if (canvas && body) {
            canvas.width = body.clientWidth;
            canvas.height = body.clientHeight;
          }
        }
      });
      
      // Setup elements on load
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initElements);
      } else {
        initElements();
      }
    })();
  window.openModal = openModal; window.closeModal = closeModal; window.closeMobile = closeMobile;
}
