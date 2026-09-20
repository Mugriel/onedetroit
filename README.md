# One Detroit Connect

Build a complete responsive MVP web app called “One Detroit”.

The goal is to demonstrate a civic intelligence platform with two connected experiences inside one application:

1. City Intelligence — internal city-facing experience

2. Public Portal — resident-facing experience

Use mock data for the initial experience, but structure the application so the City Intelligence “Analyze Opportunity” flow can call the OpenAI API securely from the server.

Do not add authentication, payments, notifications, real city API integrations, or unnecessary backend complexity.

Use a simple app structure with:

- `/` landing page

- `/city` City Intelligence

- `/city/opportunity` Opportunity Result

- `/public` Public Portal

- `/public/project/:id` Public Project Detail

==================================================

LANDING PAGE

==================================================

Show:

- One Detroit branding

- Short statement:

“Different data. A stronger Detroit.”

- Two large choices:

CITY INTELLIGENCE

“Explore city data, detect opportunities, and design coordinated solutions.”

PUBLIC PORTAL

“Explore projects, programs, and opportunities across Detroit.”

Also show:

“One city. One intelligence layer. Two experiences.”

==================================================

CITY INTELLIGENCE

==================================================

Create a City Intelligence dashboard.

Include:

- Scenario selector

- Available city data sources

- Selected datasets

- Simple Detroit map placeholder

- Analyze Opportunity button

Preload these five demo scenarios:

1. Detroit Mobility Learning Network

2. Cool Routes & Community Hubs

3. Digital Help Hours

4. Floodable Community Market

5. Complete Corridor Upgrade

Each scenario should load different mock datasets.

Example:

COOL ROUTES & COMMUNITY HUBS

Inputs:

- Tree canopy coverage

- Summer heat data

- School attendance trends

- Public building locations

- Cooling center capacity

DETROIT MOBILITY LEARNING NETWORK

Inputs:

- Retired or donated vehicle inventory

- Library programming capacity

- Youth technical training gaps

- Automotive / EV workforce demand

DIGITAL HELP HOURS

Inputs:

- Library underused hours

- Senior digital-access needs

- Youth part-time employment demand

- City service digitization data

FLOODABLE COMMUNITY MARKET

Inputs:

- Vacant lot inventory

- Localized flooding data

- Stormwater needs

- Small vendor demand

- Neighborhood event activity

COMPLETE CORRIDOR UPGRADE

Inputs:

- Upcoming road resurfacing

- Planned utility work

- Pedestrian safety gaps

- Transit stop locations

- Bike-network gaps

When the user clicks:

“Analyze Opportunity”

the app should navigate to the Opportunity Result page.

==================================================

OPPORTUNITY ENGINE

==================================================

The Opportunity Engine concept is:

Disconnected systems

↓

Shared context

↓

Cross-system analysis

↓

Opportunity detection

↓

Feasibility analysis

↓

Coordinated strategy

↓

Public transparency

The engine should evaluate the following categories:

- Location

- Timing

- Population served

- Demand

- Available assets

- Budget

- Employees

- Agencies

- Contractors

- Partners

- Opportunity hot spots

- Sustainability / funding model

For the MVP:

- Use mock data as fallback

- Prepare the app so a real OpenAI API response can replace the mock engine

- Keep the same frontend regardless of whether the result comes from mock data or OpenAI

==================================================

SECURE OPENAI INTEGRATION

==================================================

Prepare the app for a secure OpenAI API integration.

Create a server-side function for the One Detroit Opportunity Engine.

The frontend must never call OpenAI directly.

The server-side function should:

1. Receive the selected scenario and its datasets

2. Send them to the OpenAI Responses API

3. Ask the model to identify a cross-system opportunity

4. Return structured JSON

5. Populate the Opportunity Result page with that JSON

The server function must read the API key from an environment variable named:

OPENAI_API_KEY

IMPORTANT SECURITY REQUIREMENTS:

- Do not hardcode the API key anywhere

- Do not expose the API key to the browser

- Do not place the real API key in frontend code

- Do not commit the real API key to source control

Create a `.env.example` file containing only:

OPENAI_API_KEY=

The real key will be added later through the hosting platform’s Secrets / Environment Variables settings.

If OPENAI_API_KEY is not configured, automatically use the existing mock scenario results instead.

==================================================

OPENAI ENGINE OUTPUT FORMAT

==================================================

The OpenAI server function should return structured JSON matching this schema:

{

  "opportunity_name": "",

  "problem_summary": "",

  "connections_detected": [],

  "recommended_strategy": "",

  "lead_agency": "",

  "supporting_agencies": [],

  "partners": [],

  "existing_assets": [],

  "staffing_needs": [],

  "contractor_needs": [],

  "estimated_budget": "",

  "funding_options": [],

  "hot_spots": [],

  "expected_outcomes": [],

  "assumptions": [],

  "evidence_used": [],

  "public_summary": ""

}

Design the code so this schema is reusable across all five scenarios.

==================================================

AI ANALYSIS INSTRUCTIONS

==================================================

The One Detroit Opportunity Engine should not simply summarize the input data.

Its goal is to identify opportunities that may not be obvious when each dataset is reviewed separately.

It should ask:

- Are there unrelated needs that could be addressed together?

- Are there underused public assets that could serve another purpose?

- Are there planned projects that could be coordinated?

- Are there programs or agencies that could support each other?

- Could one intervention create multiple outcomes?

- Is there a logical pilot area or hot spot?

- What resources would be required?

- What assumptions need human review?

The AI must not automatically make final city decisions.

The output must be framed as:

- Suggested opportunity

- Suggested strategy

- Potential partners

- Potential implementation path

- Assumptions for human review

Do not present correlation as proven causation.

Do not fabricate exact budgets, legal requirements, or agency commitments.

If a budget is shown, clearly label it as:

“Estimated pilot budget — illustrative”

==================================================

OPPORTUNITY RESULT PAGE

==================================================

After “Analyze Opportunity”, show:

OPPORTUNITY DETECTED

Example:

“Cool Routes & Community Hubs”

Include these sections:

- Why this opportunity was detected

- Key inputs

- Connections detected

- Recommended strategy

- Lead agency

- Supporting agencies

- Potential partners

- Existing assets

- Staffing needs

- Contractors / vendors needed

- Estimated pilot budget

- Potential funding model

- Opportunity hot spots

- Expected outcomes

- Assumptions

- Evidence used

Also add a section called:

FEASIBILITY SUMMARY

Show:

- Budget

- Employees

- Agencies

- Contractors

- Partners

- Timing

- Sustainability

- Hot spots

Add a clear button:

“Generate Public Version”

When clicked, open the public-facing version of the same project.

==================================================

PUBLIC PORTAL

==================================================

Create a resident-friendly Public Portal.

Navigation:

- Projects

- Programs

- Near Me

- Coming Soon

- Get Involved

Show cards for:

- Detroit Mobility Learning Network

- Cool Routes & Community Hubs

- Digital Help Hours

- Floodable Community Market

- Complete Corridor Upgrade

Filters:

- Environment

- Education

- Transportation

- Community Spaces

- Workforce

Each card should show:

- Project name

- Category

- Status

- Short resident-friendly explanation

- Learn More button

==================================================

PUBLIC PROJECT DETAIL

==================================================

Show:

- Project name

- Status

- Why this project?

- What residents experience today

- What One Detroit connected

- Proposed solution

- What’s included

- Neighborhoods

- Timeline

- Available programs

- Coming soon

- Follow Project

- Get Involved

Use simple public language.

Do not expose technical internal city terminology unless necessary.

==================================================

CITY VIEW VS PUBLIC VIEW

==================================================

The same project should appear differently depending on the audience.

CITY VIEW:

- Cross-system analysis

- Agencies

- Budget

- Staffing

- Contractors

- Assets

- Feasibility

- Evidence

- Assumptions

PUBLIC VIEW:

- What residents experience

- Why the city is exploring the project

- What the proposed solution is

- What programs are available

- What is coming soon

- Where it may happen

- How residents can follow or participate

The Public Portal is not a separate product.

It is the public-facing output of the same One Detroit intelligence system.

==================================================

CORE PRODUCT MESSAGE

==================================================

Use this message prominently:

“The city sees disconnected data.

Residents experience disconnected problems.

One Detroit turns both into coordinated solutions.”

Also use:

“One city. One intelligence layer. Two experiences.”

And:

“One intervention. Multiple outcomes.”

==================================================

DESIGN

==================================================

Use a polished civic-tech design.

Style:

- White background

- Navy

- Blue

- Restrained green accents

- Clean cards

- Clear typography

- Professional dashboards

- Accessible public-facing design

- Strong information hierarchy

City Intelligence should feel:

- Analytical

- Professional

- Data-driven

- Operational

Public Portal should feel:

- Welcoming

- Transparent

- Simple

- Accessible

- Resident-friendly

Do not overdesign.

Prioritize clarity and usability over decorative effects.

==================================================

IMPORTANT MVP LIMITS

==================================================

Do not build:

- Real login

- Real payments

- Real notifications

- Real GIS integrations

- Real Detroit APIs

- Real user accounts

- Complex backend infrastructure

- Procurement workflows

- Legal workflows

- Full city database integrations

Use realistic mock data where necessary.

==================================================

PRIMARY DEMO FLOW

==================================================

The full demo must work as:

Landing

→ City Intelligence

→ Select Scenario

→ Review Inputs

→ Analyze Opportunity

→ Opportunity Result

→ Feasibility Summary

→ Generate Public Version

→ Public Project Detail

This flow is the highest priority.

==================================================

MVP GOAL

==================================================

A judge should understand in under two minutes:

1. Detroit has many disconnected data sources

2. One Detroit connects them

3. The Opportunity Engine identifies an unexpected cross-system opportunity

4. The city receives an actionable strategy

5. The resident receives a simple and transparent public explanation

Build all pages, mock data, navigation, scenario logic, server-side OpenAI integration structure, fallback mock engine, and interactions in one pass.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://onedetroit.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fc2d993f-6953-4147-8145-78772fd42194).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
