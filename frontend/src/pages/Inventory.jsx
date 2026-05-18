import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import './Inventory.css';
const API_URL = import.meta.env.VITE_API_URL;

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    year: ''
  });

  const fetchCars = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.brand) queryParams.append('brand', filters.brand);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.year) queryParams.append('year', filters.year);

      const res = await axios.get(`${API_URL}/api/cars?${queryParams.toString()}`);
      setCars(res.data);
    } catch (err) {
      console.error('Failed to fetch cars', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="inventory-page">
      <div className="container">
        <div className="inventory-header">
          <h1 className="page-title">VÉHICULES</h1>
          <p className="page-subtitle">Trouvez votre prochain véhicule premium</p>
        </div>

        <div className="inventory-layout">
          {/* Sidebar filters */}
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

          {/* Grid */}
          <main className="inventory-results">
            {loading ? (
              <p>Chargement des véhicules...</p>
            ) : cars.length > 0 ? (
              <div className="grid">
                {cars.map(car => <CarCard key={car._id} car={car} />)}
              </div>
            ) : (
              <div className="no-results">
                <h3>Aucun véhicule trouvé.</h3>
                <p>Essayez de modifier vos filtres de recherche.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
