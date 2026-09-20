import { createServerFn } from "@tanstack/react-start";
import { getScenario, type OpportunityResult } from "./scenarios";

export type AnalyzeResponse = {
  source: "openai" | "mock";
  result: OpportunityResult;
  note?: string;
};

const SYSTEM_PROMPT = `You are the One Detroit Opportunity Engine.

You analyze disconnected municipal datasets to detect cross-system opportunities that are NOT obvious when each dataset is reviewed separately.

Ask yourself:
- Are there unrelated needs that could be addressed together?
- Are there underused public assets that could serve another purpose?
- Are there planned projects that could be coordinated?
- Could one intervention create multiple outcomes?
- Is there a logical pilot area or hot spot?
- What resources would be required?
- What assumptions need human review?

Rules:
- Never present correlation as proven causation.
- Never fabricate exact budgets, legal requirements, or agency commitments.
- Frame everything as SUGGESTED opportunity, strategy, partners, and implementation path.
- Any budget must be labeled "Estimated pilot budget — illustrative".
- You do not make final city decisions; a human reviews all output.
- public_summary must use plain, welcoming resident language.`;

const schema = {
  type: "object",
  additionalProperties: false,
  required: [
    "opportunity_name",
    "problem_summary",
    "connections_detected",
    "recommended_strategy",
    "lead_agency",
    "supporting_agencies",
    "partners",
    "existing_assets",
    "staffing_needs",
    "contractor_needs",
    "estimated_budget",
    "funding_options",
    "hot_spots",
    "expected_outcomes",
    "assumptions",
    "evidence_used",
    "public_summary",
  ],
  properties: {
    opportunity_name: { type: "string" },
    problem_summary: { type: "string" },
    connections_detected: { type: "array", items: { type: "string" } },
    recommended_strategy: { type: "string" },
    lead_agency: { type: "string" },
    supporting_agencies: { type: "array", items: { type: "string" } },
    partners: { type: "array", items: { type: "string" } },
    existing_assets: { type: "array", items: { type: "string" } },
    staffing_needs: { type: "array", items: { type: "string" } },
    contractor_needs: { type: "array", items: { type: "string" } },
    estimated_budget: { type: "string" },
    funding_options: { type: "array", items: { type: "string" } },
    hot_spots: { type: "array", items: { type: "string" } },
    expected_outcomes: { type: "array", items: { type: "string" } },
    assumptions: { type: "array", items: { type: "string" } },
    evidence_used: { type: "array", items: { type: "string" } },
    public_summary: { type: "string" },
  },
} as const;

export const analyzeOpportunity = createServerFn({ method: "POST" })
  .inputValidator((input: { scenarioId: string }) => ({
    scenarioId: String(input?.scenarioId ?? ""),
  }))
  .handler(async ({ data }): Promise<AnalyzeResponse> => {
    const scenario = getScenario(data.scenarioId);
    const apiKey = process.env["OPENAI_API_KEY"];

    // No key configured: fall back to the mock engine, same shape, same UI.
    if (!apiKey) {
      return {
        source: "mock",
        result: scenario.result,
        note: "Mock engine — OPENAI_API_KEY is not configured.",
      };
    }

    try {
      const input = [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Scenario: ${scenario.name}
Category: ${scenario.category}
Timing context: ${scenario.timing}

Datasets provided:
${scenario.datasets
  .map((d) => `- ${d.name} (source: ${d.source}) — ${d.detail}`)
  .join("\n")}

Identify one cross-system opportunity and return it as JSON.`,
        },
      ];

      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input,
          text: {
            format: {
              type: "json_schema",
              name: "one_detroit_opportunity",
              strict: true,
              schema,
            },
          },
        }),
      });

      if (!res.ok) {
        return {
          source: "mock",
          result: scenario.result,
          note: `Mock engine — analysis service returned ${res.status}.`,
        };
      }

      const payload = (await res.json()) as {
        output_text?: string;
        output?: { content?: { text?: string }[] }[];
      };
      const text =
        payload.output_text ?? payload.output?.[0]?.content?.[0]?.text ?? "";
      const parsed = JSON.parse(text) as OpportunityResult;
      return { source: "openai", result: parsed };
    } catch {
      return {
        source: "mock",
        result: scenario.result,
        note: "Mock engine — analysis service unavailable.",
      };
    }
  });
