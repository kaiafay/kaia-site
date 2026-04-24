import { Projects } from "@/components/projects";
import { LandingPages } from "@/components/landing-pages";
import { Freelance } from "@/components/freelance";

export default function WorkPage() {
  return (
    <main>
      <Projects headingAs="h1" />
      <LandingPages />
      <Freelance />
    </main>
  );
}
