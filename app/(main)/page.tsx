import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { AboutTeaser } from "@/components/about-teaser"
import { Projects } from "@/components/projects"
import { FreelanceServices } from "@/components/freelance-services"
import { Now } from "@/components/now"
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  description:
    "Software developer building apps, taking on freelance projects, and shipping in public.",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <Projects limit={3} heading="What I've Built" />
      <FreelanceServices />
      <Now />
      <Contact />
    </main>
  )
}
