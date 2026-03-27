import Link from 'next/link';
import { getPillarSummaries } from '@/lib/posts';

export default function PillarTeaserGrid() {
  const pillars = getPillarSummaries().slice(0, 3);

  return (
    <section className="section" style={{ paddingTop: 10 }}>
      <div className="container">
        <p className="section-kicker">Themen</p>
        <h2 className="section-title">Erkunde nach Themen</h2>
        <p className="section-copy">
          Schaue dir das Thema an, was dir gefällt und finde all unsere Beiträge zu diesem Thema.
        </p>

        <div className="pillar-teaser-grid">
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/blog/${pillar.slug}`}
              className="pillar-teaser-card"
            >
              <div className="pillar-teaser-media">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="pillar-teaser-image"
                />

                <div className="pillar-teaser-overlay" />

                <div className="pillar-teaser-top">
                  <span className="pillar-teaser-read">Jetzt lesen</span>
                </div>

                <div className="pillar-teaser-bottom">
                  <h3>{pillar.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}