import quadcopterHero from "@/assets/quadcopter-hero.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-electric-blue/20 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative glass-card glow-border p-4 overflow-hidden">
              <img
                src={quadcopterHero}
                alt="Quadcopter CAD Design"
                className="w-full h-auto rounded object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded">
                <p className="font-mono text-xs text-primary">// Quadcopter Design Project</p>
                <p className="text-sm text-muted-foreground mt-1">Custom UAV CAD Model</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="section-heading">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Engineering <span className="text-gradient">Intelligent Systems</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm an undergraduate <span className="text-foreground">Computer Science and Engineering</span> student 
                at <span className="text-primary">IIT Jodhpur</span>, passionate about bridging 
                <span className="text-foreground"> Machine Learning</span> with the 
                <span className="text-foreground"> physical world</span>—building AI systems that understand and interact with real-world physics.
              </p>
              <p>
                My focus lies in <span className="text-foreground">embodied AI</span> and 
                <span className="text-foreground"> scientific machine learning</span>: using neural networks 
                to model physical phenomena, accelerate simulations, and enable intelligent robotic systems 
                that perceive, reason, and act in unstructured environments.
              </p>
              <p>
                From <span className="text-foreground">Physics-Informed Neural Networks</span> that learn 
                governing equations to <span className="text-foreground">neural surrogate models</span> replacing 
                computationally expensive CFD solvers, I work at the intersection where 
                <span className="text-primary">data-driven learning meets physical constraints</span>.
              </p>
              <p>
                In UAV research, I leverage <span className="text-primary">NeuralFoil</span>—a PINN trained 
                on XFoil data—to predict airfoil aerodynamics at 
                <span className="text-foreground font-mono"> 1000×</span> the speed of traditional simulation, 
                enabling ML-driven design optimization for real flight systems.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl font-bold text-primary font-mono">8.75</p>
                <p className="text-sm text-muted-foreground mt-1">CGPA</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary font-mono">5+</p>
                <p className="text-sm text-muted-foreground mt-1">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
