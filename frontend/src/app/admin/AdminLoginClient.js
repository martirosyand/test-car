'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Ensure cookie-based sessions work by enabling credentials on all requests
axios.defaults.withCredentials = true;

export default function AdminLoginClient() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/admin/verify');
        router.push('/admin/dashboard');
      } catch (err) {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/login', credentials);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la connexion');
    }
  };

  if (checkingAuth) {
    return (
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="admin-page container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="login-container">
        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>
          Accès Administration
        </h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleLogin} className="contact-form" style={{ padding: '2rem' }}>
          <div className="form-group">
            <label htmlFor="login-username">Nom d'utilisateur</label>
            <input 
              type="text" 
              id="login-username"
              name="username" 
              value={credentials.username} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">Mot de passe</label>
            <input 
              type="password" 
              id="login-password"
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
