import React from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Search } from "lucide-react";

export const ConformanceStory: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 border-b border-[#E4E4E7] bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
            FROM SCORE TO EXPLANATION
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            A score tells you how far. A replay helps show where.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            TOTeM connects stored models with the current event log through model-specific
            conformance workflows. Explore aggregate fitness and precision information where
            supported, then move into object types, relations, replay units, and diagnostic
            stopping points.
          </p>
        </div>

        {/* 3-Column Replay Status Categorization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Fitting Card */}
          <div className="rounded-xl border-2 border-emerald-500/30 bg-white p-6 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-mono text-sm tracking-wide">Fitting</span>
              <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                100% Valid
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              At least one complete binding sequence reaches completion without violating
              cardinalities or obligations.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Status: Proven</span>
              <span className="text-emerald-700 font-bold">● Valid execution</span>
            </div>
          </div>

          {/* Non-Fitting Card */}
          <div className="rounded-xl border-2 border-red-500/30 bg-white p-6 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3 text-red-800 font-semibold">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-mono text-sm tracking-wide">Non-fitting</span>
              <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800">
                Deviation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Exhaustive replay shows that no complete sequence matches the observed unit;
              first failure activity is pinpointed.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Status: Deviation</span>
              <span className="text-red-700 font-bold">■ Halting state</span>
            </div>
          </div>

          {/* Inconclusive Card */}
          <div className="rounded-xl border-2 border-amber-500/30 bg-white p-6 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-3 text-amber-800 font-semibold">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span className="font-mono text-sm tracking-wide">Inconclusive</span>
              <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Search bound
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              The configured search bound was reached before an outcome was proven.
              Presented transparently alongside coverage.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Status: Bounded</span>
              <span className="text-amber-700 font-bold">▲ State cap hit</span>
            </div>
          </div>
        </div>

        {/* Concrete Diagnostic Row Inspection Sample */}
        <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-[#E4E4E7]">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              <h3 className="font-sans font-bold text-sm sm:text-base text-[#0B0D0F]">
                Diagnostic Replay-Unit Inspection
              </h3>
            </div>
            <span className="font-mono text-xs text-neutral-500">
              Illustrative result · OCCN Replay Engine
            </span>
          </div>

          {/* Replay Unit Detail Breakdown */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-[#F7F7F2] border border-[#E4E4E7] font-mono text-xs">
              <div>
                <span className="text-neutral-500 block text-[11px]">Replay-Unit ID</span>
                <span className="font-semibold text-black">connected_components:000042</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[11px]">Object Types</span>
                <span className="font-semibold text-blue-600">order (1), item (2)</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[11px]">Stopping Phase</span>
                <span className="font-semibold text-red-600">visible_event</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[11px]">Explored States</span>
                <span className="font-semibold text-neutral-700">148 states</span>
              </div>
            </div>

            {/* Sequence stepping */}
            <div className="p-4 rounded-lg border border-red-200 bg-red-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-neutral-500">Replay path:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  START_order ✓
                </span>
                <ArrowRight className="w-3 h-3 text-neutral-400" />
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  create order ✓
                </span>
                <ArrowRight className="w-3 h-3 text-neutral-400" />
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  pick item (i-01) ✓
                </span>
                <ArrowRight className="w-3 h-3 text-neutral-400" />
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 font-bold">
                  pack items (stopping point) ✕
                </span>
              </div>

              <div className="text-red-700 shrink-0 font-sans text-xs">
                Missing required binding for item <code className="font-mono font-bold">i-02</code>
              </div>
            </div>
          </div>

          {/* Secondary TOTeM Multi-Dimensional Conformance Panel */}
          <div className="mt-8 pt-6 border-t border-[#E4E4E7] grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg border border-neutral-200 bg-[#F7F7F2]">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-neutral-600">Temporal Fitness</span>
                <span className="font-bold text-black">94.8%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "94.8%" }} />
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-neutral-200 bg-[#F7F7F2]">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-neutral-600">Log Cardinality Fitness</span>
                <span className="font-bold text-black">98.2%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: "98.2%" }} />
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-neutral-200 bg-[#F7F7F2]">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-neutral-600">Event Cardinality Fitness</span>
                <span className="font-bold text-black">91.4%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: "91.4%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConformanceStory;
