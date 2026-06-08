import React from 'react';

const Skills = () => {
  return (
    <>
      <section id="skills">
    <div className="section-max">
      <div className="section-head reveal">
        <span className="section-comment-header">// thread_id: 0x7FFF0042 (active)</span>
        <div className="section-label">Technical Expertise</div>
        <h2 className="section-title">Skills & <span className="grad">Technologies</span></h2>
      </div>

      <div className="skills-grid">
        <div className="skill-card reveal">
          <div className="card-hacker-perm">-rw-r--r--</div>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="skill-title">Programming</div>
          <div className="skill-pills">
            <span className="skill-pill">C</span><span className="skill-pill">C++</span><span
              className="skill-pill">Python</span><span className="skill-pill">TypeScript</span><span
              className="skill-pill">React</span>
          </div>
        </div>
        <div className="skill-card reveal" style={{ transitionDelay: ".06s" }}>
          <div className="card-hacker-perm">-rw-r--r--</div>
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
        <div className="skill-card reveal" style={{ transitionDelay: ".12s" }}>
          <div className="card-hacker-perm">-rw-r--r--</div>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
          </div>
          <div className="skill-title">Machine Learning</div>
          <div className="skill-pills">
            <span className="skill-pill">Deep Learning</span><span className="skill-pill">ANNs</span><span
              className="skill-pill">CNNs (YOLO, U-Net)</span><span className="skill-pill">Seq-to-Seq Models</span>
          </div>
        </div>
        <div className="skill-card reveal" style={{ transitionDelay: ".18s" }}>
          <div className="card-hacker-perm">-rw-r--r--</div>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3" />
              <path
                d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <div className="skill-title">Systems</div>
          <div className="skill-pills">
            <span className="skill-pill">Operating Systems</span><span className="skill-pill">Scheduling Algorithms</span><span
              className="skill-pill">Real-Time Systems</span>
          </div>
        </div>
        <div className="skill-card reveal" style={{ transitionDelay: ".24s" }}>
          <div className="card-hacker-perm">-rw-r--r--</div>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div className="skill-title">Tools & DevOps</div>
          <div className="skill-pills">
            <span className="skill-pill">Docker</span><span className="skill-pill">Kubernetes</span><span
              className="skill-pill">Git</span><span className="skill-pill">GitHub</span><span className="skill-pill">VS Code</span>
          </div>
        </div>
        <div className="skill-card reveal" style={{ transitionDelay: ".3s" }}>
          <div className="card-hacker-perm">-rw-r--r--</div>
          <div className="skill-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="skill-title">AI & LLMs</div>
          <div className="skill-pills">
            <span className="skill-pill">vLLM</span><span className="skill-pill">RAG</span><span
              className="skill-pill">LangChain</span><span className="skill-pill">GPU Inference</span><span
              className="skill-pill">Agentic AI</span>
          </div>
        </div>
      </div>

      <div className="coursework reveal">
        <div className="coursework-title">Academic Foundation — Relevant Coursework</div>
        <div className="coursework-pills">
          <span className="coursework-pill">Data Structures & Algorithms</span>
          <span className="coursework-pill">Linear Algebra & O.D.E</span>
          <span className="coursework-pill">Probability & Stochastic Processes</span>
          <span className="coursework-pill">Introduction to Computer Science</span>
          <span className="coursework-pill">Software Engineering</span>
          <span className="coursework-pill">Pattern Recognition and Machine Learning</span>
        </div>
      </div>

    </div>
  </section>
    </>
  );
};

export default Skills;
