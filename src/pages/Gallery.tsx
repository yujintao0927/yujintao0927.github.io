import ImageGallery from '../components/ImageGallery'
import { galleryImages } from '../data/images'

export default function Gallery() {
  return (
    <>
      <section className="blog-hero">
        <div className="container">
          <div className="section-kicker">Life</div>
          <h1 className="section-title">相册</h1>
          <p style={{ color: 'rgba(255,253,247,0.75)', marginTop: 12 }}>
            生活里值得回放的瞬间 —— 篮球、健身与音乐。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ImageGallery images={galleryImages} />
        </div>
      </section>
    </>
  )
}
