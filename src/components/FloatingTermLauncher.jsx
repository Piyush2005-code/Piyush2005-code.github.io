import React from 'react';

const FloatingTermLauncher = () => {
  return (
    <>
      <button className="floating-term-launcher" aria-label="Open Command Line Interface" onClick={(e) => { window.openTerminalWidget() }} title="Open Terminal">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  </button>
    </>
  );
};

export default FloatingTermLauncher;
