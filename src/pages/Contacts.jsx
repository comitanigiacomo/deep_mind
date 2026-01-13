import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contacts" className="contact-section">
      <div className="contact-wrapper">

        <div className="profile-container">
          <img src="../assets/profile.png" alt="Giacomo Comitani" className="profile-photo" />
          <h2 className="profile-name">Giacomo Comitani</h2>
          <p className="profile-location">Milan, Italy</p>
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