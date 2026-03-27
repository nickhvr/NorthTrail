'use client';

import { useEffect, useState } from 'react';
import TagManager from '@/components/TagManager';

const STORAGE_KEY = 'tn_consent_v2';

const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: 2,
  updatedAt: null
};

export default function ConsentManager() {

  const [consent, setConsent] = useState(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setShowBanner(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setConsent(DEFAULT_CONSENT, parsed);
      setAnalytics(!!parsed.analytics);
      setMarketing(!!parsed.marketing);
      setShowBanner(false);
    } catch {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
  const openSettings = () => {
    setShowBanner(true);
    setSettingsOpen(true);
  };

  window.addEventListener('open-cookie-settings', openSettings);

  return () => {
    window.removeEventListener('open-cookie-settings', openSettings);
  };
}, []);

function saveConsent(nextConsent) {
  const normalized = {
    necessary: true,
    analytics: !!nextConsent.analytics,
    marketing: !!nextConsent.marketing,
    version: 2,
    updatedAt: new Date().toISOString()
  };

  setConsent(normalized);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event('consent-updated'));
  setShowBanner(false);
  setSettingsOpen(false);
}

  return (
    <>
      {showBanner ? (
        <div className="cookie-banner">
          <div className="container cookie-inner">
            <div>
              <h3>Cookies & tracking</h3>
              <p>
                We use necessary technologies for core functionality. Analytics and
                marketing tools such as Google Tag Manager and Google Analytics 4
                are only activated after your consent.
              </p>

              {settingsOpen ? (
                <div className="cookie-settings">
                  <label className="cookie-option">
                    <span>
                      <strong>Necessary</strong>
                      <small>Required for the website to work.</small>
                    </span>
                    <span>Always active</span>
                  </label>

                  <label className="cookie-option">
                    <span>
                      <strong>Analytics</strong>
                      <small>Enable GA4 measurement after consent.</small>
                    </span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                    />
                  </label>

                  <label className="cookie-option">
                    <span>
                      <strong>Marketing</strong>
                      <small>Enable advertising-related Google signals after consent.</small>
                    </span>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                    />
                  </label>
                </div>
              ) : null}
            </div>

            <div className="cookie-actions">
              <button
                className="btn secondary"
                onClick={() => saveConsent({ analytics: false, marketing: false })}
              >
                Alle Ablehnen
              </button>

              <button
                className="btn secondary"
                onClick={() => setSettingsOpen((v) => !v)}
              >
                {settingsOpen ? 'Hide settings' : 'Customize'}
              </button>

              <button
                className="btn"
                onClick={() => saveConsent({ analytics, marketing })}
              >
                Auswahl speichern
              </button>

              <button
                className="btn"
                onClick={() => saveConsent({ analytics: true, marketing: true })}
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <TagManager consent={consent} />
    </>
  );
}