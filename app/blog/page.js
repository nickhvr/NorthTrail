import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/posts';
import PillarTeaserGrid from '@/components/PillarTeaserGrid';
import BlogPostList from '@/components/BlogPostList';
import { imageConfig } from '@/lib/image';
import { siteConfig } from '@/lib/site';

export const metadata = {
  title: 'Blog | ' + siteConfig.name,
  description: 'Alle Blog Artikel zu den Themen Angeln, Wandern und (wild) Camping auf einen Blick'
};

export default function BlogIndexPage() {
  const posts = [...getAllPosts()].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <Hero
        kicker="Blog Hauptseite"
        title="Alle Blog Artikel"
        text="Willkommen im OutdoorEinfach Blog. Hier findest du fundierte Guides, ehrliche Erfahrungen und praktische Tipps rund um Outdoor-Abenteuer. Egal ob Wandern, Angeln oder Camping. Wir zeigen dir, worauf es wirklich ankommt, damit du draußen besser vorbereitet bist und mehr aus deinen Touren herausholst."
        image={imageConfig.blog}
        priority={true}
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

      <BlogPostList posts={posts} />
    </>
  );
}