import React from 'react';
import Link from 'next/link';
import { FacebookLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <img src="/logo.png" alt="GT Auto" width={150} />
            </Link>
            <p>Des soins premium pour votre voiture. Transparence, excellence et passion automobile pour des résultats impeccables.</p>
          </div>

          <div className="footer-col">
            <h4>LIENS RAPIDES</h4>
            <ul className="footer-links">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/inventory">Véhicules</Link></li>
              <li><Link href="/services">Nos prestations</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SUIVEZ-NOUS</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/gtauto63"  target="_blank" rel="noopener noreferrer"><FacebookLogo size={24} /></a>
              <a href="https://www.instagram.com/gtauto63/"  target="_blank" rel="noopener noreferrer"><InstagramLogo size={24} /></a>
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
