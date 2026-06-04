import "./globals.css";
import "@/styles/Navbar.css";
import "@/styles/Footer.css";
import "@/styles/CarCard.css";
import "@/styles/Home.css";
import "@/styles/Inventory.css";
import "@/styles/CarDetails.css";
import "@/styles/Services.css";
import "@/styles/Contact.css";
import "@/styles/Admin.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "GT Auto | Garage de Confiance",
    template: "%s | GT Auto"
  },
  description: "Garage de confiance pour l'entretien, la réparation et la vente automobile premium.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: './',
  },
  // CRITICAL FIX: Explicit icon map to resolve Google's search result icon requirements
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 're9Hy3HFrMLepqj-kV1oceIbYFQ0oHN0C7Fv_iwhrok',
  },
  openGraph: {
    title: "GT Auto | Garage de Confiance",
    description: "Garage de confiance pour l'entretien, la réparation et la vente automobile premium.",
    url: './',
    siteName: 'GT Auto',
    images: [
      {
        url: '/og-image.jpg', // Ideally use a dedicated 1200x630 OG image rather than a small logo file
        width: 1200,
        height: 630,
        alt: 'Garage GT Auto - Véhicules Premium',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GT Auto | Garage de Confiance",
    description: "Garage de confiance pour l'entretien, la réparation et la vente automobile premium.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}