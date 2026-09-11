import React, { useState, useEffect } from "react";
import { ProductWindow } from "./ProductWindow";
import { Layers } from "lucide-react";
import processAreaImg from "@/images/process-area-preview.png";
import { useInactivityResume } from "../hooks/useInactivityResume";

export const ProcessAreaStory: React.FC = () => {
  // Process area signal focus
  const [activeSignal, setActiveSignal] = useState<"temporal" | "cardinality" | "divergence">("temporal");
  // Resource-aware demo mode
  const [extractionMode, setExtractionMode] = useState<"connected" | "resource_aware">("resource_aware");
  const { isAutoPlaying, pauseAutoPlay } = useInactivityResume(true, 30000);

  // Auto-cycle signals and extraction modes on 2.5s intervals until user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;

    const signals: ("temporal" | "cardinality" | "divergence")[] = ["temporal", "cardinality", "divergence"];
    const timer = setInterval(() => {
      setActiveSignal((prev) => {
        const nextIdx = (signals.indexOf(prev) + 1) % signals.length;
        return signals[nextIdx];
      });
      setExtractionMode((prev) => (prev === "connected" ? "resource_aware" : "connected"));
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleSignalSelect = (sig: "temporal" | "cardinality" | "divergence") => {
    pauseAutoPlay();
    setActiveSignal(sig);
  };

  const handleExtractionSelect = (mode: "connected" | "resource_aware") => {
    pauseAutoPlay();
    setExtractionMode(mode);
  };

  return (
    <section className="totem-theater-surface py-20 sm:py-32 border-b border-[#232B36] totem-theater-grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 flex items-center gap-2">
            <span>DECOMPOSITION & SCALE</span>
            {isAutoPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-mono px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                AUTO-CYCLING 2.5s
              </span>
            )}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            From log to process areas. From areas to executions.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed font-sans totem-measure mb-4">
            Industrial OCEL logs contain millions of events and dozens of object types. Attempting
            to view the entire log at once creates an unreadable hairball. TOTeM decomposes the
            log into coherent process areas using multi-signal heuristics.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Layers className="w-4 h-4" />
            <span>Three-Tier Hierarchy: Event Log → Process Areas → Process Executions</span>
          </div>
        </div>

        {/* Multi-Level Architecture Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: Layered Vector Diagram */}
          <div className="lg:col-span-7 bg-[#14181F] rounded-xl border border-[#232B36] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#232B36] text-xs font-mono">
              <span className="text-slate-400">Hierarchical Level Graph</span>
              <span className="text-amber-400">TOTeM Level Decomposition</span>
            </div>

            {/* SVG Visualizing Tiered Graph */}
            <svg
              viewBox="0 0 600 280"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Layered Process Area Diagram showing upper resource tier and lower business object tiers"
            >
              {/* Layer 2: Upper Resource Layer */}
              <rect
                x="40"
                y="30"
                width="520"
                height="80"
                rx="8"
                fill="#1E2633"
                stroke={activeSignal === "temporal" ? "#F59E0B" : "#334155"}
                strokeWidth={activeSignal === "temporal" ? "2" : "1"}
              />
              <text x="60" y="55" fill="#F59E0B" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">
                LEVEL 2 · SHARED RESOURCES (Worker, Machine, Carrier)
              </text>
              <g transform="translate(60, 68)">
                <rect x="0" y="0" width="100" height="26" rx="4" fill="#D97706" fillOpacity="0.2" stroke="#D97706" />
                <text x="50" y="17" textAnchor="middle" fill="#FDE68A" fontSize="10" fontFamily="JetBrains Mono">
                  Worker
                </text>

                <rect x="115" y="0" width="100" height="26" rx="4" fill="#D97706" fillOpacity="0.2" stroke="#D97706" />
                <text x="165" y="17" textAnchor="middle" fill="#FDE68A" fontSize="10" fontFamily="JetBrains Mono">
                  Equipment
                </text>
              </g>

              {/* Connecting interaction arrows between layers */}
              <path
                d="M 160 110 L 160 160 M 340 110 L 340 160"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Layer 1: Lower Business Object Layer */}
              <rect
                x="40"
                y="160"
                width="520"
                height="90"
                rx="8"
                fill="#161C26"
                stroke={activeSignal === "cardinality" ? "#38BDF8" : activeSignal === "divergence" ? "#C084FC" : "#334155"}
                strokeWidth={activeSignal !== "temporal" ? "2" : "1"}
              />
              <text x="60" y="185" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">
                LEVEL 1 · BUSINESS OBJECTS (Order, Item, Package)
              </text>
              <g transform="translate(60, 200)">
                <rect x="0" y="0" width="90" height="28" rx="4" fill="#2563EB" fillOpacity="0.25" stroke="#2563EB" />
                <text x="45" y="18" textAnchor="middle" fill="#93C5FD" fontSize="11" fontFamily="JetBrains Mono">
                  Order
                </text>

                <rect x="105" y="0" width="90" height="28" rx="4" fill="#8B5CF6" fillOpacity="0.25" stroke="#8B5CF6" />
                <text x="150" y="18" textAnchor="middle" fill="#C4B5FD" fontSize="11" fontFamily="JetBrains Mono">
                  Item
                </text>

                <rect x="210" y="0" width="90" height="28" rx="4" fill="#0D9488" fillOpacity="0.25" stroke="#0D9488" />
                <text x="255" y="18" textAnchor="middle" fill="#99F6E4" fontSize="11" fontFamily="JetBrains Mono">
                  Package
                </text>
              </g>
            </svg>

            {/* Signal Toggle Buttons */}
            <div className="mt-4 pt-4 border-t border-[#232B36] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-1">Heuristic Signals:</span>
              <button
                type="button"
                onClick={() => handleSignalSelect("temporal")}
                className={`relative px-3 py-1 text-xs font-mono rounded transition cursor-pointer overflow-hidden ${
                  activeSignal === "temporal"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500 font-semibold"
                    : "bg-[#232B36] text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <span>Temporal duration</span>
                {activeSignal === "temporal" && isAutoPlaying && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-amber-400 animate-tab-progress" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSignalSelect("cardinality")}
                className={`relative px-3 py-1 text-xs font-mono rounded transition cursor-pointer overflow-hidden ${
                  activeSignal === "cardinality"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500 font-semibold"
                    : "bg-[#232B36] text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <span>Cardinality divergence</span>
                {activeSignal === "cardinality" && isAutoPlaying && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-sky-400 animate-tab-progress" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSignalSelect("divergence")}
                className={`relative px-3 py-1 text-xs font-mono rounded transition cursor-pointer overflow-hidden ${
                  activeSignal === "divergence"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500 font-semibold"
                    : "bg-[#232B36] text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <span>Graph divergence</span>
                {activeSignal === "divergence" && isAutoPlaying && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-purple-400 animate-tab-progress" />
                )}
              </button>
            </div>
          </div>

          {/* Right: Authentic Process Area Visualizer Screenshot */}
          <div className="lg:col-span-5">
            <ProductWindow
              title="Process Area Discovery"
              viewLabel="Analysis View"
              dark={true}
              viewportClassName="h-[280px] sm:h-[300px]"
              caption="Authentic view from TOTeM: clusters of related object types arranged in levels based on interaction frequencies."
              imageSrc={processAreaImg}
              imageAlt="Process Area discovery screenshot showing clustered object types"
            />
          </div>
        </div>

        {/* Resource-Aware Subsection */}
        <div className="pt-16 border-t border-[#232B36]">
          <div className="max-w-3xl mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
              EXECUTION EXTRACTION
            </p>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Shared resources should inform an execution—not swallow it.
            </h3>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans totem-measure">
              A worker, machine, or truck may participate in many executions. A naive connected-components
              view can therefore collapse unrelated work into one giant component. Resource-aware extraction
              lets business objects and activities define the execution while preserving the events that involve
              shared resources.
            </p>
          </div>

          {/* Interactive Resource-Aware Demo Card */}
          <div className="bg-[#14181F] rounded-xl border border-[#232B36] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232B36]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Extraction Strategy:</span>
                <div className="inline-flex rounded-lg border border-[#232B36] bg-[#0D1014] p-1">
                  <button
                    type="button"
                    onClick={() => handleExtractionSelect("connected")}
                    className={`relative px-3 py-1 text-xs font-mono rounded cursor-pointer transition overflow-hidden ${
                      extractionMode === "connected"
                        ? "bg-red-500 text-white font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    aria-pressed={extractionMode === "connected"}
                  >
                    <span>Connected components</span>
                    {extractionMode === "connected" && isAutoPlaying && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-white/80 animate-tab-progress" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExtractionSelect("resource_aware")}
                    className={`relative px-3 py-1 text-xs font-mono rounded cursor-pointer transition overflow-hidden ${
                      extractionMode === "resource_aware"
                        ? "bg-amber-500 text-black font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    aria-pressed={extractionMode === "resource_aware"}
                  >
                    <span>Resource-aware (TOTeM)</span>
                    {extractionMode === "resource_aware" && isAutoPlaying && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-black/80 animate-tab-progress" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Outcome:{" "}
                <span className="font-semibold text-white">
                  {extractionMode === "connected"
                    ? "The shared resource connects otherwise separate work."
                    : "Business objects define the executions; resource context remains visible."}
                </span>
              </div>
            </div>

            {/* Visual comparison of executions — Locked fixed height container */}
            <div className="pt-8 min-h-[170px] flex items-center justify-center">
              <div key={extractionMode} className="w-full tab-content-enter">
                {extractionMode === "connected" ? (
                  /* Connected Components: Everything collapsed into 1 massive execution */
                  <div className="p-6 rounded-lg border-2 border-dashed border-red-500/40 bg-red-950/20 text-center space-y-3">
                    <div className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider">
                      Single Giant Execution Detected (1 Component)
                    </div>
                    <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans">
                      Because Worker W-1 touches Order 1, Order 2, Order 3, and Order 4 across their respective
                      shifts, all orders are merged into one single 500-event execution. Variant analysis becomes
                      unusable.
                    </p>
                    <div className="font-mono text-xs text-red-400/90 font-semibold">
                      1 Giant Execution · Inability to isolate single customer order lifecycles
                    </div>
                  </div>
                ) : (
                  /* Resource-Aware: Clean separation into 4 distinct business executions */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        className="p-4 rounded-lg border border-amber-500/40 bg-amber-950/20 space-y-2 card-hover-lift"
                      >
                        <div className="flex items-center justify-between font-mono text-xs text-amber-400">
                          <span className="font-bold">Execution #{num}</span>
                          <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">
                            Order {num}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans">
                          Defined by commercial order and items. Worker W-1 events included as contextual
                          annotations without merging orders.
                        </p>
                        <div className="font-mono text-[11px] text-slate-400 pt-1 border-t border-amber-500/20">
                          ✓ Clean variant signature
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessAreaStory;
