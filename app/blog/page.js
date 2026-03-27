import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';
import PillarTeaserGrid from '@/components/PillarTeaserGrid';

export const metadata = {
  title: 'Blog | TrailNorth',
  description: 'Alle Blog Artikel zu den Themen Angeln, Wandern und (wild) Camping auf einen Blick'
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        kicker="Blog Hauptseite"
        title="Alle Blog Artikel"
        text="Willkommen im NorthTrail Blog. Hier findest du fundierte Guides, ehrliche Erfahrungen und praktische Tipps rund um Outdoor-Abenteuer. Egal ob Wandern, Angeln oder Camping. Wir zeigen dir, worauf es wirklich ankommt, damit du draußen besser vorbereitet bist und mehr aus deinen Touren herausholst."
        image="/images/hero-home-outdoor.svg"
        priority= {true}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' }
            ]}
          />
        }
      />
      <PillarTeaserGrid />
      <main className="section">
        <div className="container">
          <p className="section-kicker">Beiträge</p>
          <h2 className="section-title">Hier findest du alle Beiträge</h2>
          <p className="section-copy">
            Einfach durch stöbern und finden was einen interessiert.
          </p>
          <div className="grid-3">

            {posts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}