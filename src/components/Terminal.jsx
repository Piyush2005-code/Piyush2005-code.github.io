import React from 'react';

const Terminal = () => {
  return (
    <>
      <div className="term-widget-overlay term-theme-default" id="term-widget-overlay" style={{ display: "none" }} onClick={(e) => { if(e.target===e.currentTarget)window.closeTerminalWidget() }}>
    <div className="term-widget-window" id="term-widget-window">
      <div className="term-widget-scanlines"></div>
      <div className="term-widget-header">
        <div className="term-widget-dots">
          <span className="term-widget-dot term-widget-close" onClick={(e) => { window.closeTerminalWidget() }} title="Close"></span>
          <span className="term-widget-dot term-widget-min" onClick={(e) => { window.closeTerminalWidget() }} title="Minimize"></span>
          <span className="term-widget-dot term-widget-max" onClick={(e) => { window.maximizeTerminalWidget() }} title="Maximize"></span>
        </div>
        <div className="term-widget-title">guest@piyush_os: ~</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="term-widget-layout-btn" onClick={(e) => { window.toggleTerminalTiling() }} id="term-layout-btn" title="Toggle Tmux Tiling Mode (Ctrl+Alt+T)">
            tmux: off
          </button>
          <select className="term-widget-theme-select" id="term-theme-select" onchange="changeTerminalTheme(this.value)">
            <option value="default">default</option>
            <option value="matrix">matrix</option>
            <option value="amber">amber</option>
            <option value="steel">steel</option>
            <option value="hack">hack</option>
            <option value="cyberpunk">cyberpunk</option>
          </select>
        </div>
      </div>
      
      <div className="term-widget-wrapper" id="term-widget-wrapper" style={{ display: "flex", flex: "1", overflow: "hidden", position: "relative" }}>
        {/* Left Pane: Shell Console */}
        <div className="term-pane-shell" id="term-pane-shell" style={{ flex: "1.5", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", width: "100%" }}>
          <div className="term-widget-body" id="term-widget-body" style={{ flex: "1", padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative" }}>
            <canvas className="term-matrix-canvas" id="term-matrix-canvas"></canvas>
            <div className="term-out-line term-out-dim">Welcome to Piyush's Interactive Linux Shell v1.1.0.
Type '<span className="term-out-success">help</span>' to see commands, or drive the portfolio page directly using:
  • <span className="term-out-success">scroll &lt;section&gt;</span>  (sections: about, research, projects, skills, contact)
  • <span className="term-out-success">open &lt;project&gt;</span>    (projects: unikernel, counsel, scheduler, jarvis, crop, wing...)
Toggle this console anytime with the backtick (<span className="term-out-success">`</span>) key.
            </div>
            
            {/* Current input prompt line */}
            <div className="term-widget-prompt-line">
              <span className="term-widget-prompt-lbl">guest@piyush_os:~$</span>
              <div style={{ position: "relative", flex: "1", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <span className="term-widget-hint" id="term-widget-hint" style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", fontFamily: "inherit", fontSize: "inherit", color: "var(--dim)", opacity: "0.45", pointerEvents: "none", whiteSpace: "pre", zIndex: "1" }}></span>
                <input type="text" className="term-widget-input" id="term-widget-input" style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "inherit", fontFamily: "inherit", fontSize: "inherit", caretColor: "transparent", position: "relative", zIndex: "3" }} autoComplete="off" spellcheck="false" />
                <span className="term-widget-caret" id="term-widget-caret" style={{ position: "absolute", width: "7.5px", height: "14px", background: "currentColor", zIndex: "2", pointerEvents: "none", top: "50%", transform: "translateY(-50%)" }}></span>
                <span id="term-widget-measure" style={{ position: "absolute", visibility: "hidden", whiteSpace: "pre", fontFamily: "inherit", fontSize: "inherit" }}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: htop + ranger */}
        <div className="term-pane-column" id="term-pane-column" style={{ display: "none", flex: "1", flexDirection: "column", borderLeft: "1px solid var(--border)", background: "rgba(3, 6, 12, 0.45)", overflow: "hidden" }}>
          {/* Top: htop */}
          <div className="term-pane-htop" id="term-pane-htop" style={{ flex: "1.25", borderBottom: "1px solid var(--border)", padding: "0.75rem 0.9rem", overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: "0.56rem", lineHeight: "1.35", color: "var(--txt)", scrollbarWidth: "none" }}>
            {/* Rendered in JS */}
          </div>
          {/* Bottom: ranger */}
          <div className="term-pane-ranger" id="term-pane-ranger" style={{ flex: "1", padding: "0.75rem 0.9rem", overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: "0.58rem", lineHeight: "1.35", color: "var(--muted)", scrollbarWidth: "none" }}>
            {/* Rendered in JS */}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* FLOATING LAUNCHER */}
  <div className="floating-term-launcher" onClick={(e) => { window.openTerminalWidget() }} title="Launch Shell Console (`)">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  </div>

  {/* KEYBOARD HINT BUBBLE */}
  <div className="term-kbd-hint" id="term-kbd-hint">press &#96; for shell · ? for shortcuts</div>
    </>
  );
};

export default Terminal;
