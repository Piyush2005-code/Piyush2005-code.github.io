import React from 'react';

const Projects = () => {
  return (
    <>
      <section id="projects">
    <div className="section-max">
      <div className="section-head reveal">
        <span className="section-comment-header">/* 03. execution_flow */</span>
        <div className="section-label">Featured Work</div>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="proj-grid">
        <div className="proj-card reveal" onClick={(e) => { window.openModal(0) }}>
          <div className="proj-card-img"><img src="/Embedded_Hardware.avif" alt="ARM64"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">2025–Ongoing · Embedded Systems / OS · [git:main]</div>
            <h3 className="proj-card-title">ARM64 Unikernel for ML Inference</h3>
            <p className="proj-card-desc">Bare-metal ARM64 unikernel (&lt;256KB) for deterministic ML inference with custom
              ONNX runtime and NEON SIMD kernels achieving ~269µs latency.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".1s" }} onClick={(e) => { window.openModal(2) }}>
          <div className="proj-card-img"><img src="/os-scheduler.png" alt="OS Scheduler"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">2025 · Systems Programming · [git:stable]</div>
            <h3 className="proj-card-title">OS Scheduling Algorithm Simulator</h3>
            <p className="proj-card-desc">Classical OS scheduling algorithms with interactive UI, real-time Gantt charts,
              and cross-platform Electron desktop app.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".15s" }} onClick={(e) => { window.openModal(3) }}>
          <div className="proj-card-img"><img src="/jarvis-interface.png" alt="JARVIS"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">2025 · AI/ML Project · [git:main]</div>
            <h3 className="proj-card-title">JARVIS Voice Assistant</h3>
            <p className="proj-card-desc">Real-time voice assistant with sub-second GPU-accelerated inference on NVIDIA
              A5000, RAG-based context, and 500+ concurrent user support.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".05s" }} onClick={(e) => { window.openModal(1) }}>
          <div className="proj-card-img"><img src="/CounselAI.png" alt="Counsel.AI"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">2026 · DL / LLMs / Backend · [git:prod]</div>
            <h3 className="proj-card-title">Counsel.ai — Student Advisory</h3>
            <p className="proj-card-desc">AI-driven platform for college counselling using adaptive conversational guidance and NCDM trait estimation.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".1s" }} onClick={(e) => { window.openModal(8) }}>
          <div className="proj-card-img"><img src="/detext1.jpeg" alt="Detext Benchmark"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">Machine Learning · [git:benchmark]</div>
            <h3 className="proj-card-title">WiLI-2018 Language Identification</h3>
            <p className="proj-card-desc">Benchmarking a suite of language identification models on the WiLI-2018 dataset across 235 languages, evaluating classical ML and neural architectures.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".2s" }} onClick={(e) => { window.openModal(4) }}>
          <div className="proj-card-img"><img src="/llm-chart-generator.png" alt="LLM Charts"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">2025 · Deep Learning · [git:main]</div>
            <h3 className="proj-card-title">LLM-Based Chart Generation</h3>
            <p className="proj-card-desc">Automated chart generation from uploaded PDFs using LLMs and semantic NLP
              extraction with real-time visualization rendering.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".25s" }} onClick={(e) => { window.openModal(5) }}>
          <div className="proj-card-img"><img src="/Farm_top_image.jpg" alt="Crop Detection"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">2025 · Computer Vision · [git:dev]</div>
            <h3 className="proj-card-title">Crop Stress Detection — U-Net</h3>
            <p className="proj-card-desc">Pixel-wise semantic segmentation of stressed crops from aerial imagery using a
              7.7M-param U-Net with real-time video inference.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".3s" }} onClick={(e) => { window.openModal(6) }}>
          <div className="proj-card-img"><img src="/Wing_Side_view.jpeg" alt="Wing Design"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">Inter IIT Tech Meet 14.0 · Aeronautics · [release:v1.0]</div>
            <h3 className="proj-card-title">Fixed-Wing STOL Wing Design</h3>
            <p className="proj-card-desc">High-lift wing configuration achieving CL = 8.1258 with full CAD assembly and CFD
              validation using ANSYS Fluent.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
        <div className="proj-card reveal" style={{ transitionDelay: ".35s" }} onClick={(e) => { window.openModal(7) }}>
          <div className="proj-card-img"><img src="/quadcopter-isometric.png" alt="Quadcopter"
              onerror="this.style.display='none'" />
            <div className="proj-card-img-ov"></div>
          </div>
          <div className="proj-card-body">
            <div className="card-hacker-perm">-rwxr-xr-x</div>
            <div className="proj-card-meta">Personal Project · Robotics · [git:cad]</div>
            <h3 className="proj-card-title">Quadcopter CAD Design</h3>
            <p className="proj-card-desc">Custom quadcopter with full CAD modeling, structural analysis, and modular
              component design optimized for autonomous flight.</p>
            <div className="proj-card-hint">View Details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg></div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default Projects;
