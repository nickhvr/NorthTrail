"use client";

import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.tagline}</p>
        </div>
        <div>
          <strong>Navigation</strong>
          <p><Link href="/">Home</Link></p>
          <p><Link href="/blog">Blog</Link></p>
          <p><Link href="/hiking">Hiking</Link></p>
        </div>
        <div>
          <strong>Legal</strong>
          <p><Link href="/privacy-policy">Privacy Policy</Link></p>
          <p><Link href="/cookies">Cookies</Link></p>
          <p><Link href="/impressum">Impressum</Link></p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'inherit'
            }}
          >
            Cookie-Einstellungen
        </button>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 {siteConfig.name}. All rights reserved.</div>
    </footer>
  );
}
