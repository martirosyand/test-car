import React from 'react';
import CarCard from '@/components/CarCard';
import FilterSidebar from '@/components/FilterSidebar';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

async function getCars(filters) {
  try {
    const queryParams = new URLSearchParams();
    if (filters.brand) queryParams.append('brand', filters.brand);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.year) queryParams.append('year', filters.year);

    const res = await fetch(`${BACKEND_URL}/api/cars?${queryParams.toString()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch cars:', err);
    return [];
  }
}

export const metadata = {
  title: "Inventaire des Véhicules Premium | GT Auto",
  description: "Trouvez votre prochain véhicule d'occasion premium parmi notre sélection rigoureusement inspectée et garantie.",
  alternates: {
    canonical: '/inventory',
  },
  openGraph: {
    title: "Inventaire des Véhicules Premium | GT Auto",
    description: "Trouvez votre prochain véhicule d'occasion premium parmi notre sélection rigoureusement inspectée et garantie.",
    url: '/inventory',
  },
};

export default async function InventoryPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialFilters = {
    brand: resolvedSearchParams.brand || '',
    minPrice: resolvedSearchParams.minPrice || '',
    maxPrice: resolvedSearchParams.maxPrice || '',
    year: resolvedSearchParams.year || ''
  };

  const cars = await getCars(initialFilters);

  return (
    <div className="inventory-page" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="inventory-header">
          <h1 className="page-title">VÉHICULES</h1>
          <p className="page-subtitle">Trouvez votre prochain véhicule premium</p>
        </div>

        <div className="inventory-layout">
          {/* Sidebar filters */}
          <FilterSidebar initialFilters={initialFilters} />

          {/* Grid */}
          <main className="inventory-results">
            {cars.length > 0 ? (
              <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                {cars.map(car => <CarCard key={car._id} car={car} />)}
              </div>
            ) : (
              <div className="no-results" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <h3>Aucun véhicule trouvé.</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Essayez de modifier vos filtres de recherche.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
