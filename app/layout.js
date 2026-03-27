import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/site';
import ConsentManager from '@/components/ConsentManager';

export const metadata = {
  title: `${siteConfig.name} | Outdoor blog starter`,
  description: siteConfig.tagline
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Header />
        {children}
        <Footer />
        <ConsentManager/>
      </body>
    </html>
  );
}
