import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/site';
import ConsentManager from '@/components/ConsentManager';
import { imageConfig } from '@/lib/image';

export const metadata = {
  title: `${siteConfig.name} | Outdoor blog starter`,
  description: siteConfig.tagline,
  icons: {
    icon: imageConfig.logo,
  },
  verification: {
    google: "sKkMZv_VrUCvudOiyyLv1wY9vXTIvWEbGXUwqU9C0sI"
  }
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
