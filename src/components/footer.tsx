"use client"

import React, { useState } from "react"
import { ArrowUpRight, Copy, Check, ArrowUp, Mail, Phone } from "lucide-react"
import { SnakeGame } from "@/components/snake-game"

export function Footer() {
  const [copied, setCopied] = useState(false)
  const email = "6011prathik@gmail.com"
  const phone = "+91 9014757381"

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Hello%20Prathik%20%E2%80%94%20Project%20Inquiry`

  return (
    <footer id="contact" className="pt-20 pb-16 bg-black text-white relative select-none border-t border-neutral-900 font-eurostile">
      <div className="max-w-5xl mx-auto px-6">
        {/* OWNPATH-STYLE SNAKE GAME INTEGRATED DIRECTLY IN THE FOOTER */}
        <SnakeGame />

        {/* Contact / Conversation Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end justify-between border-t border-neutral-800 pt-16 pb-16">
          <div className="md:col-span-7">
            <h2 className="text-3xl sm:text-5xl font-rosnoc font-bold tracking-tight text-white mb-4">
              Let&apos;s build something great.
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed font-eurostile">
              Available for UI/UX product design, interactive systems, and engineering collaborations in Hyderabad and remote.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-eurostile text-neutral-400">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff80bf]" />
                {phone}
              </a>
              <span>•</span>
              <span className="text-neutral-300">Hyderabad, India</span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            {/* Open directly in Gmail button */}
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#660033] hover:bg-[#800040] text-white text-sm font-semibold flex items-center justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(102,0,51,0.4)] group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff80bf]" />
                <span>Send via Gmail</span>
              </div>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopy}
              className="w-full py-3 px-5 rounded-2xl border border-neutral-800 hover:border-neutral-600 bg-neutral-900/60 text-xs font-eurostile text-neutral-300 hover:text-white flex items-center justify-between transition-all"
            >
              <span className="truncate">{email}</span>
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Copied to clipboard
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Navigation & Social Links */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-eurostile text-neutral-500">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.linkedin.com/in/Prathik1812"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/prathikkumar4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="https://github.com/Prathik1812"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/protagonist_prathik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2026 B. PRATHIK KUMAR (PRAX)</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-all"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
