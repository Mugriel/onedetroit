import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { categories, scenarios } from "@/lib/scenarios";
import { Pill, SiteHeader } from "@/components/one-detroit";

export const Route = createFileRoute("/public/")({
  head: () => ({
    meta: [
      { title: "Public Portal — One Detroit" },
      {
        name: "description",
        content:
          "Explore Detroit projects, programs, and opportunities in plain language — what's happening, where, and how to get involved.",
      },
      { property: "og:title", content: "Public Portal — One Detroit" },
      {
        property: "og:description",
        content: "Projects, programs, and opportunities across Detroit.",
      },
    ],
  }),
  component: PublicPortal,
});

const nav = ["Projects", "Programs", "Near Me", "Coming Soon", "Get Involved"];

function PublicPortal() {
  const [active, setActive] = useState<string | null>(null);
  const list = active ? scenarios.filter((s) => s.category === active) : scenarios;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader mode="public">
        {nav.map((item) => (
          <a
            key={item}
            href="#projects"
            className="hidden text-muted-foreground hover:text-foreground md:inline"
          >
            {item}
          </a>
        ))}
      </SiteHeader>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Projects and programs across Detroit
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The city sees disconnected data. Residents experience disconnected
          problems. One Detroit turns both into coordinated solutions.
        </p>

        <div id="projects" className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c === active ? null : c)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <article
              key={s.id}
              className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                <Pill variant="primary">{s.category}</Pill>
                <Pill variant="accent">{s.status}</Pill>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-foreground">{s.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.resident_summary}
              </p>
              <Link
                to="/public/project/$id"
                params={{ id: s.id }}
                className="mt-4 inline-flex w-fit rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Learn More
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm font-medium text-accent">
          One city. One intelligence layer. Two experiences.
        </p>
      </main>
    </div>
  );
}
