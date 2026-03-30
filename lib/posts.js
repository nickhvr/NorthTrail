import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { imageConfig } from './image';
import { pillarConfig } from './pillar';

const blogRoot = path.join(process.cwd(), 'content', 'blog');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) files.push(full);
  }
  return files;
}

export function getAllPosts() {
  const files = walk(blogRoot);
  return files
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(raw);
      const relativePath = path.relative(blogRoot, file).replace(/\\/g, '/');
      const pathParts = relativePath.replace(/\.(md|mdx)$/,'').split('/');
      const slug = data.slug || pathParts[pathParts.length - 1];
      const pillar = data.pillar || pathParts[0];
      return {
        ...data,
        slug,
        pillar,
        pathParts: [...pathParts.slice(0, -1), slug],
        content,
        url: `/blog/${[...pathParts.slice(0, -1), slug].join('/')}`
      };
    })
    .filter((post) => post.draft !== true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlugSegments(segments = []) {
  const all = getAllPosts();
  return all.find((post) => post.pathParts.join('/') === segments.join('/')) || null;
}

export function getPostsByPillar(pillar) {
  return getAllPosts().filter((post) => post.pillar === pillar);
}

export function getPillarSummaries() {
  const all = getAllPosts();
  const map = new Map();
  for (const post of all) {
    if (!map.has(post.pillar)) {
      map.set(post.pillar, {
        slug: post.pillar,
        title: pillarConfig[post.pillar].title,
        description: pillarConfig[post.pillar].description,
        image: imageConfig[post.pillar],
        latest: []
      });
    }
    map.get(post.pillar).latest.push(post);
  }
  return Array.from(map.values()).map((pillar) => ({
    ...pillar,
    latest: pillar.latest.slice(0, 3)
  }));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
