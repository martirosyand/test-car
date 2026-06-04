'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Engine, Speedometer, GasPump, Calendar, CaretLeft, CaretRight } from '@phosphor-icons/react';

const CarDetailsClient = ({ car }) => {
  const [activeImage, setActiveImage] = useState(
    car.images && car.images.length > 0 ? car.images[0] : ''
  );
  const carouselRef = useRef(null);

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
                  <div className="carousel-slide" key={idx} style={{ position: 'relative' }}>
                    <Image
                      src={img}
                      alt={`${car.brand} ${car.model} - Vue ${idx + 1}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 800px"
                      style={{ objectFit: 'cover' }}
                      priority={idx === 0}
                      loading={idx === 0 ? undefined : 'lazy'}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgODAwIDUwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMxYTFhMWYiLz48L3N2Zz4="
                    />
                  </div>
                ))
              ) : (
                <div className="carousel-slide">
                  <div className="placeholder-no-image">
                    <span>GT AUTO</span>
                    <small>Aucune photo disponible</small>
                  </div>
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
                <div
                  key={idx}
                  className={`thumbnail-wrapper ${activeImage === img ? 'active' : ''}`}
                  onClick={() => scrollToImage(idx)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    sizes="120px"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Info */}
        <div className="car-info-full">
          <div className="header-info">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', alignItems: 'center' }}>
              <span className="badge">{car.year}</span>
              {car.sold && <span className="badge" style={{ background: '#ff4757', color: '#fff', fontWeight: 700 }}>Vendu</span>}
              {!car.sold && car.reserved && <span className="badge" style={{ background: '#ffa502', color: '#fff', fontWeight: 700 }}>Réservé</span>}
            </div>
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
            <p style={{ whiteSpace: 'pre-wrap' }}>{car.description || "Aucune description fournie."}</p>
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
