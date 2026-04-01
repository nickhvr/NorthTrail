import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getPostsByPillar } from '@/lib/posts';
import { imageConfig } from '@/lib/image';
import { pillarConfig } from '@/lib/pillar';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: `${pillarConfig.wandern.title} | ${siteConfig.name}`,
  description: pillarConfig.wandern.description
};

export default function HikingPillarPage() {
  const posts = getPostsByPillar('wandern');

  return (
    <>
      <Hero
        kicker="Themenwelt"
        title="Wandern"
        text="Entdecke hilfreiche Tipps, Tourenideen und praktische Ratgeber rund ums Wandern. Hier findest du Inspiration für deine nächste Tour, Empfehlungen zur Ausrüstung und nützliches Wissen für unterwegs."
        image={imageConfig.wandern}
        priority={true}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Startseite', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Wandern' }
            ]}
          />
        }
        actions={
          <Link href="/blog" className="btn">
            Alle Beiträge ansehen
          </Link>
        }
      />

      <main className="section">
        <div className="container">
          <p className="section-kicker">Wandern entdecken</p>
          <h1
            className="page-title"
            style={{ fontSize: 'clamp(34px,5vw,56px)', marginBottom: 10 }}
          >
            Wandertipps, Tourenideen und Ratgeber
          </h1>
          <p className="section-copy">
            Ob entspannte Tageswanderung, anspruchsvolle Bergtour oder die passende
            Vorbereitung für dein nächstes Outdoor-Abenteuer – hier findest du
            aktuelle Beiträge, hilfreiche Anleitungen und inspirierende Inhalte rund
            ums Wandern.
          </p>

          <div className="grid-2">
            {posts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}