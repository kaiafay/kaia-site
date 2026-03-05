import { Hero } from "@/components/hero"
import { AboutTeaser } from "@/components/about-teaser"
import { Projects } from "@/components/projects"
import { Training } from "@/components/training"
import { Now } from "@/components/now"
import { Contact } from "@/components/contact"

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
