import { getAllPosts, getPillarSummaries } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export default function sitemap() {
  const baseUrl = siteConfig.url
  const posts = getAllPosts()
  const pillars = getPillarSummaries()

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }))

  const pillarUrls = pillars.map((pillar) => ({
    url: `${baseUrl}/blog/${pillar.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...pillarUrls,
    ...postUrls,
  ]
}