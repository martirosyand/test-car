import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarCard from '../components/CarCard';
import './Home.css';
import { Drop, Engine, SteeringWheel, CarProfile } from '@phosphor-icons/react';
const API_URL = import.meta.env.VITE_API_URL;


const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    // Fetch latest 3 cars for featured section
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cars`);
        setFeaturedCars(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching featured cars:', err);
      }
    };

    // Fetch active discounts
    const fetchDiscounts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/discounts`);
        setDiscounts(res.data);
      } catch (err) {
        console.error('Error fetching discounts:', err);
      }
    };

    fetchCars();
    fetchDiscounts();
  }, []);

  return (
    <>
      <section id="home" className="hero-split">
        <div className="hero-left-panel container">
          <img src="/logo.png" alt="Garage GT Auto Logo" className="hero-logo-img" />
          <h2 className="hero-subheadline">GARAGE DE CONFIANCE POUR L'ENTRETIEN, LA RÉPARATION ET LA VENTE AUTOMOBILE</h2>
        </div>
        <div className="hero-right-panel">
          <img src="/hero-bg.jpg" alt="Premium Garage Car" className="hero-car-image" />
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">VÉHICULES VEDETTES</h2>
          {featuredCars.length > 0 ? (
            <div className="cars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {featuredCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Aucun véhicule vedette disponible pour le moment.</p>
          )}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/inventory" className="btn btn-outline" style={{ borderColor: 'var(--accent-color)', color: 'var(--text-primary)' }}>VOIR L'INVENTAIRE</Link>
          </div>
        </div>
      </section>

      {/* Current Discounts Section */}
      {discounts.length > 0 && (
        <section id="discounts" className="section" style={{ borderTop: '1px solid var(--metallic-border)', backgroundColor: 'rgba(230, 0, 0, 0.02)' }}>
          <div className="container">
            <h2 className="section-title">OFFRES & REMISES</h2>
            <div className="services-grid">
              {discounts.map(discount => {
                const hasValidity = discount.startDate || discount.endDate;
                return (
                  <div key={discount._id} className="service-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: 'var(--accent-color)',
                      color: '#ffffff',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      boxShadow: '0 0 10px rgba(230, 0, 0, 0.4)',
                      letterSpacing: '0.5px'
                    }}>
                      {discount.discountType === 'percentage' ? `-${discount.discountValue}%` : `-${discount.discountValue.toLocaleString('fr-FR')} €`}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', marginRight: '4.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{discount.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{discount.description}</p>
                    </div>
                    <div style={{
                      marginTop: 'auto',
                      fontSize: '0.85rem',
                      color: hasValidity ? 'var(--accent-color)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderTop: '1px solid var(--metallic-border)',
                      paddingTop: '1rem',
                      fontWeight: '600'
                    }}>
                      <span>🕒</span>
                      <span>
                        {discount.startDate && discount.endDate ? (
                          `Du ${new Date(discount.startDate).toLocaleDateString('fr-FR')} au ${new Date(discount.endDate).toLocaleDateString('fr-FR')}`
                        ) : discount.startDate ? (
                          `À partir du ${new Date(discount.startDate).toLocaleDateString('fr-FR')}`
                        ) : discount.endDate ? (
                          `Jusqu'au ${new Date(discount.endDate).toLocaleDateString('fr-FR')}`
                        ) : (
                          "Offre permanente"
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services Snippet */}
      <section id="services" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">NOS SERVICES POPULAIRES</h2>
          <div className="services-grid">

            <div className="service-card">
              <Drop weight="fill" className="service-icon" />
              <h3>Révision et vidange</h3>
              <p>Remplacement d'huile synthétique et filtres.</p>
            </div>

            <div className="service-card">
              <Engine weight="fill" className="service-icon" />
              <h3>Diagnostic moteur</h3>
              <p>Diagnostic informatique de pointe des codes d'erreur.</p>
            </div>

            <div className="service-card">
              <SteeringWheel weight="fill" className="service-icon" />
              <h3>Pneumatiques</h3>
              <p>Rotation, équilibrage, alignement et remplacement.</p>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-primary">VOIR TOUTES NOS PRESTATIONS</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
