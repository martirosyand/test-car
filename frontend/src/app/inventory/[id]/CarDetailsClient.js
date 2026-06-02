'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Engine, Speedometer, GasPump, Calendar, CaretLeft, CaretRight } from '@phosphor-icons/react';

const CarDetailsClient = ({ car }) => {
  const [activeImage, setActiveImage] = useState(
    car.images && car.images.length > 0 ? car.images[0] : ''
  );
  const carouselRef = useRef(null);

  const defaultImg = "https://via.placeholder.com/800x500?text=No+Image+Available";

  const handleScroll = () => {
    if (carouselRef.current && car && car.images) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.clientWidth;
      const index = Math.round(scrollPosition / slideWidth);
      if (car.images[index] && car.images[index] !== activeImage) {
        setActiveImage(car.images[index]);
      }
    }
  };

  const scrollToImage = (index) => {
    if (carouselRef.current && car && car.images) {
      setActiveImage(car.images[index]);
      carouselRef.current.scrollTo({
        left: carouselRef.current.clientWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const scrollPrev = () => {
    if (car && car.images) {
      const currentIndex = car.images.indexOf(activeImage);
      if (currentIndex > 0) scrollToImage(currentIndex - 1);
    }
  };

  const scrollNext = () => {
    if (car && car.images) {
      const currentIndex = car.images.indexOf(activeImage);
      if (currentIndex < car.images.length - 1) scrollToImage(currentIndex + 1);
    }
  };

  return (
    <div className="car-details-page container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <Link href="/inventory" className="back-link">&larr; RETOUR AUX VÉHICULES</Link>

      <div className="car-details-layout">
        {/* Left Gallery */}
        <div className="car-gallery">
          {/* Universal Swipeable Carousel with Navigation */}
          <div className="carousel-container">
            {car.images && car.images.length > 1 && (
              <button className="carousel-nav prev" onClick={scrollPrev} disabled={car.images.indexOf(activeImage) === 0}>
                <CaretLeft weight="bold" />
              </button>
            )}
            
            <div className="main-image-carousel" ref={carouselRef} onScroll={handleScroll}>
              {car.images && car.images.length > 0 ? (
                car.images.map((img, idx) => (
                  <div className="carousel-slide" key={idx}>
                    <img src={img} alt={`${car.brand} ${car.model} - Vue ${idx + 1}`} />
                  </div>
                ))
              ) : (
                <div className="carousel-slide">
                  <img src={defaultImg} alt={car.title} />
                </div>
              )}
            </div>

            {car.images && car.images.length > 1 && (
              <button className="carousel-nav next" onClick={scrollNext} disabled={car.images.indexOf(activeImage) === car.images.length - 1}>
                <CaretRight weight="bold" />
              </button>
            )}
          </div>

          {/* Thumbnails (All Devices) */}
          {car.images && car.images.length > 1 && (
            <div className="thumbnails">
              {car.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={activeImage === img ? 'active' : ''}
                  onClick={() => scrollToImage(idx)}
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
            <Link href="/contact" className="btn btn-primary btn-block" style={{ marginTop: '1rem', display: 'block' }}>NOUS CONTACTER</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsClient;
