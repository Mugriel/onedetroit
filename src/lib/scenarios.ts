export type OpportunityResult = {
  opportunity_name: string;
  problem_summary: string;
  connections_detected: string[];
  recommended_strategy: string;
  lead_agency: string;
  supporting_agencies: string[];
  partners: string[];
  existing_assets: string[];
  staffing_needs: string[];
  contractor_needs: string[];
  estimated_budget: string;
  funding_options: string[];
  hot_spots: string[];
  expected_outcomes: string[];
  assumptions: string[];
  evidence_used: string[];
  public_summary: string;
};

export type PublicView = {
  why: string;
  today: string;
  connected: string[];
  solution: string;
  included: string[];
  neighborhoods: string[];
  timeline: { phase: string; when: string }[];
  programs: string[];
  coming_soon: string[];
};

export type Scenario = {
  id: string;
  name: string;
  category:
    | "Environment"
    | "Education"
    | "Transportation"
    | "Community Spaces"
    | "Workforce";
  status: "Exploring" | "In Design" | "Pilot Planned";
  timing: string;
  sustainability: string;
  resident_summary: string;
  datasets: { name: string; source: string; detail: string }[];
  result: OpportunityResult;
  publicView: PublicView;
};

export const scenarios: Scenario[] = [
  {
    id: "mobility-learning-network",
    name: "Detroit Mobility Learning Network",
    category: "Workforce",
    status: "In Design",
    timing: "Pilot readiness in 6–9 months; aligned to fall program cycle",
    sustainability: "Employer co-funding plus workforce development grants",
    resident_summary:
      "Hands-on classes where young Detroiters learn to work on vehicles and EV technology at their neighborhood library.",
    datasets: [
      {
        name: "Retired or donated vehicle inventory",
        source: "General Services Department",
        detail: "148 retired fleet vehicles awaiting auction or disposal",
      },
      {
        name: "Library programming capacity",
        source: "Detroit Public Library",
        detail: "11 branches with unused weekday afternoon program blocks",
      },
      {
        name: "Youth technical training gaps",
        source: "Workforce & school district reporting",
        detail: "Technical training waitlists in 6 high schools",
      },
      {
        name: "Automotive / EV workforce demand",
        source: "Regional employer survey (mock)",
        detail: "Reported shortage of entry-level EV service technicians",
      },
    ],
    result: {
      opportunity_name: "Detroit Mobility Learning Network",
      problem_summary:
        "Retired city vehicles are disposed of at low recovery value at the same time youth technical training is capacity constrained and regional employers report entry-level EV technician shortages.",
      connections_detected: [
        "Retired fleet vehicles overlap in timing with unfilled technical training demand",
        "Library branches have unused weekday capacity near the highest waitlist schools",
        "Employer demand is concentrated in the same corridors as the branches",
      ],
      recommended_strategy:
        "Suggested strategy: redirect a portion of retired fleet vehicles into a shared teaching fleet hosted at 3 library branches, paired with employer-designed curriculum and a paid apprenticeship pathway.",
      lead_agency: "General Services Department",
      supporting_agencies: [
        "Detroit Public Library",
        "Detroit at Work",
        "Office of Mobility Innovation",
      ],
      partners: [
        "Regional automotive employers",
        "Community college automotive program",
        "Neighborhood youth organizations",
      ],
      existing_assets: [
        "148 retired fleet vehicles",
        "11 library branches with open afternoon blocks",
        "Existing city fleet maintenance bays",
      ],
      staffing_needs: [
        "1 program coordinator",
        "2 part-time instructors per site",
        "Shared safety / compliance lead",
      ],
      contractor_needs: [
        "Vehicle de-fleeting and safety prep vendor",
        "Mobile lift and tool equipment supplier",
      ],
      estimated_budget: "$420,000 — Estimated pilot budget — illustrative",
      funding_options: [
        "Workforce development grant funds",
        "Employer sponsorship of cohorts",
        "Fleet disposal value reinvestment",
      ],
      hot_spots: ["Chandler Park", "Brightmoor", "Southwest Detroit"],
      expected_outcomes: [
        "120 youth trained per year across 3 sites",
        "Higher recovery value from retired vehicles",
        "Employer-connected placement pathway",
      ],
      assumptions: [
        "Retired vehicles can be legally transferred for training use",
        "Library sites can host limited mechanical instruction safely",
        "Employer demand estimates hold through the pilot period",
      ],
      evidence_used: [
        "Fleet disposal records",
        "Library programming calendars",
        "School technical-course waitlists",
        "Employer demand survey (mock)",
      ],
      public_summary:
        "Detroit is exploring a program that turns retired city vehicles into hands-on learning tools for young people at neighborhood libraries, with a path to real jobs.",
    },
    publicView: {
      why: "Many young Detroiters want technical training but classes fill up fast, while the city retires vehicles that still have learning value.",
      today:
        "Students hear about automotive and EV careers but have few places nearby to actually work on a vehicle.",
      connected: [
        "Retired city vehicles",
        "Library space that sits unused on weekday afternoons",
        "Local employers looking for trained technicians",
      ],
      solution:
        "Use retired city vehicles as teaching vehicles at neighborhood libraries, with instructors and a pathway to paid apprenticeships.",
      included: [
        "Free after-school sessions",
        "Hands-on vehicle and EV basics",
        "Employer-connected apprenticeship pathway",
      ],
      neighborhoods: ["Chandler Park", "Brightmoor", "Southwest Detroit"],
      timeline: [
        { phase: "Design with partners", when: "Months 1–3" },
        { phase: "Site preparation", when: "Months 4–6" },
        { phase: "First cohort", when: "Months 7–9" },
      ],
      programs: ["Youth technical sessions", "Weekend open shop hours"],
      coming_soon: ["Paid apprenticeship placements", "Adult evening cohort"],
    },
  },
  {
    id: "cool-routes",
    name: "Cool Routes & Community Hubs",
    category: "Environment",
    status: "Pilot Planned",
    timing: "Pilot before next summer heat season",
    sustainability: "Climate resilience funds plus routine tree-planting budget",
    resident_summary:
      "Shaded walking routes and nearby cool places to rest on the hottest days, focused on the blocks that heat up most.",
    datasets: [
      {
        name: "Tree canopy coverage",
        source: "Parks & Recreation",
        detail: "Canopy below 12% across 9 tracts",
      },
      {
        name: "Summer heat data",
        source: "Regional heat mapping",
        detail: "Peak surface temps 9°F above city median",
      },
      {
        name: "School attendance trends",
        source: "District reporting (mock)",
        detail: "Attendance dips on high-heat days",
      },
      {
        name: "Public building locations",
        source: "Facilities inventory",
        detail: "23 city buildings inside the hottest tracts",
      },
      {
        name: "Cooling center capacity",
        source: "Health Department",
        detail: "Capacity unevenly distributed vs. heat exposure",
      },
    ],
    result: {
      opportunity_name: "Cool Routes & Community Hubs",
      problem_summary:
        "The hottest, least shaded neighborhoods are also where school attendance drops on extreme-heat days and where cooling capacity is furthest from where people walk.",
      connections_detected: [
        "Low canopy tracts overlap with high-heat school walking routes",
        "Existing public buildings sit along those same routes but are not designated cooling stops",
        "Cooling center capacity is not aligned to walking distance",
      ],
      recommended_strategy:
        "Suggested strategy: designate shaded 'cool routes' between schools and existing public buildings, plant canopy along those specific segments, and convert nearby public buildings into daytime community cooling hubs.",
      lead_agency: "Office of Sustainability",
      supporting_agencies: [
        "Parks & Recreation",
        "Detroit Health Department",
        "General Services Department",
      ],
      partners: [
        "Greening of Detroit",
        "Neighborhood block clubs",
        "School district facilities team",
      ],
      existing_assets: [
        "23 public buildings in the hottest tracts",
        "Existing tree-planting contracts",
        "Recreation centers with daytime staffing",
      ],
      staffing_needs: [
        "Heat-season hub attendants",
        "Urban forestry crew time",
        "1 program coordinator",
      ],
      contractor_needs: [
        "Tree planting and maintenance contractor",
        "Shade structure installer",
      ],
      estimated_budget: "$610,000 — Estimated pilot budget — illustrative",
      funding_options: [
        "Climate resilience grant funds",
        "Existing forestry budget realignment",
        "Health department heat-season funding",
      ],
      hot_spots: ["Warrendale", "Gratiot–Findlay", "Springwells"],
      expected_outcomes: [
        "Shaded walking access to 3 new cooling hubs",
        "Reduced heat exposure on school routes",
        "Longer-term canopy gains in priority tracts",
      ],
      assumptions: [
        "Heat and attendance correlation requires human review; not proven causation",
        "Buildings can extend daytime public access during heat events",
        "Planting sites are viable and maintainable",
      ],
      evidence_used: [
        "Canopy coverage layer",
        "Surface heat mapping",
        "Attendance trend reporting (mock)",
        "Facilities inventory",
      ],
      public_summary:
        "Detroit is exploring shaded walking routes and nearby cool places to rest in the neighborhoods that get hottest in summer.",
    },
    publicView: {
      why: "Some Detroit blocks get much hotter than others, and there is little shade between homes, schools, and places to cool off.",
      today:
        "On hot days, walking to school or the bus stop can mean long stretches with no shade and no nearby place to rest.",
      connected: [
        "Where trees are missing",
        "Where summer heat is worst",
        "Which public buildings are already nearby",
      ],
      solution:
        "Create shaded walking routes and turn nearby public buildings into welcoming cool spots during hot weather.",
      included: [
        "New trees along specific walking routes",
        "Shade structures at key corners",
        "Daytime cool spots with water and seating",
      ],
      neighborhoods: ["Warrendale", "Gratiot–Findlay", "Springwells"],
      timeline: [
        { phase: "Route selection with residents", when: "Months 1–2" },
        { phase: "Planting and shade installs", when: "Months 3–6" },
        { phase: "Cool hubs open", when: "Before summer" },
      ],
      programs: ["Summer cool hub hours", "Free water and rest stops"],
      coming_soon: ["Additional routes", "Evening community hours"],
    },
  },
  {
    id: "digital-help-hours",
    name: "Digital Help Hours",
    category: "Education",
    status: "Exploring",
    timing: "Can launch within one program quarter",
    sustainability: "Youth employment funds plus existing library staffing",
    resident_summary:
      "Free, friendly help with online city services and everyday technology — offered by trained local youth at the library.",
    datasets: [
      {
        name: "Library underused hours",
        source: "Detroit Public Library",
        detail: "Low-traffic morning blocks across 14 branches",
      },
      {
        name: "Senior digital-access needs",
        source: "Senior services intake (mock)",
        detail: "Frequent requests for help with online forms",
      },
      {
        name: "Youth part-time employment demand",
        source: "Detroit at Work",
        detail: "High applicant volume for part-time roles",
      },
      {
        name: "City service digitization data",
        source: "Department of Innovation & Technology",
        detail: "Rising share of services completed online only",
      },
    ],
    result: {
      opportunity_name: "Digital Help Hours",
      problem_summary:
        "City services are moving online while a large share of older residents request in-person help, and libraries have low-traffic hours during the same periods youth are seeking part-time work.",
      connections_detected: [
        "Library low-traffic hours align with senior service-request peaks",
        "Youth employment demand can staff the same hours",
        "Digitized services generate the exact help requests being made",
      ],
      recommended_strategy:
        "Suggested strategy: staff library low-traffic hours with paid, trained youth digital navigators who help residents complete city services online.",
      lead_agency: "Detroit Public Library",
      supporting_agencies: [
        "Department of Innovation & Technology",
        "Detroit at Work",
        "Senior Services",
      ],
      partners: ["Community nonprofits", "Local high schools"],
      existing_assets: [
        "Library computer labs",
        "Existing branch staffing",
        "City service portals",
      ],
      staffing_needs: ["12 part-time youth navigators", "1 training lead"],
      contractor_needs: ["Digital literacy curriculum vendor"],
      estimated_budget: "$185,000 — Estimated pilot budget — illustrative",
      funding_options: [
        "Youth employment funding",
        "Digital inclusion grants",
        "Library programming budget",
      ],
      hot_spots: ["Bowen Branch", "Redford Branch", "Conely Branch"],
      expected_outcomes: [
        "Faster completion of online city services",
        "Paid work experience for youth",
        "Better use of library off-peak hours",
      ],
      assumptions: [
        "Residents will use scheduled help hours at these branches",
        "Youth can be trained and supervised within existing staffing",
        "Privacy handling for resident documents is resolved before launch",
      ],
      evidence_used: [
        "Library traffic logs",
        "Senior service intake notes (mock)",
        "Youth employment applications",
      ],
      public_summary:
        "Detroit is exploring free help hours at libraries where trained local youth assist residents with online city services.",
    },
    publicView: {
      why: "More city services are online, and many residents would rather get help from a person nearby.",
      today:
        "Residents call or travel downtown for help with forms that could be completed at their local branch.",
      connected: [
        "Quiet hours at libraries",
        "Requests for help with online forms",
        "Young people looking for part-time work",
      ],
      solution:
        "Offer scheduled help hours at libraries staffed by paid, trained youth digital navigators.",
      included: [
        "Walk-in and scheduled help",
        "Support with city forms and accounts",
        "Basic device and internet guidance",
      ],
      neighborhoods: ["Bowen", "Redford", "Conely"],
      timeline: [
        { phase: "Training first cohort", when: "Month 1" },
        { phase: "Help hours begin", when: "Month 2" },
        { phase: "Expansion review", when: "Month 6" },
      ],
      programs: ["Weekly help hours", "Youth navigator training"],
      coming_soon: ["Evening sessions", "More branches"],
    },
  },
  {
    id: "floodable-market",
    name: "Floodable Community Market",
    category: "Community Spaces",
    status: "Exploring",
    timing: "Design season now; build in next construction window",
    sustainability: "Stormwater credits plus vendor fees",
    resident_summary:
      "A vacant lot becomes a neighborhood market space that also soaks up stormwater during heavy rain.",
    datasets: [
      {
        name: "Vacant lot inventory",
        source: "Detroit Land Bank Authority",
        detail: "Cluster of city-owned lots near commercial nodes",
      },
      {
        name: "Localized flooding data",
        source: "DWSD",
        detail: "Repeat basement-backup complaints in 4 blocks",
      },
      {
        name: "Stormwater needs",
        source: "DWSD",
        detail: "Green infrastructure capacity targets unmet",
      },
      {
        name: "Small vendor demand",
        source: "Economic Development (mock)",
        detail: "Waitlist for affordable market stalls",
      },
      {
        name: "Neighborhood event activity",
        source: "Permit records",
        detail: "Recurring pop-up events without permanent space",
      },
    ],
    result: {
      opportunity_name: "Floodable Community Market",
      problem_summary:
        "Repeat flooding complaints, unmet green stormwater targets, and demand for affordable vendor space all cluster around the same set of city-owned vacant lots.",
      connections_detected: [
        "Flood-prone blocks overlap with vacant lot clusters",
        "Stormwater capacity targets can be met on the same parcels",
        "Vendor and event demand already occurs nearby without permanent space",
      ],
      recommended_strategy:
        "Suggested strategy: design a dual-purpose lot that functions as a market plaza in dry weather and a stormwater detention basin during heavy rain.",
      lead_agency: "Detroit Water & Sewerage Department",
      supporting_agencies: [
        "Planning & Development",
        "Detroit Land Bank Authority",
        "Economic Development",
      ],
      partners: [
        "Neighborhood business association",
        "Local market operator",
        "Landscape design firm",
      ],
      existing_assets: [
        "City-owned vacant lots",
        "Existing pop-up event programming",
        "Stormwater capital program",
      ],
      staffing_needs: ["Market operations lead", "Seasonal site maintenance"],
      contractor_needs: [
        "Green infrastructure contractor",
        "Site design firm",
        "Paving and drainage subcontractor",
      ],
      estimated_budget: "$1,250,000 — Estimated pilot budget — illustrative",
      funding_options: [
        "Stormwater capital program",
        "Drainage fee credits",
        "Vendor stall revenue",
      ],
      hot_spots: ["Islandview", "Banglatown", "Osborn"],
      expected_outcomes: [
        "Reduced localized flooding on target blocks",
        "Permanent affordable vendor space",
        "Reuse of vacant city land",
      ],
      assumptions: [
        "Soil and drainage conditions support detention design",
        "Dual-use maintenance responsibilities can be assigned",
        "Flood complaints reflect the modeled drainage issue",
      ],
      evidence_used: [
        "Land bank parcel data",
        "Flood complaint records",
        "Stormwater capacity targets",
        "Event permit history",
      ],
      public_summary:
        "Detroit is exploring turning vacant lots into neighborhood market spaces designed to hold stormwater during heavy rain.",
    },
    publicView: {
      why: "Some blocks flood repeatedly, and nearby vacant lots sit unused while local vendors have nowhere affordable to sell.",
      today:
        "Heavy rain backs up onto streets and basements, and pop-up markets move from place to place.",
      connected: [
        "Vacant city-owned lots",
        "Flooding complaints",
        "Demand for affordable market space",
      ],
      solution:
        "Build a market plaza designed to safely hold water during storms and host vendors the rest of the time.",
      included: [
        "Vendor stalls",
        "Seating and shade",
        "Landscaping that absorbs rainwater",
      ],
      neighborhoods: ["Islandview", "Banglatown", "Osborn"],
      timeline: [
        { phase: "Community design sessions", when: "Months 1–3" },
        { phase: "Permitting", when: "Months 4–6" },
        { phase: "Construction", when: "Months 7–12" },
      ],
      programs: ["Weekend market", "Vendor starter support"],
      coming_soon: ["Winter indoor market pilot"],
    },
  },
  {
    id: "complete-corridor",
    name: "Complete Corridor Upgrade",
    category: "Transportation",
    status: "In Design",
    timing: "Must align with next resurfacing schedule",
    sustainability: "Coordinated capital budgets avoid duplicate street work",
    resident_summary:
      "When a street is already being rebuilt, fix the sidewalks, crossings, bus stops, and bike lanes at the same time.",
    datasets: [
      {
        name: "Upcoming road resurfacing",
        source: "DPW",
        detail: "38 miles scheduled next construction season",
      },
      {
        name: "Planned utility work",
        source: "DWSD / utility coordination",
        detail: "Water main replacement overlapping 9 miles",
      },
      {
        name: "Pedestrian safety gaps",
        source: "Crash and complaint data",
        detail: "Cluster of pedestrian crashes on 3 corridors",
      },
      {
        name: "Transit stop locations",
        source: "DDOT",
        detail: "High-ridership stops without shelters",
      },
      {
        name: "Bike-network gaps",
        source: "Mobility planning",
        detail: "Missing links between existing protected lanes",
      },
    ],
    result: {
      opportunity_name: "Complete Corridor Upgrade",
      problem_summary:
        "Resurfacing, utility replacement, pedestrian safety needs, transit shelter gaps, and missing bike links are scheduled or reported on the same corridors but planned separately.",
      connections_detected: [
        "9 miles of utility work overlaps scheduled resurfacing",
        "Pedestrian crash clusters sit on the same segments",
        "High-ridership stops and bike-network gaps share those corridors",
      ],
      recommended_strategy:
        "Suggested strategy: bundle the overlapping segments into one coordinated corridor project so the street is opened once and delivers safety, transit, and bike improvements together.",
      lead_agency: "Department of Public Works",
      supporting_agencies: ["DDOT", "DWSD", "Office of Mobility Innovation"],
      partners: [
        "Utility partners",
        "Neighborhood advisory groups",
        "Regional transit planners",
      ],
      existing_assets: [
        "Scheduled resurfacing budget",
        "Planned utility mobilization",
        "Existing transit stop inventory",
      ],
      staffing_needs: ["Corridor coordination manager", "Inspection staff time"],
      contractor_needs: [
        "Roadway contractor",
        "Signal and crossing installer",
        "Transit shelter supplier",
      ],
      estimated_budget: "$3,400,000 — Estimated pilot budget — illustrative",
      funding_options: [
        "Existing resurfacing capital",
        "Safety improvement grants",
        "Transit capital funds",
      ],
      hot_spots: ["East Warren", "Livernois", "Grand River"],
      expected_outcomes: [
        "One construction disruption instead of three",
        "Safer crossings at crash clusters",
        "Connected bike and transit access",
      ],
      assumptions: [
        "Schedules can be aligned across departments and utilities",
        "Bundled scope stays within combined budget authority",
        "Crash clusters reflect design issues requiring engineering review",
      ],
      evidence_used: [
        "Resurfacing schedule",
        "Utility work plans",
        "Crash and complaint data",
        "Transit ridership by stop",
      ],
      public_summary:
        "Detroit is exploring doing street, sidewalk, bus stop, and bike lane work at the same time on corridors already scheduled for repair.",
    },
    publicView: {
      why: "Streets are often torn up more than once, and safety fixes wait years after a repaving.",
      today:
        "A street gets repaved, then reopened months later for utility work, while crossings and bus stops stay unimproved.",
      connected: [
        "Planned street repaving",
        "Planned utility work",
        "Crossing, bus stop, and bike lane needs",
      ],
      solution:
        "Do the work together on the same corridor so residents see one improved street instead of repeated construction.",
      included: [
        "Repaved street",
        "Safer crossings",
        "Bus shelters",
        "Connected bike lanes",
      ],
      neighborhoods: ["East Warren", "Livernois", "Grand River"],
      timeline: [
        { phase: "Corridor coordination", when: "Months 1–4" },
        { phase: "Construction season", when: "Months 5–12" },
        { phase: "Final improvements", when: "Month 12+" },
      ],
      programs: ["Construction updates", "Corridor walk-throughs"],
      coming_soon: ["Additional corridors", "Signal timing upgrades"],
    },
  },
];

export const getScenario = (id: string | undefined) =>
  scenarios.find((s) => s.id === id) ?? scenarios[1]!;

export const categories = [
  "Environment",
  "Education",
  "Transportation",
  "Community Spaces",
  "Workforce",
] as const;
