import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getPostsByPillar } from '@/lib/posts';
import { imageConfig } from '@/lib/image';

export const metadata = {
  title: 'Angeln | TrailNorth',
  description: 'Die Hauptseite für das Thema Angeln. Hier findest du all unsere Beiträge, die sich mit diesem Thema beschäftigen.'
};

export default function HikingPillarPage() {
  const posts = getPostsByPillar('angeln');

  return (
    <>
      <Hero
        kicker="Themen Seite"
        title="Angeln"
        text="Dies ist die Hauptseite zum Thema Angeln. Hier findest du die Einleitung zum Thema Angeln und die neusten Posts!."
        image={imageConfig.angeln}
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
        actions={<Link href="/blog" className="btn">Alle Beiträge anschauen</Link>}
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
