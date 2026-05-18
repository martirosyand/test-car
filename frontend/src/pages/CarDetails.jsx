import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Engine, Speedometer, GasPump, Calendar } from '@phosphor-icons/react';
import './CarDetails.css';
const API_URL = import.meta.env.VITE_API_URL;


const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cars/${id}`);
        setCar(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setActiveImage(res.data.images[0]);
        }
      } catch (err) {
        console.error('Failed to load car details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <div className="container" style={{ paddingTop: '150px' }}><p>Chargement...</p></div>;
  if (!car) return <div className="container" style={{ paddingTop: '150px' }}><p>Véhicule introuvable.</p></div>;

  const defaultImg = "https://via.placeholder.com/800x500?text=No+Image+Available";

  return (
    <div className="car-details-page container">
      <Link to="/inventory" className="back-link">&larr; RETOUR AUX VÉHICULES</Link>

      <div className="car-details-layout">
        {/* Left Gallery */}
        <div className="car-gallery">
          <div className="main-image">
            <img src={activeImage ? `${API_URL}${activeImage}` : defaultImg} alt={car.title} />
          </div>
          {car.images && car.images.length > 1 && (
            <div className="thumbnails">
              {car.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${API_URL}${img}`}
                  alt={`Thumbnail ${idx}`}
                  className={activeImage === img ? 'active' : ''}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Info */}
        <div className="car-info-full">
          <div className="header-info">
            <span className="badge">{car.year}</span>
            <h1>{car.brand} {car.model}</h1>
            <h2 className="price">{car.price.toLocaleString('fr-FR')} €</h2>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <Calendar weight="fill" className="spec-icon" />
              <div>
                <small>ANNÉE</small>
                <p>{car.year}</p>
              </div>
            </div>
            <div className="spec-item">
              <Speedometer weight="fill" className="spec-icon" />
              <div>
                <small>KILOMÉTRAGE</small>
                <p>{car.mileage.toLocaleString('fr-FR')} km</p>
              </div>
            </div>
            <div className="spec-item">
              <Engine weight="fill" className="spec-icon" />
              <div>
                <small>MOTEUR</small>
                <p>{car.engine}</p>
              </div>
            </div>
            <div className="spec-item">
              <GasPump weight="fill" className="spec-icon" />
              <div>
                <small>TRANSMISSION</small>
                <p>{car.transmission}</p>
              </div>
            </div>
          </div>

          <div className="description">
            <h3>DESCRIPTION DU VÉHICULE</h3>
            <p>{car.description || "Aucune description fournie."}</p>
          </div>

          <div className="action-box">
            <h3>INTÉRESSÉ ?</h3>
            <p>Contactez notre showroom pour réserver un essai.</p>
            <Link to="/contact" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>NOUS CONTACTER</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
