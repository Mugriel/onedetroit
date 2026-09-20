import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { scenarios } from "@/lib/scenarios";
import { Bullets, Pill, Section, SiteHeader } from "@/components/one-detroit";

export const Route = createFileRoute("/public/project/$id")({
  loader: ({ params }) => {
    const scenario = scenarios.find((s) => s.id === params.id);
    if (!scenario) throw notFound();
    return { scenario };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project unavailable — One Detroit" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { scenario } = loaderData;
    return {
      meta: [
        { title: `${scenario.name} — One Detroit Public Portal` },
        { name: "description", content: scenario.resident_summary },
        { property: "og:title", content: `${scenario.name} — One Detroit` },
        { property: "og:description", content: scenario.resident_summary },
      ],
    };
  },
  component: PublicProjectDetail,
});

function PublicProjectDetail() {
  const { scenario } = Route.useLoaderData();
  const p = scenario.publicView;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader mode="public">
        <Link to="/public" className="text-muted-foreground hover:text-foreground">
          ← All projects
        </Link>
      </SiteHeader>

      <main className="mx-auto max-w-4xl px-5 py-10">
        <div className="flex flex-wrap gap-2">
          <Pill variant="primary">{scenario.category}</Pill>
          <Pill variant="accent">{scenario.status}</Pill>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          {scenario.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {scenario.resident_summary}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Section title="Why this project?">{p.why}</Section>
          <Section title="What residents experience today">{p.today}</Section>
          <Section title="What One Detroit connected">
            <Bullets items={p.connected} />
          </Section>
          <Section title="Proposed solution">{p.solution}</Section>
          <Section title="What's included">
            <Bullets items={p.included} />
          </Section>
          <Section title="Neighborhoods">
            <div className="flex flex-wrap gap-2">
              {p.neighborhoods.map((n) => (
                <Pill key={n} variant="accent">
                  {n}
                </Pill>
              ))}
            </div>
          </Section>
          <Section title="Timeline">
            <ol className="space-y-2">
              {p.timeline.map((t) => (
                <li key={t.phase} className="flex justify-between gap-4">
                  <span>{t.phase}</span>
                  <span className="text-muted-foreground">{t.when}</span>
                </li>
              ))}
            </ol>
          </Section>
          <Section title="Available programs">
            <Bullets items={p.programs} />
          </Section>
          <Section title="Coming soon" className="md:col-span-2">
            <Bullets items={p.coming_soon} />
          </Section>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 rounded-xl border border-border bg-muted/50 p-5">
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Follow Project
          </button>
          <button className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
            Get Involved
          </button>
          <p className="w-full text-xs text-muted-foreground">
            This project is being explored. Details may change as residents and city
            teams review it.
          </p>
        </div>
      </main>
    </div>
  );
}
