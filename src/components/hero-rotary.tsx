"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"

interface CarouselItem {
  id: string
  slug?: string
  title: string
  category: string
  year: string
  image: string
  accentColor: string
  previewText: string
}

// 5 core projects with unique minimalist symbol artworks — TJASF first
const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "tjasf",
    slug: "tjasf",
    title: "TJASF JOURNAL",
    category: "Managing Editor",
    year: "2026",
    image: "/assets/cards/card_quantum.png",
    accentColor: "#102342",
    previewText: "Managing Editor & Co-Founder. Live peer-review platform and IEEE submission template architecture.",
  },
  {
    id: "bloom",
    slug: "bloom-and-co",
    title: "BLOOM & CO.",
    category: "Imperial Spec",
    year: "2026",
    image: "/assets/cards/card_empire.png",
    accentColor: "#660033",
    previewText: "Minimalist floral commerce identity and tactile design tokens.",
  },
  {
    id: "aot",
    slug: "attack-on-titan",
    title: "ATTACK ON TITAN UI",
    category: "Tactical Reticle",
    year: "2026",
    image: "/assets/cards/card_tactical.png",
    accentColor: "#38bdf8",
    previewText: "Tactical HUD interface and Scout Regiment combat specification.",
  },
  {
    id: "hacktronics",
    slug: "hacktronics",
    title: "HACKTRONICS 2.0",
    category: "Phoenix Crest",
    year: "2026",
    image: "/assets/cards/card_rebel.png",
    accentColor: "#660033",
    previewText: "National tech-fest brand system with circuit-grade 3D credentials.",
  },
  {
    id: "cygnus",
    slug: "cygnus-publication",
    title: "CYGNUS TIMES",
    category: "Swan Constellation",
    year: "2022–24",
    image: "/assets/cards/card_swan.png",
    accentColor: "#660033",
    previewText: "Black swan origami crest anchoring 3 years of Swiss-grid publications.",
  },
]

export function HeroRotary() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  
  const angleRef = useRef<number>(0)
  const targetAngleRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const isPausedRef = useRef(false)
  const isVisibleRef = useRef(true)
  const isMobileRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartAngleRef = useRef(0)

  const total = CAROUSEL_ITEMS.length
  const step = 360 / total

  // Direct GPU hardware-accelerated card positioning (0 React state re-renders)
  const applyCardTransforms = useCallback((angle: number) => {
    const isMobile = isMobileRef.current
    const radius = isMobile ? 180 : 360
    const yFactor = isMobile ? 22 : 36
    const rotFactor = isMobile ? 0.32 : 0.42

    for (let i = 0; i < CAROUSEL_ITEMS.length; i++) {
      const el = cardRefs.current[i]
      if (!el) continue

      const baseAngle = i * step
      let currentAngle = (baseAngle + angle) % 360
      if (currentAngle > 180) currentAngle -= 360
      if (currentAngle < -180) currentAngle += 360

      const rad = (currentAngle * Math.PI) / 180
      const x = Math.sin(rad) * radius
      const y = Math.abs(Math.sin(rad)) * yFactor
      const rotateZ = currentAngle * rotFactor
      const dist = Math.abs(currentAngle)
      const isCenter = dist < 25
      const scale = isCenter ? (isMobile ? 1.03 : 1.06) : Math.max(0.68, 1 - dist * 0.0035)
      const zIndex = Math.round(100 - dist)
      const opacity = dist < 95 ? 1 - dist * 0.004 : 0

      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      el.style.zIndex = `${zIndex}`
      el.style.opacity = `${opacity.toFixed(3)}`
      el.style.pointerEvents = opacity > 0.1 ? "auto" : "none"

      if (isCenter) {
        el.classList.add("ring-2", "ring-[#660033]", "shadow-[0_25px_50px_-12px_rgba(102,0,51,0.5)]")
      } else {
        el.classList.remove("ring-2", "ring-[#660033]", "shadow-[0_25px_50px_-12px_rgba(102,0,51,0.5)]")
      }
    }
  }, [step])

  // Track viewport size for mobile card fanning & dial scaling
  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 640
      applyCardTransforms(angleRef.current)
    }
    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [applyCardTransforms])

  // Intersection Observer: Stop carousel animation completely when off-screen to eliminate CPU/GPU latency
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Smooth 60fps RAF Ambient Carousel Loop
  useEffect(() => {
    let animId: number
    let lastTime = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      // If animating towards clicked card target
      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angleRef.current
        if (Math.abs(diff) < 0.2) {
          angleRef.current = targetAngleRef.current
          targetAngleRef.current = null
        } else {
          angleRef.current += diff * Math.min(dt * 12, 0.3)
        }
        applyCardTransforms(angleRef.current)
      } else if (!isDraggingRef.current && !isPausedRef.current && isVisibleRef.current) {
        // Ambient continuous rotation when resting: ~4.5 degrees/sec
        angleRef.current = (angleRef.current - dt * 4.5) % 360
        applyCardTransforms(angleRef.current)
      }

      animId = requestAnimationFrame(tick)
    }

    // Initial render of cards
    applyCardTransforms(angleRef.current)
    animId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(animId)
  }, [applyCardTransforms])

  const handleCardClick = (item: CarouselItem, idx: number) => {
    if (item.slug) {
      router.push(`/work/${item.slug}`)
    } else {
      targetAngleRef.current = -idx * step
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    isPausedRef.current = true
    targetAngleRef.current = null
    dragStartXRef.current = e.clientX
    dragStartAngleRef.current = angleRef.current
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const delta = e.clientX - dragStartXRef.current
    angleRef.current = dragStartAngleRef.current + delta * 0.45
    applyCardTransforms(angleRef.current)
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
    isPausedRef.current = false
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between items-center bg-white text-black select-none overflow-x-clip"
    >
      {/* Background Graphic Grid with Crosshair Markers */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <span className="absolute top-28 left-8 text-xs font-eurostile text-neutral-400">+</span>
        <span className="absolute top-28 right-8 text-xs font-eurostile text-neutral-400">+</span>
        <span className="absolute bottom-28 left-8 text-xs font-eurostile text-neutral-400">+</span>
        <span className="absolute bottom-28 right-8 text-xs font-eurostile text-neutral-400">+</span>
      </div>

      {/* Central Vertical #660033 Contrast Column */}
      <div className="absolute top-16 bottom-1/4 left-1/2 -translate-x-1/2 w-28 sm:w-36 bg-[#660033] z-0 pointer-events-none opacity-95 transition-all duration-700" />

      {/* TOP HEADER SECTION */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        {/* Top Swiss Metadata Bar */}
        <div className="w-full flex items-center justify-between text-xs font-eurostile tracking-widest text-black uppercase mb-4">
          <span className="font-eurostile text-neutral-500 font-medium">HYDERABAD, IN</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5 text-black" />
            </div>
          </div>
        </div>

        {/* 3D CUBOID ROTATING 'PORTFOLIO' WORDMARK */}
        <div className="relative w-full py-4 flex items-center justify-center perspective-[1200px]">
          {/* The 4-Sided Rotating Cuboid Box */}
          <motion.div
            animate={{ rotateX: [0, -360] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-4xl h-[78px] sm:h-[110px] md:h-[130px] flex items-center justify-center select-none [--cube-z:39px] sm:[--cube-z:55px] md:[--cube-z:65px]"
          >
            {/* FACE 1: FRONT (0 deg) - White Minimal */}
            <div
              style={{
                transform: "rotateX(0deg) translateZ(var(--cube-z))",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="absolute inset-0 flex items-center justify-center text-[14vw] sm:text-[10vw] md:text-[8.5rem] font-rosnoc font-black tracking-tighter leading-none"
            >
              <span className="text-black drop-shadow-sm">PORT</span>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2.5px #000000" }}
              >
                FOLIO
              </span>
            </div>

            {/* FACE 2: TOP (90 deg) - Deep Wine #660033 Box */}
            <div
              style={{
                transform: "rotateX(90deg) translateZ(var(--cube-z))",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="absolute inset-0 flex items-center justify-center text-[14vw] sm:text-[10vw] md:text-[8.5rem] font-rosnoc font-black tracking-tighter leading-none bg-[#660033] text-white rounded-xl shadow-xl border border-white/20"
            >
              <span className="text-white drop-shadow-sm">PORT</span>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2.5px #ffffff" }}
              >
                FOLIO
              </span>
            </div>

            {/* FACE 3: BACK (180 deg) - Reverse Contrast */}
            <div
              style={{
                transform: "rotateX(180deg) translateZ(var(--cube-z))",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="absolute inset-0 flex items-center justify-center text-[14vw] sm:text-[10vw] md:text-[8.5rem] font-rosnoc font-black tracking-tighter leading-none"
            >
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2.5px #000000" }}
              >
                PORT
              </span>
              <span className="text-black drop-shadow-sm">FOLIO</span>
            </div>

            {/* FACE 4: BOTTOM (270 deg) - Sleek Black & Wine */}
            <div
              style={{
                transform: "rotateX(270deg) translateZ(var(--cube-z))",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              className="absolute inset-0 flex items-center justify-center text-[14vw] sm:text-[10vw] md:text-[8.5rem] font-rosnoc font-black tracking-tighter leading-none bg-black text-white rounded-xl shadow-xl border border-[#660033]/60"
            >
              <span className="text-white">PORT</span>
              <span className="text-[#ff3388]">FOLIO</span>
            </div>
          </motion.div>
        </div>

        {/* Sub-bar: Name & Role in Eurostile */}
        <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-eurostile tracking-wider text-black uppercase mt-3 border-t border-black/10 pt-2.5">
          <span className="font-rosnoc font-bold">B. PRATHIK KUMAR (PRAX)</span>
          <span className="font-medium text-neutral-600">PRODUCT &amp; GRAPHIC DESIGNER</span>
        </div>
      </div>

      {/* BOTTOM SECTION: FANNED 3D CARDS OVER PINTEREST CIRCULAR DIAL */}
      <div
        className="relative z-20 w-full max-w-5xl flex flex-col items-center mt-6"
        onMouseEnter={() => {
          isPausedRef.current = true
        }}
        onMouseLeave={() => {
          if (!isDraggingRef.current) isPausedRef.current = false
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Fanned 3D Carousel Stage */}
        <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center perspective-[1200px]">
          {CAROUSEL_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              onClick={() => handleCardClick(item, idx)}
              className="absolute w-[205px] sm:w-[275px] h-[300px] sm:h-[365px] rounded-3xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer border border-white/15 bg-neutral-950 will-change-transform"
              style={{
                transform: "translate3d(0, 0, 0)",
              }}
            >
              {/* Background Minimalist Symbol Artwork */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Card Top Meta */}
              <div className="relative z-10 flex justify-between items-center text-[10px] font-eurostile">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-eurostile border border-white/10">
                  {item.category}
                </span>
                <span className="text-white/70 text-[10px] font-eurostile">
                  {item.year}
                </span>
              </div>

              {/* Card Center Content */}
              <div className="relative z-10 my-auto py-2">
                <h4 className="text-lg sm:text-2xl font-rosnoc font-black tracking-tight leading-tight text-white drop-shadow-md">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs font-eurostile leading-relaxed mt-2 line-clamp-2 text-neutral-200 drop-shadow-xs">
                  {item.previewText}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="relative z-10 flex items-center justify-between text-xs border-t border-white/15 pt-3 text-white/80">
                <span className="text-[10px] sm:text-[11px] font-eurostile">{item.slug ? "View project" : "Profile"}</span>
                <span className="font-bold text-white transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PINTEREST CIRCULAR DIAL WITH "ME" (Cut in half by the next section layer) */}
      <div className="absolute bottom-[-160px] sm:bottom-[-250px] md:bottom-[-310px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] md:w-[700px] md:h-[700px] pointer-events-none z-10 flex items-center justify-center">
        {/* Outer dashed compass ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-black/20" />
        
        {/* Secondary solid calibration ring */}
        <div className="absolute inset-4 sm:inset-7 rounded-full border border-black/15" />
        
        {/* Tertiary thin ring */}
        <div className="absolute inset-8 sm:inset-16 rounded-full border border-black/10" />

        {/* Rotating SVG circular text path */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
          className="absolute inset-2 sm:inset-4 w-full h-full"
        >
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <path
              id="heroDialPath"
              d="M 250, 250 m -210, 0 a 210,210 0 1,1 420,0 a 210,210 0 1,1 -420,0"
              fill="none"
            />
            <text className="text-[11px] font-eurostile font-bold tracking-[0.28em] fill-black/80 uppercase">
              <textPath href="#heroDialPath">
                • PORTFOLIO • B. PRATHIK KUMAR • PRAX • DESIGN &amp; HARDWARE • HYDERABAD •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Calibration Ticks (every 15 degrees) */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-[2px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ transform: `translate(-50%, -50%) rotate(${i * 15}deg)` }}
          >
            <div className={`h-full ${i % 3 === 0 ? "w-3 bg-black/60" : "w-1.5 bg-black/25"} ml-1`} />
          </div>
        ))}

        {/* Center "ME" Anchor with Needle & High-Contrast Portrait */}
        <div className="absolute top-4 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-20">
          {/* Needle Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#660033] text-white text-[9px] sm:text-[10px] font-eurostile font-bold tracking-widest shadow-md uppercase mb-1.5 sm:mb-2">
            <span>▲ ME</span>
          </div>

          {/* High Contrast Monochrome Portrait */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-black shadow-[0_12px_28px_rgba(0,0,0,0.25)] bg-black relative group">
            <img
              src="/assets/shared/prax.jpg"
              alt="B. Prathik Kumar"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-[#660033]/15 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Label below portrait */}
          <div className="mt-1 sm:mt-2 text-center">
            <span className="block text-[11px] sm:text-xs font-rosnoc font-bold tracking-wider text-black">
              PRATHIK KUMAR
            </span>
            <span className="text-[9px] sm:text-[10px] font-eurostile text-neutral-500 font-medium">
              HYDERABAD, IN
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
