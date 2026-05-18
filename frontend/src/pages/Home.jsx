import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarCard from '../components/CarCard';
import './Home.css';
import { Drop, Engine, SteeringWheel, CarProfile } from '@phosphor-icons/react';
const API_URL = import.meta.env.VITE_API_URL;


const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

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
    fetchCars();
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
