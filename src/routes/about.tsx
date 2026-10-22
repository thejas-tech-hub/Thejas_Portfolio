import { createFileRoute } from "@tanstack/react-router";
import { ExtLink, SectionHeading, Tag } from "@/components/site";
import { hackathons, profile, skillGroups } from "@/data/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Thejas J" },
      {
        name: "description",
        content:
          "Education, skills, interests and hackathon leadership of Thejas J, B.E. AI & ML student in Mangalore.",
      },
      { property: "og:title", content: "About Thejas J" },
      {
        property: "og:description",
        content: "Education, skills, interests and hackathon leadership.",
      },
    ],
  }),
  component: About,
});

function About() {
  const e = profile.education;
  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <SectionHeading eyebrow="About" title="An engineer who builds practical AI systems">
        I'm based in {profile.location}, studying AI & ML. I like turning unfamiliar problems into
        working software — agent pipelines, retrieval systems, and the APIs and data layers around
        them.
      </SectionHeading>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <h2 className="eyebrow">Education</h2>
          <p className="mt-3 font-display text-xl font-semibold">{e.degree}</p>
          <p className="text-muted-foreground">{e.college}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {e.scheme} · {e.graduation}
          </p>
          <ul className="mt-5 space-y-1 text-sm">
            {e.school.map((s) => (
              <li key={s.label}>
                {s.label}: <span className="font-semibold">{s.value}</span>{" "}
                <span className="text-muted-foreground">— {s.where}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">CGPA</p>
          <p className="font-display text-4xl font-semibold text-primary">{e.cgpa}</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title} className="rounded-xl border border-border p-5">
              <h3 className="mb-3 text-sm font-semibold">{g.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Working interests</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {profile.interests.map((i) => (
            <li key={i} className="border-l border-violet/60 pl-4 text-muted-foreground">
              {i}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Hackathons & leadership</h2>
        <ol className="mt-6 space-y-5">
          {hackathons.map((h) => (
            <li
              key={h.event}
              className="grid gap-1 border-b border-border pb-5 md:grid-cols-[200px_1fr]"
            >
              <p className="font-mono text-xs text-primary">{h.role}</p>
              <div>
                <p className="font-semibold">
                  {h.event} <span className="font-normal text-muted-foreground">· {h.org}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{h.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Problem solving</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          I practise data structures and algorithms on LeetCode.
        </p>
        <ExtLink
          href={profile.links.leetcode}
          className="mt-3 inline-block text-sm text-primary hover:underline"
        >
          View LeetCode profile →
        </ExtLink>
      </section>
    </div>
  );
}
