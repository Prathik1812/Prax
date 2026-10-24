"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GlassFolder, { FolderFile } from "@/components/ui/glass-folder-cards"
import { ArrowUpRight, BookOpen, Layers } from "lucide-react"

export function ProjectsSection() {
  const router = useRouter()
  const [folderWidth, setFolderWidth] = useState(330)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 380) setFolderWidth(Math.max(270, w - 48))
      else if (w < 440) setFolderWidth(310)
      else setFolderWidth(340)
    }
    handleResize()
    window.addEventListener("resize", handleResize, { passive: true })
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const projects = [
    {
      slug: "tjasf",
      label: "TJASF Journal",
      meta: "Managing Editor · Live Platform · 2026",
      tone: "dark" as const,
      image: "/assets/tjasf/journal_cover.png",
      seed: 20,
      desc: "Live digital publishing portal and peer-review system for The Journal of Advanced Scientific Frontiers, co-founded with faculty member Rajesh Thumma.",
      badge: "01 · ACADEMIC PLATFORM",
      files: [
        { name: "Journal Cover Layout", meta: "Scientific Volume", href: "/work/tjasf", image: "/assets/tjasf/journal_cover.png" },
        { name: "Official Brand Mark", meta: "Vector SVG", href: "/work/tjasf", image: "/assets/tjasf/TJASF_logo_light.svg" },
        { name: "IEEE Paper Template", meta: "Editorial Structure", href: "/work/tjasf", image: "/assets/tjasf/journal_cover.png" },
      ],
    },
    {
      slug: "bloom-and-co",
      label: "Bloom & Co.",
      meta: "Floral Commerce · 2026",
      tone: "light" as const,
      image: "/assets/bloom/landing.jpg",
      seed: 4,
      desc: "A calm, premium shopping journey for floral gifting — designed end to end from discovery through checkout, tracking and account management.",
      badge: "02 · COMMERCE UX",
      files: [
        { name: "Landing Experience", meta: "Mobile & Web", href: "/work/bloom-and-co", image: "/assets/bloom/landing.jpg" },
        { name: "Bouquet Customizer", meta: "Interactive Flow", href: "/work/bloom-and-co", image: "/assets/bloom/mock1.jpg" },
        { name: "Cart Architecture", meta: "Mini-Cart Slideout", href: "/work/bloom-and-co", image: "/assets/bloom/cart.jpg" },
        { name: "Delivery Tracking", meta: "Real-Time Dispatch", href: "/work/bloom-and-co", image: "/assets/bloom/tracking.jpg" },
      ],
    },
    {
      slug: "attack-on-titan",
      label: "Attack on Titan UI",
      meta: "Game Interface · 2026",
      tone: "dark" as const,
      image: "/assets/aot/eren.jpg",
      seed: 8,
      desc: "Tactical military HUD structure meets anime typography and character-driven storytelling for the Scout Regiment.",
      badge: "03 · MOTION & GAME",
      files: [
        { name: "Eren Jaeger Roster", meta: "Attack Titan Form", href: "/work/attack-on-titan", image: "/assets/aot/eren.jpg" },
        { name: "Mikasa Combat Spec", meta: "Scout Regiment Spec", href: "/work/attack-on-titan", image: "/assets/aot/mikasa.jpg" },
        { name: "Armin Strategic Radar", meta: "Tactical HUD", href: "/work/attack-on-titan", image: "/assets/aot/armin.jpg" },
        { name: "Wings of Freedom Crest", meta: "Vector Identity", href: "/work/attack-on-titan", image: "/assets/aot/logo.png" },
      ],
    },
    {
      slug: "hacktronics",
      label: "Hacktronics 2.0",
      meta: "Dept. of ECE, AU · 2026",
      tone: "dark" as const,
      image: "/assets/hacktronics/banner.jpg",
      seed: 12,
      desc: "Full event identity for the Department of ECE's flagship tech fest across 4 tracks with 3D badges and stage backdrops.",
      badge: "04 · EVENT SYSTEM",
      files: [
        { name: "Auditorium Stage Banner", meta: "12m Ultra-Wide", href: "/work/hacktronics", image: "/assets/hacktronics/banner.jpg" },
        { name: "Portrait Call Poster", meta: "National Campaign", href: "/work/hacktronics", image: "/assets/hacktronics/poster-portrait.jpg" },
        { name: "Landscape Digital Keynote", meta: "Campus Displays", href: "/work/hacktronics", image: "/assets/hacktronics/poster-landscape.jpg" },
        { name: "3D Organizer Credentials", meta: "60+ Roles System", href: "/work/hacktronics", image: "/assets/hacktronics/id-sample1.jpg" },
      ],
    },
    {
      slug: "cygnus-publication",
      label: "Cygnus Publication",
      meta: "Club Identity & Newsletter · 2022–24",
      tone: "light" as const,
      image: "/assets/cygnus/times-2024.jpg",
      seed: 16,
      desc: "A black swan mark built to anchor the Swiss-grid Cygnus Times technical publication for three consecutive years.",
      badge: "05 · SWISS EDITORIAL",
      files: [
        { name: "Cygnus Times Vol 4", meta: "2024 Cover Layout", href: "/work/cygnus-publication", image: "/assets/cygnus/times-2024.jpg" },
        { name: "Black Swan Constellation", meta: "Club Crest & Monogram", href: "/work/cygnus-publication", image: "/assets/cygnus/logo.jpg" },
        { name: "12-Column Swiss Grid", meta: "Editorial Spread", href: "/work/cygnus-publication", image: "/assets/cygnus/times-2023a.jpg" },
        { name: "Inaugural Edition", meta: "2022 Publication", href: "/work/cygnus-publication", image: "/assets/cygnus/times-2022.jpg" },
      ],
    },
  ]

  const visualArchive = [
    { title: "Vogue Poster", category: "Editorial Typography", image: "/assets/selected/vogue-poster.jpg" },
    { title: "Ideatronics Identity", category: "Hardware Brand", image: "/assets/selected/ideatronics.jpg" },
    { title: "Sports Club Logo", category: "Athletic Monogram", image: "/assets/selected/sports-logo.jpg" },
    { title: "Ratan Tata Tribute", category: "Typographic Poster", image: "/assets/selected/tata-tribute.jpg" },
    { title: "Prizm Magazine Cover", category: "Print Editorial", image: "/assets/selected/prizm-cover.jpg" },
    { title: "The Silent Cafe", category: "Hospitality Identity", image: "/assets/selected/silent-cafe.png" },
  ]

  return (
    <section id="work" className="py-24 bg-white text-black relative select-none font-eurostile border-t border-black/5">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-black/10 pb-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-rosnoc font-bold tracking-tight text-black">
              PROJECTS
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl leading-relaxed font-eurostile">
              Digital product design, brand systems, and editorial direction.
            </p>
          </div>
        </div>

        {/* Glass Folder Cards Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-start justify-items-center">
          {projects.map((p) => (
            <div key={p.slug} className="flex flex-col items-center max-w-[360px] w-full group">
              {/* Category Subtitle */}
              <div className="w-full flex items-center justify-between text-xs font-eurostile text-neutral-500 mb-3 px-2">
                <span className="font-medium text-black">{p.label}</span>
                <span>{p.meta}</span>
              </div>

              {/* Real Glass Folder Card (from 21st dev glass-folder-cards component) */}
              <div className="relative">
                <GlassFolder
                  label={p.label}
                  meta={p.meta}
                  tone={p.tone}
                  image={p.image}
                  seed={p.seed}
                  files={p.files}
                  width={folderWidth}
                  action="none"
                  onFileSelect={(file: FolderFile) => {
                    if (file.href) router.push(file.href)
                  }}
                />
              </div>

              {/* Case Study Summary & Link */}
              <div className="w-full mt-4 px-2 flex flex-col">
                <p className="text-xs text-neutral-600 leading-relaxed font-eurostile line-clamp-2">
                  {p.desc}
                </p>

                <Link
                  href={`/work/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-black hover:text-[#660033] mt-2 self-start transition-colors"
                >
                  <span>Explore project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Archive Gallery */}
        <div className="mt-28 pt-12 border-t border-black/10">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-rosnoc font-bold text-black">
              Graphic Design &amp; Posters
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {visualArchive.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-black/10 bg-neutral-100 aspect-4/3 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-eurostile uppercase text-[#ff80bf] font-semibold">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-rosnoc font-bold tracking-tight mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
