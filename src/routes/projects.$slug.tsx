import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buttonClass, ExtLink, StatusBadge, Tag } from "@/components/site";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Project not found — Thejas J" }, { name: "robots", content: "noindex" }],
      };
    const d = `${loaderData.name}: ${loaderData.tagline}. ${loaderData.solution}`;
    return {
      meta: [
        { title: `${loaderData.name} — Case study · Thejas J` },
        { name: "description", content: d },
        { property: "og:title", content: `${loaderData.name} — Thejas J` },
        { property: "og:description", content: d },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const p = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;
  return (
    <article className="mx-auto max-w-4xl px-5 py-16">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={14} aria-hidden="true" /> All projects
      </Link>
      <header className="mt-8">
        <StatusBadge status={p.status} />
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{p.name}</h1>
        <p className="mt-3 text-lg text-primary/90">{p.tagline}</p>
        {p.context && <p className="mt-2 text-sm text-muted-foreground">{p.context}</p>}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <ExtLink href={p.repo} className={buttonClass.ghost}>
            Source code <ArrowUpRight size={15} aria-hidden="true" />
          </ExtLink>
          {p.demo && (
            <ExtLink href={p.demo} className={buttonClass.primary}>
              Live demo <ArrowUpRight size={15} aria-hidden="true" />
            </ExtLink>
          )}
        </div>
      </header>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <Block title="Problem">
          <p>{p.problem}</p>
        </Block>
        <Block title="Solution">
          <p>{p.solution}</p>
        </Block>
      </div>

      <section className="mt-14">
        <h2 className="eyebrow">Architecture</h2>
        <ol className="mt-5 space-y-0">
          {p.architecture.map((a, i) => (
            <li key={a.label} className="relative flex gap-5 pb-6">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-card font-mono text-xs text-primary">
                  {i + 1}
                </span>
                {i < p.architecture.length - 1 && (
                  <span className="w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="pt-1">
                <p className="font-semibold">{a.label}</p>
                <p className="text-sm text-muted-foreground">{a.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {p.metrics && (
        <section className="mt-10">
          <h2 className="eyebrow">Project-reported results</h2>
          <dl className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card p-4">
                <dt className="text-xs text-muted-foreground">{m.label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
          {p.metricsNote && <p className="mt-3 text-xs text-muted-foreground">{p.metricsNote}</p>}
        </section>
      )}

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <Block title="What I implemented">
          <ul className="list-disc space-y-2 pl-5">
            {p.implementation.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Block>
        <Block title="Limits & status">
          <ul className="list-disc space-y-2 pl-5">
            {p.limits.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Block>
      </div>

      <div className="mt-20 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">Next case study</p>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="mt-1 inline-block font-display text-2xl font-semibold hover:text-primary"
        >
          {next.name} →
        </Link>
      </div>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground/90">
      <h2 className="eyebrow mb-3">{title}</h2>
      {children}
    </section>
  );
}
