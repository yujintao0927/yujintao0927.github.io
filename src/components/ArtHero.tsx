import { useEffect, useRef } from 'react'
import p5 from 'p5'

type Shot = {
  x: number
  y: number
  vx: number
  vy: number
  g: number
  life: number
  maxLife: number
  cr: number
  cg: number
  cb: number
  radius: number
}

/**
 * 「弧线与声波」—— 投篮的抛物线 + 音乐的声波
 * 算法艺术：粒子沿重力弧线飞行（篮球），正弦波带流动（声音）
 */
export default function ArtHero() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const sketch = (p: p5) => {
      const shots: Shot[] = []
      const waves: { y: number; amp: number; freq: number; speed: number; phase: number }[] = []

      p.setup = () => {
        p.createCanvas(host.clientWidth || window.innerWidth, host.clientHeight || 600)
        p.pixelDensity(1)
        for (let i = 0; i < 5; i++) {
          waves.push({
            y: p.random(0.15, 0.85) * (host.clientHeight || 600),
            amp: p.random(14, 44),
            freq: p.random(0.0015, 0.005),
            speed: p.random(0.006, 0.016),
            phase: p.random(p.TWO_PI),
          })
        }
      }

      p.draw = () => {
        p.clear()

        // 声波（音乐）
        p.noFill()
        for (const w of waves) {
          w.phase += w.speed
          p.stroke(23, 195, 188, 70)
          p.strokeWeight(1)
          p.beginShape()
          for (let x = 0; x <= p.width; x += 6) {
            const y = w.y + Math.sin(x * w.freq + w.phase) * w.amp
            p.vertex(x, y)
          }
          p.endShape()
        }

        // 投篮弧线（篮球）
        if (p.frameCount % 5 === 0 && shots.length < 70) {
          const fromLeft = p.random() < 0.5
          const isOrange = p.random() < 0.72
          shots.push({
            x: fromLeft ? -20 : p.width + 20,
            y: p.height * p.random(0.5, 0.92),
            vx: (fromLeft ? 1 : -1) * p.random(2.4, 4.4),
            vy: p.random(-7, -4.2),
            g: p.random(0.055, 0.095),
            life: 0,
            maxLife: p.random(120, 210),
            cr: isOrange ? 240 : 242,
            cg: isOrange ? 101 : 190,
            cb: 31,
            radius: p.random(1.6, 3.6),
          })
        }

        for (let i = shots.length - 1; i >= 0; i--) {
          const s = shots[i]
          s.vy += s.g
          s.x += s.vx
          s.y += s.vy
          s.life++
          const fade = 1 - s.life / s.maxLife
          if (fade <= 0 || s.y > p.height + 40) {
            shots.splice(i, 1)
            continue
          }
          p.noStroke()
          p.fill(s.cr, s.cg, s.cb, 255 * fade * 0.95)
          p.circle(s.x, s.y, s.radius * 2)
          p.fill(s.cr, s.cg, s.cb, 255 * fade * 0.2)
          p.circle(s.x - s.vx * 2, s.y - s.vy * 2, s.radius * 3.6)
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(host.clientWidth || window.innerWidth, host.clientHeight || 600)
      }
    }

    const instance = new p5(sketch, host)
    return () => instance.remove()
  }, [])

  return <div ref={hostRef} className="art-hero" aria-hidden="true" />
}
