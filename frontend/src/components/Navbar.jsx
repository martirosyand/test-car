import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CarProfile, List, X, User } from '@phosphor-icons/react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="GT Auto" className="nav-logo-img" />
        </Link>
        <div className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <List size={28} />}
        </div>
        <nav className={mobileOpen ? 'active' : ''}>
          <ul>
            <li><Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active-link' : ''}>ACCUEIL</Link></li>
            <li><Link to="/inventory" onClick={closeMenu} className={location.pathname === '/inventory' ? 'active-link' : ''}>VÉHICULES</Link></li>
            <li><Link to="/services" onClick={closeMenu} className={location.pathname === '/services' ? 'active-link' : ''}>NOS PRESTATIONS</Link></li>
            <li><Link to="/services#contact" onClick={closeMenu}>CONTACT</Link></li>
            <li>
              <Link to="/admin" onClick={closeMenu} className={`admin-link ${location.pathname.startsWith('/admin') ? 'active-link' : ''}`}>
                <User size={18} /> Navigation privée
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
