import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
    <div className="nav-inner">
      <a href="#" className="nav-logo"><span className="brace">&lt;</span>PSB<span className="brace">/&gt;</span></a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#featured">Featured</a>
        <a href="#research">Research</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="https://drive.google.com/file/d/1LAI1kfhdqLb9dbIbFyj0eLZaw3rWrrI8/view?usp=sharing" target="_blank" rel="noopener">Resume</a>
        <a href="#" className="nav-term-btn" onClick={(e) => { e.preventDefault(); window.openTerminalWidget(); }} title="Launch Interactive Shell (or press `)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ verticalAlign: "middle", marginRight: "4px", display: "inline-block" }}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>Shell</a>
        <a href="#contact" className="nav-cta">Get in Touch</a>
      </div>
      <button className="nav-hamburger" id="hamburger" aria-label="Menu" onClick={(e) => { document.getElementById('nav-mobile').classList.toggle('open') }}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="3" y1="7" x2="19" y2="7" />
          <line x1="3" y1="12" x2="19" y2="12" />
          <line x1="3" y1="17" x2="19" y2="17" />
        </svg>
      </button>
    </div>
    <div className="nav-mobile" id="nav-mobile">
      <a href="#about" onClick={(e) => { window.closeMobile() }}>About</a>
      <a href="#featured" onClick={(e) => { window.closeMobile() }}>Featured</a>
      <a href="#research" onClick={(e) => { window.closeMobile() }}>Research</a>
      <a href="#projects" onClick={(e) => { window.closeMobile() }}>Projects</a>
      <a href="#skills" onClick={(e) => { window.closeMobile() }}>Skills</a>
      <a href="https://drive.google.com/file/d/1LAI1kfhdqLb9dbIbFyj0eLZaw3rWrrI8/view?usp=sharing" target="_blank" rel="noopener" onClick={(e) => { window.closeMobile() }}>Resume</a>
      <a href="#" onClick={(e) => { e.preventDefault(); window.closeMobile(); window.openTerminalWidget(); }}>Shell Console</a>
      <a href="#contact" onClick={(e) => { window.closeMobile() }}>Contact</a>
    </div>
  </nav>
    </>
  );
};

export default Navbar;
