'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(path) {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  }

  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">TN</span>
          <span>
            <strong>{siteConfig.name}</strong>
            <small>{siteConfig.tagline}</small>
          </span>
        </Link>

        <nav className="nav-links nav-links-desktop">
          <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
          <Link href="/privacy-policy" className={isActive('/privacy-policy') ? 'active' : ''}>Privacy</Link>
          <Link href="/cookies" className={isActive('/cookies') ? 'active' : ''}>Cookies</Link>
          <Link href="/impressum" className={isActive('/impressum') ? 'active' : ''}>Impressum</Link>
        </nav>

        <button
          type="button"
          className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <div className="container mobile-nav-inner">
            <Link
              href="/blog"
              className={isActive('/blog') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/privacy-policy"
              className={isActive('/privacy-policy') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Privacy
            </Link>

            <Link
              href="/cookies"
              className={isActive('/cookies') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Cookies
            </Link>

            <Link
              href="/impressum"
              className={isActive('/impressum') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Impressum
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}