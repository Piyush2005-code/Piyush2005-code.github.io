import React from 'react';

const Hero = () => {
  return (
    <>
      <section id="hero">
    <div className="hero-scanlines"></div>
    <div className="hero-video-wrap">
      <video autoplay loop muted playsInline>
        <source src="videos/quadcopter-demo.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="hero-orb-1"></div>
    <div className="hero-orb-2"></div>

    <div className="hero-content">
      <div className="hero-tag">Systems Engineer &nbsp;·&nbsp; IIT Jodhpur &nbsp;·&nbsp; CSE</div>

      <h1 className="hero-name">
        Piyush<br /><span className="highlight">Singh Bhati</span>
      </h1>

      <p className="hero-subtitle">
         Building the future at the intersection of<br />
        <strong>Artificial Intelligence</strong> &nbsp;×&nbsp; <strong>Computing Hardware</strong> &nbsp;×&nbsp;
        <strong>Autonomous Systems</strong>
      </p>

      <div className="hero-meta">
        <span className="hero-meta-dot"></span>
        <span>B.Tech CSE</span>
        <span style={{ color: "var(--border2)" }}>·</span>
        <span>IIT Jodhpur</span>
        <span style={{ color: "var(--border2)" }}>·</span>
        <span>AI Systems · OS · Robotics</span>
      </div>



      <div className="hero-socials">
        <a href="https://github.com/Piyush2005-code" target="_blank" rel="noopener" title="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <a href="https://linkedin.com/in/piyush-singh-bhati-5a074929a" target="_blank" rel="noopener" title="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="mailto:piyush.bhati680@gmail.com" title="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
      </div>

      <div className="hero-cta">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="https://drive.google.com/file/d/1LAI1kfhdqLb9dbIbFyj0eLZaw3rWrrI8/view?usp=sharing" target="_blank" rel="noopener" className="btn-secondary">Resume</a>
        <a href="#contact" className="btn-secondary">Contact Me</a>
      </div>
    </div>

    <div className="hero-side">
      <div className="hero-stat">
        <div className="hero-stat-num">7+</div>
        <div className="hero-stat-lbl">Projects</div>
      </div>
      <div className="hero-divider"></div>
      <div className="hero-stat">
        <div className="hero-stat-num">2</div>
        <div className="hero-stat-lbl">Research</div>
      </div>
      <div className="hero-divider"></div>
      <div className="hero-stat">
        <div className="hero-stat-num">IIT</div>
        <div className="hero-stat-lbl">Jodhpur</div>
      </div>
    </div>

    <div className="hero-scroll">
      <a href="#about">
        <div className="hero-scroll-line"></div>
        <span className="hero-scroll-txt">scroll</span>
      </a>
    </div>
  </section>
    </>
  );
};

export default Hero;
