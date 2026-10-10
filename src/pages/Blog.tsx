import { useMemo, useState } from 'react'
import PostCard from '../components/PostCard'
import { posts } from '../lib/posts'

const filters = [
  { key: 'all', label: '全部' },
  { key: 'tech', label: '技术' },
  { key: 'life', label: '生活' },
]

export default function Blog() {
  const [active, setActive] = useState('all')
  const list = useMemo(
    () => (active === 'all' ? posts : posts.filter((p) => p.category === active)),
    [active],
  )

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <div className="section-kicker">Archive</div>
          <h1 className="section-title">文章</h1>
          <p style={{ color: 'rgba(255,253,247,0.75)', marginTop: 12 }}>
            技术与生活的全部记录。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-tab${active === f.key ? ' active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid--cards">
            {list.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
