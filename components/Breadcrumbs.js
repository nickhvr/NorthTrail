import Link from 'next/link';

export default function Breadcrumbs({ items, variant = 'dark' }) {
  return (
    <nav
      className={`breadcrumbs breadcrumbs-${variant}`}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={`breadcrumbs-item ${isLast ? 'is-current' : ''}`}
            >
              {item.href && !isLast ? (
                <Link href={item.href} className="breadcrumbs-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs-current">{item.label}</span>
              )}

              {!isLast ? (
                <span className="breadcrumbs-separator" aria-hidden="true">
                  ›
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}