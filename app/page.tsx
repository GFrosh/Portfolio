import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { ProjectsSection } from "@/components/projects-section";
import { Playground } from "@/components/playground";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Playground />
      <ContactSection />
    </>
  );
}
