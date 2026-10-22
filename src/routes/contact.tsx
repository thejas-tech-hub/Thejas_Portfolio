import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { ExtLink, ResumeButton, SectionHeading } from "@/components/site";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Thejas J" },
      {
        name: "description",
        content: "Get in touch with Thejas J by email, GitHub, LinkedIn or LeetCode.",
      },
      { property: "og:title", content: "Contact Thejas J" },
      { property: "og:description", content: "Email, GitHub, LinkedIn and LeetCode links." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const links = [
    { label: "GitHub", value: "thejas-tech-hub", href: profile.links.github },
    { label: "LinkedIn", value: "thejas-j", href: profile.links.linkedin },
    { label: "LeetCode", value: "thejasbejja", href: profile.links.leetcode },
  ];
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <SectionHeading eyebrow="Contact" title="Let's talk">
        Open to AI engineering internships, roles and startup collaborations. Email is the fastest
        way to reach me.
      </SectionHeading>
      <a
        href={`mailto:${profile.email}`}
        className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition hover:border-primary/60"
      >
        <Mail className="text-primary" aria-hidden="true" />
        <span>
          <span className="block text-sm text-muted-foreground">Email</span>
          <span className="font-display text-lg font-semibold break-all md:text-2xl">
            {profile.email}
          </span>
        </span>
      </a>
      {profile.showPhone && profile.phone && (
        <p className="mt-4 text-muted-foreground">Phone: {profile.phone}</p>
      )}
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {links.map((l) => (
          <li key={l.label}>
            <ExtLink
              href={l.href}
              className="flex items-center justify-between rounded-xl border border-border p-5 transition hover:border-primary/60"
            >
              <span>
                <span className="block text-sm text-muted-foreground">{l.label}</span>
                <span className="font-medium">{l.value}</span>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExtLink>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ResumeButton />
      </div>
    </div>
  );
}
