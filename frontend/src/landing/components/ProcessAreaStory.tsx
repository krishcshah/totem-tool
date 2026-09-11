import React, { useState } from "react";
import { ProductWindow } from "./ProductWindow";
import { Layers } from "lucide-react";
import processAreaImg from "@/images/process-area-preview.png";

export const ProcessAreaStory: React.FC = () => {
  // Process area signal focus
  const [activeSignal, setActiveSignal] = useState<"temporal" | "cardinality" | "divergence">("temporal");

  // Resource-aware demo mode
  const [extractionMode, setExtractionMode] = useState<"connected" | "resource_aware">("resource_aware");

  return (
    <section className="py-24 sm:py-32 bg-[#0D1014] text-slate-100 border-b border-[#232B36] relative overflow-hidden">
      {/* Background theater grid pattern */}
      <div className="absolute inset-0 totem-theater-grid-bg pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
            FIND THE BOUNDARY
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            Find the process boundary before you count the variants.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed font-sans totem-measure">
            Process Areas group object types by process perspective and arrange them in layers,
            placing resources above the objects they serve. Temporal, cardinality, and divergence
            signals help reveal that hierarchy.
          </p>
        </div>

        {/* Layered Process Area Diagram & Signals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Left: Layered Vector Diagram */}
          <div className="lg:col-span-7 bg-[#14181F] rounded-xl border border-[#232B36] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#232B36] text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Multi-Level Process Hierarchy
              </span>
              <span className="text-[11px] text-slate-500">Illustrative visualization</span>
            </div>

            {/* Visual SVG showing multi-tier layers */}
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
                stroke={activeSignal === "cardinality" ? "#38BDF8" : "#334155"}
                strokeWidth={activeSignal === "cardinality" ? "2" : "1"}
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
                onClick={() => setActiveSignal("temporal")}
                className={`px-3 py-1 text-xs font-mono rounded transition cursor-pointer ${
                  activeSignal === "temporal"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500 font-semibold"
                    : "bg-[#232B36] text-slate-400 hover:text-white"
                }`}
              >
                Temporal duration
              </button>
              <button
                type="button"
                onClick={() => setActiveSignal("cardinality")}
                className={`px-3 py-1 text-xs font-mono rounded transition cursor-pointer ${
                  activeSignal === "cardinality"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500 font-semibold"
                    : "bg-[#232B36] text-slate-400 hover:text-white"
                }`}
              >
                Cardinality divergence
              </button>
              <button
                type="button"
                onClick={() => setActiveSignal("divergence")}
                className={`px-3 py-1 text-xs font-mono rounded transition cursor-pointer ${
                  activeSignal === "divergence"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500 font-semibold"
                    : "bg-[#232B36] text-slate-400 hover:text-white"
                }`}
              >
                Graph divergence
              </button>
            </div>
          </div>

          {/* Right: Authentic Process Area Visualizer Screenshot */}
          <div className="lg:col-span-5">
            <ProductWindow
              title="Process Area Discovery"
              viewLabel="Analysis View"
              dark={true}
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
                    onClick={() => setExtractionMode("connected")}
                    className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition ${
                      extractionMode === "connected"
                        ? "bg-red-500 text-white font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    aria-pressed={extractionMode === "connected"}
                  >
                    Connected components
                  </button>
                  <button
                    type="button"
                    onClick={() => setExtractionMode("resource_aware")}
                    className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition ${
                      extractionMode === "resource_aware"
                        ? "bg-amber-500 text-black font-semibold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    aria-pressed={extractionMode === "resource_aware"}
                  >
                    Resource-aware (TOTeM)
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

            {/* Visual comparison of executions */}
            <div className="pt-8">
              {extractionMode === "connected" ? (
                /* Connected Components: Everything collapsed into 1 massive execution */
                <div className="p-6 rounded-lg border-2 border-dashed border-red-500/40 bg-red-950/20 text-center space-y-3 animate-in fade-in duration-300">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="p-4 rounded-lg border border-amber-500/40 bg-amber-950/20 space-y-2"
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
    </section>
  );
};

export default ProcessAreaStory;
