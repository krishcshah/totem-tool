import React, { useState, useEffect, useRef, useCallback } from "react";
import { WORKFLOW_STAGES } from "../content";
import { ProductWindow } from "./ProductWindow";
import { useInactivityResume } from "../hooks/useInactivityResume";
import { AnimatedNumber } from "./AnimatedMetrics";

// Authentic preview assets from repository
import variantsImg from "@/images/variants-preview.png";
import ocdfgImg from "@/images/ocdfg-preview.png";

export const WorkflowStory: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const { isAutoPlaying, pauseAutoPlay } = useInactivityResume(true, 30000);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Update left and right scroll overflow indicators
  const updateScrollState = useCallback(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const hasOverflow = maxScrollLeft > 2;
    setCanScrollLeft(hasOverflow && el.scrollLeft > 6);
    setCanScrollRight(hasOverflow && el.scrollLeft < maxScrollLeft - 6);
  }, []);

  useEffect(() => {
    const el = tabsContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Keep active tab centered and fully inside mobile view as it auto-cycles or changes
  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeTab = tabRefs.current[activeStageIndex];
    if (!container || !activeTab) return;

    const containerWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    if (scrollWidth <= containerWidth) return;

    const tabLeft = activeTab.offsetLeft;
    const tabWidth = activeTab.clientWidth;
    const tabRight = tabLeft + tabWidth;
    const currentScroll = container.scrollLeft;

    // When looping back to first stage, scroll smoothly all the way to start
    if (activeStageIndex === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    // Edge margin so tab is never obscured by the blur effect or clipped by screen edge
    const edgeMargin = 56;
    const isClippedRight = tabRight > currentScroll + containerWidth - edgeMargin;
    const isClippedLeft = tabLeft < currentScroll + edgeMargin;

    if (isClippedRight || isClippedLeft) {
      const targetScroll = tabLeft - (containerWidth - tabWidth) / 2;
      const boundedScroll = Math.max(0, Math.min(targetScroll, scrollWidth - containerWidth));

      container.scrollTo({
        left: boundedScroll,
        behavior: "smooth",
      });
    }
  }, [activeStageIndex]);

  // Auto-circulate stages on 2.5-second intervals until user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleStageSelect = (idx: number) => {
    pauseAutoPlay();
    setActiveStageIndex(idx);
  };

  const handlePrev = () => {
    pauseAutoPlay();
    setActiveStageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    pauseAutoPlay();
    setActiveStageIndex((prev) => Math.min(WORKFLOW_STAGES.length - 1, prev + 1));
  };

  const activeStage = WORKFLOW_STAGES[activeStageIndex];

  return (
    <section id="workflow" className="totem-section-target pt-10 sm:pt-14 pb-20 sm:pb-32 border-b border-[#E4E4E7] bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3 flex items-center gap-2">
            <span>ONE CONTINUOUS WORKBENCH</span>
            {isAutoPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                AUTO-PLAYING 2.5s
              </span>
            )}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            From event log to evidence.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            Import the log once. Move from orientation to discovery, modeling, conformance,
            and simulation without losing the project context or the relationships between objects.
          </p>
        </div>

        {/* Stage Selector Tabs with smooth auto-scroll & frosted blur indicators */}
        <div className="relative mb-8">
          {/* Left blur / gradient fade overlay (reveals as tabs scroll right) */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-2 w-12 sm:w-16 z-10 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to right, #F7F7F2 20%, rgba(247, 247, 242, 0.85) 60%, transparent 100%)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Right blur / gradient fade overlay (suggests more content lies to the right) */}
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-2 w-14 sm:w-20 z-10 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to left, #F7F7F2 20%, rgba(247, 247, 242, 0.85) 60%, transparent 100%)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div
            ref={tabsContainerRef}
            className="flex overflow-x-auto pb-2 gap-2 border-b border-neutral-300/80 no-scrollbar scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {WORKFLOW_STAGES.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              return (
                <button
                  key={stage.number}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => handleStageSelect(idx)}
                  className={`relative px-4 py-2.5 rounded-lg text-left transition-all shrink-0 cursor-pointer overflow-hidden ${
                    isSelected
                      ? "bg-white text-black shadow-xs border border-neutral-300 font-semibold"
                      : "text-neutral-500 hover:text-black hover:bg-black/5 border border-transparent font-medium"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="font-mono text-[11px] text-neutral-400">{stage.number}</div>
                  <div className="text-xs font-sans whitespace-nowrap">{stage.tag}</div>

                  {/* Animated 2.5s progress bar on the active tab while auto-playing */}
                  {isSelected && isAutoPlaying && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 animate-tab-progress" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Stage Visual & Detail Row — Fixed height container to prevent layout jumping */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Fixed height layout */}
          <div className="lg:col-span-5 h-[420px] sm:h-[460px] flex flex-col justify-between bg-white/60 p-6 rounded-xl border border-neutral-200/80">
            <div key={activeStage.number} className="tab-content-enter flex-1 flex flex-col justify-start space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-black text-white rounded">
                  {activeStage.step}
                </span>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                  {activeStage.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0D0F] tracking-tight">
                {activeStage.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans line-clamp-4">
                {activeStage.copy}
              </p>

              {/* Supported formats for Step 1 */}
              {activeStage.supportedFormats && (
                <div className="pt-1">
                  <span className="font-mono text-xs text-neutral-500 block mb-2">
                    Verified supported formats:
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {activeStage.supportedFormats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 bg-white border border-[#E4E4E7] rounded text-neutral-700 shadow-2xs"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Next/Prev Stepper pinned at the bottom */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between mt-auto">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={handlePrev}
                className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-transform active:scale-95"
              >
                ← Previous stage
              </button>

              <div className="font-mono text-xs text-neutral-400">
                {activeStageIndex + 1} / {WORKFLOW_STAGES.length}
              </div>

              <button
                type="button"
                disabled={activeStageIndex === WORKFLOW_STAGES.length - 1}
                onClick={handleNext}
                className="text-xs font-mono px-3 py-1.5 rounded bg-black text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-transform active:scale-95"
              >
                Next stage →
              </button>
            </div>
          </div>

          {/* Right Column: Fixed height ProductWindow */}
          <div className="lg:col-span-7 h-[420px] sm:h-[460px] flex flex-col">
            <div key={activeStageIndex} className="tab-content-enter h-full">
              {activeStageIndex === 0 && (
                /* 01 Import: Authentic Ingestion & Schema Inspector */
                <ProductWindow
                  title="Event Log Import & Validation"
                  viewLabel="DuckDB Columnar Ingestion"
                  viewportClassName="h-[320px] sm:h-[360px]"
                  caption="Incoming OCEL 2.0 formats (.sqlite, .json, .xml, .csv) are validated and converted into high-performance columnar DuckDB storage."
                >
                  <div className="h-full p-4 sm:p-5 bg-white flex flex-col justify-between font-mono">
                    {/* File ingestion status */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold text-neutral-800">order_lifecycle.jsonocel</span>
                        <span className="text-neutral-400 text-[11px]">(4.8 MB)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                        ✓ Schema Validated
                      </span>
                    </div>

                    {/* Columnar preview table */}
                    <div className="my-2 flex-1 overflow-hidden border border-neutral-200 rounded text-[11px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                            <th className="py-1.5 px-2.5 font-semibold">event_id</th>
                            <th className="py-1.5 px-2.5 font-semibold">activity</th>
                            <th className="py-1.5 px-2.5 font-semibold">time</th>
                            <th className="py-1.5 px-2.5 font-semibold">order_id</th>
                            <th className="py-1.5 px-2.5 font-semibold">items</th>
                            <th className="py-1.5 px-2.5 font-semibold">resource</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-neutral-700">
                          <tr className="hover:bg-neutral-50/60">
                            <td className="py-1.5 px-2.5 text-blue-600 font-semibold">evt_001</td>
                            <td className="py-1.5 px-2.5">Create Order</td>
                            <td className="py-1.5 px-2.5 text-neutral-400">10:14:02</td>
                            <td className="py-1.5 px-2.5 font-semibold text-blue-700">ord_8491</td>
                            <td className="py-1.5 px-2.5 text-purple-700">[i_01, i_02]</td>
                            <td className="py-1.5 px-2.5 text-neutral-400">—</td>
                          </tr>
                          <tr className="hover:bg-neutral-50/60">
                            <td className="py-1.5 px-2.5 text-blue-600 font-semibold">evt_002</td>
                            <td className="py-1.5 px-2.5">Pick Items</td>
                            <td className="py-1.5 px-2.5 text-neutral-400">10:22:15</td>
                            <td className="py-1.5 px-2.5 font-semibold text-blue-700">ord_8491</td>
                            <td className="py-1.5 px-2.5 text-purple-700">[i_01, i_02]</td>
                            <td className="py-1.5 px-2.5 text-amber-700 font-semibold">W-14</td>
                          </tr>
                          <tr className="hover:bg-neutral-50/60">
                            <td className="py-1.5 px-2.5 text-blue-600 font-semibold">evt_003</td>
                            <td className="py-1.5 px-2.5">Quality Check</td>
                            <td className="py-1.5 px-2.5 text-neutral-400">10:35:40</td>
                            <td className="py-1.5 px-2.5 text-neutral-400">—</td>
                            <td className="py-1.5 px-2.5 text-purple-700">[i_01, i_02]</td>
                            <td className="py-1.5 px-2.5 text-amber-700 font-semibold">W-14</td>
                          </tr>
                          <tr className="hover:bg-neutral-50/60">
                            <td className="py-1.5 px-2.5 text-blue-600 font-semibold">evt_004</td>
                            <td className="py-1.5 px-2.5">Pack & Label</td>
                            <td className="py-1.5 px-2.5 text-neutral-400">10:48:10</td>
                            <td className="py-1.5 px-2.5 font-semibold text-blue-700">ord_8491</td>
                            <td className="py-1.5 px-2.5 text-purple-700">[i_01, i_02]</td>
                            <td className="py-1.5 px-2.5 text-teal-700 font-semibold">pkg_99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* DuckDB Ingestion metric */}
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span>duckdb://embedded_tables</span>
                      </div>
                      <span className="text-emerald-700 font-semibold">42,190 events ingested in 84ms</span>
                    </div>
                  </div>
                </ProductWindow>
              )}

              {activeStageIndex === 1 && (
                /* 02 Orient: Multilevel profiling */
                <ProductWindow
                  title="Process Profile & Global Filters"
                  viewLabel="Multi-Level Overview"
                  viewportClassName="h-[320px] sm:h-[360px]"
                  caption="Inspect time ranges, activity histograms, and object type distributions before isolating process boundaries."
                >
                  <div className="h-full p-6 bg-white flex flex-col justify-center space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
                        <div className="text-[11px] font-mono text-neutral-500">Events</div>
                        <div className="text-xl font-bold font-mono text-black">42,190</div>
                      </div>
                      <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
                        <div className="text-[11px] font-mono text-neutral-500">Objects</div>
                        <div className="text-xl font-bold font-mono text-black">9,412</div>
                      </div>
                      <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
                        <div className="text-[11px] font-mono text-neutral-500">Object Types</div>
                        <div className="text-xl font-bold font-mono text-blue-600">4 Types</div>
                      </div>
                      <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
                        <div className="text-[11px] font-mono text-neutral-500">Activities</div>
                        <div className="text-xl font-bold font-mono text-purple-600">12 Distinct</div>
                      </div>
                    </div>
                    {/* Filter chips representation */}
                    <div className="p-3 rounded border border-neutral-200 flex flex-wrap items-center gap-2 text-xs font-mono bg-neutral-50/50">
                      <span className="text-neutral-400">Global Filters:</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                        Types: order, item, package
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                        Activities: all
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300">
                        Time: 2026-Q1
                      </span>
                    </div>
                  </div>
                </ProductWindow>
              )}

              {activeStageIndex === 2 && (
                /* 03 Discover: Authentic Variants & OC-DFG */
                <ProductWindow
                  title="Variants Explorer & Execution Extraction"
                  viewLabel="Discovery"
                  viewportClassName="h-[320px] sm:h-[360px]"
                  caption="Analyze chevron execution patterns, variant support counts, and discover typed causal dependencies."
                  imageSrc={variantsImg}
                  imageAlt="Variants Explorer chevron diagrams across object type lanes"
                />
              )}

              {activeStageIndex === 3 && (
                /* 04 Shape: Model Editor & Layout */
                <ProductWindow
                  title="Visual Model Editor"
                  viewLabel="OC-DFG & OCCN"
                  viewportClassName="h-[320px] sm:h-[360px]"
                  caption="Author and refine object-centric process models with automatic ELK layout, typed connections, undo/redo, and JSON exchange."
                  imageSrc={ocdfgImg}
                  imageAlt="Object-Centric Directly Follows Graph with typed arcs and start/end nodes"
                />
              )}

              {activeStageIndex === 4 && (
                /* 05 Check: Conformance replay states */
                <ProductWindow
                  title="Conformance Checking & Replay Diagnostics"
                  viewLabel="OCCN / TOTeM Conformance"
                  viewportClassName="h-[320px] sm:h-[360px]"
                  caption="Replay concrete event units against the model. Inspect aggregate fitness and diagnose stopping points."
                >
                  <div className="h-full p-6 bg-white flex flex-col justify-center space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center font-mono">
                      <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900">
                        <div className="text-lg font-bold">
                          <AnimatedNumber value={142} />
                        </div>
                        <div className="text-xs font-semibold">Fitting Units</div>
                        <div className="text-[10px] text-emerald-700 mt-1">Complete replay</div>
                      </div>
                      <div className="p-3 rounded bg-red-50 border border-red-300 text-red-900">
                        <div className="text-lg font-bold">
                          <AnimatedNumber value={12} />
                        </div>
                        <div className="text-xs font-semibold">Non-Fitting</div>
                        <div className="text-[10px] text-red-700 mt-1">Deviations proven</div>
                      </div>
                      <div className="p-3 rounded bg-amber-50 border border-amber-300 text-amber-900">
                        <div className="text-lg font-bold">0</div>
                        <div className="text-xs font-semibold">Inconclusive</div>
                        <div className="text-[10px] text-amber-700 mt-1">Search bounded</div>
                      </div>
                    </div>
                    <div className="p-3 rounded border border-neutral-200 bg-neutral-50 text-xs font-mono flex items-center justify-between">
                      <span>Overall Replay Fitness:</span>
                      <span className="font-bold text-sm text-black">
                        <AnimatedNumber value={92.2} decimals={1} suffix="%" /> (Coverage: 1.0)
                      </span>
                    </div>
                  </div>
                </ProductWindow>
              )}

              {activeStageIndex === 5 && (
                /* 06 Simulate: Playout & Variant Export */
                <ProductWindow
                  title="Playout Simulation Engine"
                  viewLabel="Playout & Export"
                  viewportClassName="h-[320px] sm:h-[360px]"
                  caption="Enumerate distinct executions under explicit object and activity bounds, canonicalize symmetries, and export OCEL 2.0 logs."
                >
                  <div className="h-full p-6 bg-white flex flex-col justify-center space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="font-mono text-xs text-neutral-600">
                        Playout State Space: <span className="font-bold text-black">Exhaustive</span>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Bounds: 2 Orders, 4 Items
                      </span>
                    </div>
                    <div className="p-3 rounded bg-neutral-50 border border-neutral-200 font-mono text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Unique canonical variants:</span>
                        <span className="font-bold text-black">18 variants</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">States explored:</span>
                        <span className="text-neutral-800">1,240 states</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Elapsed time:</span>
                        <span className="text-neutral-800">84 ms</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 text-center py-2 px-3 border border-neutral-300 rounded font-mono text-xs bg-white text-neutral-700">
                        Export OCEL 2.0 (JSON)
                      </div>
                      <div className="flex-1 text-center py-2 px-3 border border-neutral-300 rounded font-mono text-xs bg-white text-neutral-700">
                        Export Variants JSON
                      </div>
                    </div>
                  </div>
                </ProductWindow>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowStory;
