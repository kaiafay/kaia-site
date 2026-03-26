import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { AboutTeaser } from "@/components/about-teaser"
import { Projects } from "@/components/projects"
import { Training } from "@/components/training"
import { Now } from "@/components/now"
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  description:
    "Full-stack engineer and coach. Building clean software and stronger people.",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <Projects limit={3} />
      <Training />
      <Now />
      <Contact />
    </main>
  )
}
