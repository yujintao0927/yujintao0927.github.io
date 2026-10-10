import { Link } from 'react-router-dom'
import ArtHero from '../components/ArtHero'
import PostCard from '../components/PostCard'
import { posts } from '../lib/posts'

const tickerItems = ['篮球', '代码', '音乐', '健身', 'LEBRON', 'REACT', 'VITE', 'GITHUB PAGES']

export default function Home() {
  const latest = posts.slice(0, 6)
  const techCount = posts.filter((p) => p.category === 'tech').length
  const lifeCount = posts.filter((p) => p.category === 'life').length

  return (
    <>
      <section className="hero">
        <ArtHero />
        <div className="hero-inner">
          <span className="hero-eyebrow reveal" style={{ ['--d' as string]: '0ms' }}>
            Tech &amp; Life · 软件工程学生
          </span>
          <h1 className="hero-title reveal" style={{ ['--d' as string]: '90ms' }}>
            弧线
            <br />
            <span className="accent">与代码</span>
          </h1>
          <p className="hero-tagline reveal" style={{ ['--d' as string]: '180ms' }}>
            记录技术成长，也记录生活里的热爱 —— 篮球、健身与音乐。每一次出手，都是一条值得回放的抛物线。
          </p>
          <div className="hero-actions reveal" style={{ ['--d' as string]: '260ms' }}>
            <Link to="/blog" className="btn btn-primary">
              读文章
            </Link>
            <Link to="/about" className="btn btn-ghost">
              认识我
            </Link>
          </div>
          <div className="hero-stats reveal" style={{ ['--d' as string]: '340ms' }}>
            <div className="stat">
              <div className="stat-num">{posts.length}</div>
              <div className="stat-label">文章</div>
            </div>
            <div className="stat">
              <div className="stat-num">{techCount}</div>
              <div className="stat-label">技术</div>
            </div>
            <div className="stat">
              <div className="stat-num">{lifeCount}</div>
              <div className="stat-label">生活</div>
            </div>
            <div className="stat">
              <div className="stat-num">23</div>
              <div className="stat-label">勒布朗球衣号</div>
            </div>
          </div>
          <div className="ticker reveal" style={{ ['--d' as string]: '420ms' }}>
            <div className="ticker-track">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span className="ticker-item" key={i}>
                  {t}
                  <span className="dot">●</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="section-kicker">Latest</div>
              <h2 className="section-title">最新文章</h2>
            </div>
            <Link to="/blog" className="section-link">
              全部文章 →
            </Link>
          </div>
          <div className="grid grid--cards">
            {latest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
