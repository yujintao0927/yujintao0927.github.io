import yaml from 'js-yaml'

export type Category = 'tech' | 'life'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  category: Category
  tags: string[]
  cover?: string
  content: string
}

// 构建期打包全部 Markdown 文章（纯静态，可直接托管）
const files = import.meta.glob('../posts/**/*.md', { query: '?raw', import: 'default', eager: true })

function parsePost(path: string, raw: string): Post {
  const slug = path.replace('../posts/', '').replace(/\.md$/, '')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  let meta: Record<string, unknown> = {}
  let content = raw
  if (match) {
    meta = (yaml.load(match[1]) as Record<string, unknown>) || {}
    content = match[2]
  }
  return {
    slug,
    title: (meta.title as string) ?? slug,
    date: meta.date ? String(meta.date) : '',
    excerpt: (meta.excerpt as string) ?? '',
    category: (meta.category as Category) ?? 'life',
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    cover: meta.cover ? String(meta.cover) : undefined,
    content,
  }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(date: string): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
