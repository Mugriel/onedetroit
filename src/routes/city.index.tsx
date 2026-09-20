import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { scenarios } from "@/lib/scenarios";
import { CoreMessage, Pill, SiteHeader } from "@/components/one-detroit";

export const Route = createFileRoute("/city/")({
  head: () => ({
    meta: [
      { title: "City Intelligence — One Detroit" },
      {
        name: "description",
        content:
          "Select a scenario, review connected city datasets, and run the One Detroit Opportunity Engine.",
      },
      { property: "og:title", content: "City Intelligence — One Detroit" },
      {
        property: "og:description",
        content:
          "Cross-system analysis of Detroit datasets to detect coordinated opportunities.",
      },
    ],
  }),
  component: CityIntelligence,
});

const allSources = Array.from(
  new Set(scenarios.flatMap((s) => s.datasets.map((d) => d.name))),
).sort();

function CityIntelligence() {
  const navigate = useNavigate();
  const [scenarioId, setScenarioId] = useState(scenarios[0]!.id);
  const scenario = scenarios.find((s) => s.id === scenarioId)!;
  const selected = new Set(scenario.datasets.map((d) => d.name));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader mode="city" />
      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Opportunity workspace
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Shared context → cross-system analysis → opportunity detection →
              feasibility → coordinated strategy → public transparency
            </p>
          </div>
          <button
            onClick={() =>
              navigate({ to: "/city/opportunity", search: { scenario: scenarioId } })
            }
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Analyze Opportunity
          </button>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr_340px]">
          <aside className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Scenario
            </h2>
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${
                  s.id === scenarioId
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <div className="text-sm font-semibold text-foreground">{s.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.category} · {s.datasets.length} datasets
                </div>
              </button>
            ))}
          </aside>

          <div className="space-y-5">
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {scenario.name}
                </h2>
                <Pill variant="primary">{scenario.category}</Pill>
                <Pill variant="accent">{scenario.status}</Pill>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{scenario.timing}</p>

              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Selected datasets
              </h3>
              <div className="mt-3 divide-y divide-border rounded-lg border border-border">
                {scenario.datasets.map((d) => (
                  <div key={d.name} className="flex flex-wrap gap-2 p-3">
                    <div className="min-w-[220px] flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {d.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{d.source}</div>
                    </div>
                    <div className="flex-1 text-xs text-muted-foreground">
                      {d.detail}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Detroit map (placeholder)
              </h3>
              <div className="mt-3 relative h-64 overflow-hidden rounded-lg border border-border bg-muted">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <svg
                  viewBox="0 0 400 200"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden
                >
                  <path
                    d="M20 170 L120 40 L250 30 L380 90 L360 180 Z"
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-6">
                  {scenario.result.hot_spots.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground shadow"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Illustrative hot spots for the selected scenario. No live GIS data.
              </p>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Available city data sources
              </h3>
              <ul className="mt-3 space-y-1.5">
                {allSources.map((name) => (
                  <li key={name} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-[6px] h-2 w-2 shrink-0 rounded-sm ${
                        selected.has(name) ? "bg-accent" : "bg-border"
                      }`}
                    />
                    <span
                      className={
                        selected.has(name)
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <CoreMessage />
          </aside>
        </div>
      </main>
    </div>
  );
}
