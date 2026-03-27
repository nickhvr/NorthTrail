import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getPostsByPillar } from '@/lib/posts';
import { imageConfig } from '@/lib/image';

export const metadata = {
  title: 'Wandern | TrailNorth',
  description: 'Die Hauptseite für das Thema Wandern. Hier findest du all unsere Beiträge, die sich mit diesem Thema beschäftigen.'
};

export default function HikingPillarPage() {
  const posts = getPostsByPillar('wandern');

  return (
    <>
      <Hero
        kicker="Pillar page"
        title="Hiking"
        text="This is the topic hub for hiking. It can contain broader evergreen content at the top and automatically list the newest related subpages below."
        image={imageConfig.wandern}
        priority={true}
        breadcrumbs={
  <Breadcrumbs
    items={[
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Hiking' }
    ]}
  />
}
        actions={<Link href="/blog" className="btn">View all posts</Link>}
      />
      <main className="section">
        <div className="container">
          <p className="section-kicker">Topic overview</p>
          <h1 className="page-title" style={{fontSize:'clamp(34px,5vw,56px)', marginBottom: 10}}>Hiking guides and latest subpages</h1>
          <p className="section-copy">Each new post placed inside the hiking section appears here automatically, ordered by date. That is the core pillar-page logic you asked for.</p>
          <div className="grid-2">
            {posts.map((post) => <PostCard key={post.url} post={post} />)}
          </div>
        </div>
      </main>
    </>
  );
}
