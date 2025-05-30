import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Mynav.css';
import TypeWriter from './TypeWriter.jsx';
import { useTheme } from '../context/ThemeContext';

function Mynav() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Navbar fixed="top">
      <Container>
        <Navbar.Brand href="#about">
          <TypeWriter text="Deep mind" speed={150} delay={2000} textColor={isDarkMode ? "#fff" : "#2a2a2a"} />
        </Navbar.Brand>
        <Nav className="ms-0">
          <Nav.Link href="#about"><span>About</span></Nav.Link>
          <Nav.Link href="#education"><span>Education</span></Nav.Link>
          <Nav.Link href="#projects"><span>Projects</span></Nav.Link>
          <Nav.Link href="#contacts"><span>Contacts</span></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={toggleTheme}
            className="theme-toggle-text"
          >
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Mynav;