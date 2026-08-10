import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import Terminal from './components/Terminal';
import FloatingTermLauncher from './components/FloatingTermLauncher';
import ShortcutsOverlay from './components/ShortcutsOverlay';
import { initPortfolioScripts } from './scripts.js';

// Blog pages
import BlogIndex from './components/blog/BlogIndex';
import BlogPost from './components/blog/BlogPost';

import './index.css';

import Navbar from './components/Navbar';



// ── Portfolio (single-page) ───────────────────────────────────────────────────
function Portfolio() {
  useEffect(() => {
    initPortfolioScripts();
  }, []);

  return (
    <div className="app-container">
      <div className="bg-depth-layer" aria-hidden="true" />
      <div id="scroll-progress" aria-hidden="true" />
      <Hero />
      <About />
      <Research />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ProjectModal />
      <Terminal />
      <FloatingTermLauncher />
      <ShortcutsOverlay />
    </div>
  );
}

// ── Root router ───────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  );
}

export default App;
