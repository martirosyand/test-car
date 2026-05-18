import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
const API_URL = import.meta.env.VITE_API_URL;


const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('cars'); // 'cars' or 'services'

  // Form State for new car
  const [carForm, setCarForm] = useState({
    title: '', brand: '', model: '', year: '', price: '', mileage: '', engine: '', transmission: '', description: ''
  });
  const [images, setImages] = useState(null);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [carsRes, servicesRes] = await Promise.all([
        axios.get(`${API_URL}/api/cars`),
        axios.get(`${API_URL}/api/services`, config)
      ]);
      setCars(carsRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleCarInput = (e) => setCarForm({ ...carForm, [e.target.name]: e.target.value });

  const handleAddCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    for (let key in carForm) formData.append(key, carForm[key]);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      await axios.post(`${API_URL}/api/cars`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      // clear form
      setCarForm({ title: '', brand: '', model: '', year: '', price: '', mileage: '', engine: '', transmission: '', description: '' });
      setImages(null);
      document.getElementById('image-input').value = "";
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Échec de l\'ajout du véhicule');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Supprimer ce véhicule ?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateServiceStatus = async (id, status) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`${API_URL}/api/services/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="container" style={{ paddingTop: '150px' }}><p>Chargement...</p></div>;

  return (
    <div className="admin-dashboard container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="dashboard-header">
        <h1>Tableau de Bord Administration</h1>
        <button onClick={handleLogout} className="btn btn-outline">Déconnexion</button>
      </div>

      <div className="dashboard-controls">
        <button className={`btn ${view === 'cars' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('cars')}>Gérer les Véhicules</button>
        <button className={`btn ${view === 'services' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('services')}>Demandes de Service</button>
      </div>

      {view === 'cars' && (
        <div className="dashboard-section">
          <h2>Ajouter un Véhicule</h2>
          <form className="contact-form add-car-form" onSubmit={handleAddCar}>
            <div className="grid-form">
              <div className="form-group">
                <label>Titre</label>
                <input type="text" name="title" value={carForm.title} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Marque</label>
                <input type="text" name="brand" value={carForm.brand} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Modèle</label>
                <input type="text" name="model" value={carForm.model} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Année</label>
                <input type="number" name="year" value={carForm.year} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Prix</label>
                <input type="number" name="price" value={carForm.price} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Kilométrage</label>
                <input type="number" name="mileage" value={carForm.mileage} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Moteur</label>
                <input type="text" name="engine" value={carForm.engine} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <input type="text" name="transmission" value={carForm.transmission} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <textarea name="description" value={carForm.description} onChange={handleCarInput} className="form-control"></textarea>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Images (Sélection multiple)</label>
                <input id="image-input" type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} className="form-control" style={{ padding: '0.8rem' }} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Ajouter le véhicule</button>
          </form>

          <h2 style={{ marginTop: '3rem' }}>Inventaire Actuel</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(c => (
                  <tr key={c._id}>
                    <td>{c.brand}</td>
                    <td>{c.model}</td>
                    <td>{c.year}</td>
                    <td>{c.price.toLocaleString('fr-FR')} €</td>
                    <td>
                      <button onClick={() => handleDeleteCar(c._id)} className="btn btn-danger" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Supprimer</button>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>Aucun véhicule trouvé.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'services' && (
        <div className="dashboard-section">
          <h2>Demandes de Service</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s._id}>
                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td>{s.name}</td>
                    <td>{s.phone}<br />{s.email}</td>
                    <td>{s.serviceWanted}</td>
                    <td>
                      <span className={`status-badge status-${s.status}`}>{s.status}</span>
                    </td>
                    <td>
                      {s.status === 'pending' && <button onClick={() => updateServiceStatus(s._id, 'completed')} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Terminer</button>}
                      {s.status === 'completed' && <button onClick={() => updateServiceStatus(s._id, 'pending')} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Rouvrir</button>}
                    </td>
                  </tr>
                ))}
                {services.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center' }}>Aucune demande de service.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
