import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }) {
  return (
    <article className="card">
      <Image
        src={post.featuredImage}
        alt={post.title}
        width={800}
        height={450}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ height: "220px", width: "100%", objectFit: "cover" }}
      />
      <div className="card-body">
        <div className="badges">
          {(post.tags || []).map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
        <div className="post-meta">
          <span>{new Date(post.date).toLocaleDateString("de-DE")}</span>
          {post.readTime ? <span>{post.readTime}</span> : null}
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div style={{ marginTop: 16 }}>
          <Link className="btn secondary" href={post.url}>
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}