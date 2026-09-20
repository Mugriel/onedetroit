import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Brand({ tone = "navy" }: { tone?: "navy" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[13px] font-bold text-primary-foreground">
        1D
      </span>
      <span
        className={
          tone === "light"
            ? "text-base font-semibold tracking-tight text-primary-foreground"
            : "text-base font-semibold tracking-tight text-foreground"
        }
      >
        One Detroit
      </span>
    </Link>
  );
}

export function SiteHeader({
  mode,
  children,
}: {
  mode: "city" | "public";
  children?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-3">
        <Brand />
        <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {mode === "city" ? "City Intelligence" : "Public Portal"}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-4 text-sm">
          {children}
          <Link
            to={mode === "city" ? "/public" : "/city"}
            className="rounded-md border border-border px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-muted"
          >
            {mode === "city" ? "Public Portal" : "City Intelligence"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}
    >
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-foreground">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pill({
  children,
  variant = "muted",
}: {
  children: ReactNode;
  variant?: "muted" | "accent" | "primary";
}) {
  const styles = {
    muted: "border-border bg-muted text-muted-foreground",
    accent: "border-accent/30 bg-accent/10 text-accent",
    primary: "border-primary/20 bg-primary/10 text-primary",
  }[variant];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

export function CoreMessage() {
  return (
    <div className="rounded-xl border border-border bg-muted/50 p-5 text-sm leading-relaxed text-foreground">
      The city sees disconnected data. Residents experience disconnected problems.{" "}
      <span className="font-semibold text-primary">
        One Detroit turns both into coordinated solutions.
      </span>
    </div>
  );
}
