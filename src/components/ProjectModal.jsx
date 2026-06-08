import React from 'react';

const ProjectModal = () => {
  return (
    <>
      <div className="proj-modal-ov" id="proj-modal" onClick={(e) => { if(e.target===e.currentTarget)window.closeModal() }}>
    <div className="proj-modal">
      <div className="proj-modal-header">
        <button className="proj-modal-close" onClick={(e) => { window.closeModal() }}><svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg></button>
      </div>
      <div id="pm-img-area"></div>
      <div className="proj-modal-body">
        <div className="proj-modal-meta" id="pm-meta"></div>
        <h3 className="proj-modal-title" id="pm-title"></h3>
        <p className="proj-modal-desc" id="pm-desc"></p>
        <div className="proj-modal-ach-lbl">Key Achievements</div>
        <ul className="proj-modal-ach" id="pm-ach"></ul>
        <div className="proj-modal-tags" id="pm-tags"></div>
        <div className="proj-modal-links" id="pm-links"></div>
        
        {/* Live System Telemetry Console */}
        <div className="proj-modal-telemetry">
          <div className="telemetry-header">
            <span id="telemetry-lbl">[SYS] Telemetry Diagnostic Console</span>
            <span className="telemetry-status-dot"></span>
          </div>
          <div className="telemetry-console" id="pm-telemetry-console"></div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default ProjectModal;
