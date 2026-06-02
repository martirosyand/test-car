import React from 'react';
import AdminLoginClient from './AdminLoginClient';

export const metadata = {
  title: "Connexion Administration | GT Auto",
  description: "Espace d'administration réservé pour le garage GT Auto.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/admin',
  },
  openGraph: {
    title: "Connexion Administration | GT Auto",
    description: "Espace d'administration réservé pour le garage GT Auto.",
    url: '/admin',
  },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
