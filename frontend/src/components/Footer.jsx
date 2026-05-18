import React from 'react';
import { Link } from 'react-router-dom';
import { CarProfile, FacebookLogo, InstagramLogo, TwitterLogo, YoutubeLogo } from '@phosphor-icons/react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              {/* <CarProfile weight="fill" className="logo-accent" />
              GT<span className="logo-accent">AUTO</span> */}
              <img src="/public/logo.png" alt="GT Auto" width={150} />
            </Link>
            <p>Des soins premium pour votre voiture. Transparence, excellence et passion automobile pour des résultats impeccables.</p>
          </div>

          <div className="footer-col">
            <h4>LIENS RAPIDES</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/inventory">Véhicules</Link></li>
              <li><Link to="/services">Nos prestations</Link></li>
              <li><Link to="/services#contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>LÉGAL</h4>
            <ul className="footer-links">
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Conditions d'utilisation</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SUIVEZ-NOUS</h4>
            <div className="social-links">
              <a href="#"><FacebookLogo size={24} /></a>
              <a href="#"><InstagramLogo size={24} /></a>
              <a href="#"><TwitterLogo size={24} /></a>
              <a href="#"><YoutubeLogo size={24} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GT Auto. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
