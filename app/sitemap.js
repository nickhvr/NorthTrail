import { getAllPosts, getPillarSummaries } from '@/lib/posts'

export default function sitemap() {
  const baseUrl = 'https://north-trail-eight.vercel.app'

  const posts = getAllPosts()
  const pillars = getPillarSummaries()

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }))

  const pillarUrls = pillars.map((pillar) => ({
    url: `${baseUrl}/blog/${pillar.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: baseUrl },
    { url: `${baseUrl}/blog` },

    ...pillarUrls,
    ...postUrls,
  ]
}