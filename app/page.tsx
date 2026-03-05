import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Projects } from "@/components/projects"
import { Training } from "@/components/training"
import { Now } from "@/components/now"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Projects />
        <Training />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
