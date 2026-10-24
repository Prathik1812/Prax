"use client"

import React from "react"
import { Marquee } from "@/components/ui/marquee"

// Highly visible, crisp SVGs with zero boxes or borders
const LOGOS = [
  {
    name: "Python",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 110 110">
        <path d="M54.2 2C27.9 2 29.5 13.4 29.5 13.4l.1 11.8h25.2v3.6H19.2S3 26.9 3 53.6s14.1 24.3 14.1 24.3h8.4v-11.8s-.5-14.1 13.8-14.1h23.7s13.3.2 13.3-13.1V15.1S78.5 2 54.2 2zm-13.6 7.6c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9z" fill="#3776AB" />
        <path d="M55.8 108c26.3 0 24.7-11.4 24.7-11.4l-.1-11.8H55.2v-3.6h35.6s16.2 1.9 16.2-24.8-14.1-24.3-14.1-24.3h-8.4v11.8s.5 14.1-13.8 14.1H41.4s-13.3-.2-13.3 13.1v23.8S31.5 108 55.8 108zm13.6-7.6c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9z" fill="#FFD438" />
      </svg>
    ),
  },
  {
    name: "C / C++",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 128 128">
        <path d="M117.5 34.6L68.8 6.5c-2.9-1.7-6.7-1.7-9.6 0L10.5 34.6c-2.9 1.7-4.8 4.9-4.8 8.3v56.2c0 3.4 1.9 6.6 4.8 8.3l48.7 28.1c1.5.9 3.1 1.3 4.8 1.3s3.3-.4 4.8-1.3l48.7-28.1c2.9-1.7 4.8-4.9 4.8-8.3V42.9c0-3.4-1.9-6.6-4.8-8.3z" fill="#00599C" />
        <path d="M64 25.5c-21.3 0-38.5 17.2-38.5 38.5S42.7 102.5 64 102.5c15.2 0 28.4-8.8 34.7-21.6l-14.3-8.3c-3.7 7.7-11.6 13-20.4 13-12.9 0-23.4-10.5-23.4-23.4S51.1 38.8 64 38.8c8.8 0 16.7 5.3 20.4 13l14.3-8.3C92.4 30.7 79.2 25.5 64 25.5z" fill="#FFFFFF" />
        <path d="M96 55h6v8h-6v6h-8v-6h-6v-8h6v-6h8v6zm18 0h6v8h-6v6h-8v-6h-6v-8h6v-6h8v6z" fill="#004482" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 128 128">
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path d="M72.5 86.8c1.6 3 4 5.4 7.2 7.1 3.2 1.8 7 2.7 11.3 2.7 4 0 7.4-.7 10.3-2.1s5-3.4 6.4-5.9c1.4-2.5 2.1-5.4 2.1-8.6 0-3.1-.7-5.8-2-8-1.3-2.2-3.3-4.1-6-5.6-2.7-1.5-6.1-3-10.3-4.4-4-.14-7-2.6-9.1-3.9-2.1-1.3-3.7-2.9-4.8-4.8-1.1-1.9-1.6-4.2-1.6-6.9 0-3.3.9-6.2 2.7-8.7s4.3-4.4 7.6-5.8c3.3-1.4 7.2-2.1 11.7-2.1 4.5 0 8.5.8 11.9 2.4s6.1 3.9 8.1 7l-8.6 5.5c-1.3-2-3-3.6-5.2-4.7s-4.6-1.7-7.4-1.7c-3.5 0-6.4.7-8.6 2.2-2.2 1.5-3.3 3.6-3.3 6.3 0 2.4.6 4.3 1.9 5.8 1.3 1.4 3 2.6 5.3 3.6 2.2 1 5.1 2 8.7 3.2 5.2 1.7 9.4 3.6 12.6 5.6s5.6 4.5 7.2 7.5c1.6 3 2.4 6.6 2.4 10.9 0 4.3-1.1 8.2-3.3 11.6s-5.4 6-9.5 7.9c-4.1 1.9-9 2.8-14.7 2.8-6.1 0-11.5-1.1-16.1-3.4s-8.1-5.6-10.5-9.8l8.9-5.1zM58.3 43.1v56.8H47.1V43.1H28.7V33.6h48.3v9.5H58.3z" fill="white" />
      </svg>
    ),
  },
  {
    name: "React",
    svg: (
      <svg className="h-10 w-auto fill-[#0ea5e9]" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#0ea5e9" />
        <g stroke="#0ea5e9" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.438L69.147 54H54V125.979H66.6975V69.7542L139.81 163.666C143.23 161.79 146.47 159.704 149.508 157.438Z" fill="white" />
        <path d="M115.823 54H128.52V126H115.823V54Z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    svg: (
      <svg className="h-8 w-auto fill-[#38bdf8]" viewBox="0 0 54 33">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 38 57">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: "Adobe Illustrator",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="20" fill="#330000" />
        <text x="50" y="65" fill="#FF9A00" fontSize="42" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Ai</text>
      </svg>
    ),
  },
  {
    name: "Adobe Photoshop",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="20" fill="#001E36" />
        <text x="50" y="65" fill="#31A8FF" fontSize="42" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Ps</text>
      </svg>
    ),
  },
  {
    name: "Adobe After Effects",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="20" fill="#00005B" />
        <text x="50" y="65" fill="#D29BFF" fontSize="42" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Ae</text>
      </svg>
    ),
  },
  {
    name: "Supabase",
    svg: (
      <svg className="h-10 w-auto" viewBox="0 0 109 113" fill="none">
        <path d="M63.7076 110.284C60.848 113.885 55.0422 111.934 54.9084 107.354L53.1378 46.7764H99.4346C107.564 46.7764 112.019 56.242 106.828 62.7788L63.7076 110.284Z" fill="#3ECF8E" />
        <path d="M45.2924 2.716C48.152 -0.885141 53.9578 1.06642 54.0916 5.64619L55.8622 66.2236H9.56538C1.43615 66.2236 -3.01857 56.758 2.17183 50.2212L45.2924 2.716Z" fill="#249361" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    svg: (
      <svg className="h-9 w-auto fill-black" viewBox="0 0 14 21">
        <path d="M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z" fill="black" />
      </svg>
    ),
  },
  {
    name: "Webflow",
    svg: (
      <svg className="h-8 w-auto fill-[#146EF5]" viewBox="0 0 1024 1024">
        <path d="M1001.3 275.6c-17.7 0-33.8 6.4-46.7 17.7L723.2 505.7l-94.8-212.4c-12.9-28.2-41-46.7-72.4-46.7-31.4 0-59.5 18.5-72.4 46.7L388.8 505.7 157.4 293.3c-12.9-11.3-29-17.7-46.7-17.7-40.2 0-72.4 32.2-72.4 72.4 0 16.9 5.6 32.2 16.1 44.3l270.5 281c12.9 12.9 29.8 20.1 48.3 20.1 18.5 0 35.4-7.2 48.3-20.1l133.7-138.5 133.7 138.5c12.9 12.9 29.8 20.1 48.3 20.1 18.5 0 35.4-7.2 48.3-20.1l270.5-281c10.5-12.1 16.1-27.4 16.1-44.3 0-40.2-32.2-72.4-72.4-72.4z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    svg: (
      <svg className="h-10 w-auto fill-black" viewBox="0 0 98 96">
        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
      </svg>
    ),
  },
]

export function TechMarquee() {
  return (
    <section id="toolkit" className="relative z-30 py-16 bg-white border-t border-black/10 overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-rosnoc font-bold tracking-tight text-black">
            Languages, Tools &amp; Hardware
          </h3>
        </div>
      </div>

      {/* Marquee with pure logos: no borders, no boxes, no shadows, no emboss */}
      <div className="relative">
        {/* Soft edge gradients */}
        <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <Marquee pauseOnHover={true} speed={38} className="my-0">
          {LOGOS.map((logo, index) => (
            <div
              key={index}
              className="mx-8 sm:mx-12 flex flex-col items-center justify-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-115"
              title={logo.name}
            >
              <div className="h-11 flex items-center justify-center">
                {logo.svg}
              </div>
              <span className="text-xs font-eurostile tracking-wider text-neutral-600 group-hover:text-black transition-colors font-medium">
                {logo.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
