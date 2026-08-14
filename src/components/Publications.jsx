import React from 'react';

const publications = [
  {
    title: 'Scientific Machine Learning Research',
    authors: 'Piyush Singh Bhati, Prof. Harshal D. Akolekar',
    status: 'Preprint',
    venue: 'arXiv',
    description: 'Working on Physics-Informed Neural Networks and CFD surrogate modeling for scientific computing applications.',
    link: 'https://arxiv.org/pdf/2608.13490',
    linkText: 'Preprint Available',
    tags: ['PINNs', 'Scientific Computing', 'Deep Learning'],
    delay: '.12s',
  },
  {
    title: 'Manuscript in Progress',
    authors: 'Piyush Singh Bhati, et al.',
    status: 'In Progress',
    venue: 'To be submitted',
    description: 'Upcoming research on AI systems and optimization.',
    tags: ['AI Systems', 'Machine Learning'],
    delay: '.24s',
  }
];

const Publications = () => {
  return (
    <section id="publications">
      <div className="section-max">
        <div className="section-head reveal">
          <div className="section-label">Academic Output</div>
          <h2 className="section-title">
            Publications & <span className="grad">Preprints</span>
          </h2>
        </div>
        <div className="research-grid">
          {publications.map((item, index) => (
            <div
              className="research-card reveal"
              key={index}
              style={item.delay ? { transitionDelay: item.delay } : undefined}
            >
              <div className="rc-inst" style={{ color: 'var(--cyan)' }}>
                {item.status} &bull; {item.venue}
              </div>
              <div className="rc-title">{item.title}</div>
              <div className="rc-advisor" style={{ color: 'var(--muted)' }}>
                {item.authors}
              </div>
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

export default Publications;
