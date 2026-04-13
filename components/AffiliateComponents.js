'use client';

import Link from "next/link";

function trackAffiliateClick({ href }) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "affiliate_click",
    affiliate_url: href,
  });
}

export function AffiliateLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="affiliate-link"
      onClick={() => trackAffiliateClick({ href })}
    >
      {children}
    </a>
  );
}

export function AffiliateBox({ title, description, href, label = 'Empfehlung für Einsteiger' }) {
  return (
    <div className="affiliate-box">
      <div className="affiliate-box-inner">
        <span className="affiliate-box-label">{label}</span>

        <div className="affiliate-box-main">
          <div className="affiliate-box-text">
            <h3 className="affiliate-box-title">{title}</h3>
            <p className="affiliate-box-description">{description}</p>
          </div>

          <div className="affiliate-box-action">
            <a
              href={href}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="affiliate-box-button"
              onClick={() => trackAffiliateClick({ href })}
            >
              Jetzt ansehen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}