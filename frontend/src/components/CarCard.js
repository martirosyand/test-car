import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Engine, Speedometer, GasPump } from '@phosphor-icons/react/dist/ssr';

const CarCard = ({ car }) => {
  const hasImages = car.images && car.images.length > 0;
  const imageSrc = hasImages ? car.images[0] : '';

  return (
    <Link href={`/inventory/${car._id}`} className="car-card">
      <div className="car-image">
        {hasImages ? (
          imageSrc.startsWith('http') ? (
            <img src={imageSrc} alt={`${car.year} ${car.brand} ${car.model}`} />
          ) : (
            <Image 
              src={imageSrc} 
              alt={`${car.year} ${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={false}
            />
          )
        ) : (
          <div className="placeholder-no-image">
            <span>GT AUTO</span>
            <small>Aucune photo disponible</small>
          </div>
        )}
        <div className="car-badge">{car.year}</div>
        {car.sold && <div className="car-status-badge sold">Vendu</div>}
        {!car.sold && car.reserved && <div className="car-status-badge reserved">Réservé</div>}
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
