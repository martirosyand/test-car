'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Ensure cookie-based sessions work by enabling credentials on all requests
axios.defaults.withCredentials = true;

export default function AdminDashboardClient() {
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('cars'); // 'cars' or 'services' or 'discounts'

  // Form State for new car
  const [carForm, setCarForm] = useState({
    title: '', brand: '', model: '', year: '', price: '', mileage: '', engine: '', transmission: '', description: ''
  });
  const [images, setImages] = useState(null);

  // Form State for discounts
  const [discountForm, setDiscountForm] = useState({
    title: '',
    description: '',
    discountValue: '',
    discountType: 'percentage',
    startDate: '',
    endDate: '',
    isActive: true
  });
  const [editingDiscountId, setEditingDiscountId] = useState(null);

  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      const [carsRes, servicesRes, discountsRes] = await Promise.all([
        axios.get('/api/cars'),
        axios.get('/api/services'),
        axios.get('/api/discounts/all')
      ]);
      setCars(carsRes.data);
      setServices(servicesRes.data);
      setDiscounts(discountsRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        router.push('/admin');
      }
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/admin/logout');
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    router.push('/admin');
  };

  const handleCarInput = (e) => setCarForm({ ...carForm, [e.target.name]: e.target.value });

  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in carForm) formData.append(key, carForm[key]);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      await axios.post('/api/cars', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // clear form
      setCarForm({ title: '', brand: '', model: '', year: '', price: '', mileage: '', engine: '', transmission: '', description: '' });
      setImages(null);
      const fileInput = document.getElementById('image-input');
      if (fileInput) fileInput.value = "";
      fetchDashboardData();
      alert('Véhicule ajouté avec succès');
    } catch (err) {
      console.error(err);
      alert('Échec de l\'ajout du véhicule');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Supprimer ce véhicule ?')) return;
    try {
      await axios.delete(`/api/cars/${id}`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Échec de la suppression du véhicule');
    }
  };

  const updateServiceStatus = async (id, status) => {
    try {
      await axios.put(`/api/services/${id}`, { status });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Échec de la modification du statut');
    }
  };

  const handleDiscountInput = (e) => {
    const { name, value } = e.target;
    setDiscountForm({ ...discountForm, [name]: value });
  };

  const handleDiscountCheckbox = (e) => {
    const { name, checked } = e.target;
    setDiscountForm({ ...discountForm, [name]: checked });
  };

  const handleAddOrUpdateDiscount = async (e) => {
    e.preventDefault();

    const payload = {
      ...discountForm,
      discountValue: Number(discountForm.discountValue),
      startDate: discountForm.startDate ? new Date(discountForm.startDate) : null,
      endDate: discountForm.endDate ? new Date(discountForm.endDate) : null
    };

    try {
      if (editingDiscountId) {
        await axios.put(`/api/discounts/${editingDiscountId}`, payload);
        alert('Remise modifiée avec succès');
      } else {
        await axios.post('/api/discounts', payload);
        alert('Remise ajoutée avec succès');
      }
      
      setDiscountForm({
        title: '', description: '', discountValue: '', discountType: 'percentage', startDate: '', endDate: '', isActive: true
      });
      setEditingDiscountId(null);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Échec de l\'opération');
    }
  };

  const handleEditDiscount = (discount) => {
    setEditingDiscountId(discount._id);
    
    const formatInputDate = (dateStr) => {
      if (!dateStr) return '';
      return new Date(dateStr).toISOString().split('T')[0];
    };

    setDiscountForm({
      title: discount.title || '',
      description: discount.description || '',
      discountValue: discount.discountValue || '',
      discountType: discount.discountType || 'percentage',
      startDate: formatInputDate(discount.startDate),
      endDate: formatInputDate(discount.endDate),
      isActive: discount.isActive !== undefined ? discount.isActive : true
    });

    const formElement = document.getElementById('discount-form-element');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setDiscountForm({
      title: '', description: '', discountValue: '', discountType: 'percentage', startDate: '', endDate: '', isActive: true
    });
    setEditingDiscountId(null);
  };

  const handleDeleteDiscount = async (id) => {
    if (!window.confirm('Supprimer cette remise ?')) return;
    try {
      await axios.delete(`/api/discounts/${id}`);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Échec de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="dashboard-header">
        <h1>Tableau de Bord Administration</h1>
        <button onClick={handleLogout} className="btn btn-outline">Déconnexion</button>
      </div>

      <div className="dashboard-controls">
        <button className={`btn ${view === 'cars' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('cars')}>Gérer les Véhicules</button>
        <button className={`btn ${view === 'services' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('services')}>Demandes de Service</button>
        <button className={`btn ${view === 'discounts' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('discounts')}>Gérer les Remises</button>
      </div>

      {view === 'cars' && (
        <div className="dashboard-section">
          <h2>Ajouter un Véhicule</h2>
          <form className="contact-form add-car-form" onSubmit={handleAddCar}>
            <div className="grid-form">
              <div className="form-group">
                <label htmlFor="car-title">Titre</label>
                <input type="text" id="car-title" name="title" value={carForm.title} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-brand">Marque</label>
                <input type="text" id="car-brand" name="brand" value={carForm.brand} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-model">Modèle</label>
                <input type="text" id="car-model" name="model" value={carForm.model} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-year">Année</label>
                <input type="number" id="car-year" name="year" value={carForm.year} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-price">Prix (€)</label>
                <input type="number" id="car-price" name="price" value={carForm.price} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-mileage">Kilométrage (km)</label>
                <input type="number" id="car-mileage" name="mileage" value={carForm.mileage} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-engine">Moteur</label>
                <input type="text" id="car-engine" name="engine" value={carForm.engine} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="car-transmission">Transmission</label>
                <input type="text" id="car-transmission" name="transmission" value={carForm.transmission} onChange={handleCarInput} className="form-control" required />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="car-description">Description</label>
                <textarea id="car-description" name="description" value={carForm.description} onChange={handleCarInput} className="form-control" rows="4"></textarea>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="image-input">Images (Sélection multiple)</label>
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
                  <th>Message</th>
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
                    <td>{s.message}</td>
                    <td>
                      <span className={`status-badge status-${s.status}`}>{s.status}</span>
                    </td>
                    <td>
                      {s.status === 'pending' && <button onClick={() => updateServiceStatus(s._id, 'completed')} className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Terminer</button>}
                      {s.status === 'completed' && <button onClick={() => updateServiceStatus(s._id, 'pending')} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Rouvrir</button>}
                    </td>
                  </tr>
                ))}
                {services.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center' }}>Aucune demande de service.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'discounts' && (
        <div className="dashboard-section">
          <h2 id="discount-form-element">{editingDiscountId ? 'Modifier la Remise' : 'Ajouter une Remise'}</h2>
          <form className="contact-form add-car-form" onSubmit={handleAddOrUpdateDiscount}>
            <div className="grid-form">
              <div className="form-group">
                <label htmlFor="discount-title">Titre de l'offre</label>
                <input type="text" id="discount-title" name="title" value={discountForm.title} onChange={handleDiscountInput} className="form-control" placeholder="Ex: Offre de Printemps" required />
              </div>
              <div className="form-group">
                <label htmlFor="discount-value">Valeur de la remise</label>
                <input type="number" id="discount-value" name="discountValue" value={discountForm.discountValue} onChange={handleDiscountInput} className="form-control" placeholder="Ex: 15 ou 1500" required />
              </div>
              <div className="form-group">
                <label htmlFor="discount-type">Type de remise</label>
                <select id="discount-type" name="discountType" value={discountForm.discountType} onChange={handleDiscountInput} className="form-control" required style={{ appearance: 'none', WebkitAppearance: 'none' }}>
                  <option value="percentage">Pourcentage (%)</option>
                  <option value="fixed">Montant fixe (€)</option>
                </select>
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '1.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', margin: 0 }}>
                  <input type="checkbox" name="isActive" checked={discountForm.isActive} onChange={handleDiscountCheckbox} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-color)' }} />
                  <span>Activer cette remise</span>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="discount-start">Date de début (optionnelle)</label>
                <input type="date" id="discount-start" name="startDate" value={discountForm.startDate} onChange={handleDiscountInput} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="discount-end">Date de fin (optionnelle)</label>
                <input type="date" id="discount-end" name="endDate" value={discountForm.endDate} onChange={handleDiscountInput} className="form-control" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="discount-description">Description de l'offre</label>
                <textarea id="discount-description" name="description" value={discountForm.description} onChange={handleDiscountInput} className="form-control" placeholder="Décrivez les conditions de l'offre..." rows="3"></textarea>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">{editingDiscountId ? 'Enregistrer les modifications' : 'Ajouter la remise'}</button>
              {editingDiscountId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-outline">Annuler</button>
              )}
            </div>
          </form>

          <h2 style={{ marginTop: '3rem' }}>Remises et Offres Actuelles</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Valeur</th>
                  <th>Validité</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map(d => {
                  const now = new Date();
                  const startPassed = !d.startDate || new Date(d.startDate) <= now;
                  const endFuture = !d.endDate || new Date(d.endDate) >= now;
                  const isDateActive = startPassed && endFuture;
                  const isFullyActive = d.isActive && isDateActive;

                  let statusText = 'Inactif';
                  let statusClass = 'status-pending'; // Orange/Yellow
                  if (d.isActive) {
                    if (isDateActive) {
                      statusText = 'Actif';
                      statusClass = 'status-completed'; // Green
                    } else if (!startPassed) {
                      statusText = 'Planifié';
                      statusClass = 'status-pending'; // Orange
                    } else {
                      statusText = 'Expiré';
                      statusClass = 'status-pending'; // Orange (expired)
                    }
                  }

                  return (
                    <tr key={d._id}>
                      <td style={{ fontWeight: '600' }}>{d.title}</td>
                      <td>
                        {d.discountType === 'percentage' ? `${d.discountValue}%` : `${d.discountValue.toLocaleString('fr-FR')} €`}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {d.startDate || d.endDate ? (
                          <>
                            {d.startDate && `Du ${new Date(d.startDate).toLocaleDateString('fr-FR')} `}
                            {d.endDate && `Au ${new Date(d.endDate).toLocaleDateString('fr-FR')}`}
                          </>
                        ) : (
                          'Permanente'
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${statusClass}`} style={statusText === 'Expiré' ? { background: 'rgba(255, 71, 87, 0.2)', color: '#ff4757', borderColor: '#ff4757' } : {}}>
                          {statusText}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleEditDiscount(d)} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Modifier</button>
                          <button onClick={() => handleDeleteDiscount(d._id)} className="btn btn-danger" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {discounts.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center' }}>Aucune remise trouvée.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
