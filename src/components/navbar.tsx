"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, ArrowUpRight, Menu, X, Sparkles } from "lucide-react"

interface NavItem {
  label: string
  href: string
  isMain: boolean
  isGame?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#hero", isMain: false },
  { label: "Work", href: "/#work", isMain: true },
  { label: "Stack", href: "/#toolkit", isMain: false },
  { label: "About", href: "/#about", isMain: false },
  { label: "Snake Game", href: "/#game", isMain: true, isGame: true },
]

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Home")
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Collapse when user scrolls past 70px
          const scrolled = window.scrollY > 70
          setIsScrolled(scrolled)

          const sections = ["hero", "work", "toolkit", "about", "game"]
          const scrollPos = window.scrollY + 220

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId)
            if (el) {
              const top = el.offsetTop
              const height = el.offsetHeight
              if (scrollPos >= top && scrollPos < top + height) {
                const matched = NAV_ITEMS.find((item) => item.href.includes(sectionId))
                if (matched) setActiveTab(matched.label)
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-none">
        <motion.nav
          layout
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            layout: { type: "spring", stiffness: 420, damping: 32 },
            opacity: { duration: 0.3 },
          }}
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "max-w-xl sm:max-w-2xl px-5 py-3 sm:px-6 sm:py-3.5 bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border-black/15"
              : "w-full max-w-5xl px-6 py-3.5 sm:px-8 sm:py-4 bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-black/10"
          }`}
        >
          {/* Logo / Brand with #660033 pulse */}
          <motion.a
            layout
            href="/#hero"
            className="flex items-center gap-3 font-bold tracking-tight text-black group shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-rosnoc text-sm font-black group-hover:bg-[#660033] transition-colors duration-300 shadow-xs">
              P
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-rosnoc tracking-wider text-black font-bold">
                PRAX
              </span>
              <span className="w-2 h-2 rounded-full bg-[#660033] animate-pulse" />
              <AnimatePresence>
                {!isScrolled && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden text-xs text-neutral-500 font-eurostile font-medium hidden sm:inline-block whitespace-nowrap pl-0.5"
                  >
                    STUDIO
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.a>

          {/* Desktop Navigation Tabs: Expands & Collapses based on scroll */}
          <motion.div
            layout
            className="hidden md:flex items-center gap-1.5 bg-neutral-100/80 p-1.5 rounded-full border border-black/5 font-eurostile"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {NAV_ITEMS.map((item) => {
                const isVisible = !isScrolled || item.isMain
                if (!isVisible) return null

                const isActive = activeTab === item.label
                const isHovered = hoveredTab === item.label

                return (
                  <motion.a
                    layout
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, scale: 0.85, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    onClick={() => setActiveTab(item.label)}
                    onMouseEnter={() => setHoveredTab(item.label)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={`relative px-4 py-2 sm:px-5 sm:py-2 text-[13px] sm:text-sm font-semibold tracking-wide transition-colors duration-200 rounded-full flex items-center gap-2 select-none whitespace-nowrap ${
                      isActive ? "text-white" : "text-neutral-700 hover:text-black"
                    }`}
                  >
                    {/* Active sliding capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        className="absolute inset-0 bg-black rounded-full z-0 shadow-sm"
                      />
                    )}

                    {/* Hover subtle glow */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="hover-pill"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        className="absolute inset-0 bg-[#660033]/10 rounded-full z-0"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      {item.isGame && (
                        <Gamepad2
                          className={`w-4 h-4 ${
                            isActive ? "text-[#38bdf8]" : "text-[#660033]"
                          }`}
                        />
                      )}
                      {item.label}
                    </span>
                  </motion.a>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Right Action: Let's Connect CTA */}
          <motion.div layout className="flex items-center gap-3 font-eurostile shrink-0">
            <a
              href="#contact"
              className={`hidden sm:inline-flex items-center gap-2 rounded-full bg-[#660033] hover:bg-[#800040] text-white font-medium tracking-wide shadow-[0_4px_14px_rgba(102,0,51,0.3)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] ${
                isScrolled
                  ? "px-5 py-2 text-xs sm:text-sm"
                  : "px-6 py-2.5 text-sm"
              }`}
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="md:hidden w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </motion.nav>
      </header>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-xl border border-black/10 rounded-3xl p-6 shadow-2xl md:hidden font-eurostile"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-base font-semibold transition-colors ${
                    activeTab === item.label
                      ? "bg-black text-white"
                      : "text-black hover:bg-neutral-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.isGame && <Gamepad2 className="w-4 h-4 text-[#660033]" />}
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full py-3.5 rounded-2xl bg-[#660033] text-white text-center text-sm font-semibold shadow-lg"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
