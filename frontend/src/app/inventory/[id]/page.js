import React from 'react';
import { notFound } from 'next/navigation';
import CarDetailsClient from './CarDetailsClient';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function getCar(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/cars/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`Error fetching car details for ID ${id}:`, err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    return {
      title: 'Véhicule introuvable | GT Auto',
      description: 'Le véhicule demandé est introuvable ou a été vendu.',
    };
  }

  const title = `${car.brand} ${car.model} (${car.year}) | GT Auto`;
  const description = `Découvrez notre ${car.brand} ${car.model} de ${car.year} chez GT Auto. Prix: ${car.price.toLocaleString('fr-FR')} €, Kilométrage: ${car.mileage.toLocaleString('fr-FR')} km, Transmission: ${car.transmission}.`;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let imageUrl = '';
  if (car.images && car.images.length > 0) {
    const firstImage = car.images[0];
    imageUrl = firstImage.startsWith('http') ? firstImage : `${siteUrl}${firstImage}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/inventory/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/inventory/${id}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function CarDetailsPage({ params }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return <CarDetailsClient car={car} />;
}
