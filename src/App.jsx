

import Mynav from './components/Mynav.jsx';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import VerticalLine from './components/VerticalLine';


export default function App() {
  return (
    <>
      <Mynav />
      <VerticalLine />
      <div className="background-wrapper">
        <div className="container mt-3">
          <section id="about">
            <About />
          </section>
          <section id="experience">
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

