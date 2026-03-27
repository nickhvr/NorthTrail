import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getPostsByPillar } from '@/lib/posts';

export const metadata = {
  title: 'Angeln | TrailNorth',
  description: 'Angeln pillar page'
};

export default function HikingPillarPage() {
  const posts = getPostsByPillar('fishing');

  return (
    <>
      <Hero
        kicker="Pillar page"
        title="Angeln"
        text="Dies ist die Hauptseite zum Thema Angeln. Hier findest du die Einleitung zum Thema Angeln und die neusten Posts!."
        image="/images/hero-hiking-pillar.svg"
        priority={true}
        breadcrumbs={
  <Breadcrumbs
    items={[
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Angeln' }
    ]}
  />
}
        actions={<Link href="/blog" className="btn">View all posts</Link>}
      />
      <main className="section">
        <div className="container">
          <p className="section-kicker">Themen Übersicht</p>
          <h1 className="page-title" style={{fontSize:'clamp(34px,5vw,56px)', marginBottom: 10}}>Angel Guides und die Neusten Themen</h1>
          <p className="section-copy">Hier findest du alles was du zum Thema Angeln wissen musst und möchtest!</p>
          <div className="grid-2">
            {posts.map((post) => <PostCard key={post.url} post={post} />)}
          </div>
        </div>
      </main>
    </>
  );
}
