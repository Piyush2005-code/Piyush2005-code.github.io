const researchEntries = [
  {
    title: "AI Systems Research",
    institution: "IIT Jodhpur",
    advisor: "Prof. Sidharth Sharma",
    description:
      "Working on AI systems and GPU architecture, focusing on system-level optimization for machine learning workloads and studying the NVIDIA Hopper architecture.",
    tags: ["AI Systems", "GPU Architecture", "ML Optimization", "NVIDIA Hopper"],
  },
  {
    title: "Scientific Machine Learning Research",
    institution: "IIT Jodhpur",
    advisor: "Prof. Harshal D. Akolekar",
    description:
      "Working on Physics-Informed Neural Networks and CFD surrogate modeling for scientific computing applications.",
    tags: ["PINNs", "Scientific Computing", "CFD Surrogate Modeling", "Deep Learning"],
  },
];

const ResearchSection = () => {
  return (
    <section id="research" className="py-24 relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="section-heading">Academic Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Research <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {researchEntries.map((entry) => (
            <div
              key={entry.title}
              className="glass-card glow-border p-8 group hover:bg-primary/5 transition-all duration-300"
            >
              <p className="font-mono text-sm text-primary mb-2">{entry.institution}</p>
              <h3 className="text-xl font-bold text-foreground mb-1">{entry.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 font-mono">
                Advisor: {entry.advisor}
              </p>
              <p className="text-muted-foreground mb-6">{entry.description}</p>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded"
                  >
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

export default ResearchSection;
