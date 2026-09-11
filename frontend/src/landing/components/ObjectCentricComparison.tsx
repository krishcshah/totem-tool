import React, { useState, useEffect } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

export const ObjectCentricComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<"flattened" | "object_centric">("object_centric");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-flip perspective every 2.5 seconds until user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setViewMode((prev) => (prev === "flattened" ? "object_centric" : "flattened"));
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleModeSelect = (mode: "flattened" | "object_centric") => {
    setIsAutoPlaying(false);
    setViewMode(mode);
  };

  return (
    <section id="why" className="totem-section-target py-20 sm:py-28 border-b border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3 flex items-center gap-2">
            <span>REAL PROCESSES ARE RELATIONAL</span>
            {isAutoPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 font-mono px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                AUTO-CYCLING 2.5s
              </span>
            )}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            An order is not a case. It is a network.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure mb-4">
            Orders meet items. Items become packages. Workers, machines, documents, and vehicles
            can touch many executions at once. Flattening that system into one arbitrary case ID
            hides the relationships that make the process understandable.
          </p>
          <p className="text-base font-semibold text-[#0B0D0F]">
            Keep the connections. Lose the distortion.
          </p>
        </div>

        {/* Interactive Comparison Component */}
        <div className="rounded-2xl border border-[#E4E4E7] bg-[#F7F7F2] p-4 sm:p-8 shadow-xs">
          {/* Controls toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E4E7]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-medium text-neutral-500 mr-2">
                Perspective:
              </span>
              <div
                className="inline-flex rounded-lg border border-[#E4E4E7] bg-white p-1 shadow-2xs relative"
                role="group"
                aria-label="Process representation perspective"
              >
                <button
                  type="button"
                  onClick={() => handleModeSelect("flattened")}
                  className={`relative px-3.5 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer overflow-hidden ${
                    viewMode === "flattened"
                      ? "bg-red-500 text-white font-semibold shadow-2xs"
                      : "text-neutral-600 hover:text-black hover:bg-neutral-100"
                  }`}
                  aria-pressed={viewMode === "flattened"}
                >
                  <span>Flattened case view</span>
                  {viewMode === "flattened" && isAutoPlaying && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-white/80 animate-tab-progress" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSelect("object_centric")}
                  className={`relative px-3.5 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer overflow-hidden ${
                    viewMode === "object_centric"
                      ? "bg-blue-600 text-white font-semibold shadow-2xs"
                      : "text-neutral-600 hover:text-black hover:bg-neutral-100"
                  }`}
                  aria-pressed={viewMode === "object_centric"}
                >
                  <span>Object-centric view (TOTeM)</span>
                  {viewMode === "object_centric" && isAutoPlaying && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-white/80 animate-tab-progress" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="inline-block w-2 h-2 rounded-full bg-neutral-400" />
              <span>Interactive comparison</span>
            </div>
          </div>

          {/* Graphical Demonstration Surface — Fixed height containers to prevent vertical shift */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            {/* Left/Main Visual Diagram: Fixed 340px height */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-[#E4E4E7] p-6 shadow-2xs overflow-hidden h-[340px] flex items-center justify-center">
              <div key={viewMode} className="w-full h-full flex items-center justify-center tab-content-enter">
                {viewMode === "flattened" ? (
                  /* Flattened View: Single artificial lane, duplicated events, merged worker confusion */
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full max-w-lg">
                      {/* Single Forced Case Lane */}
                      <div className="relative border-2 border-dashed border-red-300 rounded-lg p-4 bg-red-50/40">
                        <div className="flex items-center justify-between text-xs font-mono text-red-700 font-semibold mb-3">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            Forced Case ID: #Order-8491
                          </span>
                          <span className="text-[11px] bg-red-100 px-2 py-0.5 rounded text-red-800">
                            Items & Package swallowed
                          </span>
                        </div>

                        {/* Overlapping sequential line with duplicates */}
                        <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-24 px-2 py-2 text-center rounded bg-white border border-red-300 shadow-xs text-xs font-medium">
                              Create Order
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400 mt-1">1x</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-red-400 shrink-0" />
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-24 px-2 py-2 text-center rounded bg-white border border-red-300 shadow-xs text-xs font-medium">
                              Pick Item (1)
                            </div>
                            <span className="text-[10px] font-mono text-red-500 font-semibold mt-1">
                              duplicated
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-red-400 shrink-0" />
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-24 px-2 py-2 text-center rounded bg-white border border-red-300 shadow-xs text-xs font-medium">
                              Pick Item (2)
                            </div>
                            <span className="text-[10px] font-mono text-red-500 font-semibold mt-1">
                              duplicated
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-red-400 shrink-0" />
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-24 px-2 py-2 text-center rounded bg-white border border-red-300 shadow-xs text-xs font-medium">
                              Deliver
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400 mt-1">Order view</span>
                          </div>
                        </div>

                        {/* False connection to unrelated order through shared worker */}
                        <div className="mt-4 pt-3 border-t border-red-200 flex items-center justify-between text-xs text-red-600 font-mono">
                          <span>Worker W-14 shared across orders:</span>
                          <span className="bg-red-200/70 text-red-900 px-2 py-0.5 rounded font-semibold text-[10px]">
                            Unrelated orders artificially entangled
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Object-Centric View: Preserved multi-object lifecycles */
                  <div className="w-full flex flex-col gap-3">
                    {/* Order lifecycle lane */}
                    <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-3">
                      <span className="w-20 font-mono text-xs font-bold text-blue-700 shrink-0">
                        Order:
                      </span>
                      <div className="flex items-center gap-2 flex-1 text-xs">
                        <span className="px-2.5 py-1 bg-white border border-blue-300 rounded shadow-2xs font-medium">
                          Create Order
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                        <span className="px-2.5 py-1 bg-white border border-blue-300 rounded shadow-2xs font-medium text-neutral-500">
                          (awaits items)
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                        <span className="px-2.5 py-1 bg-white border border-blue-300 rounded shadow-2xs font-medium">
                          Complete Order
                        </span>
                      </div>
                    </div>

                    {/* Items lifecycle lane */}
                    <div className="flex items-center gap-3 bg-purple-50/50 border border-purple-200 rounded-lg p-3">
                      <span className="w-20 font-mono text-xs font-bold text-purple-700 shrink-0">
                        Item (x2):
                      </span>
                      <div className="flex items-center gap-2 flex-1 text-xs">
                        <span className="px-2.5 py-1 bg-white border border-purple-300 rounded shadow-2xs font-medium">
                          Pick Item (parallel)
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                        <span className="px-2.5 py-1 bg-white border border-purple-300 rounded shadow-2xs font-medium">
                          Quality Inspection
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                        <span className="px-2.5 py-1 bg-white border border-purple-300 rounded shadow-2xs font-medium">
                          Pack into Box
                        </span>
                      </div>
                    </div>

                    {/* Package & Resource synchronization */}
                    <div className="flex items-center gap-3 bg-teal-50/50 border border-teal-200 rounded-lg p-3">
                      <span className="w-20 font-mono text-xs font-bold text-teal-700 shrink-0">
                        Package:
                      </span>
                      <div className="flex items-center gap-2 flex-1 text-xs">
                        <span className="px-2.5 py-1 bg-white border border-teal-300 rounded shadow-2xs font-medium">
                          Assemble Box
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                        <span className="px-2.5 py-1 bg-white border border-teal-300 rounded shadow-2xs font-medium">
                          Attach Label
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                        <span className="px-2.5 py-1 bg-white border border-teal-300 rounded shadow-2xs font-medium">
                          Carrier Handover
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Explanation Column: Fixed 340px height */}
            <div className="lg:col-span-4 h-[340px] flex flex-col justify-center space-y-4">
              <div key={viewMode} className="tab-content-enter space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0B0D0F]">
                  {viewMode === "flattened" ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span>The Flattening Penalty</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-blue-600" />
                      <span>The Object-Centric Advantage</span>
                    </>
                  )}
                </div>

                {viewMode === "flattened" ? (
                  <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600 font-mono">•</span>
                      <span><strong>Deficiency:</strong> Real-world objects (Item, Package) lose identity inside an Order case.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600 font-mono">•</span>
                      <span><strong>Convergence / Divergence:</strong> Events repeated artificially, distorting frequency and throughput metrics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-red-600 font-mono">•</span>
                      <span><strong>False Correlations:</strong> Independent executions become entangled through shared resources.</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 font-mono">•</span>
                      <span><strong>True 1:n and n:m Cardinalities:</strong> One order contains many items; multiple items consolidate into packages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 font-mono">•</span>
                      <span><strong>Shared Resources Visible:</strong> Workers and vehicles interact with executions without distorting boundaries.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 font-mono">•</span>
                      <span><strong>No Artificial Repetition:</strong> Each real event occurs exactly once in the graph representation.</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectCentricComparison;
