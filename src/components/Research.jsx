import React from 'react';

const Research = () => {
  return (
    <>
      <section id="research">
    <div className="section-max">
      <div className="section-head reveal">
        <span className="section-comment-header">// module: research.c (kernel_space)</span>
        <div className="section-label">Academic Work</div>
        <h2 className="section-title">Research <span className="grad">Experience</span></h2>
      </div>
      <div className="research-grid">
        <div className="research-card reveal">
          <div className="card-hacker-perm">drwxr-xr-x</div>
          <div className="rc-inst">IIT Jodhpur</div>
          <div className="rc-title">AI Systems Research</div>
          <div className="rc-advisor">Advisor: Prof. Sidharth Sharma</div>
          <div className="rc-desc">Working on AI systems and GPU architecture, focusing on system-level optimization for
            machine learning workloads and studying the NVIDIA Hopper architecture.</div>
          <div className="rc-tags">
            <span className="rc-tag">AI Systems</span>
            <span className="rc-tag">GPU Architecture</span>
            <span className="rc-tag">ML Optimization</span>
            <span className="rc-tag">NVIDIA Hopper</span>
          </div>
        </div>
        <div className="research-card reveal" style={{ transitionDelay: ".12s" }}>
          <div className="card-hacker-perm">drwxr-xr-x</div>
          <div className="rc-inst">IIT Jodhpur</div>
          <div className="rc-title">Scientific Machine Learning Research</div>
          <div className="rc-advisor">Advisor: Prof. Harshal D. Akolekar</div>
          <div className="rc-desc">Working on Physics-Informed Neural Networks and CFD surrogate modeling for scientific
            computing applications.</div>
          <div className="rc-tags">
            <span className="rc-tag">PINNs</span>
            <span className="rc-tag">Scientific Computing</span>
            <span className="rc-tag">CFD Surrogate Modeling</span>
            <span className="rc-tag">Deep Learning</span>
          </div>
      </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default Research;
