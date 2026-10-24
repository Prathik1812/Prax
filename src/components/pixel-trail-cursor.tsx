"use client"

import React, { useEffect, useRef } from "react"

interface TrailPoint {
  x: number
  y: number
  alpha: number
  size: number
  color: string
}

export function PixelTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    const canvas = canvasRef.current
    const cursor = cursorRef.current
    if (!canvas || !cursor) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize, { passive: true })

    const mouse = { x: -100, y: -100, isHover: false, isClick: false }
    const trail: TrailPoint[] = []
    const colors = ["#660033", "#000000", "#38bdf8", "#880044"]
    let animId: number | null = null
    let isLoopRunning = false

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw pixel trail particles
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]
        p.alpha *= 0.90 // Fade out
        p.size *= 0.95

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)

        if (p.alpha <= 0.05) {
          trail.splice(i, 1)
        }
      }

      // If trail has particles, continue loop; otherwise sleep to save 100% idle CPU
      if (trail.length > 0) {
        animId = requestAnimationFrame(render)
      } else {
        isLoopRunning = false
        animId = null
      }
    }

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true
        animId = requestAnimationFrame(render)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Hardware-accelerated 0ms latency cursor positioning
      if (cursor) {
        cursor.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
        if (cursor.style.opacity !== "1") cursor.style.opacity = "1"
      }

      // Check hover target without separate heavy mouseover listener
      const target = e.target as HTMLElement | null
      const isHover = !!target?.closest?.("a, button, [role='button'], input, textarea, .cursor-pointer")
      if (isHover !== mouse.isHover) {
        mouse.isHover = isHover
        if (cursor) {
          cursor.dataset.hover = isHover ? "true" : "false"
        }
      }

      // Drop pixel trail particles
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      trail.push({
        x: Math.round(mouse.x / 4) * 4,
        y: Math.round(mouse.y / 4) * 4,
        alpha: 1.0,
        size: isHover ? 7 : 5,
        color: randomColor,
      })

      if (trail.length > 32) {
        trail.shift()
      }

      startLoop()
    }

    const handleMouseDown = () => {
      mouse.isClick = true
      if (cursor) cursor.dataset.click = "true"

      // Spawn pixel sparks on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8
        trail.push({
          x: mouse.x + Math.cos(angle) * 12,
          y: mouse.y + Math.sin(angle) * 12,
          alpha: 1.0,
          size: 6,
          color: "#660033",
        })
      }
      startLoop()
    }

    const handleMouseUp = () => {
      mouse.isClick = false
      if (cursor) cursor.dataset.click = "false"
    }

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* 0ms latency Hardware-Accelerated Pixel Cursor Head */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] opacity-0 will-change-transform -translate-x-1/2 -translate-y-1/2 group"
      >
        {/* Default square cursor */}
        <div className="w-2.5 h-2.5 bg-black flex items-center justify-center shadow-xs transition-colors duration-150 group-data-[hover=true]:w-3.5 group-data-[hover=true]:h-3.5 group-data-[hover=true]:bg-[#660033] group-data-[click=true]:scale-90">
          <div className="w-0.5 h-0.5 bg-white group-data-[hover=true]:w-1 group-data-[hover=true]:h-1" />
        </div>
      </div>

      {/* Trailing fading pixel canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998]"
        aria-hidden="true"
      />
    </>
  )
}
