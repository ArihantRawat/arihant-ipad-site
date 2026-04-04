const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export const experience = [
  {
    id: "salesforce",
    title: "Senior Product Developer (MTS)",
    company: "Salesforce",
    period: "Oct 2023 - Jul 2025",
    year: "2025",
    logo: withBasePath("/assets/logos/salesforce.png"),
    color: "#00A1E0",
    website: "https://www.salesforce.com/",
    description:
      "Built and scaled Content Services in Industries Cloud from a high-leverage internal system into a customer-facing, API-driven product, with close collaboration across product, platform, and Data Cloud teams.",
    achievements: [
      "Owned full-stack delivery across backend APIs, frontend workflows, and system design for Content Services",
      "Helped integrate with Data Cloud to unlock broader adoption and platform growth",
      "Partnered with PM, design, and engineering stakeholders to turn ambiguous requirements into shippable releases",
      "Mentored junior engineers and interns; regularly demoed architecture and product capabilities to technical and non-technical audiences",
      "Drove early team exploration of agentic AI patterns and AI-assisted developer workflows",
    ],
    skills: ["Full Stack Development", "API Design", "System Design", "Data Cloud", "AI Product Integration"],
    photos: [],
  },
  {
    id: "cultfit",
    title: "Product Developer to Senior Product Developer",
    company: "Cult.fit",
    period: "Jul 2021 - Oct 2023",
    year: "2023",
    logo: withBasePath("/assets/logos/cultfit.png"),
    color: "#7C3AED",
    website: "https://www.cult.fit/",
    description:
      "Built digital health and fitness products during a high-growth phase, spanning mobile architecture, backend systems, experimentation funnels, and cross-functional product execution.",
    achievements: [
      "Led major portions of the React Native to Flutter migration and built core app architecture components",
      "Expanded from app development into backend services, analytics funnels, and A/B experimentation workflows",
      "Acted as a bridge between engineering, product, and data science teams to ship user-centric improvements",
      "Owned technical direction for a portfolio of six digital products as app lead",
      "Collaborated across design, operations, QA, and support in a fast-moving startup environment",
    ],
    skills: ["Flutter", "Backend Development", "Experimentation", "Product Thinking", "Cross-functional Leadership"],
    photos: [],
  },
];
