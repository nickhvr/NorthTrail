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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setShowBanner(true);
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      const merged = { ...DEFAULT_CONSENT, ...parsed };

      setConsent(merged);
      setAnalytics(!!merged.analytics);
      setMarketing(!!merged.marketing);
      setShowBanner(false);
    } catch {
      setShowBanner(true);
    } finally {
      setIsReady(true);
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
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: normalized }));
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
                Wir nutzen die notwendige Technologie für die Hauptfunktion der Seite.
                Analytics und Marketing Werkzeuge wie Google Tag Manager und Google
                Analytics 4 werden erst entsprechend Ihrer Zustimmung aktiviert.
              </p>

              {settingsOpen ? (
                <div className="cookie-settings">
                  <label className="cookie-option">
                    <span>
                      <strong>Necessary</strong>
                      <small>Erforderlich für die Funktion der Seite.</small>
                    </span>
                    <span>Immer aktiv</span>
                  </label>

                  <label className="cookie-option">
                    <span>
                      <strong>Analytics</strong>
                      <small>Ermöglicht GA4 Messungen mit deiner Zustimmung.</small>
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
                      <small>Ermöglicht werbebezogene Google Signale nach deiner Zustimmung.</small>
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
                Alle ablehnen
              </button>

              <button
                className="btn secondary"
                onClick={() => setSettingsOpen((v) => !v)}
              >
                {settingsOpen ? 'Einstellungen schließen' : 'Anpassen'}
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

      {isReady ? <TagManager consent={consent} /> : null}
    </>
  );
}