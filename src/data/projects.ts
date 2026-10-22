export const categories = [
  "AI Agents & GenAI",
  "RAG & Retrieval",
  "ML & Ranking",
  "Full-Stack AI",
  "Engineering / MLOps",
] as const;
export type Category = (typeof categories)[number];
export type Status = "Live Demo" | "Source Code" | "Prototype" | "In Progress";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  categories: Category[];
  status: Status;
  repo: string;
  demo?: string;
  context?: string;
  architecture: { label: string; detail: string }[];
  implementation: string[];
  metrics?: { value: string; label: string }[];
  metricsNote?: string;
  limits: string[];
};

export const projects: Project[] = [
  {
    slug: "iep-continuity-partner",
    name: "IEP Continuity Partner",
    tagline: "Agentic longitudinal accountability platform",
    problem: "Context around IEP commitments and progress evidence gets lost over time.",
    solution:
      "Gemini agents extract quoted observations from evidence; deterministic logic compares them against confirmed commitments and surfaces shortfalls for human review.",
    stack: ["Google ADK", "Gemini API", "FastAPI", "React", "Firestore", "Docker"],
    categories: ["AI Agents & GenAI", "Full-Stack AI"],
    status: "Live Demo",
    repo: "https://github.com/thejas-tech-hub/iep-continuity-partner",
    demo: "https://iep-continuity-partner.web.app/",
    architecture: [
      {
        label: "Evidence intake",
        detail: "Progress evidence enters the system for interpretation.",
      },
      {
        label: "ADK / Gemini agents",
        detail: "Interpret evidence and extract quoted observations.",
      },
      {
        label: "FastAPI drift engine",
        detail:
          "Deterministic comparison against confirmed commitments; computes delivery shortfalls.",
      },
      {
        label: "Human verification",
        detail: "Explicit user confirmation required before any state change is saved.",
      },
      { label: "Firestore memory", detail: "Longitudinal memory plus an append-only audit trail." },
    ],
    implementation: [
      "Closed-loop drift-detection engine combining LLM interpretation with deterministic comparison logic.",
      "Human-in-the-loop design: no state change is persisted without explicit user verification.",
      "Firestore used for longitudinal memory and an append-only audit trail.",
      "Backend containerized with Docker and described as Cloud Run-ready.",
    ],
    limits: [
      "No clinical validation, legal compliance, or adoption claims are made.",
      "LLM-extracted observations are suggestions until a user verifies them.",
    ],
  },
  {
    slug: "rag-llm-engine",
    name: "Enterprise RAG-LLM Engine",
    tagline: "Config-first RAG backend with pluggable model providers",
    problem: "RAG backends are often hard-wired to a single model provider and retrieval setup.",
    solution:
      "A dependency-injected backend with ChromaDB retrieval, LangChain orchestration, and a swappable multi-provider LLM layer.",
    stack: ["Python", "Flask", "LangChain", "ChromaDB", "Streamlit"],
    categories: ["RAG & Retrieval", "AI Agents & GenAI"],
    status: "Source Code",
    repo: "https://github.com/thejas-tech-hub/Rag-LLM",
    architecture: [
      {
        label: "Config + DI",
        detail: "Configuration-first setup with dependency-injected components.",
      },
      { label: "Ingestion", detail: "Streamlit app for PDF upload and ingestion." },
      { label: "ChromaDB retrieval", detail: "Vector retrieval orchestrated through LangChain." },
      {
        label: "Provider layer",
        detail: "Pluggable providers: Gemini, OpenAI, Anthropic, Ollama.",
      },
      {
        label: "Flask REST API",
        detail: "Routes for chat, upload, agent routing, and tool discovery.",
      },
    ],
    implementation: [
      "LangChain orchestration over ChromaDB vector retrieval.",
      "Pluggable model providers listed as Gemini, OpenAI, Anthropic, and Ollama.",
      "Flask REST routes for chat, upload, agent routing, and tool discovery.",
      "Streamlit front end for PDF ingestion and question answering.",
    ],
    limits: [
      "No production adoption, retrieval-accuracy, latency, or dataset-size claims are made.",
    ],
  },
  {
    slug: "pathfinder-ai",
    name: "PathFinder AI",
    tagline: "Campus placement ERP with semantic matching",
    problem:
      "Placement matching mixes hard eligibility rules with softer fit signals that are hard to rank transparently.",
    solution:
      "A two-stage pipeline: a rule-based Policy Gateway, then an embedding-based matcher producing a weighted Career Readiness Score.",
    stack: ["React", "Python", "FastAPI", "SQLAlchemy", "Hugging Face embeddings"],
    categories: ["ML & Ranking", "Full-Stack AI"],
    status: "Source Code",
    repo: "https://github.com/thejas-tech-hub/pathfinder-ai",
    architecture: [
      { label: "Policy Gateway", detail: "Hard rules: CGPA, backlogs, branch." },
      {
        label: "Semantic Matcher",
        detail: "all-MiniLM-L6-v2 embeddings for student-to-job similarity.",
      },
      { label: "Readiness Score", detail: "Weighted Career Readiness Score per candidate." },
      { label: "Dashboards", detail: "Role-based views for student, recruiter, and admin/TPO." },
      {
        label: "Audit + export",
        detail: "Immutable audit trail; CSV/JSON/PDF export of ranking decisions.",
      },
    ],
    implementation: [
      "Two-stage matching: deterministic eligibility filter before semantic ranking.",
      "Role-based student, recruiter, and admin/TPO dashboards.",
      "SQLAlchemy / SQLite backend.",
      "Immutable audit trail with CSV/JSON/PDF export of ranking decisions.",
    ],
    limits: ["Not claimed to be in use at any real college."],
  },
  {
    slug: "sevasphere",
    name: "SevaSphere",
    tagline: "AI disaster-relief coordination platform",
    problem:
      "Relief coordination depends on scattered disaster feeds, handwritten field reports, and manual volunteer assignment.",
    solution:
      "A three-layer system: Gemini forecasting from live GDACS data, Gemini Vision OCR for field reports, and hybrid volunteer matching.",
    stack: ["React", "Tailwind CSS", "Firebase", "Google Gemini", "GDACS API"],
    categories: ["Full-Stack AI", "AI Agents & GenAI"],
    status: "Live Demo",
    repo: "https://github.com/thejas-tech-hub/sevasphere-2026",
    demo: "https://sevasphere-2026.web.app/",
    context: "Built for Google Solution Challenge 2026 — Smart Resource Allocation.",
    architecture: [
      { label: "GDACS feed", detail: "Live disaster data as input." },
      { label: "Gemini forecasting", detail: "Crisis forecasting layer over GDACS data." },
      { label: "Gemini Vision OCR", detail: "Digitizes handwritten NGO field reports." },
      { label: "Volunteer matching", detail: "JavaScript pre-filter followed by Gemini ranking." },
      {
        label: "Maps + Firebase",
        detail: "Google Maps crisis view; Firebase Auth and Firestore for real-time data.",
      },
    ],
    implementation: [
      "Three-layer AI system using Gemini across forecasting, OCR, and matching.",
      "Hybrid JS pre-filter plus Gemini-ranked volunteer matching.",
      "Google Maps crisis visualization.",
      "Firebase Authentication and Firestore for real-time data.",
    ],
    limits: ["Deployed project; no forecasting-accuracy or operational-outcome claims are made."],
  },
  {
    slug: "india-runs",
    name: "INDIA.RUNS",
    tagline: "CPU-only candidate ranking & hireability pipeline",
    problem:
      "Ranking a large pool of candidate profiles while filtering out honeypot and adversarial entries, without a GPU.",
    solution:
      "Hybrid BM25 + dense retrieval fused with RRF, cross-encoder reranking, and LLM reasoning for explainable shortlists.",
    stack: ["Python", "BM25", "Sentence Transformers", "Cross-encoder", "Phi-3", "pytest"],
    categories: ["ML & Ranking", "RAG & Retrieval", "Engineering / MLOps"],
    status: "Source Code",
    repo: "https://github.com/thejas-tech-hub/India_runs_hackathon",
    architecture: [
      { label: "Honeypot filter", detail: "Honeypot detection and behavioral scoring." },
      {
        label: "Hybrid retrieval",
        detail: "BM25 + dense retrieval combined via Reciprocal Rank Fusion.",
      },
      { label: "Cross-encoder", detail: "Reranks the fused candidate list." },
      { label: "LLM reasoning", detail: "Phi-3 generates structured explanations for the Top 10." },
      { label: "Output", detail: "Top-100 shortlist." },
    ],
    implementation: [
      "End-to-end pipeline over 100,000 candidate profiles.",
      "Runs CPU-only with no external APIs.",
      "Top-100 shortlist with structured LLM explanations for the Top 10.",
    ],
    metrics: [
      { value: "100,000", label: "profiles processed" },
      { value: "9,231 (9.2%)", label: "flagged adversarial / synthetic" },
      { value: "~254 s", label: "runtime, no GPU" },
      { value: "282 / 282", label: "unit tests passing" },
    ],
    metricsNote:
      "Project-reported results from the hackathon run and its pytest suite — not independently verified guarantees.",
    limits: ["Hackathon project; not adopted by an employer or hiring platform."],
  },
];

export type ArchiveEntry = { name: string; note: string; repo: string; demo?: string };

// Verified against GitHub repository records; experimental builds clearly marked as prototypes
export const archive: ArchiveEntry[] = [
  {
    name: "Advanced Fraudulent Link Detector",
    note: "Phishing classifier and feature extraction prototype.",
    repo: "https://github.com/thejas-tech-hub/Advanced-Fraudulent-Link-Detector",
  },
  {
    name: "Trading Signal Pipeline",
    note: "MLOps batch pipeline demo and prototype. Not a live trading system.",
    repo: "https://github.com/thejas-tech-hub/trading-signal-pipeline-demo",
  },
  {
    name: "Ticket Triage",
    note: "Automated AI ticket classification and routing prototype.",
    repo: "https://github.com/thejas-tech-hub/ticket_triage",
  },
  {
    name: "StudyGenie",
    note: "Interactive AI student chatbot prototype.",
    repo: "https://github.com/thejas-tech-hub/student_ai_chatbot",
  },
  {
    name: "HealVision",
    note: "Gemini healthcare assistant prototype (consolidating HealVision & healvisionagentversion).",
    repo: "https://github.com/thejas-tech-hub/HealVision",
  },
  {
    name: "MyOwnJarvis",
    note: "Voice-driven agentic assistant prototype.",
    repo: "https://github.com/thejas-tech-hub/Myownjarvis",
  },
  {
    name: "AEGIS / HTF-07",
    note: "Hackathon prototype for multi-hop fraud flow analysis. Not a production fraud detection service.",
    repo: "https://github.com/thejas-tech-hub/HTF-07",
  },
  {
    name: "StreamVerse",
    note: "AI video platform prototype built during ANVIL 2026 hackathon.",
    repo: "https://github.com/thejas-tech-hub/algorythms-ai-hackathon",
    demo: "https://streamverse-osgqc.web.app/",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
