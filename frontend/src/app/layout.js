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
  title: "GT Auto | Garage de Confiance",
  description: "Garage de confiance pour l'entretien, la réparation et la vente automobile premium.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 're9Hy3HFrMLepqj-kV1oceIbYFQ0oHN0C7Fv_iwhrok',
  },
  openGraph: {
    title: "GT Auto | Garage de Confiance",
    description: "Garage de confiance pour l'entretien, la réparation et la vente automobile premium.",
    url: '/',
    siteName: 'GT Auto',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GT Auto | Garage de Confiance",
    description: "Garage de confiance pour l'entretien, la réparation et la vente automobile premium.",
    images: ['/logo.png'],
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
