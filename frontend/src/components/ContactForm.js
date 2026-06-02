'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceWanted: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // POST directly to Next.js rewrites endpoint
      await axios.post('/api/services', formData);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', serviceWanted: '', message: '' });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatus('error');
    }
  };

  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Réserver un essai ou un entretien</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Remplissez le formulaire ci-dessous et nous vous contacterons sous peu.
        </p>

        {status === 'success' && <div className="alert alert-success">Demande soumise avec succès !</div>}
        {status === 'error' && <div className="alert alert-danger">Erreur lors de la soumission.</div>}

        <div className="form-group">
          <label htmlFor="contact-name">Nom complet</label>
          <input 
            type="text" 
            id="contact-name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-control" 
            required 
            placeholder="Jean Dupont" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-phone">Numéro de téléphone</label>
          <input 
            type="tel" 
            id="contact-phone"
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="form-control" 
            required 
            placeholder="(555) 000-0000" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Adresse e-mail</label>
          <input 
            type="email" 
            id="contact-email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="form-control" 
            required 
            placeholder="jean@example.com" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-service">Service souhaité</label>
          <select 
            id="contact-service"
            name="serviceWanted" 
            value={formData.serviceWanted} 
            onChange={handleChange} 
            className="form-control" 
            required
          >
            <option value="" disabled>Sélectionnez un service</option>
            <option value="Oil Change">Révision</option>
            <option value="Diagnostics">Diagnostic</option>
            <option value="Repair">Réparation</option>
            <option value="Purchase Inquiry">Demande d'achat de véhicule</option>
            <option value="Other">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message (Optionnel)</label>
          <textarea 
            id="contact-message"
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Détails spécifiques..."
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }} 
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Envoi...' : 'Envoyer la demande'}
        </button>
      </form>
    </div>
  );
}
