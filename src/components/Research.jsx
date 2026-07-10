import React from 'react';

const researchExperience = [
  {
    institution: 'IIT Bombay',
    title: 'Vision-Based Autonomous Systems Research',
    advisor: 'Prof. Debraj Chakraborty',
    description:
      'Working on Sequence modelling for sensor fusion into Computer Vision algorithms. Developed a complete training, inference, benchmarking and testing framework for CV/ML model training and export.',
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
      'Working on AI systems and GPU architecture, focusing on system-level optimization for machine learning workloads and studying the NVIDIA Hopper architecture.',
    tags: ['AI Systems', 'GPU Architecture', 'ML Optimization', 'NVIDIA Hopper'],
  },
  {
    institution: 'IIT Jodhpur',
    title: 'Scientific Machine Learning Research',
    advisor: 'Prof. Harshal D. Akolekar',
    description:
      'Working on Physics-Informed Neural Networks and CFD surrogate modeling for scientific computing applications.',
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
