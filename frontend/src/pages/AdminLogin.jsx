import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
const API_URL = import.meta.env.VITE_API_URL;


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, credentials);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la connexion');
    }
  };

  return (
    <div className="admin-page">
      <div className="login-container">
        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Accès Administration</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin} className="contact-form" style={{ padding: '2rem' }}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input type="text" name="username" value={credentials.username} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
