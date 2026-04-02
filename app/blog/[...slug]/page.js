import { MDXRemote } from 'next-mdx-remote/rsc';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPosts, getPostBySlugSegments } from '@/lib/posts';
import Hero from '@/components/Hero';
import {AffiliateBox, AffiliateLink} from '@/components/AffiliateComponents';
import InternalLinkBox from '@/components/InternalLinkBox'
import { siteConfig } from '@/lib/site';

const components = {
  AffiliateBox,
  AffiliateLink,
  InternalLinkBox
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.pathParts }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlugSegments(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | ` + siteConfig.name,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlugSegments(params.slug);
  if (!post) notFound();

  return (
    <>
    <Hero
  kicker={post.pillar.charAt(0).toUpperCase() + post.pillar.slice(1)}
  title={post.title}
  text={post.excerpt}
  image={post.featuredImage}
  breadcrumbs={
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.pillar.charAt(0).toUpperCase() + post.pillar.slice(1), href: `/blog/${post.pillar}` },
        { label: post.title }
      ]}
    />
  }
/>
    <main className="section">
      <div className="container" style={{maxWidth: 900}}>
        <article className="article">
          <div className="badges">{(post.tags || []).map((tag) => <span className="badge" key={tag}>{tag}</span>)}</div>
          <div className="post-meta">
            <span>{new Date(post.date).toLocaleDateString('de-DE')}</span>
            {post.readTime ? <span>{post.readTime}</span> : null}
          </div>
          <h1 className="page-title" style={{fontSize:'clamp(34px,5vw,56px)', marginBottom: 12}}>{post.title}</h1>
          <p className="muted" style={{marginTop:0}}>Von {post.author || 'OutdoorEinfach Editorial'}</p>
        <div className='article-content'>
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
      </div>
    </main>
    </>
  );
}