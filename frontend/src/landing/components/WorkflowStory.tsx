import React, { useState } from "react";
import { WORKFLOW_STAGES } from "../content";
import { ProductWindow } from "./ProductWindow";

// Authentic preview assets from repository
import logStatsImg from "@/images/log-statistics-preview.png";
import variantsImg from "@/images/variants-preview.png";
import ocdfgImg from "@/images/ocdfg-preview.png";

export const WorkflowStory: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStage = WORKFLOW_STAGES[activeStageIndex];

  return (
    <section id="workflow" className="totem-section-target py-20 sm:py-32 border-b border-[#E4E4E7] bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
            ONE CONTINUOUS WORKBENCH
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            From event log to evidence.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            Import the log once. Move from orientation to discovery, modeling, conformance,
            and simulation without losing the project context or the relationships between objects.
          </p>
        </div>

        {/* Stage Selector Tabs (Sticky / Interactive on desktop and tablet) */}
        <div className="mb-10 flex overflow-x-auto pb-2 gap-2 border-b border-neutral-300/80 no-scrollbar">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;
            return (
              <button
                key={stage.number}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`px-4 py-2.5 rounded-lg text-left transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-white text-black shadow-xs border border-neutral-300 font-semibold"
                    : "text-neutral-500 hover:text-black hover:bg-black/5 border border-transparent font-medium"
                }`}
                aria-pressed={isSelected}
              >
                <div className="font-mono text-[11px] text-neutral-400">{stage.number}</div>
                <div className="text-xs font-sans whitespace-nowrap">{stage.tag}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Stage Visual & Detail Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Text & Step Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
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

              <p className="text-base text-neutral-600 leading-relaxed font-sans">
                {activeStage.copy}
              </p>

              {/* Supported formats for Step 1 */}
              {activeStage.supportedFormats && (
                <div className="pt-2">
                  <span className="font-mono text-xs text-neutral-500 block mb-2">
                    Verified supported formats:
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {activeStage.supportedFormats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2.5 py-1 bg-white border border-[#E4E4E7] rounded text-neutral-700 shadow-2xs"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Next/Prev Stepper */}
            <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Previous stage
              </button>
              <button
                type="button"
                disabled={activeStageIndex === WORKFLOW_STAGES.length - 1}
                onClick={() => setActiveStageIndex((prev) => Math.min(WORKFLOW_STAGES.length - 1, prev + 1))}
                className="text-xs font-mono px-3 py-1.5 rounded bg-black text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Next stage →
              </button>
            </div>
          </div>

          {/* Right: Authentic Product Visual or Accurate Vector Mockup */}
          <div className="lg:col-span-7">
            {activeStageIndex === 0 && (
              /* 01 Import: Authentic Log Statistics Screenshot & DuckDB Target */
              <ProductWindow
                title="Event Log Import & Validation"
                viewLabel="DuckDB Engine"
                caption="Incoming OCEL 2.0 formats (.sqlite, .json, .xml, .csv) are validated and converted into high-performance columnar DuckDB storage."
                imageSrc={logStatsImg}
                imageAlt="TOTeM Log Statistics preview showing events, objects, and timestamps"
              />
            )}

            {activeStageIndex === 1 && (
              /* 02 Orient: Multilevel profiling */
              <ProductWindow
                title="Process Profile & Global Filters"
                viewLabel="Multi-Level Overview"
                caption="Inspect time ranges, activity histograms, and object type distributions before isolating process boundaries."
              >
                <div className="p-6 bg-white space-y-4">
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
                  <div className="p-3 rounded border border-neutral-200 flex flex-wrap items-center gap-2 text-xs font-mono">
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
                caption="Replay concrete event units against the model. Inspect aggregate fitness and diagnose stopping points."
              >
                <div className="p-6 bg-white space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center font-mono">
                    <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900">
                      <div className="text-lg font-bold">142</div>
                      <div className="text-xs font-semibold">Fitting Units</div>
                      <div className="text-[10px] text-emerald-700 mt-1">Complete replay</div>
                    </div>
                    <div className="p-3 rounded bg-red-50 border border-red-300 text-red-900">
                      <div className="text-lg font-bold">12</div>
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
                    <span className="font-bold text-sm text-black">92.2% (Coverage: 1.0)</span>
                  </div>
                </div>
              </ProductWindow>
            )}

            {activeStageIndex === 5 && (
              /* 06 Simulate: Playout & Variant Export */
              <ProductWindow
                title="Playout Simulation Engine"
                viewLabel="Playout & Export"
                caption="Enumerate distinct executions under explicit object and activity bounds, canonicalize symmetries, and export OCEL 2.0 logs."
              >
                <div className="p-6 bg-white space-y-4">
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
    </section>
  );
};

export default WorkflowStory;
