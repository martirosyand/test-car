import React, { useState } from 'react';
import axios from 'axios';
import { PhoneCall, EnvelopeSimple, MapPin, Clock, Drop, Gear, WarningCircle, SteeringWheel, Snowflake, BatteryFull, FileText, IdentificationCard, SlidersHorizontal, Engine, Headlights, ArrowRight } from '@phosphor-icons/react';
import './Contact.css';
const API_URL = import.meta.env.VITE_API_URL;


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceWanted: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post(`${API_URL}/api/services`, formData);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', serviceWanted: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h2 className="section-title">Contactez-<span className="text-accent">nous</span></h2>
        <div id="contact" className="contact-grid">
          <div className="contact-info-wrap">
            <div className="contact-item">
              <div className="contact-icon"><PhoneCall weight="fill" /></div>
              <div className="contact-details">
                <h3>Appelez-nous</h3>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><EnvelopeSimple weight="fill" /></div>
              <div className="contact-details">
                <h3>Email</h3>
                <a href="mailto:service@gtauto.com">service@gtauto.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><MapPin weight="fill" /></div>
              <div className="contact-details">
                <h3>Localisation</h3>
                <p>123 Performance Blvd.<br />Motor City, CA 90210</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Clock weight="fill" /></div>
              <div className="contact-details">
                <h3>Horaires d'ouverture</h3>
                <p>Lun - Ven: 8:00 - 18:00<br />Sam: 9:00 - 14:00<br />Dim: Fermé</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Réserver un essai ou un entretien</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Remplissez le formulaire ci-dessous et nous vous contacterons sous peu.</p>

              {status === 'success' && <div className="alert alert-success">Demande soumise avec succès !</div>}
              {status === 'error' && <div className="alert alert-danger">Erreur lors de la soumission.</div>}

              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required placeholder="Jean Dupont" />
              </div>
              <div className="form-group">
                <label>Numéro de téléphone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required placeholder="(555) 000-0000" />
              </div>
              <div className="form-group">
                <label>Adresse e-mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="jean@example.com" />
              </div>
              <div className="form-group">
                <label>Service souhaité</label>
                <select name="serviceWanted" value={formData.serviceWanted} onChange={handleChange} className="form-control" required>
                  <option value="" disabled>Sélectionnez un service</option>
                  <option value="Oil Change">Révision et vidange</option>
                  <option value="Diagnostics">Diagnostic</option>
                  <option value="Brakes">Freinage</option>
                  <option value="Purchase Inquiry">Demande d'achat de véhicule</option>
                  <option value="Other">Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message (Optionnel)</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder="Détails spécifiques..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Envoi...' : 'Envoyer la demande'}
              </button>
            </form>
          </div>
        </div>

        <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105716.29497554972!2d-118.42168393664052!3d34.05389642598384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Garage Location"
        ></iframe>
      </div>
      </div>
    </div>
  );
};

export default Contact;
