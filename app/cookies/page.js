import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cookies | TrailNorth',
  description: 'Cookie information page'
};

export default function CookiesPage() {
  return (
    <main className="section">
      <div className="container" style={{maxWidth: 900}}>
        <Breadcrumbs
  items={[{ label: 'Home', href: '/' }, { label: 'Cookies' }]}
  variant="light"
/>
        <div className="legal">
          <p className="section-kicker">Legal</p>
          <h1 className="section-title">Cookies</h1>
          <h2>Necessary storage</h2>
          <p>Required for the basic operation of the website, including storing the consent state.</p>
          <h2>Analytics</h2>
          <p>Analytics remains blocked until the visitor explicitly agrees. In this project, that is where GA4 should be connected.</p>
          <h2>Marketing</h2>
          <p>Marketing technologies should only load after explicit consent. If you do not run ads, you can keep this category disabled permanently.</p>
          <h2>Consent management</h2>
          <p>The banner allows visitors to reject non-essential storage, accept all, or save a granular selection.</p>
        </div>
      </div>
    </main>
  );
}
