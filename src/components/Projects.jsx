import React from 'react';
import { PROJECTS } from '../data/projects';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Projects = () => (
  <section id="projects">
    <div className="section-max">
      <div className="section-head reveal">
        <div className="section-label">Featured Work</div>
        <h2 className="section-title">Projects</h2>
      </div>

      <div className="proj-filter-bar reveal" id="proj-filter-bar">
        <span className="proj-filter-prompt">$ ls projects/ --filter=</span>
        <button type="button" className="proj-filter-btn active" data-filter="all">all</button>
        <button type="button" className="proj-filter-btn" data-filter="systems">systems</button>
        <button type="button" className="proj-filter-btn" data-filter="ml">ml</button>
        <button type="button" className="proj-filter-btn" data-filter="robotics">robotics</button>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((project, index) => (
          <div
            key={project.title}
            className="proj-card reveal"
            data-category={project.category}
            style={{ transitionDelay: `${(index % 4) * 0.06}s` }}
            onClick={() => window.openModal(index)}
          >
            <div className="proj-card-img">
              <img
                src={project.imgs[0]}
                alt={project.title}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="proj-card-img-ov" />
            </div>
            <div className="proj-card-body">
              <div className="proj-card-meta">{project.meta}</div>
              <h3 className="proj-card-title">{project.title}</h3>
              <p className="proj-card-desc">{project.summary}</p>
              <div className="proj-card-hint">View Details <ArrowIcon /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
