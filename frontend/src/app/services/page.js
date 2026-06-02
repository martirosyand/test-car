import React from 'react';
import { 
  Drop, 
  Gear, 
  WarningCircle, 
  SteeringWheel, 
  Snowflake, 
  BatteryFull, 
  FileText, 
  IdentificationCard, 
  SlidersHorizontal, 
  Engine, 
  Headlights 
} from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: "Nos Prestations et Services | GT Auto",
  description: "Découvrez l'ensemble de nos services d'entretien et réparation mécanique à Pérignat-sur-Allier. Vidange, freinage, distribution, diagnostic électronique, et démarches de carte grise.",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: "Nos Prestations et Services | GT Auto",
    description: "Découvrez l'ensemble de nos services d'entretien et réparation mécanique à Pérignat-sur-Allier. Vidange, freinage, distribution, diagnostic électronique, et démarches de carte grise.",
    url: '/services',
  },
};

export default function ServicesPage() {
  return (
    <div className="services-page container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <h1 className="section-title">NOS PRESTATIONS</h1>

      <div className="prestations-grid">
        <div className="prestation-card">
          <Drop weight="fill" className="prestation-icon" />
          <h3>Révision et vidange</h3>
          <p>Entretien complet incluant vidange d'huile, remplacement du filtre et contrôles essentiels pour assurer la longévité et les performances de votre véhicule.</p>
          <span className="prestation-badge">Garantie constructeur préservée</span>
        </div>
        
        <div className="prestation-card">
          <Gear weight="fill" className="prestation-icon" />
          <h3>Courroie de distribution</h3>
          <p>Remplacement professionnel de la courroie de distribution pour prévenir tout risque de casse et garantir le bon fonctionnement de votre moteur.</p>
        </div>

        <div className="prestation-card">
          <WarningCircle weight="fill" className="prestation-icon" />
          <h3>Freinage</h3>
          <p>Contrôle, entretien et remplacement des plaquettes, disques et liquide de frein pour garantir votre sécurité en toutes circonstances.</p>
        </div>

        <div className="prestation-card">
          <SteeringWheel weight="fill" className="prestation-icon" />
          <h3>Pneumatiques</h3>
          <p>Montage, équilibrage, géométrie et réparation de pneus toutes marques pour une tenue de route optimale.</p>
        </div>

        <div className="prestation-card">
          <Snowflake weight="fill" className="prestation-icon" />
          <h3>Climatisation</h3>
          <p>Entretien, recharge de gaz, détection de fuite et désinfection de votre système de climatisation.</p>
        </div>

        <div className="prestation-card">
          <BatteryFull weight="fill" className="prestation-icon" />
          <h3>Batterie et démarrage</h3>
          <p>Test d'efficacité, remplacement rapide de batteries et entretien des démarreurs et alternateurs.</p>
        </div>

        <div className="prestation-card">
          <FileText weight="fill" className="prestation-icon" />
          <h3>Carte grise</h3>
          <p>Service d'immatriculation express et gestion complète des démarches administratives officielles SIV.</p>
        </div>

        <div className="prestation-card">
          <IdentificationCard weight="fill" className="prestation-icon" />
          <h3>Plaques d'immatriculation</h3>
          <p>Fabrication immédiate et pose conforme de vos plaques d'immatriculation auto et moto.</p>
        </div>

        <div className="prestation-card">
          <SlidersHorizontal weight="fill" className="prestation-icon" />
          <h3>Amortisseurs & Suspension</h3>
          <p>Remplacement des amortisseurs usés et des éléments de suspension pour plus de confort et de sécurité.</p>
        </div>

        <div className="prestation-card">
          <Engine weight="fill" className="prestation-icon" />
          <h3>Diagnostic & Recherche de panne</h3>
          <p>Recherche de panne mécanique et diagnostic électronique approfondi avec valise multimarque.</p>
        </div>

        <div className="prestation-card">
          <Headlights weight="fill" className="prestation-icon" />
          <h3>Éclairage & Visibilité</h3>
          <p>Rénovation d'optiques de phares, réglage du faisceau et remplacement de vos ampoules de signalisation.</p>
        </div>
      </div>
    </div>
  );
}
