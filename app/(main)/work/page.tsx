import { Projects } from "@/components/projects";
import { Websites } from "@/components/websites";
import { WorkPageCta } from "@/components/work-page-cta";

export default function WorkPage() {
  return (
    <main>
      <Websites headingAs="h1" />
      <Projects label="Products" heading="Apps & Tools" intro="" />
      <WorkPageCta />
    </main>
  );
}
