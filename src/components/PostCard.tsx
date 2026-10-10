import { Link } from 'react-router-dom'
import type { Post } from '../lib/posts'
import { formatDate } from '../lib/posts'

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="post-card reveal"
      style={{ ['--d' as string]: `${index * 70}ms` }}
    >
      {post.cover && <img className="post-card-cover" src={post.cover} alt={post.title} loading="lazy" />}
      <div className="post-card-body">
        <div className="post-meta">
          <span className={`pill pill--${post.category}`}>{post.category === 'tech' ? '技术' : '生活'}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
      </div>
    </Link>
  )
}
