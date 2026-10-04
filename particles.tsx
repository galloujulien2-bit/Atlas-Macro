'use client'

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  pulse: number
  pulseSpeed: number
  depth: number // 0..1 — affects size/speed/opacity (parallax-like)
  drift: number // small random angle change per frame for organic motion
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number // 0..1 — fades out as it travels
  maxLife: number
  length: number // tail length
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let width = 0
    let height = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let particles: Particle[] = []
    let maxDistance = 130

    const buildParticles = () => {
      // Particle count scales with screen area, capped for performance.
      // Higher caps and divisor so wide / 4K screens get a denser field.
      const area = width * height
      const particleCount = Math.min(
        260,
        Math.max(80, Math.floor(area / 9000))
      )
      maxDistance = 130

      particles = []
      // Stratified grid placement — guarantees even distribution across the
      // whole viewport, no empty zones on any side, regardless of size.
      const cols = Math.max(
        10,
        Math.round(Math.sqrt(particleCount * (width / height)))
      )
      const rows = Math.max(8, Math.ceil(particleCount / cols))
      const cellW = width / cols
      const cellH = height / rows
      let placed = 0
      for (let r = 0; r < rows && placed < particleCount; r++) {
        for (let c = 0; c < cols && placed < particleCount; c++) {
          const depth = Math.random() // parallax depth
          const speedMul = 0.4 + depth * 1.4
          const angle = Math.random() * Math.PI * 2
          const speed = (Math.random() * 0.35 + 0.1) * speedMul
          particles.push({
            x: c * cellW + Math.random() * cellW,
            y: r * cellH + Math.random() * cellH,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: (Math.random() * 1.8 + 0.5) * (0.6 + depth * 0.8),
            alpha: (Math.random() * 0.5 + 0.3) * (0.5 + depth * 0.5),
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.04 + 0.01,
            depth,
            drift: (Math.random() - 0.5) * 0.002,
          })
          placed++
        }
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildParticles()
    }
    resize()

    // Debounced resize so we don't rebuild the particle field on every pixel
    // change — only when the user has stopped resizing for 150ms.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
      }, 150)
    }
    window.addEventListener("resize", onResize)

    // Shooting stars — occasional fast streaks across the screen
    const shootingStars: ShootingStar[] = []
    let nextShootingStar = 0

    const spawnShootingStar = () => {
      // Start from top or left edge, travel towards bottom-right
      const fromTop = Math.random() > 0.5
      const startX = fromTop ? Math.random() * width : -50
      const startY = fromTop ? -50 : Math.random() * height * 0.6
      const angle = Math.PI * 0.25 + (Math.random() - 0.5) * 0.4 // ~45° ± variation
      const speed = 6 + Math.random() * 4
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        length: 80 + Math.random() * 60,
      })
    }

    let mouseX = -1000
    let mouseY = -1000
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMouseMove)

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      frame++

      // Spawn shooting stars occasionally (every ~120 frames = ~2s)
      nextShootingStar--
      if (nextShootingStar <= 0 && shootingStars.length < 2) {
        spawnShootingStar()
        nextShootingStar = 120 + Math.floor(Math.random() * 180)
      }

      // Update + draw shooting stars (with tail)
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.012

        if (s.life <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1)
          continue
        }

        // Draw tail — gradient line behind the star
        const tailX = s.x - s.vx * (s.length / 6)
        const tailY = s.y - s.vy * (s.length / 6)
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(180, 210, 255, ${s.life * 0.9})`)
        grad.addColorStop(0.4, `rgba(130, 170, 255, ${s.life * 0.4})`)
        grad.addColorStop(1, "rgba(130, 170, 255, 0)")
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        // Bright head
        const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6)
        headGrad.addColorStop(0, `rgba(220, 235, 255, ${s.life})`)
        headGrad.addColorStop(0.5, `rgba(150, 185, 255, ${s.life * 0.5})`)
        headGrad.addColorStop(1, "rgba(150, 185, 255, 0)")
        ctx.fillStyle = headGrad
        ctx.beginPath()
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update particles
      for (const p of particles) {
        // Apply drift — rotate velocity vector slightly for organic motion
        if (p.drift !== 0) {
          const cos = Math.cos(p.drift)
          const sin = Math.sin(p.drift)
          const nvx = p.vx * cos - p.vy * sin
          const nvy = p.vx * sin + p.vy * cos
          p.vx = nvx
          p.vy = nvy
        }

        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Mouse repulsion — particles drift away from cursor
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist2 = dx * dx + dy * dy
        const repelRadius = 130
        if (dist2 < repelRadius * repelRadius) {
          const dist = Math.sqrt(dist2) || 1
          const force = (1 - dist / repelRadius) * 0.8
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        if (p.x < 0) p.x = 0
        if (p.x > width) p.x = width
        if (p.y < 0) p.y = 0
        if (p.y > height) p.y = height
      }

      // Draw connecting lines (thin threads between nearby particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDistance) {
            const t = 1 - dist / maxDistance // 0..1 — closer = stronger
            const opacity = t * 0.35
            // Gradient line — fades between the two particles' alpha
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            )
            grad.addColorStop(0, `rgba(130, 170, 255, ${opacity * particles[i].alpha})`)
            grad.addColorStop(0.5, `rgba(110, 160, 245, ${opacity})`)
            grad.addColorStop(1, `rgba(130, 170, 255, ${opacity * particles[j].alpha})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles (navy blue, with stronger pulse glow)
      for (const p of particles) {
        const pulseFactor = (Math.sin(p.pulse) + 1) * 0.5 // 0..1
        const alpha = p.alpha * (0.55 + pulseFactor * 0.45)
        const radius = p.radius * (0.8 + pulseFactor * 0.4)

        // Soft glow halo
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, radius * 5
        )
        gradient.addColorStop(0, `rgba(130, 170, 255, ${alpha * 0.75})`)
        gradient.addColorStop(0.5, `rgba(90, 140, 235, ${alpha * 0.22})`)
        gradient.addColorStop(1, "rgba(90, 140, 235, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 185, 255, ${alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  )
}
