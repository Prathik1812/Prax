import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ALL_PROJECTS } from "@/data/projects"
import { PixelTrailCursor } from "@/components/pixel-trail-cursor"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Calendar, User, Globe } from "lucide-react"

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = ALL_PROJECTS.find((p) => p.slug === slug)
  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} — Prathik Kumar (Prax)`,
    description: project.overview,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectIndex = ALL_PROJECTS.findIndex((p) => p.slug === slug)
  if (projectIndex === -1) {
    notFound()
  }

  const project = ALL_PROJECTS[projectIndex]
  const prevProject =
    ALL_PROJECTS[(projectIndex - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length]
  const nextProject =
    ALL_PROJECTS[(projectIndex + 1) % ALL_PROJECTS.length]

  return (
    <main className="min-h-screen bg-white text-black relative select-none font-eurostile">
      <PixelTrailCursor />
      <Navbar />

      {/* Project Hero Section */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Back navigation */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-eurostile text-neutral-500 hover:text-black transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to work</span>
        </Link>

        {/* Project Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-black text-white text-xs font-medium">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-eurostile text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {project.year}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-400" />
              {project.role}
            </span>
          </div>
        </div>

        {/* Case Study Main Title & Subtitle */}
        <div className="relative mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-rosnoc font-bold tracking-tight text-black leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg sm:text-2xl text-neutral-600 font-normal leading-relaxed max-w-3xl font-eurostile">
            {project.subtitle}
          </p>
        </div>

        {/* Hero Cover Image Preview */}
        {project.coverImage && (
          <div className="relative w-full rounded-3xl overflow-hidden border border-black/10 mb-12 shadow-xl aspect-16/9 bg-neutral-900">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white text-xs font-eurostile bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              {project.title} · {project.category}
            </div>
          </div>
        )}

        {/* Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-black/5 mb-12 shadow-xs">
          <div>
            <span className="text-xs text-neutral-400 block font-medium">Client</span>
            <span className="text-xs sm:text-sm font-semibold text-black mt-1 block font-eurostile">{project.client}</span>
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-medium">Role</span>
            <span className="text-xs sm:text-sm font-semibold text-black mt-1 block font-eurostile">{project.role}</span>
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-medium">Duration</span>
            <span className="text-xs sm:text-sm font-semibold text-black mt-1 block font-eurostile">{project.duration}</span>
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-medium">Platform</span>
            <span className="text-xs sm:text-sm font-semibold text-[#660033] mt-1 block font-eurostile">{project.platform}</span>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-black/10 bg-white shadow-xs flex flex-col justify-between"
            >
              <span className="text-3xl sm:text-4xl font-rosnoc font-bold tracking-tight text-[#660033]">
                {metric.value}
              </span>
              <span className="text-xs font-eurostile text-neutral-500 mt-2 uppercase tracking-wider font-semibold">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/10 pt-12">
          {/* Main Story Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-rosnoc font-bold text-black mb-3">
                Overview
              </h2>
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-normal font-eurostile">
                {project.overview}
              </p>
            </div>

            {/* The Challenge */}
            <div className="p-8 rounded-3xl bg-neutral-900 text-white relative overflow-hidden shadow-xl border border-neutral-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#660033]/25 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-xl font-rosnoc font-bold tracking-tight text-white mb-4">
                The Challenge
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-eurostile">
                {project.challenge}
              </p>
            </div>

            {/* The Approach */}
            <div>
              <h3 className="text-2xl font-rosnoc font-bold text-black mb-3">
                Design &amp; Approach
              </h3>
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed mb-6 font-normal font-eurostile">
                {project.solution}
              </p>

              {/* Project Scope Breakdown */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-eurostile font-bold uppercase tracking-wider text-black">
                  Scope Covered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.scope.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-black/10 bg-neutral-50 flex items-center gap-3 text-xs font-eurostile font-medium text-black"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#660033] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-eurostile font-bold uppercase tracking-wider text-black">
                  Key Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-black/10 bg-white shadow-xs flex items-center gap-3 text-xs font-eurostile font-medium text-neutral-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#660033] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* External Links Bar */}
            <div className="pt-6 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#660033] hover:bg-[#7d003e] text-white text-xs font-eurostile font-semibold tracking-wider uppercase shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <span>View Live Prototype</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.behanceUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-eurostile font-semibold tracking-wider uppercase shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                  <span>Behance Presentation</span>
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl border border-black/10 bg-neutral-50 shadow-xs">
              <h4 className="text-xs font-eurostile font-bold uppercase tracking-wider text-black mb-4">
                Disciplines &amp; Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-eurostile text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-black/10 bg-white shadow-xs">
              <h4 className="text-xs font-eurostile font-bold uppercase tracking-wider text-[#660033] mb-2 font-rosnoc">
                Design Philosophy
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                &ldquo;The same attention that goes into routing a clean signal path goes into setting a type scale or laying out an interaction.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* HIGH-RESOLUTION PROJECT ARTIFACT & SCREENSHOT GALLERY */}
        {project.images && project.images.length > 0 && (
          <div className="mt-20 pt-12 border-t border-black/10">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-rosnoc font-bold text-black">
                Screens &amp; Visuals
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`group rounded-3xl overflow-hidden border border-black/10 bg-neutral-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${
                    img.aspect === "wide" ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden bg-neutral-950 flex items-center justify-center">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-4 bg-white border-t border-black/5 flex items-center justify-between text-xs">
                    <span className="text-neutral-800 font-medium font-eurostile">
                      {img.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next / Previous Project Navigation Bar */}
        <div className="mt-20 pt-10 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/work/${prevProject.slug}`}
            className="p-6 rounded-3xl border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between group"
          >
            <span className="text-xs font-eurostile text-neutral-400">
              ← Previous Project
            </span>
            <span className="text-xl font-rosnoc font-bold text-black group-hover:text-[#660033] transition-colors mt-2">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="p-6 rounded-3xl border border-black/10 hover:border-black/30 transition-all flex flex-col justify-between text-right group"
          >
            <span className="text-xs font-eurostile text-neutral-400">
              Next Project →
            </span>
            <span className="text-xl font-rosnoc font-bold text-black group-hover:text-[#660033] transition-colors mt-2">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </section>

      {/* Footer (includes integrated Snake Game and Contact) */}
      <Footer />
    </main>
  )
}
