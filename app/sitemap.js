import { getAllPosts, getPillarSummaries } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap() {
  const baseUrl = siteConfig.url

  const posts = getAllPosts()
  const pillars = getPillarSummaries()

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },

    ...pillars.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(),
    })),

    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ]
}