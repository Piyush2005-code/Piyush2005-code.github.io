import React from 'react';

const researchExperience = [
  {
    institution: 'IIT Bombay',
    title: 'Vision-Based Autonomous Systems Research',
    advisor: 'Prof. Debraj Chakraborty',
    description:
      'Built the full training, inference, and benchmarking stack for a Mamba-Transformer object detection and tracking pipeline on NVIDIA Jetson Orin, targeting sub-30ms latency under occlusion and motion-blur conditions.',
    link: 'https://drive.google.com/file/d/1PfK5I9B_Hqz1jJwf1qThTB5vHuKhQGz_/view?usp=sharing',
    tags: [
      'State Space Models',
      'Computer Vision/Deep Learning',
      'Edge-AI Constrained Development',
      'Autonomous Systems',
    ],
    delay: '.12s',
  },
  {
    institution: 'IIT Jodhpur',
    title: 'AI Systems Research',
    advisor: 'Prof. Sidharth Sharma',
    description:
      'Investigating the NVIDIA Hopper architecture — Tensor Cores, async execution, memory hierarchy — and how these primitives behave under ML inference workloads. Writing microbenchmarks to measure kernel scheduling and memory access patterns.',
    tags: ['AI Systems', 'GPU Architecture', 'ML Optimization', 'NVIDIA Hopper'],
  },
  {
    institution: 'IIT Jodhpur',
    title: 'Scientific Machine Learning Research',
    advisor: 'Prof. Harshal D. Akolekar',
    description:
      'Building neural operators and RL-based optimizers for aerodynamic shape design and fluid flow prediction — problems where classical numerical solvers are too slow for iterative design exploration.',
    link: 'https://arxiv.org/pdf/2608.13490',
    linkText: 'Preprint Available',
    tags: ['PINNs', 'Scientific Computing', 'CFD Surrogate Modeling', 'Deep Learning'],
    delay: '.12s',
  },
];

const Research = () => {
  return (
    <section id="research">
      <div className="section-max">
        <div className="section-head reveal">
          <div className="section-label">Academic Work</div>
          <h2 className="section-title">
            Research <span className="grad">Experience</span>
          </h2>
        </div>
        <div className="research-grid">
          {researchExperience.map((item) => (
            <div
              className="research-card reveal"
              key={`${item.institution}-${item.title}`}
              style={item.delay ? { transitionDelay: item.delay } : undefined}
            >
              <div className="rc-inst">{item.institution}</div>
              <div className="rc-title">{item.title}</div>
              <div className="rc-advisor">Advisor: {item.advisor}</div>
              <div className="rc-desc">{item.description}</div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="rc-btn">
                  {item.linkText || 'View Document'}
                </a>
              )}
              <div className="rc-tags">
                {item.tags.map((tag) => (
                  <span className="rc-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
