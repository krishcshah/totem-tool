# TOTeM Tool — Object-Centric Process Mining Workbench

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](frontend/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](frontend/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](frontend/)
[![DuckDB](https://img.shields.io/badge/DuckDB-In--Memory_Columnar-FFF000?logo=duckdb&logoColor=black)](https://duckdb.org/)
[![OCEL 2.0](https://img.shields.io/badge/Standard-OCEL_2.0-0D9488)](https://www.ocel-standard.org/)
[![RWTH Aachen PADS](https://img.shields.io/badge/Research-RWTH_Aachen_PADS-00549F)](https://www.pads.rwth-aachen.de/)

> **See the process between the objects.**  
> TOTeM is an open-source, visual workbench for Object-Centric Process Mining (OCPM). It turns OCEL 2.0 event logs into multi-level process areas, variants, formal models, token-based replay conformance evidence, and playout simulations — running in the browser and as a cross-platform desktop application.

---

## 🌐 Live Landing Page

Explore the interactive landing page and live web preview:  
👉 **[https://totem-tool.vercel.app](https://totem-tool.vercel.app)** *(or [https://totem-process-mining.vercel.app](https://totem-process-mining.vercel.app))*

---

## ✨ Key Capabilities

### 1. The Living Process Map (Multi-Object Collaboration)
Traditional process mining flattens multi-entity processes onto a single case notion (e.g. `order_id`), artificially duplicating activities, obscuring divergence, and hallucinating false causal loops. TOTeM natively tracks interacting object lifecycles across distinct threads:
- **Order** (`#2563EB` — Cobalt): Commercial contracts, payments, and fulfillment lifecycles.
- **Item** (`#8B5CF6` — Iris): Individual physical or digital SKUs ($n:1$ with Orders).
- **Package** (`#0D9488` — Teal): Physical parcel consolidations ($n:m$ with Items and Shipments).
- **Resource** (`#D97706` — Amber): Human operators, automated vehicles, and equipment handling shared workloads.

### 2. Continuous 6-Stage Workflow
Move seamlessly from raw data ingestion to formal conformance evidence without losing project context:
1. **01 Import**: Drag-and-drop ingestion of OCEL 2.0 logs (`.sqlite`, `.json`, `.xml`, `.csv`) directly into embedded DuckDB columnar storage.
2. **02 Orient**: Multi-level profiling of event volume, temporal horizons, and object-type degree distributions.
3. **03 Discover & Extract**: Automated decomposition into discrete process areas, executions, and canonical execution variants.
4. **04 Model & Edit**: Visual graph editing and bidirectional authoring across four formal model languages.
5. **05 Conformance & Diagnostics**: Multi-object token-based replay checking against formal specifications with concrete diagnostics.
6. **06 Playout & Simulation**: Bounded state space traversal, canonical variant enumeration, and simulation log synthesis.

### 3. Four Supported Model Formalisms
TOTeM provides first-class visual discovery, rendering, and authoring across the four dominant formalisms in object-centric process mining:
- **TOTeM (Temporal Object Type Model)**: First-class representation of typed temporal relationships, interaction boundaries, and object lifecycle transitions:
  $$\Sigma = (\Sigma_{\text{act}}, \Sigma_{\text{obj}}, \to, \dots)$$
- **OC-DFG (Object-Centric Directly-Follows Graphs)**: Multi-type edge routing with explicit frequency and performance metrics per object type.
- **OCPN (Object-Centric Petri Nets)**: Labeled transitions with typed places that preserve colored token dynamics and concurrency semantics.
- **OCCN (Object-Centric Causal Nets)**: Activity nodes equipped with precise input/output object binding obligations.

### 4. Fast Token-Based Replay Conformance Checking
Verify whether your real-world executions conform to prescribed models:
- **Fitting**: Complete replay without missing or leftover tokens across all participating object types.
- **Non-fitting**: Immediate pinpointing of missing tokens, unconsumed markings, and illegal binding combinations.
- **Inconclusive**: Transparent diagnostic reporting when path search reaches configured exploration bounds.

### 5. DuckDB Columnar Query Engine & Bento Workbench
- High-performance, in-memory analytical SQL queries directly against millions of OCEL events.
- Fully customizable, multi-window workspace built on GridStack.

---

## 🏛️ Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│               TOTeM Web & Desktop Shell                │
├────────────────────────────┬───────────────────────────┤
│ Frontend (React 19 / Vite) │ Python Core (totem-lib)   │
│ • Tailwind CSS + Radix UI  │ • OCEL 2.0 parser & DuckDB│
│ • Elk.js / React Flow DAGs │ • Token replay algorithm  │
│ • GridStack layout panels  │ • Playout state explorer  │
├────────────────────────────┴───────────────────────────┤
│ Cross-Platform Packaging: Electron + PyInstaller       │
└────────────────────────────────────────────────────────┘
```

- **Frontend**: React 19, TypeScript ~5.8, Vite 7, Tailwind CSS 4, Lucide React, Radix UI Primitives, Elkjs, ReactFlow.
- **Backend / Core Engine**: Python 3.10+, Django, `totem-lib` analysis library.
- **Analytics & Storage**: DuckDB embedded columnar engine, SQLite / JSON / XML OCEL 2.0 parsers.
- **Desktop Runtime**: Electron with PyInstaller backend sidecar.

---

## 🚀 Quick Start

### 1. Web Application & Landing Page (Frontend)

```bash
# Clone repository
git clone https://github.com/krishcshah/totem-tool.git
cd totem-tool/frontend

# Install dependencies
npm ci

# Start local development server (runs on http://localhost:3000)
npm run dev

# Run automated tests (Vitest)
npm test

# Typecheck and build production bundle
npm run typecheck
npm run build
```

### 2. Standalone Python Library (`totem-lib`)

The core algorithms can also be used directly in Python or Jupyter notebooks:

```bash
pip install totem-lib
```

```python
import totem_lib as totem

# Load an OCEL 2.0 log
log = totem.read_ocel("order_fulfillment.sqlite")

# Discover process areas with resource-aware heuristics
areas = totem.discover_process_areas(log, resource_aware=True)
print(f"Discovered {len(areas)} process areas.")
```

### 3. Desktop Application (Electron)

```bash
# From the repository root
npm run setup-env
npm run electron-dev
```

---

## 🧪 Automated Testing

The codebase includes an extensive Vitest automated test suite:

```bash
cd frontend
npm test
```

```
 Test Files  42 passed (42)
      Tests  228 passed (228)
```

Includes unit and integration tests for:
- Landing page routing, accessibility attributes, navigation states, and responsive drawer.
- WAI-ARIA tab navigation and keyboard arrow cycling for model formalisms.
- Object-centric vs flattened perspective toggling.
- OCCN and TOTeM token-based replay conformance checking workflows.
- Process area extraction and filter operations.
- Playout simulation and canonical variant analysis.

---

## 📚 Academic Research & Foundations

TOTeM is developed in collaboration with researchers from the **Chair of Process and Data Science (PADS)** at **RWTH Aachen University**, led by **Prof. Dr. ir. Wil van der Aalst**:

1. **CAiSE 2025**: *The Temporal Object Type Model: A Novel Language for Object-Centric Process Mining*  
   *Lukas Liss, et al.* — Formalization of the TOTeM language, execution semantics, and object interaction boundaries.
2. **BPM 2024**: *Interactive Process Area Discovery and Conformance Checking*  
   *Lukas Liss, et al.* — Multi-level process area extraction, resource-aware clustering, and interactive conformance.
3. **BPM 2026**: *A Fast and Scalable Token-Based Replay Technique for Object-Centric Conformance Checking*  
   *Lukas Liss, et al.* — High-performance token-based replay algorithms over multi-object Petri nets and C-Nets.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
