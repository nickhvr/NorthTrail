import Breadcrumbs from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Impressum | TrailNorth',
  description: 'Impressum template'
};

export default function ImpressumPage() {
  return (
    <main className="section">
      <div className="container" style={{maxWidth: 900}}>
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        variant="light"
      />
        <div className="legal">
          <p className="section-kicker">Legal</p>
          <h1 className="section-title">Impressum</h1>
          <h2>Angaben</h2>
          <p>{siteConfig.legalName}<br />{siteConfig.address}</p>
          <h2>Kontakt</h2>
          <p>E-Mail: {siteConfig.email}<br />Telefon: {siteConfig.phone}</p>
          <h2>Verantwortlich für Inhalte</h2>
          <p>{siteConfig.legalName}</p>
          <h2>Affiliate-Hinweis</h2>
          <p>Diese Website kann Affiliate-Links enthalten. Beim Kauf über solche Links kann eine Provision anfallen, ohne dass sich der Preis ändert.</p>
        </div>
      </div>
    </main>
  );
}
