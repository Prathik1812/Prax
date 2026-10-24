"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function PixelBotCursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [blink, setBlink] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for natural bot floating follow
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.5 })

  useEffect(() => {
    setMounted(true)

    // Check if device supports fine mouse pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.tagName === "A" ||
        target?.tagName === "BUTTON" ||
        target?.closest("a") ||
        target?.closest("button") ||
        target?.getAttribute("role") === "button" ||
        target?.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Pixel bot blink interval
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 200)
    }, 3800)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearInterval(blinkInterval)
    }
  }, [mouseX, mouseY, isVisible])

  if (!mounted || !isVisible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isClicking ? 0.85 : isHovered ? 1.25 : 1,
          rotate: isHovered ? [0, -8, 8, 0] : 0,
        }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col items-center select-none"
      >
        {/* Pixel Bot Antenna */}
        <div className="flex flex-col items-center -mb-[1px]">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              isHovered ? "bg-[#660033] shadow-[0_0_8px_#660033]" : "bg-black"
            }`}
          />
          <span className="w-0.5 h-2 bg-black" />
        </div>

        {/* Pixel Bot Head */}
        <div
          className={`w-8 h-7 rounded-md border-2 border-black flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "bg-[#660033] shadow-[0_4px_14px_rgba(102,0,51,0.35)]"
              : "bg-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]"
          }`}
          style={{ imageRendering: "pixelated" }}
        >
          {/* Pixel Face Display */}
          <div className="flex items-center gap-1.5">
            {isHovered ? (
              // Excited Heart / Star eyes when hovering clickable item
              <>
                <span className="text-[10px] text-white font-eurostile font-black leading-none">^</span>
                <span className="text-[10px] text-white font-eurostile font-black leading-none">^</span>
              </>
            ) : blink ? (
              // Blinking eyes
              <>
                <span className="w-1.5 h-0.5 bg-black" />
                <span className="w-1.5 h-0.5 bg-black" />
              </>
            ) : (
              // Normal Pixel Eyes
              <>
                <span className="w-1.5 h-2 bg-black rounded-sm" />
                <span className="w-1.5 h-2 bg-black rounded-sm" />
              </>
            )}
          </div>
        </div>

        {/* Floating shadow beneath bot */}
        <div className="w-5 h-1 bg-black/15 rounded-full blur-[1px] mt-1" />
      </motion.div>
    </motion.div>
  )
}
