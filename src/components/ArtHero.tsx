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
 * 交互：光标吸引粒子、靠近声波会隆起、点击投出一簇“球”
 */
export default function ArtHero() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const hero = host.parentElement

    const mouse = { x: window.innerWidth / 2, y: 240, active: false }
    const bursts: { x: number; y: number }[] = []

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onClick = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        bursts.push({ x, y })
      }
    }

    window.addEventListener('mousemove', onMove)
    hero?.addEventListener('click', onClick)

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

        // 声波（音乐），随光标上下起伏
        p.noFill()
        for (const w of waves) {
          w.phase += w.speed
          const boost = mouse.active ? 1 + 0.7 * Math.max(0, 1 - Math.abs(mouse.y - w.y) / 320) : 1
          const amp = w.amp * boost
          p.stroke(23, 195, 188, 80)
          p.strokeWeight(1)
          p.beginShape()
          for (let x = 0; x <= p.width; x += 6) {
            const y = w.y + Math.sin(x * w.freq + w.phase) * amp
            p.vertex(x, y)
          }
          p.endShape()
        }

        // 点击：投出一簇“球”
        while (bursts.length) {
          const b = bursts.shift()!
          for (let i = 0; i < 12; i++) {
            const ang = p.random(p.TWO_PI)
            const sp = p.random(2, 6)
            const orange = p.random() < 0.75
            shots.push({
              x: b.x,
              y: b.y,
              vx: Math.cos(ang) * sp,
              vy: Math.sin(ang) * sp - 2,
              g: 0.08,
              life: 0,
              maxLife: p.random(90, 160),
              cr: orange ? 240 : 242,
              cg: orange ? 101 : 190,
              cb: 31,
              radius: p.random(1.8, 4),
            })
          }
        }

        // 环境投篮弧线
        if (p.frameCount % 5 === 0 && shots.length < 90) {
          const fromLeft = p.random() < 0.5
          const orange = p.random() < 0.72
          shots.push({
            x: fromLeft ? -20 : p.width + 20,
            y: p.height * p.random(0.5, 0.92),
            vx: (fromLeft ? 1 : -1) * p.random(2.4, 4.4),
            vy: p.random(-7, -4.2),
            g: p.random(0.055, 0.095),
            life: 0,
            maxLife: p.random(120, 210),
            cr: orange ? 240 : 242,
            cg: orange ? 101 : 190,
            cb: 31,
            radius: p.random(1.6, 3.6),
          })
        }

        for (let i = shots.length - 1; i >= 0; i--) {
          const s = shots[i]
          // 光标轻微吸引
          if (mouse.active) {
            const dx = mouse.x - s.x
            const dy = mouse.y - s.y
            const d2 = dx * dx + dy * dy
            if (d2 < 220 * 220) {
              const d = Math.sqrt(d2) || 1
              const f = 0.02 * (1 - d / 220)
              s.vx += (dx / d) * f
              s.vy += (dy / d) * f
            }
          }
          s.vy += s.g
          s.x += s.vx
          s.y += s.vy
          s.life++
          const fade = 1 - s.life / s.maxLife
          if (fade <= 0 || s.y > p.height + 60) {
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
    return () => {
      window.removeEventListener('mousemove', onMove)
      hero?.removeEventListener('click', onClick)
      instance.remove()
    }
  }, [])

  return <div ref={hostRef} className="art-hero" aria-hidden="true" />
}
