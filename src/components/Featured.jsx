import React from 'react';

const featuredData = {
  achievements: [
    {
      title: 'Vehant All India Computer Vision Hackathon',
      date: '2026',
      subscript: '🏅 Achieved 2nd Rank',
      description: 'Designed and developed a real-time Computer Vision pipeline for vehicle counting using strictly classical computer vision techniques.',
    },
    {
      title: 'Edge AI Research Intern — IIT Bombay',
      date: 'Summer 2026',
      subscript: 'Prof. Debraj Chakraborty · Systems & Control Engineering',
      description: 'Designed a Mamba-Transformer hybrid object detection and multi-object tracking pipeline targeting sub-30ms inference on NVIDIA Jetson Orin under occlusion and motion-blur conditions.',
      link: 'https://drive.google.com/file/d/1PfK5I9B_Hqz1jJwf1qThTB5vHuKhQGz_/view',
      linkText: 'View Certificate',
    },
    {
      title: 'DD-RNO: Neural Operators for Airfoil Flow Prediction',
      date: '2026 · Under Review',
      subscript: 'T.A. Mehta, P.S. Bhati, H.D. Akolekar',
      description: 'Domain-Decomposed Routed Neural Operators for airfoil flow prediction; preprint published on arXiv.',
      link: 'https://arxiv.org/pdf/2608.13490',
      linkText: 'View Preprint',
    },
    // {
    //   title: 'CRARL: Certified Risk-Averse RL for Aerodynamic Shape Optimization',
    //   date: '2025 · Under Review',
    //   subscript: 'P.S. Bhati, T.A. Mehta, H.D. Akolekar',
    //   description: 'Certified risk-averse reinforcement learning framework for aerodynamic shape optimization with provably valid geometry constraints.',
    // },
  ],
  activities: [
    {
      title: "Student's International Relations Cell, IIT Jodhpur",
      date: '2025 - 2026',
      subscript: 'Coordinator',
      description: 'Managed accommodations and hospitality for delegates from all IITs during International Relations Conclave 2025.',
    },
    {
      title: 'RAID AI Society, IIT Jodhpur',
      date: '2026',
      subscript: 'Project Mentor',
      description: 'Mentored a team developing an AI-powered advisory platform, designing the software system architecture and guiding the engineering process.',
    },
    {
      title: 'Robotics Society, IIT Jodhpur',
      date: 'Ongoing',
      subscript: 'Core Team · Mentor',
      description: 'Contributed to the technical progress of the Robotics Society and cultivated a research culture among peers.',
    },
    {
      title: 'Robotics Club Website — IIT Jodhpur',
      date: '2026',
      subscript: 'Developer · roboticsclubiitj.github.io',
      description: 'Designed and developed the official website for the IIT Jodhpur Robotics Club, serving as the digital home for the club\'s projects, events, and team.',
      link: 'https://roboticsclubiitj.github.io',
      linkText: 'View Website',
    },
    {
      title: "Tech Exhibition, Prometeo'26 — IIT Jodhpur",
      date: '2026',
      subscript: 'Assistant Head',
      description: "Coordinated technical exhibits and managed logistics for IIT Jodhpur's annual technical festival.",
    },
  ],
};

const TimelineItem = ({ item, isLast }) => (
  <div className={`ft-item${isLast ? ' ft-item--last' : ''}`}>
    <div className="ft-node">
      <div className="ft-node-ring" />
      <div className="ft-node-core" />
    </div>
    <div className="ft-content">
      <div className="ft-content-inner">
        <div className="ft-meta-row">
          <span className="ft-title">{item.title}</span>
          {item.date && <span className="ft-date">{item.date}</span>}
        </div>
        {item.subscript && (
          <div className="ft-subscript">{item.subscript}</div>
        )}
        <p className="ft-desc">{item.description}</p>
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="ft-link">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {item.linkText || 'View'}
          </a>
        )}
      </div>
    </div>
  </div>
);

const Featured = () => {
  return (
    <section id="featured">
      <div className="section-max">
        <div className="section-head reveal">
          <div className="section-label">Highlights</div>
          <h2 className="section-title">
            Activities & <span className="grad">Achievements</span>
          </h2>
          <p className="ft-intro">A snapshot of my key achievements, publications, and ongoing activities.</p>
        </div>

        <div className="ft-columns">
          {/* LEFT: Achievements */}
          <div className="ft-col reveal">
            <div className="ft-sub-label">Achievements & Publications</div>
            <div className="ft-timeline">
              {featuredData.achievements.map((item, i) => (
                <TimelineItem
                  key={i}
                  item={item}
                  isLast={i === featuredData.achievements.length - 1}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Activities */}
          <div className="ft-col reveal" style={{ transitionDelay: '.12s' }}>
            <div className="ft-sub-label">Leadership & Activities</div>
            <div className="ft-timeline">
              {featuredData.activities.map((item, i) => (
                <TimelineItem
                  key={i}
                  item={item}
                  isLast={i === featuredData.activities.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
