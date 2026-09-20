import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand, CoreMessage } from "@/components/one-detroit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Detroit — Different data. A stronger Detroit." },
      {
        name: "description",
        content:
          "One Detroit is a civic intelligence layer that connects city data into coordinated solutions — with a City Intelligence workspace and a resident Public Portal.",
      },
      {
        property: "og:title",
        content: "One Detroit — Different data. A stronger Detroit.",
      },
      {
        property: "og:description",
        content:
          "One city. One intelligence layer. Two experiences: City Intelligence and the Public Portal.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center px-5 py-4">
          <Brand />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Civic intelligence platform
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Different data. A stronger Detroit.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          One city. One intelligence layer. Two experiences.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            to="/city"
            className="group rounded-2xl border border-border bg-primary p-7 text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <h2 className="text-xl font-semibold tracking-tight">
              City Intelligence
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
              Explore city data, detect opportunities, and design coordinated
              solutions.
            </p>
            <span className="mt-6 inline-block text-sm font-medium underline underline-offset-4">
              Open workspace →
            </span>
          </Link>

          <Link
            to="/public"
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Public Portal
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Explore projects, programs, and opportunities across Detroit.
            </p>
            <span className="mt-6 inline-block text-sm font-medium text-secondary underline underline-offset-4">
              Explore projects →
            </span>
          </Link>
        </div>

        <div className="mt-10">
          <CoreMessage />
        </div>

        <p className="mt-10 text-sm font-medium text-accent">
          One intervention. Multiple outcomes.
        </p>
      </div>
    </main>
  );
}
