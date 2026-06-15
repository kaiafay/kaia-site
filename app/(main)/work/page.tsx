import { Projects } from "@/components/projects";
import { LandingPages } from "@/components/landing-pages";
import { Freelance } from "@/components/freelance";

export default function WorkPage() {
  return (
    <main>
      <LandingPages headingAs="h1" />
      <Projects label="Projects" heading="Apps & Tools" />
      <Freelance />
    </main>
  );
}
