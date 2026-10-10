import { NavLink, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Gallery from './pages/Gallery'
import About from './pages/About'

const nav = [
  { to: '/', label: '首页' },
  { to: '/blog', label: '文章' },
  { to: '/gallery', label: '相册' },
  { to: '/about', label: '关于' },
]

export default function App() {
  return (
    <div className="site">
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
    </div>
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
