import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { resume, socialLinks } from "@/content/links";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <HeroCanvas />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/[0.08] px-3 py-1.5 text-xs text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                {site.hero.availability}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-3xl leading-tight text-fg sm:text-5xl sm:leading-[1.1]">
                {site.hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">{site.hero.subline}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#04121a] transition-transform hover:-translate-y-0.5"
                >
                  View projects
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <a
                  href={resume.href}
                  download={resume.fileName}
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Download résumé
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-muted transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative mx-auto w-56 max-w-full sm:w-64 lg:w-full">
              <div className="absolute -inset-3 rounded-3xl border border-line/70" aria-hidden="true" />
              <Image
                src="/portrait.webp"
                alt="Portrait of Gideon Onyegbula"
                width={900}
                height={1058}
                priority
                sizes="(max-width: 1024px) 256px, 320px"
                className="relative rounded-2xl border border-line object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
