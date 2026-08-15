import React from 'react';
import GithubChart from './GithubChart';

const Skills = () => {
  return (
    <>
      <section id="skills">
    <div className="section-max">
      <div className="section-head reveal">
        <div className="section-label">Technical Expertise</div>
        <h2 className="section-title">Skills & <span className="grad">Technologies</span></h2>
      </div>

      <div className="skills-grid">
        {/* 1. Core CS — first, most prominent */}
        <div className="skill-card reveal">
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div className="skill-title">Systems & OS</div>
          <div className="skill-pills">
            <span className="skill-pill">C / C++</span><span className="skill-pill">Operating Systems</span><span
              className="skill-pill">Memory Management</span><span className="skill-pill">Scheduling</span><span
              className="skill-pill">ARM64 Assembly</span><span className="skill-pill">QEMU / Bare-metal</span>
          </div>
        </div>

        {/* 2. Programming & Algorithms */}
        <div className="skill-card reveal" style={{ transitionDelay: '.06s' }}>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="skill-title">Programming & Algorithms</div>
          <div className="skill-pills">
            <span className="skill-pill">Data Structures</span><span className="skill-pill">Algorithm Design</span><span
              className="skill-pill">Python</span><span className="skill-pill">TypeScript</span><span
              className="skill-pill">React</span>
          </div>
        </div>

        {/* 3. Backend & Infrastructure */}
        <div className="skill-card reveal" style={{ transitionDelay: '.12s' }}>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12H19M12 5l7 7-7 7" />
            </svg>
          </div>
          <div className="skill-title">Backend & Infrastructure</div>
          <div className="skill-pills">
            <span className="skill-pill">Docker</span><span className="skill-pill">Kubernetes</span><span
              className="skill-pill">FastAPI</span><span className="skill-pill">PostgreSQL</span><span
              className="skill-pill">Distributed Systems</span>
          </div>
        </div>

        {/* 4. Computer Architecture */}
        <div className="skill-card reveal" style={{ transitionDelay: '.18s' }}>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <div className="skill-title">Computer Architecture</div>
          <div className="skill-pills">
            <span className="skill-pill">NVIDIA Hopper</span><span className="skill-pill">NEON SIMD</span><span
              className="skill-pill">Memory Hierarchy</span><span className="skill-pill">Kernel Fusion</span><span
              className="skill-pill">Hardware-Software Co-design</span>
          </div>
        </div>

        {/* 5. Robotics & Simulation — hobbyist framing */}
        <div className="skill-card reveal" style={{ transitionDelay: '.24s' }}>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <div className="skill-title">Robotics & Simulation</div>
          <div className="skill-pills">
            <span className="skill-pill">Multi-rotor Dynamics</span><span className="skill-pill">CFD Simulations</span><span
              className="skill-pill">CAD Modeling</span><span className="skill-pill">ANSYS Fluent</span><span
              className="skill-pill">Electronics</span>
          </div>
        </div>

        {/* 6. ML Infrastructure — applied, last */}
        <div className="skill-card reveal" style={{ transitionDelay: '.30s' }}>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="skill-title">ML Infrastructure</div>
          <div className="skill-pills">
            <span className="skill-pill">ONNX Runtime</span><span className="skill-pill">vLLM</span><span
              className="skill-pill">PyTorch / CUDA</span><span className="skill-pill">RAG Pipelines</span><span
              className="skill-pill">GPU Inference</span>
          </div>
        </div>
      </div>

      <div className="coursework reveal">
        <div className="coursework-title">Academic Foundation — Relevant Coursework</div>
        <div className="coursework-pills">
          <span className="coursework-pill">Design & Analysis of Algorithms</span>
          <span className="coursework-pill">Data Structures & Algorithms</span>
          <span className="coursework-pill">Operating Systems</span>
          <span className="coursework-pill">Computer Architecture</span>
          <span className="coursework-pill">Database Management Systems</span>
          <span className="coursework-pill">Principles of Programming Languages</span>
          <span className="coursework-pill">Software Engineering</span>
          <span className="coursework-pill">Linear Algebra & O.D.E</span>
          <span className="coursework-pill">Probability & Stochastic Processes</span>
          <span className="coursework-pill">Pattern Recognition & Machine Learning</span>
        </div>
      </div>

      <div className="github-activity reveal" style={{ marginTop: '2.5rem' }}>
        <div className="gh-section-header">
          <div className="section-label">Open Source Activity</div>
          <h3 className="gh-section-title">Contribution <span className="grad">History</span></h3>
        </div>
        <GithubChart />
      </div>

    </div>
  </section>
    </>
  );
};

export default Skills;
