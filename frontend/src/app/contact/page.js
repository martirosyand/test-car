import React from 'react';
import { PhoneCall, EnvelopeSimple, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: "Contactez-nous | GT Auto",
  description: "Contactez le garage GT Auto à Pérignat-sur-Allier. Réservez un essai de véhicule, demandez un rendez-vous d'entretien ou contactez-nous par téléphone ou e-mail.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contactez-nous | GT Auto",
    description: "Contactez le garage GT Auto à Pérignat-sur-Allier. Réservez un essai de véhicule, demandez un rendez-vous d'entretien ou contactez-nous par téléphone ou e-mail.",
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="contact-page container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <h2 className="section-title">Contactez-<span className="text-accent">nous</span></h2>
      
      <div id="contact" className="contact-grid">
        <div className="contact-info-wrap">
          <div className="contact-item">
            <div className="contact-icon"><PhoneCall weight="fill" /></div>
            <div className="contact-details">
              <h3>Appelez-nous</h3>
              <a href="tel:+33668685168">+33 6 68 68 51 68</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon"><EnvelopeSimple weight="fill" /></div>
            <div className="contact-details">
              <h3>Email</h3>
              <a href="mailto:gtauto63@yahoo.com">gtauto63@yahoo.com</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon"><MapPin weight="fill" /></div>
            <div className="contact-details">
              <h3>Localisation</h3>
              <p>3 BIS ROUTE DU PONT<br />PERIGNAT SUR ALLIER, 63800</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon"><Clock weight="fill" /></div>
            <div className="contact-details">
              <h3>Horaires d'ouverture</h3>
              <p>Lun - Ven: 9:00 - 18:30<br />Sam: 10:00 - 16:00<br />Dim: Fermé</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d845.1599620750247!2d3.2247034118518387!3d45.72870555340456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f6e31e3f50389d%3A0x772d86363b3380ab!2zMyBSdGUgZHUgUG9udCwgNjM4MDAgUMOpcmlnbmF0LXN1ci1BbGxpZXIsINCk0YDQsNC90YbQuNGP!5e0!3m2!1sfr!2fr!4v1780341437158!5m2!1sfr!2fr&hl=fr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Garage Location"
        />
      </div>
    </div>
  );
}
