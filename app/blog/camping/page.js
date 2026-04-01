import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getPostsByPillar } from '@/lib/posts';
import { imageConfig } from '@/lib/image';
import { siteConfig } from '@/lib/site';
import { pillarConfig } from '@/lib/pillar';

export const metadata = {
  title: pillarConfig.camping.title + ' | ' + siteConfig.name,
  description: pillarConfig.camping.description
};

export default function CampingPillarPage() {
  const posts = getPostsByPillar('camping');

  return (
    <>
      <Hero
        kicker="Themenwelt"
        title="Camping"
        text="Hier findest du hilfreiche Tipps, praktische Ratgeber und inspirierende Ideen rund um Camping, Ausrüstung, Zelte, Packlisten und unvergessliche Outdoor-Abenteuer."
        image={imageConfig.camping}
        priority={true}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Startseite', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Camping' }
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
          <p className="section-kicker">Camping entdecken</p>
          <h1
            className="page-title"
            style={{ fontSize: 'clamp(34px,5vw,56px)', marginBottom: 10 }}
          >
            Camping-Tipps, Ausrüstung und hilfreiche Ratgeber
          </h1>
          <p className="section-copy">
            Ob du ein Wochenende auf dem Zeltplatz planst, mit dem Van unterwegs
            bist oder dein nächstes Outdoor-Abenteuer vorbereitest: Hier findest du
            fundierte Beiträge zu Campingausrüstung, Zelten, Packlisten, Komfort in
            der Natur und praktischen Tipps für Einsteiger und erfahrene Camper.
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