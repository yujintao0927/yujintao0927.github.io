import { Link, useParams } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getPost, formatDate } from '../lib/posts'

export default function Post() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <p>文章不存在或已被移除。</p>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: 12 }}>
            返回文章列表
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="post-hero">
        <div className="container">
          <div className="post-meta" style={{ color: 'rgba(255,253,247,0.6)' }}>
            <span className={`pill pill--${post.category}`}>{post.category === 'tech' ? '技术' : '生活'}</span>
            <span>{formatDate(post.date)}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
        </div>
        {post.cover && <img className="post-cover" src={post.cover} alt={post.title} />}
      </section>

      <section className="post-body">
        <div className="container post-body-inner">
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
              {post.tags.map((t) => (
                <span key={t} className="tag-pill">
                  #{t}
                </span>
              ))}
            </div>
          )}
          <MarkdownRenderer content={post.content} />
          <div style={{ marginTop: 48 }}>
            <Link to="/blog" className="btn btn-primary">
              ← 返回文章列表
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
