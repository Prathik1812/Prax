import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Prathik Kumar (Prax) — Product & Graphic Designer",
  description:
    "Portfolio of Prathik Kumar — Electronics Engineer and UI/UX Designer directing attention through light, shadow, and motion.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-eurostile">{children}</body>
    </html>
  )
}

