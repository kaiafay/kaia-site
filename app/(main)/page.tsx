import { Hero } from "@/components/hero"
import { AboutTeaser } from "@/components/about-teaser"
import { FeaturedWork } from "@/components/featured-work"
import { FreelanceServices } from "@/components/freelance-services"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <FeaturedWork />
      <FreelanceServices />
      <Contact showDirectContact />
    </main>
  )
}
