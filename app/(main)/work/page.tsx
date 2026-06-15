import { Projects } from "@/components/projects";
import { LandingPages } from "@/components/landing-pages";
import { WorkPageCta } from "@/components/work-page-cta";

export default function WorkPage() {
  return (
    <main>
      <LandingPages headingAs="h1" />
      <Projects label="Projects" heading="Apps & Tools" />
      <WorkPageCta />
    </main>
  );
}
