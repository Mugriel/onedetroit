import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getScenario, scenarios } from "@/lib/scenarios";
import { analyzeOpportunity } from "@/lib/opportunity.functions";
import { Bullets, Pill, Section, SiteHeader, Stat } from "@/components/one-detroit";

export const Route = createFileRoute("/city/opportunity")({
  validateSearch: (search: Record<string, unknown>) => ({
    scenario: typeof search["scenario"] === "string" ? search["scenario"] : "cool-routes",
  }),
  head: () => ({
    meta: [
      { title: "Opportunity Result — One Detroit City Intelligence" },
      {
        name: "description",
        content:
          "Cross-system opportunity, feasibility summary, and coordinated strategy detected by the One Detroit Opportunity Engine.",
      },
      { property: "og:title", content: "Opportunity Result — One Detroit" },
      {
        property: "og:description",
        content:
          "A suggested cross-system opportunity with assumptions for human review.",
      },
    ],
  }),
  component: OpportunityResultPage,
});

function OpportunityResultPage() {
  const { scenario: scenarioId } = Route.useSearch();
  const navigate = useNavigate();
  const scenario = getScenario(scenarioId);
  const analyze = useServerFn(analyzeOpportunity);

  const { data, isPending } = useQuery({
    queryKey: ["opportunity", scenario.id],
    queryFn: () => analyze({ data: { scenarioId: scenario.id } }),
  });

  const r = data?.result ?? scenario.result;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader mode="city">
        <Link to="/city" className="text-muted-foreground hover:text-foreground">
          ← Workspace
        </Link>
      </SiteHeader>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <Pill variant="accent">Opportunity detected</Pill>
          {isPending ? (
            <Pill>Analyzing…</Pill>
          ) : (
            <Pill>
              {data?.source === "openai" ? "AI analysis" : "Mock engine (fallback)"}
            </Pill>
          )}
          <select
            value={scenario.id}
            onChange={(e) =>
              navigate({
                to: "/city/opportunity",
                search: { scenario: e.target.value },
              })
            }
            className="ml-auto rounded-md border border-border bg-card px-3 py-1.5 text-sm"
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          {r.opportunity_name}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Suggested opportunity for human review. Correlation shown here is not proven
          causation.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Section title="Why this opportunity was detected">
            {r.problem_summary}
          </Section>
          <Section title="Key inputs">
            <Bullets items={scenario.datasets.map((d) => `${d.name} — ${d.source}`)} />
          </Section>
          <Section title="Connections detected">
            <Bullets items={r.connections_detected} />
          </Section>
          <Section title="Recommended strategy">{r.recommended_strategy}</Section>
          <Section title="Lead agency">{r.lead_agency}</Section>
          <Section title="Supporting agencies">
            <Bullets items={r.supporting_agencies} />
          </Section>
          <Section title="Potential partners">
            <Bullets items={r.partners} />
          </Section>
          <Section title="Existing assets">
            <Bullets items={r.existing_assets} />
          </Section>
          <Section title="Staffing needs">
            <Bullets items={r.staffing_needs} />
          </Section>
          <Section title="Contractors / vendors needed">
            <Bullets items={r.contractor_needs} />
          </Section>
          <Section title="Estimated pilot budget">
            <div className="text-lg font-semibold text-foreground">
              {r.estimated_budget}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Estimated pilot budget — illustrative. Not a commitment.
            </p>
          </Section>
          <Section title="Potential funding model">
            <Bullets items={r.funding_options} />
          </Section>
          <Section title="Opportunity hot spots">
            <div className="flex flex-wrap gap-2">
              {r.hot_spots.map((h) => (
                <Pill key={h} variant="accent">
                  {h}
                </Pill>
              ))}
            </div>
          </Section>
          <Section title="Expected outcomes">
            <Bullets items={r.expected_outcomes} />
          </Section>
          <Section title="Assumptions for human review">
            <Bullets items={r.assumptions} />
          </Section>
          <Section title="Evidence used">
            <Bullets items={r.evidence_used} />
          </Section>
        </div>

        <section className="mt-6 rounded-xl border border-border bg-primary p-6 text-primary-foreground shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
            Feasibility summary
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Budget", r.estimated_budget],
              ["Employees", r.staffing_needs.join("; ")],
              ["Agencies", [r.lead_agency, ...r.supporting_agencies].join("; ")],
              ["Contractors", r.contractor_needs.join("; ")],
              ["Partners", r.partners.join("; ")],
              ["Timing", scenario.timing],
              ["Sustainability", scenario.sustainability],
              ["Hot spots", r.hot_spots.join(", ")],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-3"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-foreground/70">
                  {label}
                </div>
                <div className="mt-1 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Public transparency
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{r.public_summary}</p>
          </div>
          <Link
            to="/public/project/$id"
            params={{ id: scenario.id }}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
          >
            Generate Public Version
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="City view" value="Analysis, budget, staffing, feasibility" />
          <Stat label="Public view" value="Experience, solution, programs, timeline" />
          <Stat label="Principle" value="One intervention. Multiple outcomes." />
        </div>
      </main>
    </div>
  );
}
