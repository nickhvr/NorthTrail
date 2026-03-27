'use client';

import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function TagManager({ consent }) {
  const analyticsGranted = !!consent?.analytics;
  const marketingGranted = !!consent?.marketing;

  if (!GTM_ID) return null;

  return (
    <>
      <Script id="consent-mode-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
        `}
      </Script>

      {analyticsGranted || marketingGranted ? (
        <>
          <Script id="gtm-loader" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>

          <Script id="consent-mode-update" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              gtag('consent', 'update', {
                analytics_storage: '${analyticsGranted ? 'granted' : 'denied'}',
                ad_storage: '${marketingGranted ? 'granted' : 'denied'}',
                ad_user_data: '${marketingGranted ? 'granted' : 'denied'}',
                ad_personalization: '${marketingGranted ? 'granted' : 'denied'}',
                functionality_storage: 'granted',
                security_storage: 'granted'
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}