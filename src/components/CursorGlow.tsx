import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const dot = dotRef.current
    if (!dot) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (t && t.closest('a, button, .post-card, .gallery-item')) dot.classList.add('is-hover')
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (t && t.closest('a, button, .post-card, .gallery-item')) dot.classList.remove('is-hover')
    }

    const loop = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dotRef} className="cursor-glow" aria-hidden="true" />
}
