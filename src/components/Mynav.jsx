import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Mynav.css'

function Mynav() {
  return (
    <>
      <Navbar fixed="top" >
        <Container>
          <Navbar.Brand href="#about">Deep Mind</Navbar.Brand>
          <Nav className="ms-0">
            <Nav.Link href="#about"><span>About</span></Nav.Link>
            <Nav.Link href="#experience"><span>Education</span></Nav.Link>
            <Nav.Link href="#projects"><span>Projects</span></Nav.Link>
            <Nav.Link href="#contacts"><span>Contacts</span></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Mynav;
