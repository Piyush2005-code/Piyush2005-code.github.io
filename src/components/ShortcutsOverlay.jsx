import React from 'react';

const ShortcutsOverlay = () => {
  return (
    <div className="shortcuts-overlay" id="shortcuts-overlay" role="dialog" aria-label="Keyboard shortcuts" aria-hidden="true">
      <div className="shortcuts-panel">
        <div className="shortcuts-header">// keyboard shortcuts</div>
        <ul className="shortcuts-list">
          <li><span>Open shell console</span><kbd>`</kbd></li>
          <li><span>Show this menu</span><kbd>?</kbd></li>

          <li><span>Jump to About</span><kbd>1</kbd></li>
          <li><span>Jump to Research</span><kbd>2</kbd></li>
          <li><span>Jump to Projects</span><kbd>3</kbd></li>
          <li><span>Jump to Skills</span><kbd>4</kbd></li>
          <li><span>Jump to Contact</span><kbd>5</kbd></li>
          <li><span>Close overlay / modal</span><kbd>Esc</kbd></li>
        </ul>
        <button className="shortcuts-close" id="shortcuts-close" type="button">Close (Esc)</button>
      </div>
    </div>
  );
};

export default ShortcutsOverlay;
