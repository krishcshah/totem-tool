import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { MODEL_FORMALISMS } from "../content";
import { TableProperties, Check, Share2, Workflow, CircleDot, GitBranch } from "lucide-react";
import { useInactivityResume } from "../hooks/useInactivityResume";

export const ModelLanguageTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("totem");
  const { isAutoPlaying, pauseAutoPlay } = useInactivityResume(true, 30000);
  const tabListRef = useRef<HTMLDivElement | null>(null);

  // Auto-switch between the 4 formalisms on 2.5s intervals until user interacts
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveTabId((prevId) => {
        const currentIndex = MODEL_FORMALISMS.findIndex((m) => m.id === prevId);
        const nextIndex = (currentIndex + 1) % MODEL_FORMALISMS.length;
        return MODEL_FORMALISMS[nextIndex].id;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const activeFormalism =
    MODEL_FORMALISMS.find((m) => m.id === activeTabId) || MODEL_FORMALISMS[0];

  const handleTabSelect = (tabId: string) => {
    pauseAutoPlay();
    setActiveTabId(tabId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    pauseAutoPlay();
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % MODEL_FORMALISMS.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + MODEL_FORMALISMS.length) % MODEL_FORMALISMS.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = MODEL_FORMALISMS.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      const nextTab = MODEL_FORMALISMS[nextIndex];
      setActiveTabId(nextTab.id);
      const nextBtn = tabListRef.current?.querySelector<HTMLButtonElement>(
        `#tab-${nextTab.id}`
      );
      nextBtn?.focus();
    }
  };

  return (
    <section id="models" className="totem-section-target pt-10 sm:pt-14 pb-20 sm:pb-32 border-b border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3 flex items-center gap-2">
            <span>MULTILINGUAL OBJECT-CENTRIC MODELING</span>
            {isAutoPlaying && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                AUTO-CYCLING 2.5s
              </span>
            )}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            Four model languages. One unified tool.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure mb-4">
            No single formal model fits every analytical question. TOTeM provides discovery,
            editing, layout, and conformance verification across four object-centric notations.
          </p>
          <p className="text-sm text-neutral-500 font-sans totem-measure">
            Every model language preserves typed connections, lifecycle interactions, and
            execution semantics without forcing artificial case IDs.
          </p>
        </div>

        {/* Tab Selection Interface */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Object-Centric Process Mining Model Languages"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-[#F7F7F2] p-1.5 rounded-xl border border-[#E4E4E7]"
        >
          {MODEL_FORMALISMS.map((item, index) => {
            const isSelected = activeTabId === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls={`tabpanel-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabSelect(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`relative flex flex-col items-start px-4 py-3 rounded-lg text-left transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? "bg-white text-[#0B0D0F] font-bold shadow-xs border border-neutral-300"
                    : "text-neutral-600 hover:text-black hover:bg-neutral-200/50 border border-transparent font-medium"
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  {item.id === "totem" && <Share2 className="w-3.5 h-3.5 text-blue-600" />}
                  {item.id === "ocdfg" && <GitBranch className="w-3.5 h-3.5 text-teal-600" />}
                  {item.id === "ocpn" && <CircleDot className="w-3.5 h-3.5 text-emerald-600" />}
                  {item.id === "occn" && <Workflow className="w-3.5 h-3.5 text-purple-600" />}
                  <span className="font-mono text-sm">{item.title}</span>
                </div>
                <span className="text-[11px] text-neutral-500 font-sans line-clamp-1">
                  {item.fullName}
                </span>

                {/* Animated 2.5s progress bar while auto-playing */}
                {isSelected && isAutoPlaying && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 animate-tab-progress" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tabpanel Content — Fixed height layout to eliminate vertical jumping */}
        <div
          id={`tabpanel-${activeFormalism.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeFormalism.id}`}
          className="rounded-2xl border border-[#E4E4E7] bg-[#F7F7F2] p-6 sm:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Accurate Model Vector Diagram: Fixed 340px height */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-[#E4E4E7] p-6 shadow-2xs overflow-hidden flex items-center justify-center h-[340px]">
              <div key={activeFormalism.id} className="w-full h-full flex items-center justify-center tab-content-enter">
                {activeFormalism.id === "totem" && (
                  /* TOTeM: Object types, temporal relations (D, P, I), cardinalities */
                  <svg
                    viewBox="0 0 540 260"
                    className="w-full h-auto select-none max-h-[280px]"
                    role="img"
                    aria-label="Temporal Object Type Model diagram showing Order, Item, and Package nodes with temporal relations and cardinalities"
                  >
                    {/* Order Node */}
                    <g transform="translate(60, 60)">
                      <rect x="0" y="0" width="120" height="50" rx="6" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
                      <text x="60" y="30" textAnchor="middle" fill="#1E40AF" fontWeight="bold" fontSize="13" fontFamily="Inter">
                        Order
                      </text>
                    </g>

                    {/* Item Node */}
                    <g transform="translate(360, 60)">
                      <rect x="0" y="0" width="120" height="50" rx="6" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2" />
                      <text x="60" y="30" textAnchor="middle" fill="#5B21B6" fontWeight="bold" fontSize="13" fontFamily="Inter">
                        Item
                      </text>
                    </g>

                    {/* Package Node */}
                    <g transform="translate(210, 180)">
                      <rect x="0" y="0" width="120" height="50" rx="6" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
                      <text x="60" y="30" textAnchor="middle" fill="#115E59" fontWeight="bold" fontSize="13" fontFamily="Inter">
                        Package
                      </text>
                    </g>

                    {/* Order -> Item Temporal Relation D (During) */}
                    <line x1="180" y1="85" x2="360" y2="85" stroke="#2563EB" strokeWidth="1.5" />
                    <rect x="250" y="73" width="40" height="24" rx="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1" />
                    <text x="270" y="89" textAnchor="middle" fill="#1E40AF" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                      D ■
                    </text>
                    <text x="270" y="112" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono">
                      [1, *]
                    </text>

                    {/* Item -> Package Relation P (Precedes) */}
                    <line x1="420" y1="110" x2="330" y2="180" stroke="#8B5CF6" strokeWidth="1.5" />
                    <rect x="360" y="135" width="40" height="24" rx="4" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1" />
                    <text x="380" y="151" textAnchor="middle" fill="#5B21B6" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                      P ►
                    </text>

                    {/* Order -> Package Relation I (Intersects) */}
                    <line x1="120" y1="110" x2="210" y2="180" stroke="#0D9488" strokeWidth="1.5" />
                    <rect x="140" y="135" width="40" height="24" rx="4" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1" />
                    <text x="160" y="151" textAnchor="middle" fill="#115E59" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                      I ◉
                    </text>
                  </svg>
                )}

                {activeFormalism.id === "ocdfg" && (
                  /* OC-DFG: Multi-type edge routing */
                  <svg
                    viewBox="0 0 540 260"
                    className="w-full h-auto select-none max-h-[280px]"
                    role="img"
                    aria-label="Object-Centric Directly Follows Graph with multi-type edge routing"
                  >
                    <g transform="translate(40, 105)">
                      <rect x="0" y="0" width="110" height="45" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                      <text x="55" y="27" textAnchor="middle" fill="#0B0D0F" fontSize="11" fontWeight="600" fontFamily="Inter">
                        place order
                      </text>
                    </g>

                    <g transform="translate(210, 105)">
                      <rect x="0" y="0" width="110" height="45" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                      <text x="55" y="27" textAnchor="middle" fill="#0B0D0F" fontSize="11" fontWeight="600" fontFamily="Inter">
                        pick items
                      </text>
                    </g>

                    <g transform="translate(380, 105)">
                      <rect x="0" y="0" width="110" height="45" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                      <text x="55" y="27" textAnchor="middle" fill="#0B0D0F" fontSize="11" fontWeight="600" fontFamily="Inter">
                        deliver
                      </text>
                    </g>

                    {/* Edge 1: Order thread */}
                    <path d="M 150 120 L 210 120" stroke="#2563EB" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
                    <text x="180" y="112" textAnchor="middle" fill="#2563EB" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      order (4.2k)
                    </text>

                    {/* Edge 2: Item thread */}
                    <path d="M 150 135 L 210 135" stroke="#8B5CF6" strokeWidth="2.5" markerEnd="url(#arrow-purple)" />
                    <text x="180" y="152" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      item (12.8k)
                    </text>

                    {/* Edge 3 to deliver */}
                    <path d="M 320 127 L 380 127" stroke="#0D9488" strokeWidth="2.5" />
                    <text x="350" y="120" textAnchor="middle" fill="#0D9488" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      pkg (3.9k)
                    </text>
                  </svg>
                )}

                {activeFormalism.id === "ocpn" && (
                  /* OCPN: Colored Petri Net with typed places */
                  <svg
                    viewBox="0 0 540 260"
                    className="w-full h-auto select-none max-h-[280px]"
                    role="img"
                    aria-label="Object-Centric Petri Net diagram with typed places and transitions"
                  >
                    {/* Places: Circles with type color */}
                    <circle cx="90" cy="90" r="22" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
                    <circle cx="90" cy="90" r="4" fill="#2563EB" />
                    <text x="90" y="130" textAnchor="middle" fill="#2563EB" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      p_order
                    </text>

                    <circle cx="90" cy="180" r="22" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2" />
                    <circle cx="90" cy="180" r="4" fill="#8B5CF6" />
                    <text x="90" y="220" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      p_item
                    </text>

                    {/* Transition: Rectangle */}
                    <rect x="230" y="105" width="40" height="75" rx="4" fill="#0B0D0F" stroke="#0B0D0F" />
                    <text x="250" y="198" textAnchor="middle" fill="#0B0D0F" fontSize="11" fontWeight="600" fontFamily="Inter">
                      pack
                    </text>

                    {/* Output place */}
                    <circle cx="410" cy="140" r="22" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
                    <text x="410" y="180" textAnchor="middle" fill="#0D9488" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      p_package
                    </text>

                    {/* Arcs */}
                    <line x1="112" y1="95" x2="230" y2="125" stroke="#2563EB" strokeWidth="1.5" />
                    <line x1="112" y1="175" x2="230" y2="155" stroke="#8B5CF6" strokeWidth="1.5" />
                    <line x1="270" y1="142" x2="388" y2="142" stroke="#0D9488" strokeWidth="1.5" />
                  </svg>
                )}

                {activeFormalism.id === "occn" && (
                  /* OCCN: Object-Centric C-Net with input/output bindings */
                  <svg
                    viewBox="0 0 540 260"
                    className="w-full h-auto select-none max-h-[280px]"
                    role="img"
                    aria-label="Object-Centric C-Net diagram showing input and output binding sets"
                  >
                    {/* Activity A */}
                    <g transform="translate(60, 100)">
                      <rect x="0" y="0" width="100" height="50" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                      <text x="50" y="30" textAnchor="middle" fill="#0B0D0F" fontSize="12" fontWeight="600" fontFamily="Inter">
                        create order
                      </text>
                    </g>

                    {/* Activity B */}
                    <g transform="translate(360, 100)">
                      <rect x="0" y="0" width="100" height="50" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                      <text x="50" y="30" textAnchor="middle" fill="#0B0D0F" fontSize="12" fontWeight="600" fontFamily="Inter">
                        pack items
                      </text>
                    </g>

                    {/* Causal dependency arcs */}
                    <line x1="160" y1="115" x2="360" y2="115" stroke="#2563EB" strokeWidth="2" />
                    <line x1="160" y1="135" x2="360" y2="135" stroke="#8B5CF6" strokeWidth="2" />

                    {/* Output marker groups at A */}
                    <circle cx="210" cy="115" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect x="205" y="130" width="10" height="10" rx="2" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="210" y1="115" x2="210" y2="135" stroke="#0B0D0F" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Input marker groups at B */}
                    <circle cx="310" cy="115" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
                    <rect x="305" y="130" width="10" height="10" rx="2" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="310" y1="115" x2="310" y2="135" stroke="#0B0D0F" strokeWidth="1" strokeDasharray="2 2" />

                    <text x="260" y="95" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">
                      AND-binding group (Order + Items)
                    </text>
                  </svg>
                )}
              </div>
            </div>

            {/* Right: Copy & Capabilities: Fixed 340px height */}
            <div className="lg:col-span-5 h-[340px] flex flex-col justify-between">
              <div key={activeFormalism.id} className="tab-content-enter space-y-4">
                <div>
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                    {activeFormalism.fullName}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0B0D0F] mb-2">
                    {activeFormalism.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-sans line-clamp-3">
                    {activeFormalism.copy}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-neutral-500 uppercase">
                    Key Formal Capabilities:
                  </span>
                  <ul className="space-y-1.5">
                    {activeFormalism.badges.map((badge) => (
                      <li key={badge} className="flex items-start gap-2 text-xs font-sans text-neutral-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{badge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verified CAiSE / BPM Citation link */}
              {activeFormalism.citation && (
                <div className="pt-3 border-t border-neutral-200 text-[11px] font-mono text-neutral-500">
                  <span>Source: </span>
                  <span className="italic text-neutral-700">{activeFormalism.citation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spotlight Callout: Integrated OCEL Editor */}
        <div className="mt-8 p-6 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <TableProperties className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-950 font-sans">
                Integrated OCEL Log Editor
              </h4>
              <p className="text-xs text-blue-800 font-sans">
                Inspect raw event tables, rename activity types, repair timestamp anomalies, and export clean OCEL 2.0 files.
              </p>
            </div>
          </div>
          <a
            href="#workflow"
            className="text-xs font-mono font-semibold text-blue-700 hover:text-blue-900 shrink-0 underline"
          >
            See in Step 04 →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ModelLanguageTabs;
