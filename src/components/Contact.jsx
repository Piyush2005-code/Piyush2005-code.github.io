import React from 'react';

const copyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const Contact = () => {
  return (
    <>
      <section id="contact">
    <div className="section-max">
      <div className="contact-grid">
        <div className="reveal">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>Let's Build <span className="grad">Something
              Together</span></h2>
          <p className="contact-intro">Interested in collaborating on robotics, autonomous systems, or AI projects? I'm
            always open to discussing new opportunities, research, and ideas.</p>
          <div className="contact-cards">
            <a href="mailto:piyush.bhati680@gmail.com" className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="contact-card-label">Email</div>
                <div className="contact-card-val">piyush.bhati680@gmail.com</div>
              </div>
              <button type="button" className="contact-copy-btn" data-copy="piyush.bhati680@gmail.com" aria-label="Copy email">{copyIcon}</button>
            </a>
            <a href="https://github.com/Piyush2005-code" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <div className="contact-card-label">GitHub</div>
                <div className="contact-card-val">Piyush2005-code</div>
              </div>
              <button type="button" className="contact-copy-btn" data-copy="https://github.com/Piyush2005-code" aria-label="Copy GitHub URL">{copyIcon}</button>
            </a>
            <a href="https://linkedin.com/in/piyush-singh-bhati-5a074929a" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="contact-card-label">LinkedIn</div>
                <div className="contact-card-val">piyush-singh-bhati</div>
              </div>
              <button type="button" className="contact-copy-btn" data-copy="https://linkedin.com/in/piyush-singh-bhati-5a074929a" aria-label="Copy LinkedIn URL">{copyIcon}</button>
            </a>
            <div className="contact-card" style={{ cursor: "default" }}>
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact-card-label">Location</div>
                <div className="contact-card-val">IIT Jodhpur, Rajasthan, India</div>
              </div>
              <button type="button" className="contact-copy-btn" data-copy="IIT Jodhpur, Rajasthan, India" aria-label="Copy location">{copyIcon}</button>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: ".12s" }}>
          <div className="contact-cta-box">
            <div className="cta-orb">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="contact-cta-title">Ready to Collaborate?</div>
            <p className="contact-cta-desc">Whether it's a research project, internship opportunity, or just a tech
              discussion — I'd love to hear from you.</p>
            <a href="mailto:piyush.bhati680@gmail.com?subject=Portfolio Inquiry" className="btn-primary"
              style={{ display: "inline-block" }}>Send Email</a>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
};

export default Contact;
