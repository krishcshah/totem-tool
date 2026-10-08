import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Compass,
  Play,
  Check,
  ShieldCheck,
  Layers,
  Terminal,
  Zap,
  Cpu,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { ProductWindow } from "./ProductWindow";

type CopilotMode = "teach" | "act";

export const AiAssistantStory: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CopilotMode>("teach");
  const [actionApproved, setActionApproved] = useState<boolean>(false);
  const [actionRejected, setActionRejected] = useState<boolean>(false);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);

  const teachPrompts = [
    {
      query: "How do Object-Centric Petri Nets differ from standard Petri nets, and where do I discover one?",
      reply:
        "Unlike classic Petri nets where tokens are anonymous black dots on a single case, OCPN places are partitioned across object classes C (e.g., Order, Item, Package). Transitions fire by consuming and producing multi-typed token vectors without flattening the log.",
      actionLabel: "Tour Action: highlight_element(\"nav-models\", tour_step=1)",
      spotlightText: "Spotlight Active: Model Discovery Studio",
    },
    {
      query: "What is an Object-Centric Causal Net (OCCN) marker binding?",
      reply:
        "In an OCCN, an activity execution requires a valid input binding from preceding activities and produces an output binding. Instead of places, obligations are satisfied through marker groups respecting cardinality constraints across related object types.",
      actionLabel: "Tour Action: highlight_element(\"model-occn-card\", tour_step=2)",
      spotlightText: "Spotlight Active: OCCN Marker Inspector",
    },
    {
      query: "Why does TOTeM use OCEL 2.0 instead of classic XES event logs?",
      reply:
        "Classic XES forces every event to belong to exactly one case ID, causing convergence and divergence anomalies. OCEL 2.0 natively stores many-to-many relationships between events and multiple interacting objects.",
      actionLabel: "Tour Action: highlight_element(\"nav-ocel-editor\", tour_step=3)",
      spotlightText: "Spotlight Active: OCEL 2.0 Relational Browser",
    },
  ];

  const actPrompts = [
    {
      query: "Analyze variants for orders with bottlenecks, discover an OCCN model, and prepare a 5-card dashboard.",
      tools: [
        "get_statistics(project_id=\"log-ocel\") → 42,108 events, 8,412 objects",
        "find_variants(object_types=[\"order\", \"package\"], min_coverage=0.85)",
        "discover_occn(dependency_threshold=0.9, noise_tolerance=0.05)",
      ],
      pendingAction:
        "Create and mount 5-card analytical dashboard layout (Variants, OCCN Graph, Lead Times, Resource Areas, Dotted Chart) to active project workspace.",
    },
    {
      query: "Filter the event log to orders delayed over 48 hours and identify conflicting resource allocations.",
      tools: [
        "apply_filter(type=\"temporal_duration\", threshold=\"48h\") → 1,240 cases isolated",
        "extract_process_areas(resource_tier=\"shared\") → 3 bottleneck clusters found",
      ],
      pendingAction:
        "Apply isolate_filter to DuckDB working copy and switch view to Process Area Decomposition.",
    },
  ];

  const handleModeChange = (mode: CopilotMode) => {
    setActiveMode(mode);
    setActivePromptIndex(0);
    setActionApproved(false);
    setActionRejected(false);
  };

  const handlePromptSelect = (index: number) => {
    setActivePromptIndex(index);
    setActionApproved(false);
    setActionRejected(false);
  };

  return (
    <section id="ai-assistant" className="py-20 sm:py-32 border-b border-[#E4E4E7] bg-[#FAFAF9] totem-section-target">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-medium text-blue-700 mb-4 select-none">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>DUAL-MODE AI COPILOT & AGENT BRIDGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            Process intelligence meets autonomous action.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            TOTeM pairs an in-browser copilot with the DuckDB analysis core through the Model Context Protocol (MCP).
            Switch seamlessly between <strong>Teach Mode</strong> for grounded theoretical coaching and visual UI tours,
            and <strong>Act Mode</strong> for tool-driven variant discovery, model extraction, and dashboard synthesis—always
            safeguarded by human-in-the-loop approvals.
          </p>
        </div>

        {/* Interactive Copilot Window */}
        <div className="mb-16">
          <ProductWindow
            title="TOTeM AI Copilot — Real-Time Agent Session"
            viewLabel="WebSocket Active · /ws/agent/"
            caption="Interactive simulation of the TOTeM Copilot dual-mode interface. Toggle between Teach and Act modes to test educational tours and autonomous MCP tool executions."
            className="shadow-md"
          >
            <div className="p-4 sm:p-6 space-y-6">
              {/* Copilot Header Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-200">
                {/* Mode Switcher Toggle */}
                <div
                  role="tablist"
                  aria-label="AI Copilot Operating Mode"
                  className="inline-flex p-1 rounded-lg bg-neutral-100 border border-neutral-200 select-none"
                >
                  <button
                    type="button"
                    role="tab"
                    id="tab-teach-mode"
                    aria-selected={activeMode === "teach"}
                    aria-controls="panel-teach-mode"
                    onClick={() => handleModeChange("teach")}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition cursor-pointer ${
                      activeMode === "teach"
                        ? "bg-white text-neutral-900 shadow-2xs border border-neutral-200"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    <span>Teach Mode</span>
                    <span className="hidden sm:inline text-[10px] text-neutral-400 font-normal">(Coaching & Tours)</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-act-mode"
                    aria-selected={activeMode === "act"}
                    aria-controls="panel-act-mode"
                    onClick={() => handleModeChange("act")}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition cursor-pointer ${
                      activeMode === "act"
                        ? "bg-white text-neutral-900 shadow-2xs border border-neutral-200"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5 text-purple-600" />
                    <span>Act Mode</span>
                    <span className="hidden sm:inline text-[10px] text-neutral-400 font-normal">(MCP Tools & Actions)</span>
                  </button>
                </div>

                {/* Connection Status & Provider Badge */}
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-700 font-medium">Agent Live-Wire Connected</span>
                  </div>
                  <span className="text-neutral-300">|</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 text-neutral-700">
                    <Cpu className="w-3.5 h-3.5 text-neutral-500" />
                    <span>BYOK Multi-Provider</span>
                  </div>
                </div>
              </div>

              {/* Mode Description Banner */}
              <div
                className={`p-3.5 rounded-lg border text-xs leading-relaxed transition ${
                  activeMode === "teach"
                    ? "bg-blue-50/70 border-blue-200 text-blue-900"
                    : "bg-purple-50/70 border-purple-200 text-purple-900"
                }`}
              >
                {activeMode === "teach" ? (
                  <div className="flex items-start gap-2.5">
                    <Compass className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold font-mono">Teach Mode is active:</strong> The copilot acts as a process mining tutor. It explains formal OCPM definitions with mathematical grounding and drives interactive UI tours without modifying your data.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <Bot className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold font-mono">Act Mode is active:</strong> The copilot acts as an autonomous analytical agent. It invokes backend MCP tools on the DuckDB engine and proposes UI mutations with human-in-the-loop confirmation.
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Selector Chips */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  Select sample prompt:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(activeMode === "teach" ? teachPrompts : actPrompts).map((item, idx) => (
                    <button
                      key={item.query}
                      type="button"
                      onClick={() => handlePromptSelect(idx)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition text-left cursor-pointer ${
                        activePromptIndex === idx
                          ? "bg-neutral-900 text-white border-neutral-900 font-medium shadow-2xs"
                          : "bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200"
                      }`}
                    >
                      {item.query.length > 55 ? `${item.query.slice(0, 52)}...` : item.query}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated Conversation Box */}
              <div
                id={activeMode === "teach" ? "panel-teach-mode" : "panel-act-mode"}
                role="tabpanel"
                aria-labelledby={activeMode === "teach" ? "tab-teach-mode" : "tab-act-mode"}
                className="space-y-4 pt-2"
              >
                {/* User Message */}
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-neutral-900 text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-xl text-sm font-sans shadow-xs">
                    {(activeMode === "teach" ? teachPrompts : actPrompts)[activePromptIndex]?.query}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-xs font-mono font-bold text-neutral-700 shrink-0 select-none">
                    YOU
                  </div>
                </div>

                {/* Copilot Message */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 select-none shadow-xs ${
                      activeMode === "teach" ? "bg-blue-600" : "bg-purple-600"
                    }`}
                  >
                    {activeMode === "teach" ? <Compass className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-3 max-w-2xl flex-1">
                    {/* Teach Mode Content */}
                    {activeMode === "teach" && (
                      <>
                        <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-xs p-4 text-sm text-neutral-800 font-sans leading-relaxed shadow-xs">
                          {teachPrompts[activePromptIndex].reply}
                        </div>

                        {/* Visual Tour Spotlight Action */}
                        <div className="p-3 rounded-xl bg-blue-50/90 border border-blue-200 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 shadow-2xs">
                          <div className="flex items-center gap-2 text-blue-900 font-mono">
                            <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate">{teachPrompts[activePromptIndex].actionLabel}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-[11px] font-semibold tracking-wide self-start sm:self-auto shrink-0 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {teachPrompts[activePromptIndex].spotlightText}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Act Mode Content */}
                    {activeMode === "act" && (
                      <>
                        <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-xs p-4 text-sm text-neutral-800 font-sans leading-relaxed shadow-xs">
                          Executing autonomous process mining workflow through Model Context Protocol (MCP) domain tools:
                        </div>

                        {/* MCP Tool Execution Log */}
                        <div className="space-y-2 font-mono text-[11px] bg-[#0E1116] text-neutral-200 p-3.5 rounded-xl border border-neutral-800 shadow-inner">
                          <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-between pb-1 border-b border-neutral-800">
                            <span>MCP Tool Invocation Pipeline</span>
                            <span className="text-emerald-400 font-normal">3 Tools Executed</span>
                          </div>
                          {actPrompts[activePromptIndex].tools.map((t) => (
                            <div key={t} className="flex items-center gap-2 text-emerald-400">
                              <Check className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{t}</span>
                            </div>
                          ))}
                        </div>

                        {/* Human-in-the-Loop Pending Action Card */}
                        <div className="p-4 rounded-xl border-2 border-amber-500/40 bg-amber-50/60 space-y-3.5 shadow-xs">
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>MUTATING ACTION REQUIRING APPROVAL</span>
                              </div>
                              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                                {actPrompts[activePromptIndex].pendingAction}
                              </p>
                            </div>
                            <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-amber-200/80 text-amber-900 font-semibold shrink-0">
                              Approval Required
                            </span>
                          </div>

                          {/* Approval / Rejection Actions */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/60">
                            <button
                              type="button"
                              onClick={() => {
                                setActionApproved(true);
                                setActionRejected(false);
                              }}
                              disabled={actionApproved}
                              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold font-mono flex items-center gap-1.5 transition cursor-pointer ${
                                actionApproved
                                  ? "bg-emerald-600 text-white cursor-default"
                                  : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-2xs"
                              }`}
                            >
                              {actionApproved ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-white" />
                                  <span>Approved & Applied</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5" />
                                  <span>Approve Action</span>
                                </>
                              )}
                            </button>

                            {!actionApproved && !actionRejected && (
                              <button
                                type="button"
                                onClick={() => {
                                  setActionRejected(true);
                                  setActionApproved(false);
                                }}
                                className="px-3.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-md text-xs font-medium font-mono transition cursor-pointer"
                              >
                                Reject
                              </button>
                            )}

                            {actionApproved && (
                              <span className="text-xs font-mono text-emerald-800 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Dashboard mounted to active workspace (5 widgets ready)</span>
                              </span>
                            )}

                            {actionRejected && (
                              <span className="text-xs font-mono text-neutral-600 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5 text-neutral-400" />
                                <span>Action safely canceled. No mutations performed.</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ProductWindow>
        </div>

        {/* 4 Architectural Pillars (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Dual-Mode Isolation */}
          <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-mono text-sm font-bold text-neutral-900">
                Isolated Dual-Mode
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                Strict boundary separating educational coaching from mutating system tools. Teach mode cannot alter your project; Act mode demands explicit approval before touching data or layouts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Teach: Zero Mutation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                Act: Human-in-the-Loop
              </span>
            </div>
          </div>

          {/* Card 2: Model Context Protocol */}
          <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-mono text-sm font-bold text-neutral-900">
                18 Domain MCP Tools
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                The agent speaks process mining natively. Powered by the open Model Context Protocol (MCP), the copilot runs DuckDB queries, extracts variants, calculates conformance, and visualizes multi-type flows.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                DuckDB Native
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                OCEL 2.0 Standard
              </span>
            </div>
          </div>

          {/* Card 3: Agent Live-Wire Bridge */}
          <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-mono text-sm font-bold text-neutral-900">
                Agent Live-Wire Bridge
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                A dedicated WebSocket channel (<code className="font-mono text-[11px] bg-neutral-100 px-1 py-0.5 rounded">/ws/agent/</code>) bridges backend Python agents with the React interface. As you navigate or filter, the copilot immediately shares your analytical viewpoint.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                Real-Time WS Sync
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                Visual Spotlight Tours
              </span>
            </div>
          </div>

          {/* Card 4: Privacy & BYOK Multi-Provider */}
          <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-mono text-sm font-bold text-neutral-900">
                Privacy-First & BYOK
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                Bring your own API key for Google Gemini, OpenAI, or Anthropic—or run with deterministic mock providers. Sensitive raw log rows and raw DOM trees are never sent to external model APIs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                Gemini · OpenAI · Claude
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                Zero Raw Log Leaks
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
