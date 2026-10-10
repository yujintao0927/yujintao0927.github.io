export default function About() {
  const interests = [
    { mark: '23', name: '篮球', desc: '勒布朗·詹姆斯，我的篮球信仰与自律榜样。' },
    { mark: 'JS', name: '编程', desc: '软件工程专业，正朝着程序员的方向前进。' },
    { mark: 'PR', name: '健身', desc: '渐进超负荷，撸铁是最诚实的努力。' },
    { mark: 'BPM', name: '音乐', desc: '耳机一戴，世界静音，专注拉满。' },
  ]

  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <div className="section-kicker">About</div>
          <h1 className="section-title">关于我</h1>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <aside className="about-card">
            <div className="about-avatar">AC</div>
            <h2 className="about-name">ARC·CODE</h2>
            <div className="about-role">软件工程 · 2005 · 程序员方向</div>
          </aside>

          <div className="about-text">
            <p style={{ fontSize: 18, lineHeight: 1.9, color: 'var(--ink-2)' }}>
              你好，我是一名软件工程专业的学生，未来的程序员。这个博客用来沉淀技术，也用来记录生活里的热爱。
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.9, color: 'var(--ink-2)' }}>
              我喜欢篮球，最欣赏勒布朗·詹姆斯；我也喜欢健身和音乐。它们和编程一样，都在教我「持续投入、等待弧线抵达最高点」。
            </p>

            <div className="interest-grid">
              {interests.map((it) => (
                <div className="interest-card" key={it.name}>
                  <div className="interest-icon">{it.mark}</div>
                  <div className="interest-name">{it.name}</div>
                  <p className="interest-desc">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
