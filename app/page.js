import Link from 'next/link';
import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getAllPosts, getPillarSummaries } from '@/lib/posts';
import { siteConfig } from '@/lib/site';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const pillars = getPillarSummaries();

  return (
    <>
      <Hero
        kicker="Alles was du wissen musst!"
        title="Clean outdoor blog structure with real pages, clean slugs and dynamic post listings."
        text="This project is set up for Vercel and Next.js. Blog posts live in their own files, the blog archive aggregates everything automatically, and pillar pages pull only their matching child posts."
        image={siteConfig.heroImage}
        actions={
          <>
            <Link href="/blog" className="btn">Explore the blog</Link>
            <Link href="/hiking" className="btn secondary" style={{color:'white', borderColor:'rgba(255,255,255,0.25)'}}>Open hiking pillar</Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <p className="section-kicker">Core structure</p>
          <h2 className="section-title">One clean system for homepage, archive, pillar pages and posts.</h2>
          <p className="section-copy">Every blog post is its own document in the content folder. The archive page reads all posts. Pillar pages filter by topic and automatically show the latest child pages.</p>
          <div className="grid-3">
            {[
              ['Main blog page', 'Automatically pulls all blog articles with featured image, title and excerpt.'],
              ['Pillar pages', 'Topic hubs like hiking or fishing that list only matching posts.'],
              ['Legal + consent', 'Privacy policy, cookies, impressum and a consent banner for GTM and GA4.']
            ].map(([title, text]) => (
              <div className="card" key={title}><div className="card-body"><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <p className="section-kicker">Pillar pages</p>
          <h2 className="section-title">Built to scale by topic.</h2>
          <div className="grid-2">
            {pillars.map((pillar) => (
              <article className="card" key={pillar.slug}>
                <img src={pillar.image} alt={pillar.title} style={{height:'250px', width:'100%', objectFit:'cover'}} />
                <div className="card-body">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <div style={{marginTop:16}}>
                    <Link href={`/${pillar.slug}`} className="btn secondary">Open pillar page</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <p className="section-kicker">Latest posts</p>
          <h2 className="section-title">Newest articles</h2>
          <div className="grid-3">
            {latestPosts.map((post) => <PostCard key={post.url} post={post} />)}
          </div>
        </div>
      </section>
    </>
  );
}
