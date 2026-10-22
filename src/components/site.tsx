import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { profile } from "@/data/profile";
import type { Project } from "@/data/projects";

const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-base font-semibold tracking-tight">
          thejas<span className="text-primary">.j</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          <ExtLink
            href={profile.links.github}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </ExtLink>
          <ResumeButton small />
        </nav>
        <button
          className="md:hidden p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-border px-5 py-4 md:hidden"
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-2 text-foreground"
            >
              {n.label}
            </Link>
          ))}
          <ExtLink href={profile.links.github} className="py-2">
            GitHub
          </ExtLink>
          <div className="pt-2">
            <ResumeButton small />
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <div className="flex gap-5">
          <ExtLink href={profile.links.github}>GitHub</ExtLink>
          <ExtLink href={profile.links.linkedin}>LinkedIn</ExtLink>
          <ExtLink href={profile.links.leetcode}>LeetCode</ExtLink>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export function ExtLink({
  href,
  children,
  className = "hover:text-foreground",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

const btn = {
  primary:
    "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110",
  ghost:
    "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/60 hover:bg-accent",
};
// eslint-disable-next-line react-refresh/only-export-components
export const buttonClass = btn;

export function ResumeButton({ small }: { small?: boolean }) {
  if (!profile.resumeUrl) return null;
  return (
    <a
      href={profile.resumeUrl}
      download="ThejasJ_Resume.pdf"
      className={
        small
          ? "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:border-primary/60"
          : btn.ghost
      }
    >
      <Download size={15} aria-hidden="true" /> Resume
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-muted-foreground">{children}</p>}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  const live = status === "Live Demo";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider ${live ? "text-primary" : "text-violet"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-primary" : "bg-violet"}`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/50">
      <div className="flex items-center justify-between">
        <StatusBadge status={project.status} />
        {index !== undefined && (
          <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-semibold">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="after:absolute after:inset-0"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-primary/90">{project.tagline}</p>
      <p className="mt-4 text-sm text-foreground/90">{project.problem}</p>
      <p className="mt-2 text-sm text-muted-foreground">{project.solution}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
      <div className="relative z-10 mt-6 flex gap-4 border-t border-border pt-4 text-sm">
        <ExtLink
          href={project.repo}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          Source <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> for {project.name}</span>
        </ExtLink>
        {project.demo && (
          <ExtLink
            href={project.demo}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            Live demo <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> of {project.name}</span>
          </ExtLink>
        )}
        <span className="ml-auto text-muted-foreground transition group-hover:text-primary">
          Case study →
        </span>
      </div>
    </article>
  );
}
