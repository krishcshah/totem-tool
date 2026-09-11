import React from "react";
import { Database, FileCode, CheckCircle2 } from "lucide-react";
import { ProductWindow } from "./ProductWindow";

// Authentic previews
import variantsImg from "@/images/variants-preview.png";

export const WorkbenchMosaic: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 border-b border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
            COMPOSE THE ANALYSIS
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            Build the analysis surface the question deserves.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            TOTeM combines dedicated analysis views with project-scoped dashboards. Arrange
            statistics, variants, process areas, models, dotted charts, SQL results, text,
            images, and charts into reusable layouts.
          </p>
        </div>

        {/* Bento Grid Workbench Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 items-stretch">
          {/* Card 1: Variants Explorer Preview (Span 7) */}
          <div className="md:col-span-7 flex flex-col h-full">
            <ProductWindow
              title="Variants Explorer"
              viewLabel="GridStack Widget"
              imageSrc={variantsImg}
              imageAlt="Variants Explorer widget inside dashboard"
              caption="Drag-and-drop variant explorer with automatic frequency sorting and chevron representations."
              className="h-full flex flex-col"
              viewportClassName="h-[280px] sm:h-[320px]"
            />
          </div>

          {/* Card 2: Log Statistics Widget (Span 5) */}
          <div className="md:col-span-5 flex flex-col h-full">
            <ProductWindow
              title="Log Statistics"
              viewLabel="GridStack Widget"
              caption="Event, object, activity, and duration counts updated instantaneously with global filters."
              className="h-full flex flex-col"
              viewportClassName="h-[280px] sm:h-[320px]"
            >
              <div className="h-full p-4 bg-white flex flex-col justify-between font-mono">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
                    <div className="text-[10px] text-neutral-400">EVENTS</div>
                    <div className="text-lg font-bold text-black">42,190</div>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
                    <div className="text-[10px] text-neutral-400">OBJECTS</div>
                    <div className="text-lg font-bold text-black">9,412</div>
                  </div>
                </div>

                <div className="space-y-2 py-2">
                  <div className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Object Type Distribution
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-blue-700 font-medium">Order (4.2k)</span>
                        <span className="text-neutral-400 text-[10px]">44.6%</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: "45%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-purple-700 font-medium">Item (12.8k)</span>
                        <span className="text-neutral-400 text-[10px]">42.1%</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-teal-700 font-medium">Package (3.9k)</span>
                        <span className="text-neutral-400 text-[10px]">13.3%</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-teal-600 h-full rounded-full" style={{ width: "13%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
                  <span>DuckDB Columnar Stats</span>
                  <span className="text-emerald-600 font-semibold">Live in View</span>
                </div>
              </div>
            </ProductWindow>
          </div>

          {/* Card 3: DuckDB Sandboxed SQL Editor (Span 8) */}
          <div className="md:col-span-8 rounded-xl border border-[#E4E4E7] bg-[#F7F7F2] p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  <span className="font-mono text-xs font-bold text-black">
                    DuckDB SQL Editor Widget
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  SELECT-only · sandboxed
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0B0D0F] mb-1.5">
                  Visual first. SQL when you need it.
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  Explore the DuckDB-backed OCEL tables with a schema browser and sandboxed
                  SELECT-only queries, then place the result directly into a dashboard.
                </p>
              </div>

              {/* Sample SQL Code Box */}
              <div className="rounded-lg bg-[#0D1014] text-slate-200 p-3.5 font-mono text-xs overflow-x-auto">
                <div className="text-purple-400">SELECT</div>
                <div className="pl-4">
                  activity, count(*) AS event_count, count(DISTINCT object_id) AS objects
                </div>
                <div className="text-purple-400">FROM</div>
                <div className="pl-4">events JOIN event_object USING (event_id)</div>
                <div className="text-purple-400">GROUP BY</div>
                <div className="pl-4">activity ORDER BY event_count DESC LIMIT 5;</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Interactive table browser (events, objects, event_object, o2o)</span>
              <span className="text-emerald-700 font-semibold">Live in dashboard</span>
            </div>
          </div>

          {/* Card 4: Model Reusability / Project Assets (Span 4) */}
          <div className="md:col-span-4 rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-black pb-3 border-b border-neutral-100">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>Project Model Assets</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0B0D0F] mb-1.5">
                  Discover once. Reuse throughout the project.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                  Save validated models as project assets, reopen them in supported editors,
                  use them in conformance or playout workflows, and keep the analysis tied to
                  the active event-log project.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-mono text-neutral-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Canonical TOTeM JSON (v1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Canonical OCCN JSON (v1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>OCPN exchange format</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-400">
              Preserves layouts and custom annotations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkbenchMosaic;
