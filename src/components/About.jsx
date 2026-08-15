import React from 'react';

const About = () => {
  return (
    <>
      <section id="about">
    <div className="section-max">
      <div className="about-grid">
        <button className="about-flashcard reveal" id="about-flashcard" type="button" aria-expanded="false">
          <span className="about-flashcard-inner">
            <span className="about-card-face about-card-front">
              <span className="portrait-wrap">
                <span className="portrait-corner tl"></span>
                <span className="portrait-corner tr"></span>
                <span className="portrait-corner bl"></span>
                <span className="portrait-corner br"></span>
                <span className="portrait-frame">
                  <img src="/Portrait.png" alt="Piyush Singh Bhati"
                    onError={(e) => { e.target.style.minHeight='400px'; e.target.style.background='var(--card2)'; }} />
                  <span className="portrait-chip">
                    <span className="portrait-chip-tag">// Computer Science & Systems</span>
                    <span className="portrait-chip-text">A CS undergraduate who builds things from the ground up.</span>
                    <span className="about-front-hint">Click photo to read about me</span>
                  </span>
                </span>
              </span>
            </span>

            <span className="about-card-face about-card-back">
              <span className="section-label">About Me</span>
              <span className="section-title" style={{ marginBottom: "1.5rem" }}>Built on <span className="grad">Computer Science</span></span>
              <span className="about-text">
                <span>I'm a <span className="hl">Computer Science</span> undergrad at <span className="accent">IIT Jodhpur</span>. I'm drawn to the parts of computing most people take for granted — how an OS schedules work, how a program becomes machine code, why one algorithm beats another by an order of magnitude.</span>
                <span>I build <span className="hl">systems software</span> — bare-metal kernels, runtimes, backend services. The problems I find most satisfying are the ones that require thinking carefully about <span className="hl">correctness and performance</span> at the same time.</span>
                <span>I've also done research in <span className="accent">ML systems</span> and <span className="hl">scientific computing</span>, and spent time studying <span className="hl">GPU architecture</span> and building distributed inference infrastructure.</span>
                <span>On the side, <span className="hl">robotics</span> and <span className="hl">mechanical design</span> are where I take the software instincts into the physical world.</span>
              </span>
              <span className="about-tags">
                <span className="about-tag">--algorithms</span>
                <span className="about-tag">--operating-systems</span>
                <span className="about-tag">--systems-software</span>
                <span className="about-tag">--backend-engineering</span>
                <span className="about-tag">--computer-architecture</span>
                <span className="about-tag">--robotics</span>
              </span>
            </span>
          </span>
        </button>
        <div className="about-teaser reveal" style={{ transitionDelay: ".1s" }}>
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Built on <span className="grad">Computer Science</span></h2>
          <p className="about-teaser-text">CS undergrad at IIT Jodhpur. I like understanding how things actually work — operating systems, compilers, hardware. I've also done research in ML systems, GPU architecture, and scientific computing.</p>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default About;
