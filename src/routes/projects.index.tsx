import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ExtLink, ProjectCard, SectionHeading } from "@/components/site";
import { archive, categories, projects, type Category } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Thejas J" },
      {
        name: "description",
        content: "Case studies in AI agents, RAG, ML ranking, full-stack AI and MLOps by Thejas J.",
      },
      { property: "og:title", content: "Projects — Thejas J" },
      {
        property: "og:description",
        content: "Case studies in AI agents, RAG, ML ranking, full-stack AI and MLOps.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="Projects" title="Case studies">
        Featured projects with documented implementation. Filter by area.
      </SectionHeading>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="text-muted-foreground">No featured projects in this category yet.</p>
      )}

      <section className="mt-24">
        <SectionHeading eyebrow="Archive" title="Other repositories">
          Smaller builds and experiments. Short descriptions only — see each repository for details.
        </SectionHeading>
        <ul className="divide-y divide-border rounded-xl border border-border">
          {archive.map((a) => (
            <li
              key={a.repo}
              className="flex flex-col gap-2 px-5 py-4 transition hover:bg-card md:flex-row md:items-center md:justify-between"
            >
              <div>
                <span className="font-medium text-foreground">{a.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground md:ml-3 md:inline">
                  {a.note}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                <ExtLink
                  href={a.repo}
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Repo <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only"> for {a.name}</span>
                </ExtLink>
                {a.demo && (
                  <ExtLink
                    href={a.demo}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Live demo <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only"> for {a.name}</span>
                  </ExtLink>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
