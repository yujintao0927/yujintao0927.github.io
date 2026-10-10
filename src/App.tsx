import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Gallery from './pages/Gallery'
import About from './pages/About'
import CursorGlow from './components/CursorGlow'

const nav = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '文章' },
  { to: '/gallery', label: '相册' },
  { to: '/about', label: '关于' },
]

export default function App() {
  const location = useLocation()

  // 滚动入场动画：进入视口时给 .reveal 加上 .is-visible
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [location.pathname])

  return (
    <div className="site">
      <CursorGlow />

      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">AC</span>
            <span className="brand-text">
              <span className="brand-name">ARC·CODE</span>
              <span className="brand-sub">弧线与代码</span>
            </span>
          </Link>
          <nav className="main-nav">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-brand">ARC·CODE</span>
          <span className="footer-note">弧线与代码 · 用技术与热爱投出每一记好球 · GitHub Pages</span>
        </div>
      </footer>

      <BackToTop />
    </div>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`back-top${show ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="返回顶部"
    >
      ↑
    </button>
  )
}

function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 84, color: 'var(--orange)' }}>404</h2>
        <p style={{ fontSize: 18 }}>球出界了，这页不存在。</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 12 }}>
          回到首页
        </Link>
      </div>
    </section>
  )
}
