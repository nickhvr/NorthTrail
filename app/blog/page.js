import Hero from '@/components/Hero';
import Breadcrumbs from '@/components/Breadcrumbs';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';
import PillarTeaserGrid from '@/components/PillarTeaserGrid';

export const metadata = {
  title: 'Blog | TrailNorth',
  description: 'All blog articles'
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        kicker="Main blog page"
        title="All blog articles"
        text="This page automatically reads all posts from the content/blog folder and displays the teaser image, title and introduction text defined inside each original blog post file."
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