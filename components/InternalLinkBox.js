"use client";

import Link from "next/link";

function trackInternalLinkClick({ href, title, label }) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "internal_link_click",
    link_url: href,
    link_title: title,
    link_label: label,
  });
}

export default function InternalLinkBox({
  title,
  description,
  href,
  trackingId,
  label = "Weiterführender Artikel",
}) {
  return (
    <div
      className="internal-link-box"
      data-track-id={trackingId}
      data-track-type="internal_link"
    >
      <div className="internal-link-box-inner">
        <span className="internal-link-box-label">{label}</span>

        <div className="internal-link-box-main">
          <div className="internal-link-box-text">
            <h3 className="internal-link-box-title">{title}</h3>
            <p className="internal-link-box-description">{description}</p>
          </div>

          <div className="internal-link-box-action">
            <Link
              href={href}
              className="internal-link-box-button"
              onClick={() =>
                trackInternalLinkClick({
                  href,
                  title,
                  label,
                })
              }
            >
              Jetzt lesen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}