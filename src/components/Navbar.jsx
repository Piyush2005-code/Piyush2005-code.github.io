import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Anchor scroll helper — works whether we're on / or /blog
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// On the portfolio page use smooth scroll; from blog navigate home first
function PortfolioLink({ id, children, onClick }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    if (isHome) {
      scrollTo(id);
    } else {
      // Navigate home, then scroll after a tick
      window.location.hash = '/';
      setTimeout(() => scrollTo(id), 100);
    }
  };
  return <a href={`#${id}`} onClick={handleClick}>{children}</a>;
}

const Navbar = () => {
  return (
    <>
      <nav id="navbar">
    <div className="nav-inner">
      <Link to="/" className="nav-logo"><span className="brace">&lt;</span>PSB<span className="brace">/&gt;</span></Link>
      <div className="nav-links">
        <PortfolioLink id="about">About</PortfolioLink>
        <PortfolioLink id="research">Research</PortfolioLink>
        <PortfolioLink id="projects">Projects</PortfolioLink>
        <PortfolioLink id="skills">Skills</PortfolioLink>
        <Link to="/blog">Writing</Link>
        <a href="https://drive.google.com/file/d/1LAI1kfhdqLb9dbIbFyj0eLZaw3rWrrI8/view?usp=sharing" target="_blank" rel="noopener">Resume</a>
        <a href="#" className="nav-term-btn" onClick={(e) => { e.preventDefault(); window.openTerminalWidget && window.openTerminalWidget(); }} title="Launch Interactive Shell (or press `)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ verticalAlign: "middle", marginRight: "4px", display: "inline-block" }}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>Shell</a>
        <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Get in Touch</a>
      </div>
      <button className="nav-hamburger" id="hamburger" aria-label="Menu" onClick={() => { document.getElementById('nav-mobile').classList.toggle('open') }}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="3" y1="7" x2="19" y2="7" />
          <line x1="3" y1="12" x2="19" y2="12" />
          <line x1="3" y1="17" x2="19" y2="17" />
        </svg>
      </button>
    </div>
    <div className="nav-mobile" id="nav-mobile">
      <PortfolioLink id="about" onClick={() => window.closeMobile && window.closeMobile()}>About</PortfolioLink>
      <PortfolioLink id="research" onClick={() => window.closeMobile && window.closeMobile()}>Research</PortfolioLink>
      <PortfolioLink id="projects" onClick={() => window.closeMobile && window.closeMobile()}>Projects</PortfolioLink>
      <PortfolioLink id="skills" onClick={() => window.closeMobile && window.closeMobile()}>Skills</PortfolioLink>
      <Link to="/blog" onClick={() => window.closeMobile && window.closeMobile()}>Writing</Link>
      <a href="https://drive.google.com/file/d/1LAI1kfhdqLb9dbIbFyj0eLZaw3rWrrI8/view?usp=sharing" target="_blank" rel="noopener" onClick={() => window.closeMobile && window.closeMobile()}>Resume</a>
      <a href="#" onClick={(e) => { e.preventDefault(); window.closeMobile && window.closeMobile(); window.openTerminalWidget && window.openTerminalWidget(); }}>Shell Console</a>
      <PortfolioLink id="contact" onClick={() => window.closeMobile && window.closeMobile()}>Contact</PortfolioLink>
    </div>
  </nav>
    </>
  );
};

export default Navbar;
