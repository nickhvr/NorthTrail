'use client';

import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function TagManager({ consent }) {
  const analyticsGranted = !!consent?.analytics;
  const marketingGranted = !!consent?.marketing;

  if (!GTM_ID) return null;
  if (!analyticsGranted && !marketingGranted) return null;

  return (
    <>
      <Script id="gtm-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'consent_initialized',
            analytics_consent: '${analyticsGranted ? 'granted' : 'denied'}',
            ad_consent: '${marketingGranted ? 'granted' : 'denied'}'
          });
        `}
      </Script>

      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
    </>
  );
}