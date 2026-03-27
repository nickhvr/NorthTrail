import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <article className="card">
      <img src={post.featuredImage} alt={post.title} style={{height:'220px', width:'100%', objectFit:'cover'}} />
      <div className="card-body">
        <div className="badges">
          {(post.tags || []).map((tag) => <span key={tag} className="badge">{tag}</span>)}
        </div>
        <div className="post-meta">
          <span>{new Date(post.date).toLocaleDateString('de-DE')}</span>
          {post.readTime ? <span>{post.readTime}</span> : null}
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div style={{marginTop:16}}>
          <Link className="btn secondary" href={post.url}>Read article</Link>
        </div>
      </div>
    </article>
  );
}
