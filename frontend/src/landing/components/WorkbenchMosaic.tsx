import React, { useState } from "react";
import { Database, FileCode, CheckCircle2, Play, Copy, Check } from "lucide-react";
import { ProductWindow } from "./ProductWindow";
import { AnimatedNumber, AnimatedProgressBar } from "./AnimatedMetrics";

// Authentic previews
import variantsImg from "@/images/variants-preview.png";

export const WorkbenchMosaic: React.FC = () => {
  const [sqlView, setSqlView] = useState<"sql" | "results">("sql");
  const [copiedSql, setCopiedSql] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const sampleSql = `SELECT activity, count(*) AS event_count, count(DISTINCT object_id) AS objects
FROM events JOIN event_object USING (event_id)
GROUP BY activity ORDER BY event_count DESC LIMIT 5;`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setSqlView("results");
    }, 280);
  };

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
                    <div className="text-lg font-bold text-black">
                      <AnimatedNumber value={42190} />
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
                    <div className="text-[10px] text-neutral-400">OBJECTS</div>
                    <div className="text-lg font-bold text-black">
                      <AnimatedNumber value={9412} />
                    </div>
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
                        <span className="text-neutral-400 text-[10px]">
                          <AnimatedNumber value={44.6} decimals={1} suffix="%" />
                        </span>
                      </div>
                      <AnimatedProgressBar percentage={45} barClassName="bg-blue-600 h-full rounded-full" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-purple-700 font-medium">Item (12.8k)</span>
                        <span className="text-neutral-400 text-[10px]">
                          <AnimatedNumber value={42.1} decimals={1} suffix="%" />
                        </span>
                      </div>
                      <AnimatedProgressBar percentage={42} barClassName="bg-purple-600 h-full rounded-full" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-teal-700 font-medium">Package (3.9k)</span>
                        <span className="text-neutral-400 text-[10px]">
                          <AnimatedNumber value={13.3} decimals={1} suffix="%" />
                        </span>
                      </div>
                      <AnimatedProgressBar percentage={13} barClassName="bg-teal-600 h-full rounded-full" />
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
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E4E4E7]">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  <span className="font-mono text-xs font-bold text-black">
                    DuckDB SQL Editor Widget
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-md border border-neutral-300 bg-white p-0.5 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setSqlView("sql")}
                      className={`px-2.5 py-0.5 rounded transition ${
                        sqlView === "sql"
                          ? "bg-purple-600 text-white font-semibold shadow-2xs"
                          : "text-neutral-600 hover:text-black"
                      }`}
                    >
                      SQL Query
                    </button>
                    <button
                      type="button"
                      onClick={() => setSqlView("results")}
                      className={`px-2.5 py-0.5 rounded transition ${
                        sqlView === "results"
                          ? "bg-purple-600 text-white font-semibold shadow-2xs"
                          : "text-neutral-600 hover:text-black"
                      }`}
                    >
                      Results (5 rows)
                    </button>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    SELECT-only · sandboxed
                  </span>
                </div>
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

              {/* Sample SQL Code Box vs Results Table */}
              {sqlView === "sql" ? (
                <div className="relative rounded-lg bg-[#0D1014] text-slate-200 p-3.5 font-mono text-xs overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[11px]">
                    <span className="text-slate-400">query.sql</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopySql}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
                        title="Copy SQL"
                      >
                        {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedSql ? "Copied" : "Copy"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRunQuery}
                        disabled={isRunning}
                        className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1 text-[10px] transition cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{isRunning ? "Running..." : "Run"}</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-purple-400">SELECT</div>
                  <div className="pl-4">
                    activity, count(*) AS event_count, count(DISTINCT object_id) AS objects
                  </div>
                  <div className="text-purple-400">FROM</div>
                  <div className="pl-4">events JOIN event_object USING (event_id)</div>
                  <div className="text-purple-400">GROUP BY</div>
                  <div className="pl-4">activity ORDER BY event_count DESC LIMIT 5;</div>
                </div>
              ) : (
                <div className="rounded-lg bg-white border border-neutral-200 overflow-hidden shadow-2xs font-mono text-[11px]">
                  <div className="px-3 py-1.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-neutral-600">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      ⚡ Executed in 4.2ms · 5 rows returned
                    </span>
                    <button
                      type="button"
                      onClick={() => setSqlView("sql")}
                      className="text-[10px] text-neutral-500 hover:text-black underline cursor-pointer"
                    >
                      View SQL
                    </button>
                  </div>
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-100/70 text-neutral-700 border-b border-neutral-200">
                          <th className="py-1 px-3 font-semibold">activity</th>
                          <th className="py-1 px-3 font-semibold">event_count</th>
                          <th className="py-1 px-3 font-semibold">objects</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-neutral-800">
                        <tr className="hover:bg-neutral-50">
                          <td className="py-1 px-3 font-semibold text-purple-700">Pick Items</td>
                          <td className="py-1 px-3">12,840</td>
                          <td className="py-1 px-3 text-neutral-500">6,420</td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                          <td className="py-1 px-3 font-semibold text-purple-700">Create Order</td>
                          <td className="py-1 px-3">4,219</td>
                          <td className="py-1 px-3 text-neutral-500">4,219</td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                          <td className="py-1 px-3 font-semibold text-purple-700">Pack &amp; Label</td>
                          <td className="py-1 px-3">3,912</td>
                          <td className="py-1 px-3 text-neutral-500">3,912</td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                          <td className="py-1 px-3 font-semibold text-purple-700">Quality Check</td>
                          <td className="py-1 px-3">3,892</td>
                          <td className="py-1 px-3 text-neutral-500">3,892</td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                          <td className="py-1 px-3 font-semibold text-purple-700">Dispatch Shipment</td>
                          <td className="py-1 px-3">3,880</td>
                          <td className="py-1 px-3 text-neutral-500">3,880</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
