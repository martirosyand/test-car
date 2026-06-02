import React from 'react';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata = {
  title: "Tableau de Bord Administration | GT Auto",
  description: "Gestion de l'inventaire des véhicules, des remises, et des demandes d'entretien.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/admin/dashboard',
  },
  openGraph: {
    title: "Tableau de Bord Administration | GT Auto",
    description: "Gestion de l'inventaire des véhicules, des remises, et des demandes d'entretien.",
    url: '/admin/dashboard',
  },
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
