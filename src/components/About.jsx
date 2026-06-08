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
                    onerror="this.style.minHeight='400px';this.style.background='var(--card2)'" />
                  <span className="portrait-chip">
                    <span className="portrait-chip-tag">// AI Systems Engineering</span>
                    <span className="portrait-chip-text">A quick look at the systems-minded builder behind the portfolio.</span>
                    <span className="about-front-hint">Click photo to read about me</span>
                  </span>
                </span>
              </span>
            </span>

            <span className="about-card-face about-card-back">
              <span className="section-comment-header">// source: about.sh · status: verified</span>
              <span className="section-label">About Me</span>
              <span className="section-title" style={{ marginBottom: "1.5rem" }}>Engineering <span className="grad">AI Systems</span></span>
              <span className="about-text">
                <span>I am an undergraduate <span className="hl">Computer Science</span> student at <span className="accent">IIT
                    Jodhpur</span> focused on <span className="hl">AI systems</span>, operating systems, and computer
                  architecture.</span>
                <span>My work explores how modern AI workloads interact with hardware and system software. I build
                  infrastructure for machine learning — including <span className="hl">GPU-accelerated inference
                    pipelines</span>, <span className="hl">lightweight operating systems for ML workloads</span>, and <span
                    className="hl">distributed AI systems</span>.</span>
                <span>My interests include <span className="accent">ML systems</span>, <span className="hl">GPU architecture</span>,
                  <span className="hl">AI inference infrastructure</span>, and <span className="accent">operating system
                    design</span> for high-performance and low-power computing environments.
                </span>
                <span>I also have a keen passion for design and aesthetics expressed through <span className="hl">CAD
                    Modelling</span> in the domain of <span className="hl">Robotics</span>.</span>
              </span>
              <span className="about-tags">
                <span className="about-tag">--ai-systems</span>
                <span className="about-tag">--operating-systems</span>
                <span className="about-tag">--gpu-architecture</span>
                <span className="about-tag">--robotics</span>
                <span className="about-tag">--comp-architecture</span>
                <span className="about-tag">--embedded-systems</span>
              </span>
            </span>
          </span>
        </button>
        <div className="about-teaser reveal" style={{ transitionDelay: ".1s" }}>
          <span className="section-comment-header">// source: about.sh · status: verified</span>
          <div className="section-label">About Me</div>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Engineering <span className="grad">AI Systems</span></h2>
          <p className="about-teaser-text">A systems-focused CSE undergraduate at IIT Jodhpur building at the intersection
            of AI infrastructure, operating systems, hardware-aware ML, and robotics design.</p>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default About;
