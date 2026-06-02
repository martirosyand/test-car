'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X } from '@phosphor-icons/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="GT Auto" className="nav-logo-img" />
        </Link>
        <div className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <List size={28} />}
        </div>
        <nav className={mobileOpen ? 'active' : ''}>
          <ul>
            <li><Link href="/" onClick={closeMenu} className={pathname === '/' ? 'active-link' : ''}>ACCUEIL</Link></li>
            <li><Link href="/inventory" onClick={closeMenu} className={pathname === '/inventory' ? 'active-link' : ''}>VÉHICULES</Link></li>
            <li><Link href="/services" onClick={closeMenu} className={pathname === '/services' ? 'active-link' : ''}>NOS PRESTATIONS</Link></li>
            <li><Link href="/contact" onClick={closeMenu} className={pathname === '/contact' ? 'active-link' : ''}>CONTACT</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
