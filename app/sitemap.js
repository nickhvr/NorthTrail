import { getAllPosts, getPillarSummaries } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap() {
  const baseUrl = siteConfig.url.replace(/\/$/, '')
  const posts = getAllPosts()
  const pillars = getPillarSummaries()

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
  ]

  const pillarUrls = pillars.map((pillar) => ({
    url: `${baseUrl}/blog/${pillar.slug}`,
    lastModified: new Date(),
  }))

  const postUrls = posts.map((post) => {
    const postPath = Array.isArray(post.pathParts) && post.pathParts.length > 0
      ? post.pathParts.join('/')
      : `${post.pillar}/${post.slug}`

    return {
      url: `${baseUrl}/blog/${postPath}`,
      lastModified: new Date(post.date),
    }
  })

  return [...staticUrls, ...pillarUrls, ...postUrls]
}