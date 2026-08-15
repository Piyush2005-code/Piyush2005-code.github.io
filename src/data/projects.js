/**
 * projects.js — Single source of truth for all project data.
 *
 * To add a project:
 *  1. Append an entry to this array.
 *  2. That's it — the card and modal are generated automatically.
 *
 * Field reference:
 *   category  – filter tag: 'systems' | 'ml' | 'robotics' (space-separated for multiple)
 *   meta      – short context line shown on the card and at the top of the modal
 *   title     – project name
 *   summary   – one or two sentences for the card (keep it punchy)
 *   imgs      – array of image paths (first is the card thumbnail)
 *   desc      – full description paragraph shown in the modal
 *   ach       – bullet list of key achievements shown in the modal
 *   tags      – tech stack pills shown in the modal
 *   link      – GitHub URL, Drive link, or null
 */

export const PROJECTS = [
  {
    category: 'systems',
    meta: '2026–Ongoing · Systems Software / Desktop Engineering',
    title: 'Lumina — Agentic IDE & AI Runtime',
    summary: 'Local-first agentic IDE with a modular TypeScript orchestration runtime. MCP handles agent-to-tool execution; A2A handles agent-to-agent delegation; Lumina\'s runtime orchestrates both.',
    imgs: ['/lumina-logo.png'],
    desc: 'Lumina is a cross-platform, local-first agentic IDE built around a modular TypeScript/Node.js orchestration runtime, Electron + React desktop interface, and an interoperable MCP/A2A agent architecture. The core design separates the chat layer, agent runtime, model providers, tool execution, persistence, scheduling, and observability so that models and tools can be added or replaced without rewriting the system. MCP handles every agent-to-tool boundary; A2A handles agent-to-agent delegation; the Lumina Agent Runtime sits above both as the orchestration layer.',
    ach: [
      'Designed a provider-agnostic inference contract routing requests across Groq, Gemini, and local LLMs — schedulable by capability, latency, cost, and historical telemetry',
      'Built an MCP runtime mediating all tool execution (filesystem, shell, Git, web, browser, email) without embedding tool logic into agents',
      'Implemented A2A layer for dynamic instantiation and delegation to specialized Research, Coding, and Email agents',
      'Streaming model responses, async agent tasks, reusable provider connections, event-driven execution, and persistent task state via SQLite/Drizzle',
      'Structured observability with OpenTelemetry — execution traces, approval policies, retries, and telemetry-driven scheduling',
    ],
    tags: ['Electron', 'React', 'TypeScript', 'Node.js / Express', 'SQLite / Drizzle', 'MCP', 'A2A', 'Groq / Gemini', 'OpenTelemetry', 'Python FastMCP'],
    link: "https://github.com/Piyush2005-code/Lumina",
  },
  {
    category: 'systems',
    meta: '2025–Ongoing · Embedded Systems / OS',
    title: 'ARM64 Unikernel for ML Inference',
    summary: 'Bare-metal ARM64 unikernel (<256KB) for deterministic ML inference with custom ONNX runtime and NEON SIMD kernels achieving ~269µs latency.',
    imgs: ['/Embedded_Hardware.avif'],
    desc: 'Architected a bare-metal ARM64 unikernel (<256KB) for deterministic ML inference, featuring a custom zero-dependency ONNX runtime and optimized SIMD kernels for microsecond-level execution.',
    ach: [
      'Implemented ARMv8-A boot (EL3→EL1), MMU setup, GICv2, and timer with full interrupt handling',
      'Designed a cooperative priority scheduler with custom 104B context switching and sub-8µs switch latency',
      'Developed a zero-dependency ONNX runtime (40+ ops) with custom protobuf parser and 128MB pre-allocated tensor arena (no runtime malloc)',
      'Optimized Conv2D/GEMM kernels (cache-aligned, NEON SIMD) with hardware-timer profiling for µs-level analysis',
      'Achieved ~269µs inference latency (Cortex-A53, QEMU), benchmarking against Linux/Unikraft baselines',
    ],
    tags: ['C11', 'ARM64 Assembly', 'NEON SIMD', 'QEMU', 'GCC'],
    link: 'https://github.com/Piyush2005-code/MiniOS',
  },
  {
    category: 'systems',
    meta: '2025 · Systems Programming',
    title: 'OS Scheduling Algorithm Simulator',
    summary: 'Classical OS scheduling algorithms with interactive UI, real-time Gantt charts, and cross-platform Electron desktop app.',
    imgs: ['/os-scheduler.png'],
    desc: 'Implemented classical OS scheduling algorithms with interactive UI-based visualization. Features real-time Gantt chart generation for analyzing scheduling behavior and algorithm comparison.',
    ach: [
      'Implemented FCFS, Round Robin, and Priority scheduling algorithms with configurable parameters',
      'Built real-time Gantt chart visualization for process scheduling analysis',
      'Created interactive UI for comparing algorithm performance metrics',
      'Developed desktop application using Electron for cross-platform support',
    ],
    tags: ['React', 'TypeScript', 'Electron', 'Algorithm Visualization', 'Operating Systems'],
    link: 'https://github.com/Piyush2005-code/Operating-System-Scheduling-Algorithms.git',
  },
  {
    category: 'ml',
    meta: '2026 · DL / LLMs / Backend',
    title: 'Counsel.ai — Student Advisory',
    summary: 'AI-driven platform for college counselling using adaptive conversational guidance and NCDM trait estimation.',
    imgs: ['/CounselAI.png'],
    desc: 'Counsel.AI is an AI-driven student advisory platform designed to help students make informed branch and college decisions through adaptive conversational guidance, personalized interest assessment, and data-driven recommendation systems.',
    ach: [
      'Engineered a Mistral-powered conversational engine with adaptive multi-turn counselling workflows',
      'Implemented DistilRoBERTa-based anomaly/relevance detection for real-time student response validation',
      'Developed an NCDM-based PyTorch model for dynamic 11D student trait estimation during conversations',
      'Built semantic recommendation pipelines using SentenceTransformers, Pinecone, and PostgreSQL filtering',
      'Integrated MCP-compatible retrieval and agentic reasoning workflows using FastMCP and vLLM infrastructure',
    ],
    tags: ['Deep Learning', 'vLLM', 'PostgreSQL', 'Model Context Protocol'],
    link: 'https://github.com/HerilMistry/Counsel.ai.git',
  },
  {
    category: 'ml',
    meta: '2025 · AI/ML Project',
    title: 'JARVIS Voice Assistant',
    summary: 'Real-time voice assistant with sub-second GPU-accelerated inference on NVIDIA A5000, RAG-based context, and 500+ concurrent user support.',
    imgs: ['/jarvis-interface.png'],
    desc: 'Engineered a real-time voice assistant with sub-second latency leveraging GPU-accelerated inference pipelines. Built end-to-end ML infrastructure for audio processing, NLU, and context-aware response generation.',
    ach: [
      'Implemented GPU inference on NVIDIA A5000 with sub-second latency using optimized CUDA kernels',
      'Deployed containerized ML inference stack supporting 500+ concurrent users with 98% uptime',
      'Integrated Retrieval-Augmented Generation (RAG) for context-aware, knowledge-grounded responses',
      'Built real-time audio processing pipeline using AudioFlamingo3 for voice-to-text transcription',
    ],
    tags: ['NVIDIA AudioFlamingo3', 'vLLM', 'RAG', 'Docker', 'Kubernetes', 'PyTorch'],
    link: 'https://github.com/AISocietyIITJ/Jarvis2.O',
  },
  {
    category: 'ml',
    meta: 'Machine Learning · Benchmarking',
    title: 'WiLI-2018 Language Identification',
    summary: 'Benchmarking a suite of language identification models on the WiLI-2018 dataset across 235 languages, evaluating classical ML and neural architectures.',
    imgs: ['/detext1.jpeg'],
    desc: 'Benchmarking a comprehensive suite of language identification (LangID) models on the WiLI-2018 dataset, covering 235 languages. Compared classical machine learning approaches and modern neural architectures.',
    ach: [
      'Evaluated Classical ML (Complement NB, SGD, Passive Aggressive, Ridge, Linear SVC) and Neural models (fastText, GlotLID, CLD3, CharCNN)',
      'GlotLID achieved the highest Macro F1 (0.9706) with a wider n-gram range and larger embedding dimension',
      'Identified Passive Aggressive as the best efficiency trade-off with 0.963 F1 in just 108 seconds of training',
      'Exported models for downstream use in an inference backend with FastAPI backend and React frontend',
    ],
    tags: ['Machine Learning', 'NLP', 'PyTorch', 'scikit-learn', 'Language Identification'],
    link: 'https://github.com/Piyush2005-code/Language_Detection_PRML_Group_10',
  },
  {
    category: 'ml',
    meta: '2025 · Deep Learning',
    title: 'LLM-Based Chart Generation',
    summary: 'Automated chart generation from uploaded PDFs using LLMs and semantic NLP extraction with real-time visualization rendering.',
    imgs: ['/llm-chart-generator.png'],
    desc: 'Built an automated chart generation pipeline using LLMs to analyze uploaded PDF documents and generate meaningful data visualizations, leveraging NLP for document understanding and automated insight extraction.',
    ach: [
      'Implemented LLM-based document parsing using transformer architectures for semantic understanding',
      'Built NLP pipeline for extracting structured data from unstructured PDF content',
      'Designed automated chart selection algorithm using ML-based data type classification',
      'Created responsive frontend-backend workflow with real-time data visualization rendering',
    ],
    tags: ['LLMs', 'NLP', 'PDF Parsing', 'React', 'Node.js', 'Data Visualization'],
    link: 'https://github.com/Piyush2005-code/Chart-Generation-using-LLMs.git',
  },
  {
    category: 'ml',
    meta: '2025 · Computer Vision',
    title: 'Crop Stress Detection — U-Net',
    summary: 'Pixel-wise semantic segmentation of stressed crops from aerial imagery using a 7.7M-param U-Net with real-time video inference.',
    imgs: ['/Farm_top_image.jpg', '/Crop_Detection_Segmentation_mask.jpg', '/Crop_Detection_YOLO_Object_Detection.jpg', '/UNet model.png'],
    desc: 'A computer vision system for detecting and segmenting stressed crop regions from aerial imagery using a U-Net CNN generating pixel-wise binary masks, with a full pipeline from synthetic dataset generation to real-time video inference.',
    ach: [
      'Designed a U-Net-based segmentation model (~7.7M params) with skip connections for pixel-level crop stress detection',
      'Built a synthetic dataset pipeline using Gaussian blending and rotational augmentation (4× expansion)',
      'Full training pipeline with AdamW optimizer, BCEWithLogitsLoss, Dice coefficient tracking, 80/10/10 split',
      'Developed real-time video inference pipeline (OpenCV + batch processing) generating overlay MP4 outputs',
    ],
    tags: ['PyTorch', 'U-Net', 'OpenCV', 'Semantic Segmentation', 'Synthetic Data', 'CUDA / MPS'],
    link: 'https://github.com/Piyush2005-code/Computer-Vision-for-stressed-crop-detection.git',
  },
  {
    category: 'robotics',
    meta: 'Inter IIT Tech Meet 14.0 · Aeronautics',
    title: 'Fixed-Wing STOL Wing Design',
    summary: 'High-lift wing configuration achieving CL = 8.1258 with full CAD assembly and CFD validation using ANSYS Fluent.',
    imgs: ['/Wing_Side_view.jpeg', '/wing-drawing.png', '/pressure-contours.png', '/cfd-simulation.png'],
    desc: 'Surveyed high-lift wing configurations targeting CL > 5, benchmarking against state-of-the-art designs. Designed complete end-to-end CAD model and validated aerodynamic performance through iterative CFD simulations.',
    ach: [
      'Studied fixed-wing flight dynamics and surveyed high-lift configurations achieving CL > 5',
      'Achieved a maximum lift coefficient of 8.1258 under realistic thrust-device interaction conditions',
      'Designed the complete end-to-end CAD model of the full wing assembly',
      'Validated aerodynamic performance through iterative CFD simulations using ANSYS Fluent',
    ],
    tags: ['CAD', 'CFD', 'ANSYS Fluent', 'Aerodynamics', 'Wing Design'],
    link: 'https://drive.google.com/file/d/1Ld1ZZanVCtlR_LdbzEOx0HuMkWPsHSjN/view?usp=sharing',
  },
  {
    category: 'robotics',
    meta: 'Personal Project · Robotics',
    title: 'Quadcopter CAD Design',
    summary: 'Custom quadcopter with full CAD modeling, structural analysis, and modular component design optimized for autonomous flight.',
    imgs: ['/quadcopter-isometric.png', '/quadcopter-front.png'],
    desc: 'Complete design and development of a custom quadcopter with detailed CAD modeling, structural analysis, and modular component integration for autonomous flight capabilities.',
    ach: [
      'Designed full assembly CAD model with structural optimization for weight and rigidity',
      'Optimized frame geometry for payload capacity and flight stability',
      'Implemented modular component design for easy maintenance and upgrades',
    ],
    tags: ['CAD', 'UAV Design', 'Fusion 360', 'Robotics', 'Autonomous Systems'],
    link: null,
  },
];
