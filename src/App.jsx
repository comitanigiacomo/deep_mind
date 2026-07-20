import Mynav from './components/Mynav.jsx';
import About from './pages/About';
import Skills from './pages/Skills.jsx';
import Experience from './pages/Education';
import Projects from './pages/Projects';
import Homelab from './pages/Homelab.jsx';
import Research from './pages/Research.jsx';
import Blog from './pages/Blog.jsx';
import Contacts from './pages/Contacts';
import Interests from './pages/Interests.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import VerticalSectionIndicator from './components/VerticalSectionIndicator.jsx';
import ChatSection from './components/ChatSection.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import BlogPostPage from './pages/BlogPostPage.jsx';
import { useLang } from './context/LanguageContext.jsx';

export default function App() {
  const location = useLocation();
  const { isTransitioning } = useLang();

  useEffect(() => {
    // Only scroll if there's a hash and we are actually on the main page
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <>
      <Mynav />
      <VerticalSectionIndicator />
      <div
        className={`background-wrapper ${isTransitioning ? 'lang-transitioning' : 'lang-ready'}`}
      >
        <About />
        <div className="container mt-3">
          <section id="interests">
            <Interests />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="education">
            <Experience />
          </section>
          <section id="projects">
            <Projects />
          </section>
        </div>

        {/* Homelab — fuori dal container per background full-bleed */}
        <Homelab />
        
        {/* Research — fuori dal container per background full-bleed */}
        <Research />

        <div className="container">
          <section id="blog">
            <Blog />
          </section>
          <section id="contacts">
            <Contacts />
          </section>
        </div>

        {/* Chat Animation Section at the very bottom */}
        <ChatSection />
      </div>
      
      {/* Blog post overlay routing */}
      <Routes>
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
    </>
  );
}