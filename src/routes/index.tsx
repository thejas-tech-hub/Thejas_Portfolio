import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import {
  buttonClass,
  ExtLink,
  ProjectCard,
  ResumeButton,
  SectionHeading,
  Tag,
} from "@/components/site";
import { hackathons, profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thejas J — Building intelligent systems for real-world problems" },
      {
        name: "description",
        content:
          "AI/ML engineering student building agentic workflows, RAG systems, ranking pipelines and full-stack AI products.",
      },
      { property: "og:title", content: "Thejas J — AI/ML Engineer & Software Builder" },
      {
        property: "og:description",
        content: "Agentic workflows, RAG systems, ranking pipelines and full-stack AI products.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border tech-grid">
        <HeroVisual />
        <div className="pointer-events-none relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-5 py-20">
          <div className="pointer-events-auto max-w-2xl fade-up">
            <p className="eyebrow">{profile.role}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] md:text-6xl">
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {profile.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className={buttonClass.primary}>
                Explore projects <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <ResumeButton />
              <ExtLink href={profile.links.github} className={buttonClass.ghost}>
                GitHub
              </ExtLink>
              <Link to="/contact" className={buttonClass.ghost}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading eyebrow="Featured work" title="Selected case studies">
          Five projects with documented architecture — from agent pipelines to CPU-only ranking.
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Toolkit" title="What I build with" />
            <div className="space-y-6">
              {skillGroups.slice(0, 3).map((g) => (
                <div key={g.title}>
                  <h3 className="mb-2 text-sm font-semibold">{g.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-block text-sm text-primary hover:underline">
              All skills & education →
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="Hackathons & leadership" title="Building under time limits" />
            <ol className="space-y-5">
              {hackathons
                .filter((h) => h.featured)
                .map((h) => (
                  <li key={h.event} className="border-l border-primary/40 pl-4">
                    <p className="font-mono text-xs text-primary">{h.role}</p>
                    <p className="font-semibold">
                      {h.event} <span className="font-normal text-muted-foreground">· {h.org}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{h.detail}</p>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="rounded-2xl border border-border bg-card p-10 md:p-14 hero-glow">
          <h2 className="max-w-xl text-3xl font-semibold">
            Hiring for AI engineering, or building something early-stage?
          </h2>
          <p className="mt-3 text-muted-foreground">
            I'm open to internships, roles and technical collaborations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={buttonClass.primary}>
              Email me
            </a>
            <ExtLink href={profile.links.linkedin} className={buttonClass.ghost}>
              LinkedIn
            </ExtLink>
          </div>
        </div>
      </section>
    </>
  );
}
