"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cpu, Eye, Sparkles, GraduationCap, Building2, Download, FileText, Award } from "lucide-react"

export function AboutSection() {
  const experiences = [
    {
      company: "The Journal of Advanced Scientific Frontiers (TJASF)",
      role: "Managing Editor & Co-Founder",
      period: "2026 – Present",
      location: "Academic Publishing Platform",
      logo: "/assets/tjasf/TJASF_logo_light.svg",
      description:
        "Managing Editor and Co-Founder alongside faculty member Rajesh Thumma. Directing editorial screening, reviewer allocation pipelines, double-blind peer review workflows, and platform UI/UX architecture.",
      badge: "Managing Editor",
    },
    {
      company: "FlyRank",
      role: "UI/UX Design Intern",
      period: "Jul 2026 – Aug 2026",
      location: "Remote",
      description:
        "Designed intuitive user interfaces, responsive product flows, and design system components. Collaborated closely with engineering stakeholders to deliver polished, user-centered digital experiences.",
      badge: "UI/UX",
    },
    {
      company: "SuPrazo Technologies",
      role: "Junior Design Intern",
      period: "Dec 2025 – May 2026",
      location: "Remote / Hyderabad",
      description:
        "Collaborated with cross-functional engineering and design stakeholders on component development, technical reviews, and design system feedback cycles.",
      badge: "Design",
    },
    {
      company: "Cygnus Club",
      role: "Club President & Design Director",
      period: "2023 – Present",
      location: "Anurag University",
      description:
        "Led 100+ members across design, AI, and technical product workshops. Authored and designed four printed volumes of the 'Cygnus Times' technical journal.",
      badge: "Leadership",
    },
    {
      company: "ServiceNow",
      role: "Virtual Application Development Intern",
      period: "2024",
      location: "Virtual",
      description:
        "Completed hands-on workflow automation, scripting, and configuration to build customized enterprise applications on the Now Platform.",
      badge: "Platform",
    },
    {
      company: "Anurag University, Hyderabad",
      role: "B.Tech in Electronics & Communication Engineering",
      period: "2023 – 2027 (Expected)",
      location: "Hyderabad, IN",
      description:
        "8.5 CGPA. Hands-on specialization across embedded systems, IoT sensors, FPGA physical design (Vivado / RapidWright), and full-stack application architecture.",
      badge: "Education",
    },
  ]

  const engineeringHighlights = [
    {
      title: "ENVY — Smart Agriculture IoT",
      desc: "Full-stack IoT with ESP32 and 9 environmental sensors. Hardware-to-cloud data pipeline (Supabase) + NVIDIA NIM AI recommendation layer. Co-authored IEEE research paper; patent filing in progress.",
      tag: "PATENT PENDING · IEEE PAPER",
    },
    {
      title: "Environmental Intelligence Network (EIN)",
      desc: "Distributed hazard early-warning system on ESP32 with 4 independent on-device 1D-CNN models (TFLite Micro INT8) for real-time flood, fire, and landslide inference with zero-latency GSM alerts.",
      tag: "SIH QUALCOMM PROBLEM",
    },
    {
      title: "PraxOptimizer — FPGA Physical Engine",
      desc: "Deterministic physical-optimization engine built for the FPL'26 competition on Vivado and RapidWright. Multi-armed bandit UCB scheduler and 17-recipe Fmax optimization library for UltraScale+.",
      tag: "FPL'26 COMPETITION",
    },
  ]

  return (
    <section id="about" className="py-24 bg-neutral-900 text-white relative select-none overflow-hidden font-eurostile">
      {/* Background graphic glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#660033]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Photo & Engineering Rigor */}
          <div className="lg:col-span-7">
            {/* Profile Intro Card with Real Photo */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 rounded-3xl bg-neutral-800/50 border border-neutral-700/60 mb-8 backdrop-blur-xs">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-[#660033] shadow-lg">
                <img
                  src="/assets/shared/prax.jpg"
                  alt="B. Prathik Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-rosnoc font-bold text-white tracking-tight">
                  B. Prathik Kumar (Prax)
                </h3>
                <p className="text-xs text-[#ff80bf] font-medium mt-0.5 font-eurostile">
                  Electronics Engineer · Product &amp; Graphic Designer
                </p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Hyderabad, India · +91 90147 57381 · 6011prathik@gmail.com
                </p>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-rosnoc font-bold tracking-tight leading-tight text-white mb-5">
              Electronics Precision Applied to Digital Interfaces.
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm leading-relaxed font-normal">
              <p>
                I&apos;m an Electronics &amp; Communication Engineering student at Anurag University with hands-on experience bridging hardware systems, embedded IoT devices, FPGA physical design, and digital product interfaces.
              </p>
              <p>
                The two disciplines feed each other directly: the same analytical discipline required to route a high-speed circuit trace or optimize clock frequencies on an FPGA is what I bring to designing typographic hierarchy, interaction states, and friction-free user journeys.
              </p>
            </div>

            {/* Hardware & Engineering Highlights */}
            <div className="mt-8 space-y-3">
              <h4 className="text-sm font-rosnoc font-bold text-white">
                Engineering &amp; IoT Projects
              </h4>
              {engineeringHighlights.map((eng, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-black/40 border border-neutral-800 hover:border-[#660033]/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-rosnoc font-bold text-white tracking-tight">
                      {eng.title}
                    </span>
                    <span className="text-[9px] font-eurostile px-2 py-0.5 rounded-full bg-[#660033]/70 text-[#ffb3d9] font-semibold">
                      {eng.tag}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-eurostile">
                    {eng.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Download Resume Button */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap gap-4 items-center">
              <a
                href="/assets/shared/prathik-kumar-resume.pdf"
                download="Prathik_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#660033] hover:bg-[#800040] text-white text-xs font-eurostile font-semibold tracking-wider uppercase shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Resume (PDF)</span>
              </a>
              <a
                href="https://github.com/Prathik1812"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-eurostile font-semibold tracking-wider uppercase transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>GitHub @Prathik1812</span>
              </a>
            </div>
          </div>

          {/* Right Column: Timeline & Work Experience */}
          <div className="lg:col-span-5 bg-black/70 rounded-3xl border border-neutral-800 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-rosnoc font-bold text-white mb-6 border-b border-neutral-800 pb-3">
              Experience
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-neutral-800 group hover:border-[#660033] transition-colors">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-[#ff4d94] transition-colors" />
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-rosnoc">{exp.company}</h4>
                    <span className="text-[10px] font-eurostile px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                      {exp.period}
                    </span>
                  </div>

                  {exp.logo && (
                    <div className="my-2">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white shadow-md border border-white/20">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} Official SVG Logo`}
                          className="h-6 w-auto max-w-[140px] object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[#ff80bf] font-medium mt-0.5">{exp.role}</p>
                  <p className="text-[11px] font-eurostile text-neutral-500 mt-0.5">{exp.location}</p>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Certifications Badge */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <span className="text-xs font-eurostile text-neutral-400 block mb-2">
                Credentials &amp; Certifications
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-eurostile">
                <span className="px-2.5 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300">
                  Google UX Design Pro
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300">
                  Google Cloud AI &amp; ML
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300">
                  ServiceNow Virtual
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300">
                  Figma UI/UX Specialist
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
