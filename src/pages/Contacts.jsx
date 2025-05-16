
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import ProfilePhoto from '../assets/profile.png';

export default function Contact() {

  return (
    <section id="contacts" className="contact-section">
      <div className="contact-wrapper">
        {/* Sezione Profilo */}
        <div className="profile-container">
          <img 
            src={ProfilePhoto} 
            alt="Profilo" 
            className="profile-photo" 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
          <div className="profile-info">
            <h2>Giacomo Comitani</h2>
            <div className="location-badge">
              <FaMapMarkerAlt className="location-icon" />
              <span>Milano, Italia</span>
            </div>
          </div>
        </div>

          {/* Sezione Social */}
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
