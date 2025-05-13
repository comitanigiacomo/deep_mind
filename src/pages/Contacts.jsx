
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
    // Qui potresti aggiungere email service, ecc.
    alert('Grazie per il messaggio!');
  };

  return (
    <section id="contacts" className="contact-section">
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700 fade-in">Contattami</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form animate-form">
          <span className="p-float-label">
            <InputText id="name" name="name" value={formData.name} onChange={handleChange} className="w-full mb-4" />
            <label htmlFor="name">Nome</label>
          </span>
          <span className="p-float-label">
            <InputText id="email" name="email" value={formData.email} onChange={handleChange} className="w-full mb-4" />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label">
            <InputTextarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full mb-4" />
            <label htmlFor="message">Messaggio</label>
          </span>
          <Button type="submit" label="Invia" icon="pi pi-send" className="p-button-primary w-full hover-button" />
        </form>

        <div className="contact-info animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">Oppure contattami qui:</h3>
          <p><i className="pi pi-envelope mr-2 text-indigo-500"></i> tuoemail@example.com</p>
          <p><i className="pi pi-phone mr-2 text-indigo-500"></i> +39 123 456 7890</p>
          <div className="mt-4 flex gap-4">
            <a href="https://github.com/tuo-utente" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-github text-2xl hover:text-gray-700 transition-colors duration-300"></i>
            </a>
            <a href="https://linkedin.com/in/tuo-profilo" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-linkedin text-2xl hover:text-blue-600 transition-colors duration-300"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

