import { Hero } from "@/components/hero"
import { WhoIWorkWith } from "@/components/who-i-work-with"
import { AboutTeaser } from "@/components/about-teaser"
import { FeaturedWork } from "@/components/featured-work"
import { FreelanceServices } from "@/components/freelance-services"
import { Contact } from "@/components/contact"

// Section order is deliberate: recognition (hero) → understanding (who I work
// with) → proof (work) → fit/investment (services) → trust (about) → action.
export default function Home() {
  return (
    <main>
      <Hero />
      <WhoIWorkWith />
      <FeaturedWork />
      <FreelanceServices />
      <AboutTeaser />
      <Contact
        showDirectContact
        heading="Tell me about your project"
        description="Or just ask a question. I read and reply to every message myself."
      />
    </main>
  )
}
