import React, { useState, useRef, KeyboardEvent } from "react";
import { MODEL_FORMALISMS } from "../content";
import { TableProperties, Check, Share2, Workflow, CircleDot, GitBranch } from "lucide-react";

export const ModelLanguageTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("totem");
  const tabListRef = useRef<HTMLDivElement | null>(null);

  const activeFormalism =
    MODEL_FORMALISMS.find((m) => m.id === activeTabId) || MODEL_FORMALISMS[0];

  // Arrow key navigation for accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % MODEL_FORMALISMS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + MODEL_FORMALISMS.length) % MODEL_FORMALISMS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = MODEL_FORMALISMS.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const nextTab = MODEL_FORMALISMS[nextIndex];
      setActiveTabId(nextTab.id);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <section id="models" className="totem-section-target py-20 sm:py-32 border-b border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
            ONE WORKBENCH · MULTIPLE FORMALISMS
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            Four model languages. One project context.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            Choose the notation that matches the question—from type-level temporal structure
            to executable behavior and causal obligations.
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
                onClick={() => setActiveTabId(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`flex flex-col items-start px-4 py-3 rounded-lg text-left transition-all cursor-pointer ${
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
              </button>
            );
          })}
        </div>

        {/* Active Tabpanel Content */}
        <div
          id={`tabpanel-${activeFormalism.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeFormalism.id}`}
          className="rounded-2xl border border-[#E4E4E7] bg-[#F7F7F2] p-6 sm:p-10 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Accurate Model Vector Diagram */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-[#E4E4E7] p-6 shadow-2xs overflow-hidden flex items-center justify-center min-h-[320px]">
              {activeFormalism.id === "totem" && (
                /* TOTeM: Object types, temporal relations (D, P, I), cardinalities */
                <svg
                  viewBox="0 0 540 260"
                  className="w-full h-auto select-none"
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
                    card: [1, 1..*]
                  </text>

                  {/* Item -> Package Relation I (Initiates) */}
                  <line x1="400" y1="110" x2="310" y2="180" stroke="#8B5CF6" strokeWidth="1.5" />
                  <rect x="340" y="135" width="40" height="24" rx="4" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1" />
                  <text x="360" y="151" textAnchor="middle" fill="#5B21B6" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                    I ▶
                  </text>

                  {/* Order -> Package Relation */}
                  <line x1="140" y1="110" x2="230" y2="180" stroke="#0D9488" strokeWidth="1.5" />
                  <rect x="160" y="135" width="40" height="24" rx="4" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1" />
                  <text x="180" y="151" textAnchor="middle" fill="#115E59" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                    P ∥
                  </text>
                </svg>
              )}

              {activeFormalism.id === "ocdfg" && (
                /* OC-DFG: Activities, colored typed arcs, start/end nodes */
                <svg
                  viewBox="0 0 540 260"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Object-Centric Directly-Follows Graph showing typed activity connections"
                >
                  {/* Start nodes */}
                  <circle cx="50" cy="80" r="14" fill="#2563EB" />
                  <text x="50" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="JetBrains Mono">▶</text>

                  <circle cx="50" cy="180" r="14" fill="#8B5CF6" />
                  <text x="50" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="JetBrains Mono">▶</text>

                  {/* Activity A: Create */}
                  <rect x="120" y="60" width="110" height="40" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                  <text x="175" y="85" textAnchor="middle" fill="#0B0D0F" fontSize="12" fontWeight="600" fontFamily="Inter">
                    create order
                  </text>

                  {/* Activity B: Pick */}
                  <rect x="290" y="110" width="110" height="40" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                  <text x="345" y="135" textAnchor="middle" fill="#0B0D0F" fontSize="12" fontWeight="600" fontFamily="Inter">
                    pick item
                  </text>

                  {/* Activity C: Pack */}
                  <rect x="420" y="60" width="100" height="40" rx="6" fill="#F8FAFC" stroke="#0B0D0F" strokeWidth="1.5" />
                  <text x="470" y="85" textAnchor="middle" fill="#0B0D0F" fontSize="12" fontWeight="600" fontFamily="Inter">
                    pack items
                  </text>

                  {/* Typed Arcs */}
                  {/* Start -> Create (Order) */}
                  <line x1="64" y1="80" x2="120" y2="80" stroke="#2563EB" strokeWidth="2" />
                  {/* Create -> Pick (Order) */}
                  <path d="M 230 80 C 260 80, 260 120, 290 120" fill="none" stroke="#2563EB" strokeWidth="2" />
                  {/* Start -> Pick (Item) */}
                  <path d="M 64 180 C 180 180, 200 140, 290 140" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                  {/* Pick -> Pack (Order + Item multigraph arcs) */}
                  <path d="M 400 120 C 410 120, 410 80, 420 80" fill="none" stroke="#2563EB" strokeWidth="2" />
                  <path d="M 400 135 C 430 135, 430 100, 420 100" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                </svg>
              )}

              {activeFormalism.id === "ocpn" && (
                /* OCPN: Typed circular places, rectangular transitions, variable arcs */
                <svg
                  viewBox="0 0 540 260"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Object-Centric Petri Net diagram with typed places, transitions, and variable double arcs"
                >
                  {/* Place p1 (Order) */}
                  <circle cx="70" cy="130" r="22" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
                  <circle cx="70" cy="130" r="5" fill="#2563EB" />
                  <text x="70" y="165" textAnchor="middle" fill="#2563EB" fontSize="10" fontFamily="JetBrains Mono">
                    p_order
                  </text>

                  {/* Transition t1 (place order) */}
                  <rect x="160" y="110" width="40" height="40" rx="3" fill="#FFFFFF" stroke="#0B0D0F" strokeWidth="2" />
                  <text x="180" y="165" textAnchor="middle" fill="#0B0D0F" fontSize="10" fontFamily="Inter" fontWeight="600">
                    t_place
                  </text>

                  {/* Arc p1 -> t1 */}
                  <line x1="92" y1="130" x2="160" y2="130" stroke="#2563EB" strokeWidth="2" />

                  {/* Variable double arc from t1 to p_items (consuming multiple items) */}
                  <circle cx="340" cy="80" r="22" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2" />
                  <text x="340" y="115" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontFamily="JetBrains Mono">
                    p_item
                  </text>

                  <path d="M 200 125 C 260 125, 270 80, 318 80" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                  <path d="M 200 135 C 260 135, 270 90, 318 90" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="255" y="98" fill="#8B5CF6" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
                    variable ⇉
                  </text>

                  {/* Transition t2 */}
                  <rect x="440" y="110" width="40" height="40" rx="3" fill="#FFFFFF" stroke="#0B0D0F" strokeWidth="2" />
                  <text x="460" y="165" textAnchor="middle" fill="#0B0D0F" fontSize="10" fontFamily="Inter" fontWeight="600">
                    t_pack
                  </text>

                  <line x1="362" y1="85" x2="440" y2="120" stroke="#8B5CF6" strokeWidth="2" />
                </svg>
              )}

              {activeFormalism.id === "occn" && (
                /* OCCN: Causal net, marker groups, binding obligations */
                <svg
                  viewBox="0 0 540 260"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Object-Centric Causal Net diagram with activity nodes and marker groups"
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

            {/* Right: Copy & Capabilities */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                  {activeFormalism.fullName}
                </span>
                <h3 className="text-2xl font-bold text-[#0B0D0F] mb-3">
                  {activeFormalism.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                  {activeFormalism.copy}
                </p>
              </div>

              <div className="space-y-2">
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

              {activeFormalism.citation && (
                <div className="pt-3 border-t border-neutral-200 text-xs font-mono text-neutral-500">
                  Reference: <span className="text-neutral-800 font-semibold">{activeFormalism.citation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Spotlight: OCEL Editor */}
        <div className="mt-8 rounded-xl border border-[#E4E4E7] bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <TableProperties className="w-4 h-4 text-purple-600" />
              <h4 className="font-sans font-bold text-base text-[#0B0D0F]">
                Edit the log itself
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              The OCEL Editor works on an isolated DuckDB working copy, lets users edit events,
              objects, attributes, E2O relations, and O2O relations, and only creates a permanent project
              when explicitly saved.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded self-start sm:self-center shrink-0">
            Isolated DuckDB Working Copy
          </span>
        </div>
      </div>
    </section>
  );
};

export default ModelLanguageTabs;
