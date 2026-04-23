'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { imageConfig } from '@/lib/image';
import Image from 'next/image';

const MOBILE_BREAKPOINT = 960;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(path) {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setMenuOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">
            <Image
              src={imageConfig.logo}
              alt="TrailNorth Logo"
              width={60}
              height={60}
              priority
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </span>
          <span>
            <strong>{siteConfig.name}</strong>
            <small>{siteConfig.tagline}</small>
          </span>
        </Link>

        <nav className="nav-links nav-links-desktop">
          <Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>Blog</Link>
          <Link href="/privacy-policy" className={isActive('/privacy-policy') ? 'active' : ''}>Datenschutz</Link>
          <Link href="/impressum" className={isActive('/impressum') ? 'active' : ''}>Impressum</Link>
          <Link href="/cookies" className={isActive('/cookies') ? 'active' : ''}>Cookies</Link>
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
            <Link href="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/blog" className={isActive('/blog') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link
              href="/privacy-policy"
              className={isActive('/privacy-policy') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className={isActive('/impressum') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Impressum
            </Link>
            <Link
              href="/cookies"
              className={isActive('/cookies') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Cookies
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}