import React, { useState, useEffect } from "react";
import { Play, ArrowRight } from "lucide-react";

export const PlayoutStory: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sampleVariants = [
    {
      id: "v-1",
      supportName: "Variant #1 (Canonical)",
      events: ["START_order", "create order (o1)", "pick item (i1)", "pick item (i2)", "pack items (o1, i1, i2)", "END_order"],
      permutations: 4,
      note: "Primary execution trace under normal form",
    },
    {
      id: "v-2",
      supportName: "Variant #2 (Alternative Picking Order)",
      events: ["START_order", "create order (o1)", "pick item (i2)", "pick item (i1)", "pack items (o1, i1, i2)", "END_order"],
      permutations: 4,
      note: "Equivalent under independent event trace normal form → grouped into Variant #1",
    },
  ];

  // Auto-cycle variants every 2.5s until user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setSelectedVariant((prev) => (prev + 1) % sampleVariants.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, sampleVariants.length]);

  const handleVariantSelect = (idx: number) => {
    setIsAutoPlaying(false);
    setSelectedVariant(idx);
  };

  return (
    <section className="py-20 sm:py-32 border-b border-[#E4E4E7] bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3 flex items-center gap-2">
            <span>MODEL → BEHAVIOR</span>
            {isAutoPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                AUTO-CYCLING 2.5s
              </span>
            )}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            Ask the model what it allows.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure mb-4">
            Playout enumerates distinct object-centric executions permitted by an object-centric
            Petri net or causal net under explicit object, activity, timeout, and state bounds.
            Equivalent executions are canonicalized across independent ordering and same-type
            object naming.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed font-sans totem-measure">
            When the search finishes within its bounds, the count is exact. When a timeout or state
            limit is reached, the interface must communicate the appropriate bound rather than
            pretending the result is exhaustive.
          </p>
        </div>

        {/* Playout Visual & Branching Simulation */}
        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E4E4E7] gap-3">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-600" />
              <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                Playout State-Space Explorer
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Bound: 1 Order, 2 Items
              </span>
              <span>Interactive simulation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Branching Model to Execution Sequences */}
            <div className="lg:col-span-7 bg-[#F7F7F2] rounded-xl border border-[#E4E4E7] p-6 space-y-4">
              <div className="font-mono text-xs text-neutral-500 flex items-center justify-between">
                <span>Branching Execution Sequences</span>
                <span>Canonical Deduplication</span>
              </div>

              {/* Execution Cards: Fixed uniform height */}
              <div className="space-y-3">
                {sampleVariants.map((variant, idx) => (
                  <div
                    key={variant.id}
                    onClick={() => handleVariantSelect(idx)}
                    className={`relative p-4 rounded-lg border text-xs font-mono transition-all cursor-pointer min-h-[108px] flex flex-col justify-between overflow-hidden ${
                      selectedVariant === idx
                        ? "bg-white border-black shadow-xs ring-1 ring-black/10"
                        : "bg-neutral-100/70 border-neutral-200 text-neutral-600 hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-black mb-2">
                        <span>{variant.supportName}</span>
                        <span className="text-[11px] font-normal text-neutral-500">
                          {variant.permutations} permutations collapsed
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        {variant.events.map((evt, eIdx) => (
                          <React.Fragment key={evt}>
                            <span className="px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">
                              {evt}
                            </span>
                            {eIdx < variant.events.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-neutral-400" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {variant.note && (
                      <div className="mt-2 text-[10px] text-blue-700 font-sans italic">
                        {variant.note}
                      </div>
                    )}

                    {selectedVariant === idx && isAutoPlaying && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 animate-tab-progress" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Export Targets & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Mathematical Guarantees
                </span>
                <h3 className="text-xl font-bold text-[#0B0D0F]">
                  Exhaustive or bounded. Never guessed.
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  The engine explores the reachability graph using trace normal form over
                  independent events and fresh-object symmetry. Identical behaviors are reduced
                  to a single canonical variant key.
                </p>
              </div>

              {/* Export Panel */}
              <div className="p-4 rounded-lg border border-[#E4E4E7] bg-[#F7F7F2] space-y-3 font-mono text-xs">
                <span className="text-neutral-500 font-semibold block">Export Targets:</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-neutral-200 card-hover-lift">
                    <span className="font-semibold text-black">OCEL 2.0 (JSON)</span>
                    <span className="text-[10px] text-neutral-500">One component per variant</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-white border border-neutral-200 card-hover-lift">
                    <span className="font-semibold text-black">Variants JSON</span>
                    <span className="text-[10px] text-neutral-500">Canonical event traces</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayoutStory;
