'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function TagManager({ consent }) {
  const analyticsGranted = !!consent?.analytics;
  const marketingGranted = !!consent?.marketing;

  useEffect(() => {
    if (!GTM_ID) return;
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;

    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: marketingGranted ? 'granted' : 'denied',
      ad_user_data: marketingGranted ? 'granted' : 'denied',
      ad_personalization: marketingGranted ? 'granted' : 'denied',
    });
  }, [analyticsGranted, marketingGranted]);

  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-consent-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}
      </Script>

      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s), dl=l!='dataLayer' ? '&l='+l : '';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </>
  );
}