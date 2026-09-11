/**
 * Content definition for the TOTeM landing page.
 * All product claims, academic citations, workflow stages, and FAQ answers
 * are derived from source-of-truth code and repository documentation.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface TrustBadge {
  label: string;
  detail: string;
}

export interface ObjectThread {
  id: "order" | "item" | "package" | "resource";
  name: string;
  color: string;
  accentClass: string;
  role: string;
  description: string;
}

export interface WorkflowStage {
  number: string;
  step: string;
  title: string;
  copy: string;
  tag: string;
  supportedFormats?: string[];
  visualType: "import" | "orient" | "discover" | "shape" | "check" | "simulate";
}

export interface ModelFormalism {
  id: string;
  title: string;
  fullName: string;
  copy: string;
  badges: string[];
  citation?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ResearchCard {
  title: string;
  venue: string;
  year: string;
  authors: string;
  description: string;
  link?: string;
}

export const LANDING_NAV_LINKS: NavItem[] = [
  { label: "Why object-centric", href: "#why" },
  { label: "Workflow", href: "#workflow" },
  { label: "Models", href: "#models" },
  { label: "Research", href: "#research" },
  { label: "FAQ", href: "#faq" },
];

export const GITHUB_REPO_URL = "https://github.com/LukasLiss/totem-tool";

export const OBJECT_THREADS: ObjectThread[] = [
  {
    id: "order",
    name: "Order",
    color: "#2563EB",
    accentClass: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/50",
    role: "Commercial root",
    description: "Initiates lifecycles, aggregates line items, and establishes commercial constraints.",
  },
  {
    id: "item",
    name: "Item",
    color: "#8B5CF6",
    accentClass: "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/50",
    role: "Physical inventory",
    description: "Individual units picked, routed through quality checks, and batched into containers.",
  },
  {
    id: "package",
    name: "Package",
    color: "#0D9488",
    accentClass: "text-teal-600 bg-teal-50 border-teal-200 dark:text-teal-400 dark:bg-teal-950/50",
    role: "Logistic container",
    description: "Bundles items across orders, receives shipping labels, and traces transport legs.",
  },
  {
    id: "resource",
    name: "Resource",
    color: "#D97706",
    accentClass: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/50",
    role: "Shared worker or machine",
    description: "Interacts with multiple business executions across shifts without defining case boundaries.",
  },
];

export const TRUST_STRIP: TrustBadge[] = [
  { label: "OCEL 2.0", detail: "Native relational standard" },
  { label: "Visual Model Editors", detail: "TOTeM, OCCN, OCPN & OC-DFG" },
  { label: "Conformance & Playout", detail: "Bounded replay & simulation" },
  { label: "MIT Licensed", detail: "Open source & inspectable" },
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    number: "01",
    step: "01 / 06",
    title: "Bring the object-centric log.",
    copy: "Open an OCEL 2.0 log, validate it, and convert supported source formats into the DuckDB-backed project representation used throughout the workbench.",
    tag: "IMPORT & STORE",
    supportedFormats: [".sqlite / .db", ".json", ".xml", ".csv", ".duckdb"],
    visualType: "import",
  },
  {
    number: "02",
    step: "02 / 06",
    title: "Find the shape of the process.",
    copy: "Use log statistics, global filters, the object-centric dotted chart, and process areas to understand which activities, object types, and resource layers matter.",
    tag: "ORIENT & PROFILE",
    visualType: "orient",
  },
  {
    number: "03",
    step: "03 / 06",
    title: "Reveal executions, variants, and models.",
    copy: "Extract process executions, compare object-centric variants, and discover OC-DFGs, object-centric Petri nets, object-centric causal nets, and Temporal Object Type Models.",
    tag: "DISCOVER & EXTRACT",
    visualType: "discover",
  },
  {
    number: "04",
    step: "04 / 06",
    title: "Inspect and edit the model.",
    copy: "Move from discovered behavior to visual model editors with typed relations, bindings, places, transitions, cardinalities, automatic layout, undo, redo, and JSON exchange.",
    tag: "SHAPE & REFINE",
    visualType: "shape",
  },
  {
    number: "05",
    step: "05 / 06",
    title: "Compare model and reality.",
    copy: "Run conformance against a stored model, inspect aggregate metrics, and investigate object types, relations, replay units, and concrete stopping points.",
    tag: "CHECK CONFORMANCE",
    visualType: "check",
  },
  {
    number: "06",
    step: "06 / 06",
    title: "Ask what the model permits.",
    copy: "Enumerate distinct object-centric behavior under explicit bounds, inspect whether the result is exhaustive, and export variants or an OCEL 2.0 log.",
    tag: "SIMULATE & EXPORT",
    visualType: "simulate",
  },
];

export const MODEL_FORMALISMS: ModelFormalism[] = [
  {
    id: "totem",
    title: "TOTeM",
    fullName: "Temporal Object Type Model",
    copy: "Understand how object types relate over time, including temporal relations and cardinalities at log and event level.",
    badges: [
      "Type-level perspective",
      "Temporal relations (D, Di, I, Ii, P)",
      "Log & event cardinalities",
      "Discovery and conformance",
    ],
    citation: "Liss et al., BPM 2024",
  },
  {
    id: "ocdfg",
    title: "OC-DFG",
    fullName: "Object-Centric Directly-Follows Graph",
    copy: "See which activities directly follow one another for each object type, with typed arcs, start and end nodes, and object-specific flow.",
    badges: [
      "Activity flow per object type",
      "Typed multigraph arcs",
      "Frequency and variant views",
      "Visual editing & bend points",
    ],
    citation: "van der Aalst & Berti, Fundamenta Informaticae",
  },
  {
    id: "ocpn",
    title: "OCPN",
    fullName: "Object-Centric Petri Net",
    copy: "Represent executable process behavior with typed places, visible and silent transitions, and fixed or variable object flow.",
    badges: [
      "Executable semantics",
      "Typed places & transitions",
      "Variable arcs (double lines)",
      "Discovery, editing, and playout",
    ],
    citation: "van der Aalst & Berti, Fundamenta Informaticae",
  },
  {
    id: "occn",
    title: "OCCN",
    fullName: "Object-Centric Causal Net",
    copy: "Model typed causal dependencies and activity bindings, including cardinality-sensitive obligations across object types.",
    badges: [
      "Causal dependencies",
      "Input / output marker groups",
      "Cardinality-sensitive bindings",
      "Discovery, conformance, and playout",
    ],
    citation: "Liss et al., CAiSE 2025",
  },
];

export const RESEARCH_CITATIONS: ResearchCard[] = [
  {
    title: "Object-Centric Causal Nets",
    venue: "CAiSE 2025",
    year: "2025",
    authors: "Lukas Liss et al.",
    description: "Introduces Object-Centric Causal Nets, formalizing typed causal dependencies and marker-group binding semantics across interacting object types.",
    link: "https://doi.org/10.1007/978-3-031-94571-7_6",
  },
  {
    title: "TOTeM: Temporal Object Type Model for Object-Centric Process Mining",
    venue: "BPM 2024",
    year: "2024",
    authors: "Lukas Liss et al.",
    description: "Defines the Temporal Object Type Model notation, mining type-level temporal relationships and cardinalities between interacting object classes.",
  },
  {
    title: "Process Area Extraction by Multilevel Resource Detection for Object-Centric Process Mining",
    venue: "BPM 2026",
    year: "2026",
    authors: "Lukas Liss & Wil van der Aalst",
    description: "Discovers layered process areas by separating shared resource tiers from underlying business object lifecycles using temporal, cardinality, and divergence signals.",
    link: "https://doi.org/10.1007/978-3-032-02867-9_13",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is object-centric process mining?",
    answer: "Traditional process mining forces every recorded event into a single case identifier (such as an order ID). However, real business processes involve multiple interacting objects—orders, items, packages, workers, and machines—often operating concurrently with one-to-many or many-to-many relationships. Object-centric process mining keeps these multiple objects and their shared events visible throughout analysis, preventing the data duplication and behavioral distortion caused by flattening.",
  },
  {
    question: "What is an OCEL?",
    answer: "An Object-Centric Event Log (OCEL 2.0) is an open standard that records events, objects, object types, event-to-object relations, and optionally object-to-object relations and dynamic attributes. TOTeM uses the OCEL 2.0 relational perspective throughout its DuckDB-backed storage and analysis core.",
  },
  {
    question: "Which file formats can I import?",
    answer: "TOTeM supports direct import and validation of OCEL 2.0 files in SQLite/DB (.sqlite, .db), JSON (.json), XML (.xml), CSV (.csv), and DuckDB (.duckdb) formats. Upon upload, source formats are converted into an optimized DuckDB database for low-latency analytical queries.",
  },
  {
    question: "Which models does TOTeM support?",
    answer: "TOTeM supports four formal object-centric notations: Temporal Object Type Models (TOTeM) for type-level temporal structure; Object-Centric Directly-Follows Graphs (OC-DFG) for activity flow; Object-Centric Petri Nets (OCPN) for executable token semantics; and Object-Centric Causal Nets (OCCN) for obligation-based causal dependencies. Each notation is supported by discovery, visual editing, and analysis.",
  },
  {
    question: "Can I edit event logs?",
    answer: "Yes. The built-in OCEL Editor works on an isolated DuckDB working copy. You can inspect, filter, add, edit, or delete events, objects, attributes, E2O relations, and O2O relations. The original project is never modified in place; changes become permanent only when you explicitly choose 'Save as project'.",
  },
  {
    question: "Can I run TOTeM locally?",
    answer: "Yes. The repository includes an Electron desktop configuration that bundles the React frontend, Django REST API, totem-tool analysis library, and DuckDB storage locally without requiring external cloud services.",
  },
  {
    question: "Can I query the event data directly?",
    answer: "Yes. TOTeM includes a built-in DuckDB SQL Editor and schema browser. You can author sandboxed SELECT-only queries against the events, objects, and relation tables, view execution timings and row results, and place query results directly into project dashboards.",
  },
  {
    question: "Is TOTeM open source?",
    answer: "Yes. The complete TOTeM Tool workbench and the underlying totem-tool analysis core are published under the permissive MIT License on GitHub.",
  },
  {
    question: "Can I use the analysis library without the interface?",
    answer: "Yes. The core algorithms are packaged in a standalone Python library called totem-tool on PyPI. You can install it directly with 'pip install totem-tool' and use it in Python scripts, Jupyter notebooks, or data science pipelines without starting the web application.",
  },
];
