export interface ProjectImage {
  url: string
  caption: string
  aspect?: "wide" | "square" | "tall"
}

export interface ProjectData {
  slug: string
  number: string
  title: string
  subtitle: string
  tagline: string
  category: "UX/UI" | "Identity" | "Motion & Game" | "IoT & Embedded"
  year: string
  client: string
  role: string
  duration: string
  platform: string
  coverImage: string
  images: ProjectImage[]
  overview: string
  challenge: string
  solution: string
  scope: string[]
  deliverables: string[]
  metrics: { label: string; value: string }[]
  accentColor: string
  liveUrl?: string
  behanceUrl?: string
  tags: string[]
}

export const ALL_PROJECTS: ProjectData[] = [
  {
    slug: "tjasf",
    number: "01",
    title: "TJASF Journal",
    subtitle: "The Journal of Advanced Scientific Frontiers — Live Peer-Review & Publishing System",
    tagline: "End-to-end scientific publishing portal and double-blind peer review system co-founded with faculty.",
    category: "UX/UI",
    year: "2026",
    client: "TJASF Editorial Board & Dept. of ECE, AU",
    role: "Managing Editor, Co-Founder & Lead UI/UX Designer",
    duration: "12 Weeks",
    platform: "Responsive Web / Supabase / React 19",
    coverImage: "/assets/tjasf/journal_cover.png",
    images: [
      { url: "/assets/tjasf/journal_cover.png", caption: "Official Scientific Journal Volume Cover Architecture", aspect: "tall" },
      { url: "/assets/tjasf/TJASF_logo_light.svg", caption: "Official TJASF Vector Brand Identity (SVG)", aspect: "wide" },
    ],
    overview:
      "The Journal of Advanced Scientific Frontiers (TJASF) is a multidisciplinary, open-access, peer-reviewed scientific journal. Serving as Managing Editor and Co-Founder alongside faculty member Rajesh Thumma, directed the editorial screening workflow and double-blind peer review lifecycle while designing the complete UI/UX architecture, brand identity, logo variants, and IEEE-style submission templates.",
    challenge:
      "Academic publishing platforms often suffer from convoluted multi-step submission flows, fragmented author-reviewer communication, and confusing status visibility, discouraging submissions and slowing review turnaround.",
    solution:
      "Architected clean multi-role workspaces for Authors, Reviewers, Editors, and Administrators with a double-blind peer review pipeline, automated metadata extraction on formatted manuscript upload, and static IEEE downloadable author templates.",
    scope: [
      "Author, Reviewer & Editor Workspaces",
      "Double-Blind Peer Review Pipeline",
      "Automated Manuscript Metadata Extraction",
      "Brand Identity & IEEE Paper Template",
    ],
    deliverables: [
      "Production-Ready Web Application & UX System",
      "Complete Brand Identity & Logo Variations",
      "Official IEEE-Style Manuscript Submission Template",
      "Multi-Role Permission & Editorial Architecture",
    ],
    metrics: [
      { label: "Review Stages", value: "Double-Blind" },
      { label: "Role Workspaces", value: "4 Tailored" },
      { label: "Platform Access", value: "Open-Access" },
    ],
    accentColor: "#102342",
    liveUrl: "https://github.com/Prathik1812/tjasf",
    tags: ["UI/UX Design", "Scientific Publishing", "React 19", "Supabase", "Brand Identity"],
  },
  {
    slug: "bloom-and-co",
    number: "02",
    title: "Bloom & Co.",
    subtitle: "Floral E-Commerce & Emotional Shopping Experience",
    tagline: "A calm, premium shopping journey for floral gifting — designed end to end from discovery through checkout.",
    category: "UX/UI",
    year: "2026",
    client: "Bloom & Co. Botanicals",
    role: "Lead Product Designer (UX+UI)",
    duration: "6 Weeks",
    platform: "iOS / Android / Responsive Web",
    coverImage: "/assets/bloom/landing.jpg",
    images: [
      { url: "/assets/bloom/landing.jpg", caption: "Landing Page Hero & Botanical Discovery Experience", aspect: "wide" },
      { url: "/assets/bloom/mock1.jpg", caption: "Mobile Browsing, Occasion Filtering & Stem Selection", aspect: "tall" },
      { url: "/assets/bloom/mock2.jpg", caption: "Curated Mood Collections & Bespoke Bouquet Assembly", aspect: "tall" },
      { url: "/assets/bloom/mock3.jpg", caption: "Cart Architecture, Gift Note Personalization & Delivery Timing", aspect: "tall" },
      { url: "/assets/bloom/mock4.jpg", caption: "Transparent Checkout Flow & Frictionless Payment", aspect: "tall" },
      { url: "/assets/bloom/cart.jpg", caption: "Mini-Cart Slideout & Dynamic Stem Counter", aspect: "square" },
      { url: "/assets/bloom/checkout.jpg", caption: "Single-Step Express Checkout with Real-Time Address Validation", aspect: "square" },
      { url: "/assets/bloom/tracking.jpg", caption: "Live Cold-Chain Dispatch & Real-Time Delivery Tracking", aspect: "wide" },
    ],
    overview:
      "Most floral delivery apps either bury the product behind cluttered filters or lean so hard into decoration that the actual bouquet gets lost. Bloom & Co. needed a browsing experience that felt as calm and considered as the product itself — flowers as a gift, not just inventory. The scope covered the full commerce loop: discovery, product detail & customization, cart, checkout, delivery tracking, and order management.",
    challenge:
      "Traditional floral e-commerce is overwhelmed with transactional friction, busy discounts, and clinical categorization that ruins the romance of gifting. The user experience needed to balance delicate emotional elegance with high-converting checkout clarity.",
    solution:
      "Crafted a stage-like visual flow with warm velvet tones, curated 'Mood & Occasion' matching, an interactive 3D-feel stem customizer, and a transparent delivery tracker that assures users their gift arrives fresh.",
    scope: [
      "Discovery & Botanical Curations",
      "Interactive Bouquet Customizer",
      "Cart & Checkout Architecture",
      "Live Order Tracking & Account Portal",
    ],
    deliverables: [
      "End-to-End Responsive Web Application",
      "Figma Component Design System & Tokens",
      "Interactive Micro-Interactions & Transitions",
      "Usability Testing & Conversion Flow",
    ],
    metrics: [
      { label: "Checkout Conversion", value: "+38%" },
      { label: "Avg Session Duration", value: "4m 12s" },
      { label: "Customer CSAT Rating", value: "4.9/5" },
    ],
    accentColor: "#660033",
    behanceUrl: "https://www.behance.net/gallery/228935117/Bloom-Co",
    tags: ["UX/UI Design", "Floral Commerce", "Design Systems", "Webflow", "Figma"],
  },
  {
    slug: "attack-on-titan",
    number: "03",
    title: "Attack on Titan UI",
    subtitle: "Cinematic Character Selection & Gaming Interface",
    tagline: "Tactical HUD structure meets anime typography and character-driven storytelling.",
    category: "Motion & Game",
    year: "2026",
    client: "Personal Concept / Fan Project",
    role: "UI & Motion Designer",
    duration: "4 Weeks",
    platform: "Desktop & Console UI (16:9 4K)",
    coverImage: "/assets/aot/eren.jpg",
    images: [
      { url: "/assets/aot/eren.jpg", caption: "Character Dossier: Eren Jaeger (Attack Titan Form)", aspect: "wide" },
      { url: "/assets/aot/mikasa.jpg", caption: "Tactical Scout Dossier: Mikasa Ackerman Combat Spec", aspect: "wide" },
      { url: "/assets/aot/armin.jpg", caption: "Strategic Commander Dossier: Armin Arlert Tactical Radar", aspect: "wide" },
      { url: "/assets/aot/logo.png", caption: "Wings of Freedom Military Crest Vectorization", aspect: "square" },
      { url: "/assets/aot/wordmark.png", caption: "Heavy Distressed Attack on Titan Kanji Typography", aspect: "square" },
    ],
    overview:
      "Most anime game menus feel generic and lack narrative intensity — character selection screens often present information passively instead of emotionally. This concept was built to feel tactical and militaristic: highlighting each Scout Regiment soldier's personality, blending typography with anime visuals, and creating electric anticipation before gameplay begins.",
    challenge:
      "Balancing dense tactical military HUD information (gear loadouts, ODM blade durability, titan-kill ratios) with cinematic visual drama without obscuring character art or slowing down player navigation.",
    solution:
      "Engineered an adaptive radial character carousel, fluid polygon stat radar charts, high-framerate kinetic typography reveals, and tactile audio-visual cues that react dynamically as players switch soldiers.",
    scope: [
      "Scout Regiment Character Selection Roster",
      "Tactical Military HUD Design",
      "Dynamic Stat Radar & Weapon Loadouts",
      "Sound Design & Motion Prototype",
    ],
    deliverables: [
      "4K Interactive Motion Prototype",
      "Custom Anime Typography Hierarchy",
      "Interactive Character Roster Carousel",
      "Sound Effect & Trigger Documentation",
    ],
    metrics: [
      { label: "Interaction Framerate", value: "60 FPS" },
      { label: "Input Response Latency", value: "<16ms" },
      { label: "Design Community Repins", value: "1.2K+" },
    ],
    accentColor: "#000000",
    tags: ["Game UI", "Tactical HUD", "Motion Design", "After Effects", "Framer Motion"],
  },
  {
    slug: "hacktronics",
    number: "04",
    title: "Hacktronics 2.0",
    subtitle: "National Tech-Fest Brand System & Collateral",
    tagline: "One wordmark carried across posters, landscape banners, and 60+ organizer credentials.",
    category: "Identity",
    year: "2026",
    client: "Dept. of ECE, Anurag University (AU)",
    role: "Lead Graphic Designer & Identity Director",
    duration: "8 Weeks",
    platform: "Print Collateral, Digital Displays, Badges & Social",
    coverImage: "/assets/hacktronics/banner.jpg",
    images: [
      { url: "/assets/hacktronics/banner.jpg", caption: "Auditorium Main Stage Keynote Backdrop (12m Ultra-Wide)", aspect: "wide" },
      { url: "/assets/hacktronics/poster-portrait.jpg", caption: "Official National Call-for-Hackers Promotional Poster", aspect: "tall" },
      { url: "/assets/hacktronics/poster-landscape.jpg", caption: "Digital Campus Display & Social Announcement Key Visual", aspect: "wide" },
      { url: "/assets/hacktronics/id-sample1.jpg", caption: "Core Organizer Credential Badge System (Lead Track)", aspect: "tall" },
      { url: "/assets/hacktronics/id-sample2.jpg", caption: "Volunteer & Jury Identification Lanyard Badges", aspect: "tall" },
      { url: "/assets/hacktronics/id-sample3.jpg", caption: "Technical Track Participant Credentials", aspect: "tall" },
    ],
    overview:
      "A full comprehensive event identity for the Department of ECE's flagship national tech symposium. Hacktronics 2.0 runs across four technical tracks — Robotics, AIIoT, Tracksat, and VLSI. The wordmark was built as a stacked, circuit-textured monogram that commands attention at billboard scale while compressing cleanly into participant badges and social tiles.",
    challenge:
      "Creating an identity that bridges hard electronic engineering (PCBs, circuit traces, microcontrollers) with cutting-edge software and cyber aesthetics, functioning seamlessly across huge physical stage backdrops and tiny 2-inch lanyard credentials.",
    solution:
      "Developed a cohesive navy-and-white cyber-engineering design system with crimson accents. Produced portrait promotional posters, ultra-wide digital stage banners, 3D holographic badges for 60+ student organizers, and interactive registration assets.",
    scope: [
      "Circuit-Textured Monogram & Wordmark",
      "Stage Backdrops & Keynote Screen Visuals",
      "Organizer & Attendee Credentials System",
      "Multi-Track Social Media Campaign Kit",
    ],
    deliverables: [
      "Official Event Brand Identity Manual",
      "60+ Unique Organizer Badge Variations",
      "High-Resolution Print Poster Collateral",
      "Social Media Campaign Assets (45K+ Views)",
    ],
    metrics: [
      { label: "Symposium Attendees", value: "1,200+" },
      { label: "Physical Print Badges", value: "60+ Roles" },
      { label: "Track Participation", value: "4 Tracks" },
    ],
    accentColor: "#660033",
    tags: ["Brand Identity", "Event Branding", "Circuit Aesthetics", "Print & Merch", "Illustrator"],
  },
  {
    slug: "cygnus-publication",
    number: "05",
    title: "Cygnus Publication",
    subtitle: "Club Identity & Swiss-Grid Editorial Magazine",
    tagline: "A black swan mark built to anchor a technical newsletter running for three consecutive years.",
    category: "Identity",
    year: "2022–24",
    client: "Dept. of ECE, Anurag University (AU)",
    role: "Chief Graphic Designer & Club President",
    duration: "2 Years",
    platform: "Print Magazine, Editorial Layouts, Digital PDF",
    coverImage: "/assets/cygnus/times-2024.jpg",
    images: [
      { url: "/assets/cygnus/times-2024.jpg", caption: "Cygnus Times 2024 Volume: Cover Artwork & Typography", aspect: "tall" },
      { url: "/assets/cygnus/logo.jpg", caption: "The Black Swan Constellation Crest & ECE Dept. Monogram", aspect: "square" },
      { url: "/assets/cygnus/times-2023a.jpg", caption: "Cygnus Times 2023 Edition A: 12-Column Swiss Typographic Layout", aspect: "tall" },
      { url: "/assets/cygnus/times-2023b.jpg", caption: "Cygnus Times 2023 Edition B: Technical Research Feature Spread", aspect: "tall" },
      { url: "/assets/cygnus/times-2022.jpg", caption: "Cygnus Times Inaugural 2022 Issue Cover Architecture", aspect: "tall" },
    ],
    overview:
      "Identity for the ECE department's Cygnus club. The Cygnus constellation is named for a swan — so the mark literally draws one, rising from the department's ECE crest, paired with a hand-cut ransom-note wordmark that gives the otherwise formal symbol sharp personality. That contrast — a formal emblem against a collaged wordmark — became the visual rule for everything the club produces, anchoring the biannual 'Cygnus Times' magazine.",
    challenge:
      "Technical engineering newsletters frequently suffer from dry, impenetrable blocks of text and lack visual rhythm, leading to poor student engagement and low readership.",
    solution:
      "Implemented a strict 12-column Swiss typographic grid, striking monochrome photography with burgundy accents, custom technical schematics, and punchy editorial pull-quotes that elevate student research into an inspiring publication.",
    scope: [
      "Cygnus Constellation Crest & Collaged Wordmark",
      "Biannual 'Cygnus Times' Editorial Magazine Layouts",
      "Infographic Systems for Circuit & AI Research",
      "Campus Print Distribution & Archival System",
    ],
    deliverables: [
      "Complete Visual Standard & Style Guide",
      "4 Published Print Magazine Editions",
      "Custom Iconography & Technical Charts",
      "Archival Digital Distribution PDFs",
    ],
    metrics: [
      { label: "Campus Readers", value: "2,000+" },
      { label: "Consecutive Years", value: "3 Years" },
      { label: "Read-Through Rate", value: "84%" },
    ],
    accentColor: "#000000",
    tags: ["Editorial Design", "Swiss Grid", "Typography", "Publication", "InDesign"],
  },
]
