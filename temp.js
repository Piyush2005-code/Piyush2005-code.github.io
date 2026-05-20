


    // ── NAV SCROLL ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

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
        imgs: ['src/Embedded_Hardware.avif'],
        desc: 'Architected a bare-metal ARM64 unikernel (<256KB) for deterministic ML inference, featuring a custom zero-dependency ONNX runtime and optimized SIMD kernels for microsecond-level execution.',
        ach: ['Implemented ARMv8-A boot (EL3\u2192EL1), MMU setup, GICv2, and timer with full interrupt handling', 'Designed a cooperative priority scheduler with custom 104B context switching and sub-8\u00b5s switch latency', 'Developed a zero-dependency ONNX runtime (40+ ops) with custom protobuf parser and 128MB pre-allocated tensor arena (no runtime malloc)', 'Optimized Conv2D/GEMM kernels (cache-aligned, NEON SIMD) with hardware-timer profiling for \u00b5s-level analysis', 'Achieved ~269\u00b5s inference latency (Cortex-A53, QEMU), benchmarking against Linux/Unikraft baselines'],
        tags: ['C11', 'ARM64 Assembly', 'NEON SIMD', 'QEMU', 'GCC'], link: 'https://github.com/Piyush2005-code/MiniOS'
      },
      {
        meta: '2026 \u00b7 Deep Learning / LLMs / Backend / Deployment', title: 'Counsel.ai - Student Advisory Platform for College Counselling',
        imgs: ['src/CounselAI.png'],
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
        imgs: ['src/os-scheduler.png'],
        desc: 'Implemented classical OS scheduling algorithms with interactive UI-based visualization. Features real-time Gantt chart generation for analyzing scheduling behavior and algorithm comparison.',
        ach: ['Implemented FCFS, Round Robin, and Priority scheduling algorithms with configurable parameters', 'Built real-time Gantt chart visualization for process scheduling analysis', 'Created interactive UI for comparing algorithm performance metrics', 'Developed desktop application using Electron for cross-platform support'],
        tags: ['React', 'TypeScript', 'Electron', 'Algorithm Visualization', 'Operating Systems'], link: 'https://github.com/Piyush2005-code/Operating-System-Scheduling-Algorithms.git'
      },
      {
        meta: '2025 \u00b7 AI/ML Project', title: 'JARVIS Voice Assistant',
        imgs: ['src/jarvis-interface.png'],
        desc: 'Engineered a real-time voice assistant with sub-second latency leveraging GPU-accelerated inference pipelines. Built end-to-end ML infrastructure for audio processing, NLU, and context-aware response generation.',
        ach: ['Implemented GPU inference on NVIDIA A5000 with sub-second latency using optimized CUDA kernels', 'Deployed containerized ML inference stack supporting 500+ concurrent users with 98% uptime', 'Integrated Retrieval-Augmented Generation (RAG) for context-aware, knowledge-grounded responses', 'Built real-time audio processing pipeline using AudioFlamingo3 for voice-to-text transcription'],
        tags: ['NVIDIA AudioFlamingo3', 'vLLM', 'RAG', 'Docker', 'Kubernetes', 'PyTorch'], link: 'https://github.com/AISocietyIITJ/Jarvis2.O'
      },
      {
        meta: '2025 \u00b7 Deep Learning Project', title: 'LLM-Based Chart Generation Web App',
        imgs: ['src/llm-chart-generator.png'],
        desc: 'Built an automated chart generation pipeline using LLMs to analyze uploaded PDF documents and generate meaningful data visualizations, leveraging NLP for document understanding and automated insight extraction.',
        ach: ['Implemented LLM-based document parsing using transformer architectures for semantic understanding', 'Built NLP pipeline for extracting structured data from unstructured PDF content', 'Designed automated chart selection algorithm using ML-based data type classification', 'Created responsive frontend-backend workflow with real-time data visualization rendering'],
        tags: ['LLMs', 'NLP', 'PDF Parsing', 'React', 'Node.js', 'Data Visualization'], link: 'https://github.com/Piyush2005-code/Chart-Generation-using-LLMs.git'
      },
      {
        meta: '2025 \u00b7 Computer Vision / Deep Learning', title: 'Crop Stress Detection \u2014 U-Net Semantic Segmentation',
        imgs: ['src/Farm_top_image.jpg', 'src/Crop_Detection_Segmentation_mask.jpg', 'src/Crop_Detection_YOLO_Object_Detection.png', 'src/UNet model.png'],
        desc: 'A computer vision system for detecting and segmenting stressed crop regions from aerial imagery using a U-Net CNN generating pixel-wise binary masks, with a full pipeline from synthetic dataset generation to real-time video inference.',
        ach: ['Designed a U-Net-based segmentation model (~7.7M params) with skip connections for pixel-level crop stress detection', 'Built a synthetic dataset pipeline using Gaussian blending and rotational augmentation (4\u00d7 expansion)', 'Full training pipeline with AdamW optimizer, BCEWithLogitsLoss, Dice coefficient tracking, 80/10/10 split', 'Developed real-time video inference pipeline (OpenCV + batch processing) generating overlay MP4 outputs'],
        tags: ['PyTorch', 'U-Net', 'OpenCV', 'Semantic Segmentation', 'Synthetic Data', 'CUDA / MPS'], link: 'https://github.com/Piyush2005-code/Computer-Vision-for-stressed-crop-detection.git'
      },
      {
        meta: 'Inter IIT Tech Meet 14.0 \u00b7 Aeronautics', title: 'Fixed-Wing STOL Aircraft Wing Design',
        imgs: ['src/Wing_Side_view.jpeg', 'src/wing-drawing.png', 'src/pressure-contours.png', 'src/cfd-simulation.png'],
        desc: 'Surveyed high-lift wing configurations targeting CL > 5, benchmarking against state-of-the-art designs. Designed complete end-to-end CAD model and validated aerodynamic performance through iterative CFD simulations.',
        ach: ['Studied fixed-wing flight dynamics and surveyed high-lift configurations achieving CL > 5', 'Achieved a maximum lift coefficient of 8.1258 under realistic thrust-device interaction conditions', 'Designed the complete end-to-end CAD model of the full wing assembly', 'Validated aerodynamic performance through iterative CFD simulations using ANSYS Fluent'],
        tags: ['CAD', 'CFD', 'ANSYS Fluent', 'Aerodynamics', 'Wing Design'], link: null
      },
      {
        meta: 'Personal Project \u00b7 Robotics', title: 'Quadcopter CAD Design & Development',
        imgs: ['src/quadcopter-isometric.png', 'src/quadcopter-front.png'],
        desc: 'Complete design and development of a custom quadcopter with detailed CAD modeling, structural analysis, and modular component integration for autonomous flight capabilities.',
        ach: ['Designed full assembly CAD model with structural optimization for weight and rigidity', 'Optimized frame geometry for payload capacity and flight stability', 'Implemented modular component design for easy maintenance and upgrades'],
        tags: ['CAD', 'UAV Design', 'Fusion 360', 'Robotics', 'Autonomous Systems'], link: null
      }
    ];
    // ── PROJECT COMPILER SIMULATION DATABASE ──
    const DIAGNOSTIC_DATA = [
      { // 0: Unikernel
        files: {
          'boot.S': `// ARM64 Bare-metal Unikernel Boot Loader
.section .text.boot
.global _start

_start:
    mrs x0, CurrentEL
    cmp x0, #0xc          // Check if EL3
    b.ne el2_init
    
    // Setup EL3 registers & drop to EL1
    ldr x1, =0x30d        // Custom SCTLR_EL1
    msr sctlr_el1, x1
    adr x2, el1_entry
    msr elr_el3, x2
    eret                  // Exception return to EL1`,
          'scheduler.c': `// Priority Cooperative Scheduler
#include "unikernel.h"

void context_switch(thread_t* next) {
    __asm__ __volatile__(
        "stp x19, x20, [x8, #0]\\n\\t"
        "stp x21, x22, [x8, #16]\\n\\t"
        "mov x9, sp\\n\\t"
        "str x9, [x8, #96]\\n\\t" // save current context
        "mov sp, %0\\n\\t"
        "eret" :: "r"(next->sp)
    );
}`,
          'onnx_runtime.c': `// Zero-Dependency ONNX Runtime Engine
#include "simd_kernels.h"

void run_conv2d(float* in, float* w, float* out) {
    // Align convolution arrays in cache
    #pragma omp parallel for
    for (int c = 0; c < 64; c++) {
        float32x4_t reg_in = vld1q_f32(in + c);
        float32x4_t reg_w  = vld1q_f32(w + c);
        float32x4_t reg_res = vmulq_f32(reg_in, reg_w);
        vst1q_f32(out + c, reg_res);
    }
}`
        },
        logs: [
          "[ 0.000000 ] Booting Unikernel on bare-metal ARM64 (EL3 -> EL1)...",
          "[ 0.000450 ] MMU initialized: flat mapped physical addresses, 4KB page granularity.",
          "[ 0.000980 ] GICv2 distributor registered at 0x08000000, active vector registers loading...",
          "[ 0.001350 ] Setting up 128MB zero-dependency ONNX tensor arena (no dynamic malloc).",
          "[ 0.003920 ] Loading MobileNet-v2 weights structure (26 weight matrices, 4.3M params)...",
          "[ 0.005110 ] Spawning cooperative scheduler (sub-8us context switch latency detected).",
          "[ 0.005820 ] Launching inference pipeline with active NEON SIMD acceleration...",
          "[ 0.006200 ] CPU core benchmark: 1.2 GFLOPS raw tensor throughput, cache-line alignment OK.",
          "[ 0.007120 ] Conv2D Layer 1: 3x3 conv kernel executed in 45us.",
          "[ 0.008450 ] GEMM Dense Layer: vector multiplication complete in 110us.",
          "[ 0.008980 ] Inference latency: 268.42 microseconds (1000 iteration average).",
          "[ 0.009000 ] Result accuracy: 98.42% convergence. STATUS: SYSTEM DETERMINISTIC."
        ]
      },
      { // 1: Counsel.ai
        files: {
          'agent_workflow.py': `# Mistral Conversational Routing
class StudentAdvisor:
    def __init__(self, pinecone_client, mistral_vllm):
        self.db = pinecone_client
        self.llm = mistral_vllm
        
    def route_query(self, student_id, query):
        traits = self.db.get_student_traits(student_id)
        if "interest" not in traits:
            return self.llm.generate("Begin student traits evaluation pipeline.")
        return self.llm.generate(f"Student traits are {traits}. Adaptive advice:")`,
          'ncdm_estimator.py': `# PyTorch Neural Cognitive Diagnosis Model
import torch
import torch.nn as nn

class NCDM(nn.Module):
    def __init__(self):
        super().__init__()
        self.student_emb = nn.Embedding(1000, 11) # 11D traits
        self.item_emb = nn.Embedding(500, 11)
        self.net = nn.Sequential(
            nn.Linear(22, 64),
            nn.ReLU(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
    def forward(self, sid, iid):
        return self.net(torch.cat([self.student_emb(sid), self.item_emb(iid)], dim=1))`
        },
        logs: [
          "[SYS] Initializing Counsel.ai runtime backend...",
          "[DB] Connecting to PostgreSQL database (active filters loaded)...",
          "[DB] Pinecone index semantic vector check: 1024-dim, cosine distance... Connected.",
          "[ML] Deforming PyTorch tensor graph for student traits model...",
          "[ML] Loading DistilRoBERTa model weights (anomaly and topic relevance validation)...",
          "[RUN] Simulating advisor agent response iteration...",
          "[AGENT] Routing query: 'I like math but want to build physical robotic hardware.'",
          "[NCDM] Updating 11D student trait vector: [Math: 0.92, Coding: 0.81, Design: 0.88, Hardware: 0.95]",
          "[DB] Querying Pinecone vector indices for: 'Mechatronics Jodhpur Robotics'",
          "[ML] Mistral conversational agent response rendering (vLLM speed: 64 tokens/s)...",
          "[AGENT] Output: 'Recommend Robotics & Automation (B.Tech CSE/ME) at IIT Jodhpur...'",
          "[SYS] Diagnostic test completed with 0 errors. Status: OK."
        ]
      },
      { // 2: OS Scheduler
        files: {
          'scheduler.ts': `// TS CPU Scheduler Algorithms
export class Scheduler {
  runRoundRobin(processes: Process[], quantum: number) {
    let time = 0;
    let queue = [...processes];
    while(queue.length > 0) {
      let p = queue.shift()!;
      let exec = Math.min(p.remainingTime, quantum);
      p.remainingTime -= exec;
      time += exec;
      if(p.remainingTime > 0) queue.push(p);
      else p.turnaroundTime = time - p.arrivalTime;
    }
  }
}`,
          'gantt_render.tsx': `// React Gantt Timeline Renderer
export const GanttChart = ({ scheduleLogs }) => {
  return (
    <div class="gantt-chart">
      {scheduleLogs.map(log => (
        <div class="gantt-bar" style={{ width: \`\${log.duration * 5}px\` }}>
          {log.pid} ({log.start}-{log.end})
        </div>
      ))}
    </div>
  );
}`
        },
        logs: [
          "Starting CPU scheduler validation pipeline...",
          "Populating task simulation database with 5 standard interactive processes...",
          "P01: Arrival 0ms, Burst 10ms, Priority 2 (Interactive UI)",
          "P02: Arrival 2ms, Burst 5ms, Priority 1 (Background kernel worker)",
          "P03: Arrival 3ms, Burst 8ms, Priority 3 (Hardware driver interrupt)",
          "Executing scheduler: ROUND ROBIN (Quantum = 2ms)",
          "[ Time  0ms ]: Process P01 context in. CPU registers updated.",
          "[ Time  2ms ]: Process P01 context out. Process P02 context in (Context latency sub-1us).",
          "[ Time  4ms ]: Process P02 context out. Process P03 context in.",
          "Executing scheduler: PREEMPTIVE PRIORITY SCHEDULING",
          "[ Time  5ms ]: CPU interrupt! P03 preempts P02 due to superior Priority (3 > 1).",
          "Calculated system diagnostics metrics:",
          "Average Waiting Time: 4.80ms",
          "Average Turnaround Time: 9.60ms",
          "CPU Utilization coefficient: 98.4% status optimal."
        ]
      },
      { // 3: JARVIS Voice Assistant
        files: {
          'cuda_pipeline.cu': `// CUDA Stream Audio Processor
__global__ void process_audio_buffer(float* in, float* out, int size) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < size) {
        // Apply low-latency bandpass filter and volume scaling
        float val = in[idx] * 1.5f;
        out[idx] = (val > 1.0f) ? 1.0f : ((val < -1.0f) ? -1.0f : val);
    }
}

void run_cuda_filter(float* dev_in, float* dev_out, int size) {
    int block = 256;
    int grid = (size + block - 1) / block;
    process_audio_buffer<<<grid, block>>>(dev_in, dev_out, size);
}`,
          'rag_context.py': `# RAG embedding context generation
def fetch_knowledge(query, chroma_db):
    # Generate query vectors
    q_vector = get_embedding(query)
    results = chroma_db.similarity_search_by_vector(q_vector, k=3)
    context = "\\n".join([r.page_content for r in results])
    return f"Use context to answer query: {query}\\nContext:\\n{context}"`
        },
        logs: [
          "[INIT] Initializing CUDA environments...",
          "[GPU] Selected hardware: NVIDIA RTX A5000 (24GB VRAM, CUDA Cores active).",
          "[STT] AudioFlamingo-3 model loaded in float16 precision (sub-second latency enabled).",
          "[RAG] Connecting to ChromaDB vectors repository... Linked.",
          "[TEST] Ingesting mock PCM audio stream from user microphone (48kHz stereo)...",
          "[CUDA] Audio stream copied to device memory pointers (HtoD copy in 0.12ms).",
          "[CUDA] Launching process_audio_buffer kernel (Grid: 128, Block: 256)... Done in 0.08ms.",
          "[STT] Transcribing voice input: 'Check the heat indices of quadcopter core 1.'",
          "[RAG] Similarity search loaded 3 semantic records from hardware telemetry docs.",
          "[LLM] Dispatching prompt to local vLLM pipeline...",
          "[LLM] Generative response: 'Quadcopter Core 1 CPU heat index is currently at 42.5C.'",
          "[TTS] Streaming audio wave out (sub-220ms time-to-first-token). STATUS: COMPLETED."
        ]
      },
      { // 4: LLM Chart Gen
        files: {
          'pdf_parser.py': `# PDF Text & Layout Table Extractor
import pdfplumber

def parse_academic_pdf(path):
    with pdfplumber.open(path) as pdf:
        for i, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            if len(tables) > 0:
                print(f"Table found on Page {i+1}: {tables[0]}")
            text = page.extract_text()
            yield {"page": i+1, "text": text, "tables": tables}`,
          'chart_selector.py': `# Automatic NLP Graph Recommendation
def recommend_graph(columns, row_count):
    if len(columns) == 2 and "date" in columns[0].lower():
        return "line_chart" # Time series
    elif len(columns) == 2 and row_count < 10:
        return "bar_chart" # Categorical comparisons
    else:
        return "scatter_plot" # Multi-dimensional distributions`
        },
        logs: [
          "[START] Ingesting target PDF: 'fixed_wing_stol_aerodynamics_report.pdf'...",
          "[PDF] Loading document streams (4 pages total)...",
          "[PARSER] Ingesting Page 2 text layout structures...",
          "[PARSER] Identified tabular matrix: Lift coefficients at varying angle of attack (AoA).",
          "[DATA] Table Matrix: AoA: [-4, 0, 4, 8, 12, 16, 20] -> CL: [0.21, 0.85, 1.82, 3.45, 5.82, 8.12, 7.21]",
          "[LLM] Generating semantic understanding prompt...",
          "[LLM] Classification recommendation: Categorical line series mapped to line chart.",
          "[RUN] Compiling terminal rendering layout module...",
          "Rendered ASCII line graph of STOL wing performance:",
          "  CL ^                                     * (8.12)",
          " 9.0 |                                 *   ",
          " 6.0 |                             *       ",
          " 3.0 |                         *           ",
          " 0.0 | *         *     *                   ",
          "     +----------------------------------------> AoA",
          "      -4°        0°    4°   8°    12°   16°  20°",
          "[STATUS] Chart successfully rendered. Diagnostic completed."
        ]
      },
      { // 5: Crop Stress
        files: {
          'unet_segment.py': `# PyTorch U-Net Semantic Model
import torch
import torch.nn as nn

class DoubleConv(nn.Module):
    def __init__(self, in_c, out_c):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_c, out_c, 3, 1, 1, bias=False),
            nn.BatchNorm2d(out_c),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_c, out_c, 3, 1, 1, bias=False),
            nn.BatchNorm2d(out_c),
            nn.ReLU(inplace=True)
        )
    def forward(self, x): return self.conv(x)`,
          'data_aug.py': `# Rotational Synthetic Augmentation
import cv2
import numpy as np

def rotate_image(image, angle):
    h, w = image.shape[:2]
    cX, cY = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D((cX, cY), angle, 1.0)
    return cv2.warpAffine(image, M, (w, h))`
        },
        logs: [
          "[INIT] Booting Computer Vision stress segmenter diagnostics...",
          "[CUDA] Assigning PyTorch tensor workspace (MPS active on macOS Core GPU).",
          "[UNET] Constructing 4-level U-Net model graphs (7,724,192 parameters active).",
          "[UNET] Verified skip-connection pathways (concat dimensions verified: 128->256).",
          "[DATA] Loading augmentations... Gaussian blurring + rotational transformations.",
          "[AUG] Synthetic expansion checklist: Original (500 images) -> Expanded (2000 images).",
          "[RUN] Triggering inference stream simulation on aerial video: 'crop_flight_lowalt.mp4'...",
          "[GPU] Batch size 8 processed in 14.2ms. Processing rate: 72.8 FPS.",
          "[INF] Frame 010... Dice score: 0.892, BCE Loss: 0.045",
          "[INF] Frame 120... Dice score: 0.908, BCE Loss: 0.038",
          "[INF] Frame 240... Dice score: 0.912, BCE Loss: 0.037",
          "[RESULT] Semantic output check: Identified 14.2% crop area under nitrogen deficiency.",
          "[STATUS] Frame overlays written to video buffers. INF SUCCESSFUL."
        ]
      },
      { // 6: STOL Aircraft
        files: {
          'wing_aerodynamics.py': `# High-Lift STOL wing numerical solver
import numpy as np

def solve_aerofoil_section(aoa_deg, chord, velocity):
    aoa_rad = np.radians(aoa_deg)
    v_inf_x = velocity * np.cos(aoa_rad)
    v_inf_z = velocity * np.sin(aoa_rad)
    
    panels_gamma = np.zeros(20)
    for i in range(20):
        panels_gamma[i] = 2.0 * np.pi * velocity * np.sin(aoa_rad + 0.1)
    return np.sum(panels_gamma) * chord`,
          'fluent_mesh.jou': `# ANSYS Fluent Mesh script
/file/read-case stol_wing_mesh.msh
/define/models/viscous/kw-sst? yes
/define/boundary-conditions/velocity-inlet velocity_inlet [50.0 0.0 0.0]
/solve/initialize/hyb-initialization
/solve/iterate 500`
        },
        logs: [
          "[START] Initializing STOL aerodynamics verification pipeline...",
          "[CFD] Importing wing geometry mesh files (1.4M polyhedral cells)...",
          "[CFD] Setting viscous flow model boundary: k-omega Shear Stress Transport (SST)...",
          "[CFD] Setting velocity-inlet condition: 50.0 m/s (approx. 180 km/h landing speed).",
          "[RUN] Iterating Navier-Stokes numerical solver convergence...",
          "Iteration   10/500 ... continuity: 1.25e-3, velocity-x: 8.52e-4, omega: 5.42e-3",
          "Iteration  100/500 ... continuity: 2.12e-5, velocity-x: 1.12e-5, omega: 8.92e-5",
          "Iteration  300/500 ... continuity: 8.42e-7, velocity-x: 5.11e-7, omega: 2.11e-6 (CONVERGED)",
          "[SOLVE] Calculating integrated pressure contours on aerofoil geometry...",
          "[CFD] Upper wing suction peak: Cp = -12.45, active thrust interaction enabled.",
          "[RESULT] Calculated lift-drag parameters under maximum AoA (16 degrees):",
          "Total Lift Coefficient (CL) compiled: 8.1258",
          "Total Drag Coefficient (CD) compiled: 0.5421",
          "Aerodynamic Efficiency (L/D): 14.99. STATUS: PERFORMANCE OPTIMAL."
        ]
      },
      { // 7: Quadcopter CAD
        files: {
          'frame_stress.py': `# Quadcopter Finite Element Analysis (FEA)
import numpy as np

def run_structural_check(nodal_forces, nodes, elements):
    E_modulus = 1.35e11 # Pa
    tensile_strength = 2.2e9 # Pa
    
    displacements = np.zeros(len(nodes))
    for elem in elements:
        node_1, node_2 = elem
        stress = E_modulus * (displacements[node_2] - displacements[node_1])
        if stress > tensile_strength:
            print(f"FAIL: Element {elem} exceeds limits!")
    return displacements`,
          'telemetry_stabilizer.c': `// Quadcopter PID Stabilizer Loop
#include "gyro.h"

void compute_motor_signals(double pitch_err, double roll_err, double* rotors) {
    double Kp = 1.45, Ki = 0.08, Kd = 0.22;
    double adjust_pitch = Kp * pitch_err + Kd * (pitch_err - prev_pitch_err);
    double adjust_roll  = Kp * roll_err  + Kd * (roll_err  - prev_roll_err);
    
    rotors[0] = base_throttle + adjust_pitch + adjust_roll;
    rotors[1] = base_throttle - adjust_pitch + adjust_roll;
    rotors[2] = base_throttle - adjust_pitch - adjust_roll;
    rotors[3] = base_throttle + adjust_pitch - adjust_roll;
}`
        },
        logs: [
          "[START] Initializing Quadcopter CAD finite element structural check...",
          "[CAD] Reading Fusion 360 geometric mesh models... (84 assemblies, 1.2M polygons loaded).",
          "[FEA] Material properties registered: Honeycomb Carbon-Fiber (Density: 1.45 g/cm³).",
          "[FEA] Applying thrust nodal force: 12.4N load at each rotor node connection (total 49.6N).",
          "[RUN] Evaluating structural deformation metrics...",
          "[FEA] Arm node displacement check... maximum displacement: 0.12mm (Safety Factor: 3.42).",
          "[FEA] Carbon fiber composite load distribution: PASSED.",
          "[STABILITY] Booting gyro flight stabilization telemetry loops...",
          "[PID] Activating stabilization coefficients: Kp=1.45, Ki=0.08, Kd=0.22",
          "[TELEMETRY] Simulating rotor adjustments under wind shear (wind speed 15 m/s):",
          "[PID] Rotor 1 Speed: 8420 RPM, Rotor 2 Speed: 8110 RPM, Rotor 3 Speed: 8390 RPM.",
          "[PID] Pitch correction: +0.02deg, Roll correction: -0.04deg -> SYSTEM STABILIZED.",
          "[RESULT] NET WEIGHT: 820 grams (Honeycomb honeycomb frame active). STATUS: SUCCESS."
        ]
      }
    ];

    // ── ACTIVE PROJECT DIALOG STATES ──
    let currentActiveProjIdx = 0;
    let isDiagRunning = false;
    let diagTimeoutId = null;

    // ── DYNAMIC PROJECT MODAL CONTROLLER ──
    function openModal(idx) {
      currentActiveProjIdx = idx;
      const p = PROJECTS[idx];
      const ia = document.getElementById('pm-img-area');
      if (p.imgs.length === 1) {
        ia.innerHTML = `<img class="proj-modal-img" src="\${p.imgs[0]}" alt="\${p.title}" onerror="this.style.display='none'"/>`;
      } else {
        ia.innerHTML = `<div class="proj-modal-imgs">\${p.imgs.map(s => `<img src="\${s}" alt="" onerror="this.style.display='none'"/>`).join('')}</div>`;
      }
      document.getElementById('pm-meta').textContent = p.meta;
      document.getElementById('pm-title').textContent = p.title;
      document.getElementById('pm-desc').textContent = p.desc;
      document.getElementById('pm-ach').innerHTML = p.ach.map(a => `<li>\${a}</li>`).join('');
      document.getElementById('pm-tags').innerHTML = p.tags.map(t => `<span class="proj-modal-tag">\${t}</span>`).join('');
      
      document.getElementById('pm-links').innerHTML = p.link ? `<a class="proj-modal-link" href="\${p.link}" target="_blank">\${GH} Source Code</a>` : '';

      // Set up Code Diagnostics tab selectors
      const diagTabs = document.getElementById('diag-tabs');
      diagTabs.innerHTML = '';
      
      const fileNames = Object.keys(DIAGNOSTIC_DATA[idx].files);
      fileNames.forEach((fileName, fIdx) => {
        const btnTab = document.createElement('button');
        btnTab.className = 'diag-tab';
        btnTab.textContent = fileName;
        btnTab.onclick = () => selectDiagFile(fileName);
        diagTabs.appendChild(btnTab);
      });
      
      // Auto-select first tab
      if (fileNames.length > 0) {
        selectDiagFile(fileNames[0]);
      }
      
      // Reset diagnostic simulator elements
      isDiagRunning = false;
      if (diagTimeoutId) clearTimeout(diagTimeoutId);
      
      const btnDiagRun = document.getElementById('btn-diag-run');
      const btnDiagText = document.getElementById('btn-diag-text');
      if (btnDiagText) btnDiagText.textContent = 'Run System Test';
      if (btnDiagRun) {
        btnDiagRun.disabled = false;
        btnDiagRun.classList.remove('running');
      }
      
      document.getElementById('mini-term-out').innerHTML = `<span style="color:var(--border2); opacity:0.6">> Diagnostic module initialized. Select a source file above and click 'Run System Test' to compile and execute simulation trace.</span>`;
      document.getElementById('mini-term-progress').style.width = '0%';
      document.getElementById('mini-term-pct').textContent = '0%';
      
      // Bind Run Diagnostic Action
      if (btnDiagRun) {
        btnDiagRun.onclick = () => runProjectDiagnostics(idx);
      }

      document.getElementById('proj-modal').classList.add('open');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('proj-modal').classList.remove('open');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      if (diagTimeoutId) clearTimeout(diagTimeoutId);
      isDiagRunning = false;
    }
    
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    function selectDiagFile(fileName) {
      document.querySelectorAll('.diag-tab').forEach(t => {
        t.classList.toggle('active', t.textContent === fileName);
      });
      const code = DIAGNOSTIC_DATA[currentActiveProjIdx].files[fileName];
      const html = code.split('\n').map((line, num) => 
        `<div class="code-line"><span class="code-ln">\${num+1}</span><span class="code-content">\${escapeHTML(line)}</span></div>`
      ).join('');
      document.getElementById('diag-code-view').innerHTML = html;
    }

    function runProjectDiagnostics(idx) {
      if (isDiagRunning) return;
      isDiagRunning = true;
      
      const btnDiagRun = document.getElementById('btn-diag-run');
      const btnDiagText = document.getElementById('btn-diag-text');
      const termOut = document.getElementById('mini-term-out');
      const progBar = document.getElementById('mini-term-progress');
      const pctLabel = document.getElementById('mini-term-pct');
      
      if (btnDiagText) btnDiagText.textContent = 'Testing...';
      if (btnDiagRun) {
        btnDiagRun.disabled = true;
        btnDiagRun.classList.add('running');
      }
      
      termOut.innerHTML = ''; // Clear prior output
      
      const logs = DIAGNOSTIC_DATA[idx].logs;
      let logIndex = 0;
      
      function streamNextLog() {
        if (!isDiagRunning) return; // Guard against modal close
        if (logIndex < logs.length) {
          const logLine = document.createElement('div');
          logLine.style.marginBottom = '4px';
          
          const text = logs[logIndex];
          // Style compile logs or errors
          if (text.includes('[RUN]') || text.includes('[TEST]') || text.includes('Iteration')) {
            logLine.innerHTML = `<span style="color:var(--term-accent)">\${escapeHTML(text)}</span>`;
          } else if (text.includes('FAIL') || text.includes('error')) {
            logLine.innerHTML = `<span style="color:#ff5c5c">\${escapeHTML(text)}</span>`;
          } else if (text.includes('PASSED') || text.includes('SUCCESS') || text.includes('optimal') || text.includes('optimal.') || text.includes('CONVERGED') || text.includes('OPTIMAL.')) {
            logLine.innerHTML = `<span style="color:#00ff66; text-shadow:0 0 3px rgba(0,255,102,0.3)">\${escapeHTML(text)}</span>`;
          } else {
            logLine.innerHTML = `<span>\${escapeHTML(text)}</span>`;
          }
          
          termOut.appendChild(logLine);
          termOut.scrollTop = termOut.scrollHeight;
          
          // Calculate progress percentage
          const pct = Math.round(((logIndex + 1) / logs.length) * 100);
          progBar.style.width = pct + '%';
          pctLabel.textContent = pct + '%';
          
          logIndex++;
          // Staggered logs speed
          const delay = 100 + Math.random() * 200;
          diagTimeoutId = setTimeout(streamNextLog, delay);
        } else {
          // Completed
          const completeLine = document.createElement('div');
          completeLine.style.marginTop = '6px';
          completeLine.style.fontWeight = 'bold';
          completeLine.innerHTML = `<span style="color:#00ff66; text-shadow:0 0 4px rgba(0,255,102,0.5)">> DIAGNOSTIC COMPILE COMPLETE: 0 ERRORS, SYSTEM STABLE (PASS).</span>`;
          termOut.appendChild(completeLine);
          termOut.scrollTop = termOut.scrollHeight;
          
          progBar.style.width = '100%';
          pctLabel.textContent = '100%';
          
          if (btnDiagText) btnDiagText.textContent = 'Run System Test';
          if (btnDiagRun) {
            btnDiagRun.disabled = false;
            btnDiagRun.classList.remove('running');
          }
          isDiagRunning = false;
        }
      }
      
      // Start streaming with a small compiler start delay
      termOut.innerHTML = `<div><span style="color:var(--border2); opacity:0.8">> Spawning sandbox compiler toolchain for target...</span></div>`;
      diagTimeoutId = setTimeout(streamNextLog, 600);
    }

    // ── MUSIC ──
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('music-btn');
    const iconMuted = document.getElementById('icon-muted');
    const iconPlaying = document.getElementById('icon-playing');
    if (audio) audio.volume = 0.3;
    let playing = false;
    if (btn) {
      btn.addEventListener('click', () => {
        if (playing) { 
          audio.pause(); 
          btn.classList.remove('playing'); 
          if (iconMuted) iconMuted.style.display = ''; 
          if (iconPlaying) iconPlaying.style.display = 'none'; 
        } else { 
          audio.play().catch(() => { }); 
          btn.classList.add('playing'); 
          if (iconMuted) iconMuted.style.display = 'none'; 
          if (iconPlaying) iconPlaying.style.display = ''; 
        }
        playing = !playing;
      });
    }

    // ── GLOBAL WORKSTATION CLI CONTROLLERS & DATA ──
    let currentVirtualDir = '/';
    let cmdHistory = [];
    let historyIndex = -1;
    let currentSavedInput = '';
    let activeCADModule = 'none'; // 'none', 'quadcopter', 'wing'
    
    // Telemetry parameters for dynamic transition
    let currentThrottle = 0, targetThrottle = 0;
    let currentRPM = 0, targetRPM = 0;
    let currentTemp = 38.2, targetTemp = 38.2;
    let currentPitch = 0, targetPitch = 0;
    let currentRoll = 0, targetRoll = 0;
    
    let waveSpeed = 0.05, targetWaveSpeed = 0.05;
    let waveAmplitude = 15, targetWaveAmplitude = 15;
    
    const ALL_CMDS = ['help', 'ls', 'cd', 'cat', 'neofetch', 'sysinfo', 'cad', 'throttle', 'pitch', 'roll', 'theme', 'play', 'pause', 'clear', 'exit'];
    const ALL_FILES = ['about.txt', 'contact.txt', 'publications.txt', 'skills.sh', 'unikernel.elf', 'counsel_ai.py', 'os_scheduler.ts', 'jarvis_voice.cu', 'llm_charts.py', 'crop_stress.py', 'stol_aerodynamics.py', 'quadcopter_cad.py'];

    function openTerminal() {
      const term = document.getElementById('terminal-overlay');
      if (term) {
        term.classList.add('open');
        document.body.style.overflow = 'hidden'; // lock page scroll
      }
      
      const termInput = document.getElementById('terminal-input');
      if (termInput) {
        termInput.focus();
      }
      
      // Auto-mount CAD viewport on launch if not active
      if (activeCADModule === 'none') {
        executeCommand('cad quadcopter');
      } else {
        const video = document.getElementById('cad-diag-video');
        if (video) video.play().catch(() => {});
      }
    }
    
    function closeTerminal() {
      const term = document.getElementById('terminal-overlay');
      if (term) term.classList.remove('open');
      document.body.style.overflow = ''; // unlock scroll
      const video = document.getElementById('cad-diag-video');
      if (video) video.pause();
    }
    
    function minimizeTerminal() {
      // Behaves like closing but keeps session active
      closeTerminal();
      printOutputLine('Workstation backgrounded. Type open in bottom bar or click prompt trigger to resume.', 'info');
    }
    
    function toggleMaximizeTerminal() {
      const win = document.querySelector('.terminal-window');
      if (win) win.classList.toggle('maximized');
    }

    function changeTheme(themeName) {
      const overlay = document.getElementById('terminal-overlay');
      if (!overlay) return;
      
      // Remove all theme classes first
      overlay.classList.remove('theme-matrix', 'theme-cyberpunk', 'theme-amber', 'theme-steel', 'theme-hack');
      if (themeName !== 'default' && themeName !== 'Theme: default') {
        overlay.classList.add('theme-' + themeName);
      }
      
      // Sync Select Dropdown
      const select = document.getElementById('terminal-theme-select');
      if (select) select.value = themeName;
      
      printOutputLine(`Shaders updated. Active rendering matrix: \${themeName.toUpperCase()}`, 'info');
    }

    // ── TERMINAL SYNTAX ESCAPER ──
    function escapeHTML(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function getPromptPrefix() {
      const dirLabel = currentVirtualDir === '/' ? '~' : '~' + currentVirtualDir;
      return `guest@psb_os:\${dirLabel}$`;
    }

    function printOutputLine(text, type = 'output') {
      const out = document.getElementById('terminal-output');
      if (!out) return;
      
      const line = document.createElement('div');
      line.className = 'terminal-output-line';
      
      if (type === 'command') {
        line.innerHTML = `<span class="terminal-prompt-prompt">\${escapeHTML(getPromptPrefix())}</span> <span class="terminal-command-text">\${escapeHTML(text)}</span>`;
      } else if (type === 'error') {
        line.innerHTML = `<span style="color:#ff5c5c">\${text}</span>`;
      } else if (type === 'success') {
        line.innerHTML = `<span style="color:#00ff66; text-shadow:0 0 4px rgba(0,255,102,0.4)">\${text}</span>`;
      } else if (type === 'info') {
        line.innerHTML = `<span style="color:var(--term-accent)">\${text}</span>`;
      } else if (type === 'header') {
        line.innerHTML = `<span style="color:var(--term-border); font-weight:bold">\${text}</span>`;
      } else {
        line.innerHTML = `<span>\${text}</span>`;
      }
      
      out.appendChild(line);
      
      const cliPane = document.getElementById('terminal-cli-pane');
      if (cliPane) {
        cliPane.scrollTop = cliPane.scrollHeight;
      }
    }

    function executeCommand(fullCmd) {
      const trimmed = fullCmd.trim();
      if (!trimmed) return;
      
      // Print command line in terminal history
      printOutputLine(trimmed, 'command');
      
      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');
      
      switch (cmd) {
        case 'clear':
        case 'cls':
          const out = document.getElementById('terminal-output');
          if (out) out.innerHTML = '';
          break;
          
        case 'exit':
          closeTerminal();
          break;
          
        case 'help':
          printOutputLine('Available Commands:', 'header');
          printOutputLine('------------------', 'header');
          printOutputLine('help             - Display this system manual');
          printOutputLine('ls               - List virtual directories and source files');
          printOutputLine('cd [dir]         - Navigate between virtual segments');
          printOutputLine('cat [file]       - Read contents of a virtual source file');
          printOutputLine('neofetch         - Retrieve CPU core architectures & specs');
          printOutputLine('cad [module]     - Mount viewport [quadcopter | wing | off]');
          printOutputLine('throttle [0-100] - Set rotor torque thrust speed');
          printOutputLine('pitch [angle]    - Command flight elevator trim (-90 to 90)');
          printOutputLine('roll [angle]     - Command flight aileron trim (-90 to 90)');
          printOutputLine('theme [name]     - Swap retro overlay colors (matrix/cyberpunk/amber/steel/hack)');
          printOutputLine('play [1|2]       - Play background cyber acoustics');
          printOutputLine('pause            - Mute background acoustics');
          printOutputLine('clear            - Wipe the terminal output logs');
          printOutputLine('exit             - Unmount terminal overlay');
          break;
          
        case 'ls':
          if (currentVirtualDir === '/') {
            printOutputLine('<span style="color:var(--term-accent)"><b>about/</b></span>   <span style="color:var(--term-accent)"><b>research/</b></span>   <span style="color:var(--term-accent)"><b>projects/</b></span>   <span style="color:var(--term-accent)"><b>skills/</b></span>   <span style="color:var(--term-accent)"><b>contact/</b></span>', 'output');
          } else if (currentVirtualDir === '/about') {
            printOutputLine('about.txt', 'output');
          } else if (currentVirtualDir === '/research') {
            printOutputLine('publications.txt', 'output');
          } else if (currentVirtualDir === '/projects') {
            printOutputLine('unikernel.elf   counsel_ai.py   os_scheduler.ts   jarvis_voice.cu\\nllm_charts.py   crop_stress.py  stol_aerodynamics.py  quadcopter_cad.py', 'output');
          } else if (currentVirtualDir === '/skills') {
            printOutputLine('skills.sh', 'output');
          } else if (currentVirtualDir === '/contact') {
            printOutputLine('contact.txt', 'output');
          }
          break;
          
        case 'cd':
          const targetDir = arg.toLowerCase().trim();
          if (!targetDir || targetDir === '/' || targetDir === '..') {
            currentVirtualDir = '/';
          } else if (['about', 'research', 'projects', 'skills', 'contact'].includes(targetDir)) {
            currentVirtualDir = '/' + targetDir;
          } else if (['/about', '/research', '/projects', '/skills', '/contact'].includes(targetDir)) {
            currentVirtualDir = targetDir;
          } else {
            printOutputLine(`cd: no such file or directory: \${arg}`, 'error');
            break;
          }
          // Update prompt label
          const promptLabel = document.getElementById('terminal-prompt-label');
          if (promptLabel) {
            const dirLabel = currentVirtualDir === '/' ? '~' : '~' + currentVirtualDir;
            promptLabel.textContent = `guest@psb_os:\${dirLabel}$`;
          }
          break;
          
        case 'cat':
          const targetFile = arg.trim();
          if (!targetFile) {
            printOutputLine('cat: missing operand', 'error');
            break;
          }
          const lowerFile = targetFile.toLowerCase();
          
          // Match standard files regardless of path for ease of use
          if (lowerFile === 'about.txt' || lowerFile === 'about/about.txt') {
            printOutputLine('PIYUSH SINGH BHATI\\n------------------\\nUndergraduate at IIT Jodhpur\\nRobotics & Systems Engineering Enthusiast\\nInterests: Bare-metal OS, Deep Learning, Aerospace Systems, Web Technology', 'output');
          } else if (lowerFile === 'contact.txt' || lowerFile === 'contact/contact.txt') {
            printOutputLine('CONTACT PORTALS\\n---------------\\nEmail: piyush.bhati680@gmail.com\\nLinkedIn: linkedin.com/in/piyush-singh-bhati-5a074929a\\nGitHub: github.com/Piyush2005-code', 'output');
          } else if (lowerFile === 'publications.txt' || lowerFile === 'research/publications.txt') {
            printOutputLine('PUBLICATIONS & RESEARCH\\n-----------------------\\n- "Mistral-powered conversational routing for student advisory workflows"\\n- "Numerical modeling of high-lift STOL wings under thrust-device interaction"', 'output');
          } else if (lowerFile === 'skills.sh' || lowerFile === 'skills/skills.sh') {
            printOutputLine('#!/bin/bash\\necho "STRENGTHS: C/C++, Python, CUDA, PyTorch, React, ANSYS Fluent, Fusion 360"', 'output');
          } else {
            // Check diagnostic code files
            let found = false;
            for (let i = 0; i < DIAGNOSTIC_DATA.length; i++) {
              const filesObj = DIAGNOSTIC_DATA[i].files;
              for (const fileName in filesObj) {
                if (fileName.toLowerCase() === lowerFile) {
                  printOutputLine(`--- [File: \${fileName}] ---`, 'header');
                  printOutputLine(filesObj[fileName], 'output');
                  found = true;
                  break;
                }
              }
              if (found) break;
            }
            
            if (!found) {
              // Try match project shortnames
              if (lowerFile.includes('unikernel') || lowerFile === 'unikernel.elf') {
                printOutputLine(DIAGNOSTIC_DATA[0].files['boot.S'], 'output');
              } else if (lowerFile.includes('counsel') || lowerFile === 'counsel_ai.py') {
                printOutputLine(DIAGNOSTIC_DATA[1].files['agent_workflow.py'], 'output');
              } else if (lowerFile.includes('scheduler') || lowerFile === 'os_scheduler.ts') {
                printOutputLine(DIAGNOSTIC_DATA[2].files['scheduler.ts'], 'output');
              } else if (lowerFile.includes('jarvis') || lowerFile === 'jarvis_voice.cu') {
                printOutputLine(DIAGNOSTIC_DATA[3].files['cuda_pipeline.cu'], 'output');
              } else if (lowerFile.includes('chart') || lowerFile === 'llm_charts.py') {
                printOutputLine(DIAGNOSTIC_DATA[4].files['chart_selector.py'], 'output');
              } else if (lowerFile.includes('crop') || lowerFile === 'crop_stress.py') {
                printOutputLine(DIAGNOSTIC_DATA[5].files['unet_segment.py'], 'output');
              } else if (lowerFile.includes('stol') || lowerFile.includes('wing') || lowerFile === 'stol_aerodynamics.py') {
                printOutputLine(DIAGNOSTIC_DATA[6].files['wing_aerodynamics.py'], 'output');
              } else if (lowerFile.includes('quad') || lowerFile === 'quadcopter_cad.py') {
                printOutputLine(DIAGNOSTIC_DATA[7].files['frame_stress.py'], 'output');
              } else {
                printOutputLine(`cat: \${targetFile}: No such file or directory`, 'error');
              }
            }
          }
          break;
          
        case 'neofetch':
        case 'sysinfo':
          const neofetchContainer = document.createElement('div');
          neofetchContainer.className = 'terminal-output-line';
          neofetchContainer.innerHTML = `
<div style="display:flex; flex-wrap:wrap; gap:20px; font-family:var(--font-mono); line-height:1.4">
  <div style="color:var(--term-border); text-shadow:0 0 5px var(--term-border); font-size:0.8rem; white-space:pre">
 /\\___/\\
(  o o  )  &lt;PSB_OS/&gt;
 (  =  )   Precision
 /     \\  Engineered
(  | |  )
(__|__)
  </div>
  <div style="font-size:0.8rem">
    <span style="color:var(--term-accent)"><b>piyush@psb_os</b></span><br>
    <span style="color:var(--term-border)">-----------------</span><br>
    OS: <span style="color:var(--term-text)">PiyushOS v1.4 (ARM64 EL1)</span><br>
    Kernel: <span style="color:var(--term-text)">Zero-malloc Bare-metal Unikernel</span><br>
    CPU: <span style="color:var(--term-text)">Cortex-A53 (NEON SIMD active)</span><br>
    GPU: <span style="color:var(--term-text)">Core MPS / WebGL Shaders</span><br>
    Uptime: <span style="color:var(--term-text)">13h 37m</span><br>
    Shell: <span style="color:var(--term-text)">guest-bash-interactive</span><br>
    Diagnostics: <span style="color:#00ff66">OPERATIONAL</span>
  </div>
</div>
          `;
          const outBox = document.getElementById('terminal-output');
          if (outBox) {
            outBox.appendChild(neofetchContainer);
            const cliPane = document.getElementById('terminal-cli-pane');
            if (cliPane) cliPane.scrollTop = cliPane.scrollHeight;
          }
          break;
          
        case 'cad':
          const moduleName = arg.toLowerCase().trim();
          const video = document.getElementById('cad-diag-video');
          const modLabel = document.getElementById('cad-active-module');
          const telStatus = document.getElementById('tel-status');
          
          if (moduleName === 'quadcopter' || moduleName === 'quad') {
            activeCADModule = 'quadcopter';
            if (modLabel) modLabel.textContent = 'MODULE: QUADCOPTER_CAD';
            if (telStatus) {
              telStatus.textContent = 'ONLINE';
              telStatus.className = 'telemetry-value status-online';
            }
            if (video) {
              video.style.display = 'block';
              video.play().catch(() => {});
            }
            printOutputLine('CAD Telemetry Mounted: QUADCOPTER assembly verified. Stabilization PID loop online.', 'success');
            
            // Set base parameters for quadcopter
            targetThrottle = 50;
            targetRPM = 4250;
            targetTemp = 42.5;
            targetWaveSpeed = 0.08;
            targetWaveAmplitude = 22;
          } else if (moduleName === 'wing' || moduleName === 'stol') {
            activeCADModule = 'wing';
            if (modLabel) modLabel.textContent = 'MODULE: FIXED_WING_STOL';
            if (telStatus) {
              telStatus.textContent = 'ONLINE';
              telStatus.className = 'telemetry-value status-online';
            }
            if (video) {
              video.style.display = 'block';
              video.play().catch(() => {});
            }
            printOutputLine('CAD Telemetry Mounted: FIXED-WING CFD mesh mapped. Navier-Stokes solver loaded.', 'success');
            
            // Set wing aerodynamic base parameters (throttle is airspeed here)
            targetThrottle = 80; // air speed
            targetRPM = 180; // km/h
            targetTemp = 48.2; // temp is reynolds parameter
            targetWaveSpeed = 0.12;
            targetWaveAmplitude = 35;
          } else if (moduleName === 'off' || moduleName === 'none') {
            activeCADModule = 'none';
            if (modLabel) modLabel.textContent = 'MODULE: NONE';
            if (telStatus) {
              telStatus.textContent = 'STANDBY';
              telStatus.className = 'telemetry-value';
            }
            if (video) {
              video.pause();
              video.style.display = 'none';
            }
            printOutputLine('CAD Telemetry Unmounted. Viewport stand-by.', 'info');
            
            targetThrottle = 0;
            targetRPM = 0;
            targetTemp = 38.2;
            targetWaveSpeed = 0.05;
            targetWaveAmplitude = 15;
          } else {
            printOutputLine('cad: missing or invalid module parameter [quadcopter | wing | off]', 'error');
          }
          break;
          
        case 'throttle':
          const tVal = parseFloat(arg);
          if (isNaN(tVal) || tVal < 0 || tVal > 100) {
            printOutputLine('throttle: intensity value must be between 0 and 100', 'error');
          } else {
            targetThrottle = tVal;
            if (activeCADModule === 'wing') {
              targetRPM = Math.round(tVal * 2.25); // Airspeed: 0 to 225 km/h
              targetTemp = 38.2 + (tVal * 0.22); // Reynolds representation
              targetWaveSpeed = 0.05 + (tVal * 0.002);
              targetWaveAmplitude = 15 + (tVal * 0.45);
              printOutputLine(`CFD tunnel wind speed set to \${tVal}% (\${targetRPM} km/h equivalent).`, 'success');
            } else {
              targetRPM = tVal * 85; // Rotor RPM: 0 to 8500
              targetTemp = 38.2 + (tVal * 0.45); // CPU Heat index
              targetWaveSpeed = 0.05 + (tVal * 0.003);
              targetWaveAmplitude = 15 + (tVal * 0.55);
              printOutputLine(`Rotor acceleration throttled to \${tVal}% (\${Math.round(targetRPM)} RPM).`, 'success');
            }
          }
          break;
          
        case 'pitch':
          const pVal = parseFloat(arg);
          if (isNaN(pVal) || pVal < -90 || pVal > 90) {
            printOutputLine('pitch: angle must be between -90 and 90 degrees', 'error');
          } else {
            targetPitch = pVal;
            printOutputLine(`Flight pitch stabilization trim set to \${pVal}°.`, 'success');
          }
          break;
          
        case 'roll':
          const rVal = parseFloat(arg);
          if (isNaN(rVal) || rVal < -90 || rVal > 90) {
            printOutputLine('roll: angle must be between -90 and 90 degrees', 'error');
          } else {
            targetRoll = rVal;
            printOutputLine(`Flight roll stabilization trim set to \${rVal}°.`, 'success');
          }
          break;
          
        case 'theme':
          const tName = arg.toLowerCase().trim();
          if (['default', 'matrix', 'cyberpunk', 'amber', 'steel', 'hack'].includes(tName)) {
            changeTheme(tName);
          } else {
            printOutputLine(`theme: unrecognized theme '\${arg}'. Options: matrix, cyberpunk, amber, steel, hack, default`, 'error');
          }
          break;
          
        case 'play':
          const trackIdx = parseInt(arg);
          const currentAudio = document.getElementById('bg-audio');
          if (currentAudio) {
            if (trackIdx === 2) {
              currentAudio.src = 'audio/background-music2-Am_I_dreaming.mp3';
              currentAudio.load();
            } else {
              currentAudio.src = 'audio/background-music.mp3';
              currentAudio.load();
            }
            currentAudio.play()
              .then(() => {
                const playBtn = document.getElementById('music-btn');
                const iconM = document.getElementById('icon-muted');
                const iconP = document.getElementById('icon-playing');
                if (playBtn) playBtn.classList.add('playing');
                if (iconM) iconM.style.display = 'none';
                if (iconP) iconP.style.display = '';
                playing = true;
                printOutputLine(`Acoustics channel [\${trackIdx || 1}] streaming... Volume: 30%`, 'success');
              })
              .catch(err => {
                printOutputLine(`Audio playback error: \${err.message}`, 'error');
              });
          }
          break;
          
        case 'pause':
          const audioElem = document.getElementById('bg-audio');
          if (audioElem) {
            audioElem.pause();
            const playBtn = document.getElementById('music-btn');
            const iconM = document.getElementById('icon-muted');
            const iconP = document.getElementById('icon-playing');
            if (playBtn) playBtn.classList.remove('playing');
            if (iconM) iconM.style.display = '';
            if (iconP) iconP.style.display = 'none';
            playing = false;
            printOutputLine('Acoustics channel muted.', 'info');
          }
          break;
          
        default:
          printOutputLine(`command not found: \DoubleQuoteSymbol\${cmd}\DoubleQuoteSymbol. Type 'help' for available manual registers.`, 'error');
      }
    }

    function getThemeColor() {
      const overlay = document.getElementById('terminal-overlay');
      if (overlay) {
        if (overlay.classList.contains('theme-matrix')) return '#39ff14';
        if (overlay.classList.contains('theme-cyberpunk')) return '#ff0055';
        if (overlay.classList.contains('theme-amber')) return '#ffcc00';
        if (overlay.classList.contains('theme-steel')) return '#7dcfff';
        if (overlay.classList.contains('theme-hack')) return '#00ff66';
      }
      return '#00f0ff'; // default cyan
    }

    // ── THEME SELECT DROP-DOWN ACTION ──
    const themeSelect = document.getElementById('terminal-theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        changeTheme(e.target.value);
      });
    }
    
    // ── FLOATING TRIGGER CLICK ──
    const floatingTrigger = document.getElementById('floating-term-trigger');
    if (floatingTrigger) {
      floatingTrigger.addEventListener('click', () => {
        const term = document.getElementById('terminal-overlay');
        if (term) {
          if (term.classList.contains('open')) {
            closeTerminal();
          } else {
            openTerminal();
          }
        }
      });
    }
    
    // ── BACKTICK GLOBAL KEY BINDING ──
    document.addEventListener('keydown', (e) => {
      if (e.key === '`') {
        e.preventDefault();
        const term = document.getElementById('terminal-overlay');
        if (term) {
          if (term.classList.contains('open')) {
            closeTerminal();
          } else {
            openTerminal();
          }
        }
      }
    });

    // ── BOTTOM PROMPT GLOBAL SHELL INPUT ──
    const cmdInput = document.getElementById('cmd-input');
    const routes = {
      'cd about': '#about', 'cd ./about': '#about',
      'cat research': '#research', './research.sh': '#research', 'cd research': '#research', 'cat ./research': '#research',
      'ls projects': '#projects', 'cd projects': '#projects', 'ls ./projects': '#projects',
      './skills.sh': '#skills', 'cd skills': '#skills',
      'ping contact': '#contact', 'cd contact': '#contact'
    };

    // ── CLI INPUT EVENT LISTENERS ──
    const termInput = document.getElementById('terminal-input');
    const termHint = document.getElementById('autocomplete-hint');
    
    if (cmdInput) {
      cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = cmdInput.value.trim();
          if (!val) return;
          const lowerVal = val.toLowerCase();
          
          if (routes[lowerVal]) {
            const t = document.querySelector(routes[lowerVal]);
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            cmdInput.value = '';
            return;
          }
          
          if (lowerVal === 'clear' || lowerVal === 'cls') {
            cmdInput.value = '';
            return;
          }
          
          // Terminal redirection!
          const overlay = document.getElementById('terminal-overlay');
          if (overlay) {
            if (lowerVal === 'terminal' || lowerVal === 'open' || lowerVal === 'open terminal' || ALL_CMDS.includes(lowerVal.split(' ')[0])) {
              openTerminal();
              cmdInput.value = '';
              if (lowerVal !== 'terminal' && lowerVal !== 'open' && lowerVal !== 'open terminal') {
                if (termInput) {
                  termInput.value = val;
                  executeCommand(val);
                }
              }
            } else {
              cmdInput.value = 'command not found: ' + val;
              setTimeout(() => cmdInput.value = '', 1500);
            }
          }
        }
      });
    }

    if (termInput && termHint) {
      // Auto-align hint position on input focus
      termInput.addEventListener('focus', () => {
        termHint.style.left = termInput.offsetLeft + 'px';
      });
      
      // Auto autocomplete display as the user types
      termInput.addEventListener('input', () => {
        const val = termInput.value;
        let suggestionText = '';
        if (val.trim()) {
          const parts = val.split(' ');
          if (parts.length === 1) {
            const match = ALL_CMDS.find(c => c.startsWith(val.toLowerCase()));
            if (match && match !== val.toLowerCase()) {
              suggestionText = match.slice(val.length);
            }
          } else if (parts.length === 2) {
            const cmd = parts[0].toLowerCase();
            const arg = parts[1].toLowerCase();
            let pool = [];
            if (cmd === 'cd') pool = ['about', 'research', 'projects', 'skills', 'contact'];
            else if (cmd === 'cat') pool = ALL_FILES;
            else if (cmd === 'cad') pool = ['quadcopter', 'wing', 'off'];
            else if (cmd === 'theme') pool = ['cyberpunk', 'matrix', 'amber', 'steel', 'hack', 'default'];
            
            const match = pool.find(item => item.startsWith(arg));
            if (match && match !== arg) {
              suggestionText = match.slice(arg.length);
            }
          }
        }
        termHint.textContent = suggestionText ? val + suggestionText : '';
        termHint.style.left = termInput.offsetLeft + 'px';
      });
      
      termInput.addEventListener('keydown', (e) => {
        // Tab Autocomplete
        if (e.key === 'Tab') {
          e.preventDefault();
          if (termHint.textContent) {
            termInput.value = termHint.textContent;
            termHint.textContent = '';
          }
        }
        
        // Command History UP
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (cmdHistory.length > 0) {
            if (historyIndex === -1) {
              currentSavedInput = termInput.value;
            }
            historyIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
            termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
            termHint.textContent = '';
          }
        }
        
        // Command History DOWN
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex >= 0) {
            historyIndex--;
            if (historyIndex === -1) {
              termInput.value = currentSavedInput;
            } else {
              termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
            }
            termHint.textContent = '';
          }
        }
        
        // Command Execution
        if (e.key === 'Enter') {
          const val = termInput.value;
          if (val.trim()) {
            cmdHistory.push(val);
            historyIndex = -1;
            executeCommand(val);
          }
          termInput.value = '';
          termHint.textContent = '';
        }
      });
    }

    // Auto-focus shell if typing globally
    document.addEventListener('keydown', (e) => {
      // If terminal overlay is open, do not redirect focus
      const term = document.getElementById('terminal-overlay');
      if (term && term.classList.contains('open')) return;
      
      // If modal is open, do not redirect focus
      const modal = document.getElementById('proj-modal');
      if (modal && modal.classList.contains('open')) return;
      
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (document.activeElement !== cmdInput && document.activeElement !== termInput) {
          if (cmdInput) cmdInput.focus();
        }
      }
    });

    // ── TELEMETRY & VIEWPORT OSCILLOSCOPE LOOP ──
    const canvas = document.getElementById('telemetry-chart');
    let canvasTime = 0;
    
    if (canvas) {
      const canvasCtx = canvas.getContext('2d');
      // Set canvas render resolution to parent bounds
      function resizeCanvas() {
        if (canvas.parentElement) {
          canvas.width = canvas.parentElement.clientWidth || 300;
          canvas.height = canvas.parentElement.clientHeight || 90;
        }
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Start dynamic loop
      function runTelemetryLoop() {
        requestAnimationFrame(runTelemetryLoop);
        
        // Interpolate telemetry stats for smooth animations
        currentThrottle += (targetThrottle - currentThrottle) * 0.05;
        currentRPM += (targetRPM - currentRPM) * 0.05;
        currentTemp += (targetTemp - currentTemp) * 0.02;
        
        waveSpeed += (targetWaveSpeed - waveSpeed) * 0.05;
        waveAmplitude += (targetWaveAmplitude - waveAmplitude) * 0.05;
        
        currentPitch += (targetPitch - currentPitch) * 0.08;
        currentRoll += (targetRoll - currentRoll) * 0.08;
        
        // Render values to DOM
        const rpmElem = document.getElementById('tel-val-rpm');
        const tempElem = document.getElementById('tel-val-temp');
        const pitchElem = document.getElementById('tel-val-pitch');
        const rollElem = document.getElementById('tel-val-roll');
        
        if (rpmElem) rpmElem.textContent = Math.round(currentRPM);
        if (tempElem) tempElem.textContent = currentTemp.toFixed(1);
        
        // Add flying noise jitter to pitch/roll
        let jitterPitch = currentPitch;
        let jitterRoll = currentRoll;
        if (activeCADModule !== 'none') {
          jitterPitch += Math.sin(Date.now() * 0.005) * 1.4;
          jitterRoll += Math.cos(Date.now() * 0.006) * 1.2;
        }
        if (pitchElem) pitchElem.textContent = jitterPitch.toFixed(1);
        if (rollElem) rollElem.textContent = jitterRoll.toFixed(1);
        
        // Update Coordinates
        const hudX = document.getElementById('hud-val-x');
        const hudY = document.getElementById('hud-val-y');
        const hudZ = document.getElementById('hud-val-z');
        const hudFPS = document.getElementById('hud-val-fps');
        
        if (activeCADModule !== 'none') {
          if (hudX) hudX.textContent = (Math.sin(Date.now() * 0.001) * 8 + currentRoll * 0.15).toFixed(2);
          if (hudY) hudY.textContent = (Math.cos(Date.now() * 0.0012) * 8 + currentPitch * 0.15).toFixed(2);
          if (hudZ) hudZ.textContent = (currentThrottle * 0.45 + Math.sin(Date.now() * 0.003) * 0.3).toFixed(2);
        } else {
          if (hudX) hudX.textContent = '0.00';
          if (hudY) hudY.textContent = '0.00';
          if (hudZ) hudZ.textContent = '0.00';
        }
        
        if (hudFPS) {
          hudFPS.textContent = (Math.random() > 0.9 ? (58 + Math.floor(Math.random() * 4)) : 60) + ' FPS';
        }
        
        // Draw Oscilloscope Signal
        if (canvasCtx) {
          canvasCtx.fillStyle = 'rgba(5, 10, 20, 0.28)'; // persistent tail trail
          canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
          
          const themeColor = getThemeColor();
          
          // Draw grid layout
          canvasCtx.strokeStyle = themeColor + '10'; // 10% opacity
          canvasCtx.lineWidth = 1;
          const gridWidth = 24;
          for (let x = 0; x < canvas.width; x += gridWidth) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(x, 0);
            canvasCtx.lineTo(x, canvas.height);
            canvasCtx.stroke();
          }
          for (let y = 0; y < canvas.height; y += gridWidth) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, y);
            canvasCtx.lineTo(canvas.width, y);
            canvasCtx.stroke();
          }
          
          // Center axis
          canvasCtx.strokeStyle = themeColor + '1b';
          canvasCtx.beginPath();
          canvasCtx.moveTo(0, canvas.height / 2);
          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
          
          // Draw wave signal
          canvasCtx.strokeStyle = themeColor;
          canvasCtx.lineWidth = 2;
          canvasCtx.shadowColor = themeColor;
          canvasCtx.shadowBlur = 4;
          canvasCtx.beginPath();
          
          canvasTime += waveSpeed;
          for (let x = 0; x < canvas.width; x++) {
            const noise = (Math.random() - 0.5) * (currentThrottle * 0.14);
            const y = canvas.height / 2 + 
                      Math.sin(x * 0.022 + canvasTime) * waveAmplitude + 
                      Math.cos(x * 0.052 - canvasTime * 1.3) * (waveAmplitude * 0.3) + 
                      noise;
            if (x === 0) canvasCtx.moveTo(x, y);
            else canvasCtx.lineTo(x, y);
          }
          canvasCtx.stroke();
          canvasCtx.shadowBlur = 0; // reset
        }
      }
      
      // Start loop
      runTelemetryLoop();
    }
  