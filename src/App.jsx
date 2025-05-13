

import Mynav from './components/Mynav.jsx';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import VerticalLine from './components/VerticalLine';
import { useEffect } from 'react';

export default function App() {

useEffect(() => {
    // Controlla se c'è un hash nell'URL
    if(window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }

    // Scrolla alla sezione About dopo il caricamento
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if(aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'auto',
          block: 'start'
        });
      }
    }, 50); // Piccolo ritardo per assicurarsi che il DOM sia caricato
  }, []);  return (
    <>
      <Mynav />
      <VerticalLine />
      <div className="background-wrapper">
        <div className="container mt-3">
          <section id="about">
            <About />
          </section>
          <section id="education">
            <Experience />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contacts">
            <Contacts />
          </section>
        </div>
      </div>
    </>
  );
}

