import { PixelTrailCursor } from "@/components/pixel-trail-cursor"
import { Navbar } from "@/components/navbar"
import { HeroRotary } from "@/components/hero-rotary"
import { TechMarquee } from "@/components/tech-marquee"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black relative select-none font-eurostile">
      {/* Custom pixel trail cursor with hidden default cursor */}
      <PixelTrailCursor />

      {/* Dynamic Animated Glass Navbar */}
      <Navbar />

      {/* Hero with Continuous Rotating Typography & Rotating Interactive 3D Cards */}
      <HeroRotary />

      {/* Languages & Apps Logo Marquee Banner */}
      <TechMarquee />

      {/* Projects with Interactive Glass Folder Cards */}
      <ProjectsSection />

      {/* About & Trajectory */}
      <AboutSection />

      {/* Footer with Integrated Snake Game & Contact */}
      <Footer />
    </main>
  )
}
