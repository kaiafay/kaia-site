import { Hero } from "@/components/hero"
import { AboutTeaser } from "@/components/about-teaser"
import { FeaturedWork } from "@/components/featured-work"
import { FreelanceServices } from "@/components/freelance-services"
import { Contact } from "@/components/contact"

// Section order is deliberate: identity and context → personal connection →
// proof → fit/investment → action.
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <FeaturedWork />
      <FreelanceServices />
      <Contact
        showDirectContact
        heading="Tell me about your project"
        description="Have a project in mind, or just a question? Reach out and I'll get back to you within one to two business days."
      />
    </main>
  )
}
