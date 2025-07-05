import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Contact.css';
import Lanyard from '../components/Lanyard';

export default function Contact() {
  return (
    <section id="contacts" className="contact-section">
      <div className="contact-wrapper">

        <div className="lanyard-wrapper" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>

        <div className="social-section">
          <div className="social-grid">
            <a href="mailto:comitanigiacomo@gmail.com" className="social-card">
              <FaEnvelope className="social-icon email" />
              <span>Email</span>
            </a>
            <a href="https://github.com/comitanigiacomo" className="social-card">
              <FaGithub className="social-icon github" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/giacomo-comitani-249384326/" className="social-card">
              <FaLinkedin className="social-icon linkedin" />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/giacomo.comitani" className="social-card">
              <FaInstagram className="social-icon instagram" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
