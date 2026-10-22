export const profile = {
  name: "Thejas J",
  role: "AI/ML engineering student & software builder",
  location: "Mangalore, Karnataka, India",
  headline: "Building intelligent systems for real-world problems.",
  intro:
    "I'm Thejas J, an AI/ML engineering student and software builder. I design and ship AI applications, agentic workflows, RAG systems, and full-stack products—from system architecture and backend APIs to data layers and deployment.",
  email: "thejasbejja42@gmail.com",
  // Phone is intentionally hidden. Set showPhone to true to display it.
  phone: "",
  showPhone: false,
  links: {
    github: "https://github.com/thejas-tech-hub",
    // Provisional: taken from the latest resume. Update here if it changes.
    linkedin: "https://linkedin.com/in/thejas-j-b2695433a",
    leetcode: "https://leetcode.com/u/thejasbejja",
  },
  // Set to null to hide the resume download everywhere.
  resumeUrl: "/resume.pdf" as string | null,
  education: {
    degree: "B.E. Artificial Intelligence & Machine Learning",
    college: "A.J. Institute of Engineering and Technology, Mangalore",
    scheme: "VTU 2022 Scheme",
    cgpa: "8.7/10",
    graduation: "Expected May 2028",
    school: [
      { label: "Karnataka PUC", value: "93%", where: "SMK PU College" },
      { label: "CBSE", value: "83%", where: "SBEMS" },
    ],
  },
  interests: [
    "Agentic workflows with human-in-the-loop checkpoints",
    "Retrieval-augmented generation and ranking systems",
    "Full-stack AI products, from API design to deployment",
    "Data and ML pipelines built for limited compute",
  ],
};

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "AI/ML & GenAI",
    items: [
      "LangChain",
      "Google ADK",
      "AWS Bedrock",
      "Strands Agents",
      "RAG",
      "Agentic workflows",
      "Prompt engineering",
      "ChromaDB",
      "Embeddings",
      "scikit-learn",
      "PyTorch",
      "Pandas",
      "NumPy",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Python / Flask / FastAPI",
      "Node.js / Express",
      "REST APIs",
      "Gemini API integration",
      "Firebase Auth",
      "SQL database design",
      "SQLAlchemy",
    ],
  },
  {
    title: "Languages & framework",
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
    ],
  },
  { title: "Databases", items: ["Firestore", "SQLite", "MongoDB", "ChromaDB"] },
  { title: "Cloud & tools", items: ["Docker", "Git", "GitHub Actions", "CI/CD", "System design"] },
];

export type HackathonEntry = {
  role: string;
  event: string;
  org: string;
  detail: string;
  featured?: boolean;
};

export const hackathons: HackathonEntry[] = [
  {
    role: "Team Lead",
    event: "ANVIL 2026 (AlgoRhythms)",
    org: "Scaler School of Technology",
    detail:
      "Led four members as system architect / AI integration lead in a 24-hour national hackathon; designed an agent-based architecture under time limits.",
    featured: true,
  },
  {
    role: "Team Lead",
    event: "Bharatiya Antariksh Hackathon 2026",
    org: "ISRO (Hack2skill)",
    detail: "Led a team idea submission for a national-level AI/space-tech challenge.",
    featured: true,
  },
  {
    role: "Team Lead",
    event: "Solution Challenge 2026: Build with AI",
    org: "Google",
    detail: "Led the team to an AI-powered prototype submission (SevaSphere).",
    featured: true,
  },
  {
    role: "Team Member",
    event: "Amazon ML Challenge 2026",
    org: "Amazon",
    detail:
      "Large-scale entity-resolution work: candidate blocking, similarity features, ML-based matching, and validation on millions of records.",
    featured: true,
  },
  {
    role: "Team Lead",
    event: "Hackfest 26'",
    org: "NMAM Institute of Technology",
    detail: "30-hour capture-the-flag event.",
  },
  {
    role: "Team Lead",
    event: "NEXATHON 2025",
    org: "Shree Devi Institute of Technology, IEEE Mangalore Subsection",
    detail: "24-hour national-level hackathon.",
  },
];
