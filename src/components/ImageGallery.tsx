import { useState } from 'react'
import type { GalleryImage } from '../data/images'

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="gallery-grid">
        {images.map((img) => (
          <figure className="gallery-item" key={img.src} onClick={() => setActive(img)}>
            <img src={img.src} alt={img.caption} loading="lazy" />
            <figcaption className="gallery-caption">{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <button className="lightbox-close" aria-label="关闭">
            ×
          </button>
          <img src={active.src} alt={active.caption} />
        </div>
      )}
    </>
  )
}
