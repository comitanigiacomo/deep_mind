import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Mynav from './components/Mynav.jsx';
import About from './pages/About';
import Experience from './pages/Education';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import Interests from './pages/Interests.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import VerticalSectionIndicator from './components/VerticalSectionIndicator.jsx';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if(window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }

    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if(aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'auto',
          block: 'start'
        });
      }
    }, 50); 
  }, []);  

  return (
    <ThemeProvider>
      {!showIntro && <Mynav />}
      {!showIntro && <VerticalSectionIndicator />}
      <div className="background-wrapper">
        <div className="container mt-3">
          <section id="about">
            <About showIntro={showIntro} setShowIntro={setShowIntro} />
          </section>
          {!showIntro && (
            <>
              <section id="interests">
                <Interests />
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
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}