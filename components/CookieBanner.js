'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site';

const STORAGE_KEY = 'trailnorth_cookie_consent_v1';

function injectScript(id, src) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function enableTracking({ analytics, marketing }) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);} 
  window.gtag = gtag;

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  if (analytics || marketing) {
    if (siteConfig.gtmId && !siteConfig.gtmId.includes('XXXX')) {
      injectScript('gtm-script', `https://www.googletagmanager.com/gtm.js?id=${siteConfig.gtmId}`);
    }
    if (siteConfig.ga4Id && !siteConfig.ga4Id.includes('XXXX')) {
      injectScript('ga4-script', `https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`);
      gtag('js', new Date());
      gtag('config', siteConfig.ga4Id, { anonymize_ip: true });
    }
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      setVisible(true);
      return;
    }
    const parsed = JSON.parse(existing);
    setAnalytics(!!parsed.analytics);
    setMarketing(!!parsed.marketing);
    enableTracking(parsed);
  }, []);

  const save = (payload) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setAnalytics(!!payload.analytics);
    setMarketing(!!payload.marketing);
    enableTracking(payload);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-inner">
        <div>
          <p className="section-kicker" style={{marginBottom: 6}}>Cookie settings</p>
          <h3 style={{margin: '0 0 10px', fontSize: 24}}>This site uses cookies and similar technologies.</h3>
          <p className="muted" style={{lineHeight: 1.7, margin: 0}}>
            Necessary storage keeps the site working. Analytics and marketing stay blocked until the visitor actively agrees. That is where you later connect Google Tag Manager and GA4.
          </p>

          {showSettings ? (
            <div className="cookie-settings">
              <label className="cookie-item">
                <span>
                  <strong>Necessary</strong>
                  <div className="muted">Required for security and storing consent.</div>
                </span>
                <span className="badge">Always on</span>
              </label>
              <label className="cookie-item">
                <span>
                  <strong>Analytics</strong>
                  <div className="muted">Enable GA4 after consent.</div>
                </span>
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
              </label>
              <label className="cookie-item">
                <span>
                  <strong>Marketing</strong>
                  <div className="muted">Enable ad-related tags only after consent.</div>
                </span>
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              </label>
            </div>
          ) : null}
        </div>
        <div style={{display:'grid', gap: 10, alignContent:'start'}}>
          <button className="btn secondary" onClick={() => save({ analytics: false, marketing: false })}>Reject non-essential</button>
          <button className="btn secondary" onClick={() => setShowSettings((v) => !v)}>{showSettings ? 'Hide settings' : 'Customize'}</button>
          <button className="btn secondary" onClick={() => save({ analytics, marketing })}>Save selection</button>
          <button className="btn" onClick={() => save({ analytics: true, marketing: true })}>Accept all</button>
        </div>
      </div>
    </div>
  );
}
