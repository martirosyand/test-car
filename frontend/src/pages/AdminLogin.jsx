import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
const API_URL = import.meta.env.VITE_API_URL;


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/admin/verify`);
        navigate('/admin/dashboard');
      } catch (err) {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/login`, credentials);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la connexion');
    }
  };

  if (checkingAuth) {
    return <div className="container" style={{ paddingTop: '150px' }}><p>Chargement...</p></div>;
  }

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
