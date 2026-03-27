import Breadcrumbs from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Datenschutz | TrailNorth',
  description: 'Datenschutzseite von TrailNorth'
};

export default function PrivacyPolicyPage() {
  return (
    <main className="section">
      <div className="container" style={{maxWidth: 900}}>
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Cookies' }]}
        variant="light"
      />        
      <div className="legal">
          <p className="section-kicker">Legal</p>
          <h1 className="section-title">Privacy Policy</h1>
          <h2>1. Controller</h2>
          <p>{siteConfig.legalName}<br />{siteConfig.address}<br />{siteConfig.email}</p>
          <h2>2. Hosting and logs</h2>
          <p>Your hosting provider may process IP addresses, timestamps, browser details and log information to provide the website securely.</p>
          <h2>3. Consent-based analytics</h2>
          <p>Google Tag Manager and Google Analytics 4 should only be activated after valid user consent through the cookie banner.</p>
          <h2>4. Affiliate links</h2>
          <p>This website may contain affiliate links. Third-party providers may process data after a visitor clicks such a link.</p>
          <h2>5. Data subject rights</h2>
          <p>Depending on applicable law, users may have rights to access, correction, deletion, restriction, objection and complaint.</p>
        </div>
      </div>
    </main>
  );
}
