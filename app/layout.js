import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { siteConfig } from '@/lib/site';
import ConsentManager from '@/components/ConsentManager';

export const metadata = {
  title: `${siteConfig.name} | Outdoor blog starter`,
  description: siteConfig.tagline
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <ConsentManager/>
      <body>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
