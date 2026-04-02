'use client';

import { useMemo, useState } from 'react';
import PostCard from '@/components/PostCard';

const POSTS_PER_LOAD = 9;

export default function BlogPostList({ posts }) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_LOAD);

  const visiblePosts = useMemo(() => {
    return posts.slice(0, visibleCount);
  }, [posts, visibleCount]);

  const hasMorePosts = visibleCount < posts.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + POSTS_PER_LOAD);
  }

  return (
    <main className="section">
      <div className="container">
        <p className="section-kicker">Beiträge</p>
        <h2 className="section-title">Hier findest du alle Beiträge</h2>
        <p className="section-copy">
          Einfach durchstöbern und finden, was dich interessiert.
        </p>

        <div className="grid-3">
          {visiblePosts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </div>

        <div className="load-more-wrapper">
          {hasMorePosts ? (
            <button
              type="button"
              className="btn"
              onClick={handleLoadMore}
            >
              Mehr laden
            </button>
          ) : (
            posts.length > POSTS_PER_LOAD && (
              <p className="load-more-finished">Alle Artikel wurden geladen.</p>
            )
          )}
        </div>
      </div>
    </main>
  );
}