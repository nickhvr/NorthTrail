'use client';

import { useEffect, useState } from 'react';
import TagManager from '@/components/TagManager';

const STORAGE_KEY = 'tn_cookie_consent_v1';

export default function ConsentManager() {
  const [consent, setConsent] = useState(null);
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
      setConsent(parsed);
      setAnalytics(!!parsed.analytics);
      setMarketing(!!parsed.marketing);
      setShowBanner(false);
    } catch {
      setShowBanner(true);
    }
  }, []);

  function saveConsent(nextConsent) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConsent));
    setConsent(nextConsent);
    setAnalytics(!!nextConsent.analytics);
    setMarketing(!!nextConsent.marketing);
    setShowBanner(false);
    window.dispatchEvent(new Event('consent-updated'));
  }

  return (
    <>
      <TagManager consent={consent} />

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
                Reject non-essential
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
                Save selection
              </button>

              <button
                className="btn"
                onClick={() => saveConsent({ analytics: true, marketing: true })}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}