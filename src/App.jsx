import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import Terminal from './components/Terminal';
import MusicPlayer from './components/MusicPlayer';
import FloatingTermLauncher from './components/FloatingTermLauncher';
import { initPortfolioScripts } from './scripts.js';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize vanilla JS logic once all components mount
    initPortfolioScripts();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <About />
      <Research />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ProjectModal />
      <Terminal />
      <MusicPlayer />
      <FloatingTermLauncher />
    </div>
  );
}

export default App;
