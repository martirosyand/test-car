import React from 'react';
import { Link } from 'react-router-dom';
import { Engine, Speedometer, GasPump } from '@phosphor-icons/react';
import './CarCard.css';
const API_URL = import.meta.env.VITE_API_URL

const CarCard = ({ car }) => {
  const defaultImage = "https://via.placeholder.com/400x250?text=No+Image";
  const imageSrc = car.images && car.images.length > 0
    ? `${API_URL}${car.images[0]}`
    : defaultImage;

  return (
    <Link to={`/inventory/${car._id}`} className="car-card">
      <div className="car-image">
        <img src={imageSrc} alt={`${car.year} ${car.brand} ${car.model}`} />
        <div className="car-badge">{car.year}</div>
        <div className="car-price">{car.price.toLocaleString('fr-FR')} €</div>
      </div>
      <div className="car-info">
        <h3>{car.brand} {car.model}</h3>
        <p className="car-desc-short">{car.description?.substring(0, 60)}...</p>

        <div className="car-specs-mini">
          <span><Engine weight="fill" /> {car.engine}</span>
          <span><Speedometer weight="fill" /> {car.mileage.toLocaleString('fr-FR')} km</span>
          <span><GasPump weight="fill" /> {car.transmission}</span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
