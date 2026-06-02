import React, { useState } from 'react';
import axios from 'axios';
import { PhoneCall, EnvelopeSimple, MapPin, Clock, Drop, Gear, WarningCircle, SteeringWheel, Snowflake, BatteryFull, FileText, IdentificationCard, SlidersHorizontal, Engine, Headlights, ArrowRight } from '@phosphor-icons/react';
import './Services.css';
const API_URL = import.meta.env.VITE_API_URL;


const Services = () => {
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
    <div className="services-page">
      <div className="container">
        <h1 className="section-title">NOS PRESTATIONS</h1>

        <div className="prestations-grid">
          <div className="prestation-card">
            <Drop weight="fill" className="prestation-icon" />
            <h3>Révision et vidange</h3>
            <p>Entretien complet incluant vidange d'huile, remplacement du filtre et contrôles essentiels pour assurer la longévité et les performances de votre véhicule.</p>
            <span className="prestation-badge">Garantie constructeur préservée</span>
          </div>
          <div className="prestation-card">
            <Gear weight="fill" className="prestation-icon" />
            <h3>Courroie de distribution</h3>
            <p>Remplacement professionnel de la courroie de distribution pour prévenir tout risque de casse et garantir le bon fonctionnement de votre moteur.</p>
          </div>
          <div className="prestation-card">
            <WarningCircle weight="fill" className="prestation-icon" />
            <h3>Freinage</h3>
            <p>Contrôle, entretien et remplacement des plaquettes, disques et liquide de frein pour garantir votre sécurité en toutes circonstances.</p>
          </div>
          <div className="prestation-card">
            <SteeringWheel weight="fill" className="prestation-icon" />
            <h3>Pneumatiques</h3>
            <p>Montage, équilibrage, géométrie et réparation de pneus.</p>
          </div>
          <div className="prestation-card">
            <Snowflake weight="fill" className="prestation-icon" />
            <h3>Climatisation</h3>
            <p>Entretien, recharge et réparation de votre climatisation.</p>
          </div>
          <div className="prestation-card">
            <BatteryFull weight="fill" className="prestation-icon" />
            <h3>Batterie et démarrage</h3>
            <p>Test, remplacement et entretien des batteries et systèmes de démarrage.</p>
          </div>
          <div className="prestation-card">
            <FileText weight="fill" className="prestation-icon" />
            <h3>Carte grise</h3>
            <p>Service carte grise rapide et démarches administratives simplifiées.</p>
          </div>
          <div className="prestation-card">
            <IdentificationCard weight="fill" className="prestation-icon" />
            <h3>Plaque d'immatriculation</h3>
            <p>Fabrication et pose de plaques d'immatriculation conformes.</p>
          </div>
          <div className="prestation-card">
            <SlidersHorizontal weight="fill" className="prestation-icon" />
            <h3>Changement amortisseur</h3>
            <p>Remplacement d'amortisseurs pour plus de confort et de sécurité.</p>
          </div>
          <div className="prestation-card">
            <Engine weight="fill" className="prestation-icon" />
            <h3>Diagnostic, recherche de panne</h3>
            <p>Diagnostic électronique avancé et recherche de pannes toutes marques.</p>
          </div>
          <div className="prestation-card">
            <Headlights weight="fill" className="prestation-icon" />
            <h3>Éclairage</h3>
            <p>Contrôle, réglage et remplacement de tous vos systèmes d'éclairage.</p>
          </div>
          {/* <div className="prestation-card action-card">
            <ArrowRight weight="bold" className="prestation-icon-large" />
            <h3 style={{ margin: '0', fontSize: '1rem' }}>VOIR TOUTES NOS PRESTATIONS</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Services;
