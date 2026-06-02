'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const FilterSidebar = ({ initialFilters }) => {
  const [filters, setFilters] = useState({
    brand: initialFilters.brand || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    year: initialFilters.year || ''
  });
  const router = useRouter();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (filters.brand) queryParams.append('brand', filters.brand);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.year) queryParams.append('year', filters.year);

    router.push(`/inventory?${queryParams.toString()}`);
  };

  return (
    <aside className="filters-sidebar">
      <h3>FILTRES DE RECHERCHE</h3>
      <form onSubmit={applyFilters}>
        <div className="form-group">
          <label>Marque</label>
          <input type="text" name="brand" value={filters.brand} onChange={handleFilterChange} className="form-control" placeholder="ex: BMW" />
        </div>
        <div className="form-group">
          <label>Prix minimum</label>
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} className="form-control" placeholder="0 €" />
        </div>
        <div className="form-group">
          <label>Prix maximum</label>
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} className="form-control" placeholder="Tous" />
        </div>
        <div className="form-group">
          <label>Année</label>
          <input type="number" name="year" value={filters.year} onChange={handleFilterChange} className="form-control" placeholder="ex: 2022" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Appliquer les filtres</button>
      </form>
    </aside>
  );
};

export default FilterSidebar;
