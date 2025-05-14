import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Messaggio inviato:', formData);
    alert('Grazie per il messaggio!');
  };

  return (
    <section id="contacts" className="projects-section">
      <div className="section-header">
        <h2 className="section-title">Contattami</h2>
        <div className="title-underline"></div>
      </div>

      <div className="contact-container">
        {/* Form Card */}
        <form onSubmit={handleSubmit} className="project-card card-visible">
          <div className="card-content">
            <div className="input-group">
              <span className="p-float-label">
                <InputText 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="custom-input"
                />
                <label htmlFor="name">Nome</label>
              </span>
            </div>

            <div className="input-group">
              <span className="p-float-label">
                <InputText 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="custom-input"
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>

            <div className="input-group">
              <span className="p-float-label">
                <InputTextarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows={5} 
                  className="custom-input"
                />
                <label htmlFor="message">Messaggio</label>
              </span>
            </div>

            <Button 
              type="submit" 
              label="Invia" 
              icon="pi pi-send" 
              className="minimal-btn"
            />
          </div>
        </form>

        {/* Info Card */}
        <div className="project-card card-visible contact-info">
          <div className="card-content">
            <h3 className="card-title">Altri contatti</h3>
            
            <div className="meta-info">
              <p>
                <i className="pi pi-envelope mr-2"></i>
                tuoemail@example.com
              </p>
              <p>
                <i className="pi pi-phone mr-2"></i>
                +39 123 456 7890
              </p>
            </div>
            
            <div className="language-stats social-links">
              <a href="https://github.com/tuo-utente" target="_blank" rel="noopener noreferrer" className="lang-tag">
                <i className="pi pi-github"></i>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/tuo-profilo" target="_blank" rel="noopener noreferrer" className="lang-tag">
                <i className="pi pi-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
