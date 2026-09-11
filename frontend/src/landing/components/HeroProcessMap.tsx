import React, { useState, useEffect } from "react";
import { OBJECT_THREADS, ObjectThread } from "../content";
import { TotemMark } from "./TotemMark";

interface HeroProcessMapProps {
  onSelectThread?: (threadId: string | null) => void;
}

interface ProcessEvent {
  id: string;
  name: string;
  timeLabel: string;
  x: number;
  y: number;
  involvedTypes: ("order" | "item" | "package" | "resource")[];
  description: string;
}

export const HeroProcessMap: React.FC<HeroProcessMapProps> = ({ onSelectThread }) => {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [pinnedType, setPinnedType] = useState<string | null>(null);
  const [motionReduced, setMotionReduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Micro-detail wordmark animation phase
  const [wordmarkPhase, setWordmarkPhase] = useState<"full" | "condensing" | "resolved">("full");

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionReduced(query.matches);
    if (query.matches) {
      setWordmarkPhase("resolved");
      return;
    }

    const t1 = setTimeout(() => setWordmarkPhase("condensing"), 700);
    const t2 = setTimeout(() => setWordmarkPhase("resolved"), 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Auto-cycle through the 4 threads every 2.5s until user hovers or clicks
  useEffect(() => {
    if (!isAutoPlaying || motionReduced) return;

    const threadIds = ["order", "item", "package", "resource"];
    const timer = setInterval(() => {
      setActiveType((prev) => {
        const nextIdx = prev ? (threadIds.indexOf(prev) + 1) % threadIds.length : 0;
        const nextThread = threadIds[nextIdx];
        onSelectThread?.(nextThread);
        return nextThread;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, motionReduced, onSelectThread]);

  const effectiveType = pinnedType || activeType;

  const handleTypeHover = (typeId: string | null) => {
    if (typeId) {
      setIsAutoPlaying(false);
    }
    if (!pinnedType) {
      setActiveType(typeId);
      onSelectThread?.(typeId);
    }
  };

  const handleTypeClick = (typeId: string) => {
    setIsAutoPlaying(false);
    const next = pinnedType === typeId ? null : typeId;
    setPinnedType(next);
    setActiveType(next);
    onSelectThread?.(next);
  };

  // Process events along chronological X coordinates
  const events: ProcessEvent[] = [
    {
      id: "e1",
      name: "Create Order",
      timeLabel: "10:14:02",
      x: 100,
      y: 110,
      involvedTypes: ["order"],
      description: "Order #8491 registered with 2 items",
    },
    {
      id: "e2",
      name: "Pick Items",
      timeLabel: "10:22:15",
      x: 270,
      y: 190,
      involvedTypes: ["order", "item", "resource"],
      description: "Operator W-14 claims picking wave for items i-01, i-02",
    },
    {
      id: "e3",
      name: "Quality Check",
      timeLabel: "10:35:40",
      x: 450,
      y: 260,
      involvedTypes: ["item", "resource"],
      description: "Inspection station checks item integrity",
    },
    {
      id: "e4",
      name: "Pack & Label",
      timeLabel: "10:48:10",
      x: 630,
      y: 190,
      involvedTypes: ["order", "item", "package", "resource"],
      description: "Items packed into parcel p-99; shipping label attached",
    },
    {
      id: "e5",
      name: "Dispatch Shipment",
      timeLabel: "11:15:00",
      x: 820,
      y: 120,
      involvedTypes: ["order", "package"],
      description: "Package loaded onto outbound carrier; order fulfilled",
    },
  ];

  // Helper to determine opacity
  const getThreadOpacity = (typeId: string) => {
    if (!effectiveType) return 0.85;
    return effectiveType === typeId ? 1 : 0.15;
  };

  const getThreadStrokeWidth = (typeId: string) => {
    if (!effectiveType) return 2.5;
    return effectiveType === typeId ? 4 : 1.5;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Legend & Wordmark Micro-banner */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200/80">
        {/* Living wordmark resolution detail */}
        <div
          className="flex items-center gap-2 font-mono text-xs text-neutral-600 select-none"
          title="Temporal Object Type Model resolves to TOTeM"
        >
          <div className="w-6 h-6 flex items-center justify-center bg-black text-white rounded shrink-0">
            <TotemMark size={16} primaryColor="#FFFFFF" secondaryColor="#60A5FA" />
          </div>

          {motionReduced || wordmarkPhase === "resolved" ? (
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-bold text-sm tracking-tight text-black">TOTeM</span>
              <span className="text-[11px] text-neutral-400">· Temporal Object Type Model</span>
            </div>
          ) : wordmarkPhase === "condensing" ? (
            <div className="flex items-center font-mono font-semibold tracking-wider text-black text-xs transition-all duration-300">
              <span className="text-blue-600 font-bold">T</span>
              <span className="text-purple-600 font-bold">O</span>
              <span className="text-blue-600 font-bold">T</span>
              <span className="text-neutral-500 font-medium lowercase">e</span>
              <span className="text-teal-600 font-bold">M</span>
              <span className="ml-1.5 text-[10px] text-neutral-400 animate-pulse">(resolving)</span>
            </div>
          ) : (
            <div className="font-mono text-[11px] text-neutral-500 tracking-tight transition-opacity duration-300">
              Temporal Object Type Model
            </div>
          )}
        </div>

        {/* Object thread selector buttons */}
        <div
          className="flex flex-wrap items-center gap-1.5 sm:gap-2"
          role="toolbar"
          aria-label="Filter threads by object type"
        >
          <span className="text-[11px] font-mono text-neutral-400 mr-1 hidden sm:inline">
            Highlight:
          </span>
          {OBJECT_THREADS.map((thread: ObjectThread) => {
            const isSelected = effectiveType === thread.id;
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => handleTypeClick(thread.id)}
                onMouseEnter={() => handleTypeHover(thread.id)}
                onMouseLeave={() => handleTypeHover(null)}
                onFocus={() => handleTypeHover(thread.id)}
                onBlur={() => handleTypeHover(null)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-offset-1 text-black font-semibold bg-white shadow-xs"
                    : "text-neutral-600 hover:text-black bg-neutral-200/60 hover:bg-neutral-200"
                }`}
                style={{
                  outlineColor: thread.color,
                  borderColor: isSelected ? thread.color : "transparent",
                }}
                aria-pressed={isSelected}
                aria-label={`Highlight ${thread.name} thread (${thread.role})`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                  style={{
                    backgroundColor: thread.color,
                    transform: isSelected ? "scale(1.2)" : "scale(1)",
                  }}
                />
                <span>{thread.name}</span>
                {pinnedType === thread.id && (
                  <span className="text-[10px] opacity-70 font-sans ml-0.5">✕</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* The Bespoke SVG Process Map */}
      <div
        className="w-full relative bg-white rounded-xl border border-[#E4E4E7] shadow-xs overflow-hidden p-2 sm:p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          viewBox="0 0 920 340"
          className="w-full h-auto select-none"
          role="img"
          aria-label="Interactive Object-Centric Event Map connecting Order, Item, Package, and Resource threads across discrete events"
        >
          <defs>
            {/* Grid pattern */}
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>

            {/* Gradient overlays for active threads */}
            <linearGradient id="orderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="itemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Background grid */}
          <rect width="920" height="340" fill="url(#hero-grid)" rx="8" />

          {/* Timeline axis along top */}
          <line x1="60" y1="45" x2="860" y2="45" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="60" y="36" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="0.05em">
            TIME →
          </text>
          <text x="860" y="36" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
            SHARED TEMPORAL AXIS
          </text>

          {/* Thread Paths */}

          {/* 1. Order Thread (Blue) */}
          {/* Path: e1 (100,110) -> e2 (270,190) -> bypass e3 -> e4 (630,190) -> e5 (820,120) */}
          <path
            d="M 60 110 L 100 110 C 180 110, 190 190, 270 190 C 370 190, 530 190, 630 190 C 720 190, 750 120, 820 120 L 880 120"
            fill="none"
            stroke="#2563EB"
            strokeWidth={getThreadStrokeWidth("order")}
            strokeOpacity={getThreadOpacity("order")}
            strokeLinecap="round"
            className={!motionReduced && !isHovered ? "animate-thread-pulse" : ""}
            style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
          />

          {/* 2. Item Thread (Violet) */}
          {/* Path: starts at e2 (270, 190) -> e3 (450, 260) -> e4 (630, 190) */}
          <path
            d="M 230 190 L 270 190 C 350 190, 370 260, 450 260 C 530 260, 550 190, 630 190 L 680 190"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={getThreadStrokeWidth("item")}
            strokeOpacity={getThreadOpacity("item")}
            strokeLinecap="round"
            className={!motionReduced && !isHovered ? "animate-thread-pulse" : ""}
            style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
          />

          {/* 3. Package Thread (Teal) */}
          {/* Path: starts at e4 (630, 190) -> e5 (820, 120) */}
          <path
            d="M 580 190 L 630 190 C 710 190, 740 120, 820 120 L 880 120"
            fill="none"
            stroke="#0D9488"
            strokeWidth={getThreadStrokeWidth("package")}
            strokeOpacity={getThreadOpacity("package")}
            strokeLinecap="round"
            className={!motionReduced && !isHovered ? "animate-thread-pulse" : ""}
            style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
          />

          {/* 4. Resource Thread (Amber) */}
          {/* A shared worker/machine thread that touches e2, e3, e4 and extends outward to other executions */}
          <path
            d="M 60 300 C 180 300, 200 190, 270 190 C 340 190, 380 260, 450 260 C 520 260, 560 190, 630 190 C 700 190, 750 300, 880 300"
            fill="none"
            stroke="#D97706"
            strokeWidth={getThreadStrokeWidth("resource")}
            strokeOpacity={getThreadOpacity("resource")}
            strokeLinecap="round"
            strokeDasharray={effectiveType === "resource" ? undefined : "5 5"}
            className={!motionReduced && !isHovered ? "animate-thread-pulse" : ""}
            style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
          />

          {/* Events (Vertical connectors, pill nodes, labels) */}
          {events.map((evt) => {
            const isRelevant = !effectiveType || (evt.involvedTypes as string[]).includes(effectiveType);
            return (
              <g
                key={evt.id}
                className="cursor-pointer transition-opacity duration-300"
                opacity={isRelevant ? 1 : 0.25}
              >
                {/* Time drop line */}
                <line
                  x1={evt.x}
                  y1={45}
                  x2={evt.x}
                  y2={evt.y - 20}
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <circle cx={evt.x} cy={45} r="2.5" fill="#94A3B8" />

                {/* Time stamp label */}
                <text
                  x={evt.x}
                  y={60}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {evt.timeLabel}
                </text>

                {/* Event card node */}
                <rect
                  x={evt.x - 65}
                  y={evt.y - 18}
                  width="130"
                  height="36"
                  rx="6"
                  fill="#FFFFFF"
                  stroke={isRelevant ? "#0B0D0F" : "#CBD5E1"}
                  strokeWidth={isRelevant ? "1.5" : "1"}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.04))"
                />

                {/* Event title */}
                <text
                  x={evt.x}
                  y={evt.y + 4}
                  textAnchor="middle"
                  fill="#0B0D0F"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {evt.name}
                </text>

                {/* Micro dots indicating participating object types */}
                <g transform={`translate(${evt.x - (evt.involvedTypes.length * 10) / 2}, ${evt.y + 24})`}>
                  {evt.involvedTypes.map((typeId, idx) => {
                    const thread = OBJECT_THREADS.find((t) => t.id === typeId);
                    return (
                      <circle
                        key={typeId}
                        cx={idx * 12 + 4}
                        cy="0"
                        r="3.5"
                        fill={thread?.color || "#64748B"}
                      />
                    );
                  })}
                </g>
              </g>
            );
          })}

          {/* Resource callout annotation */}
          <g transform="translate(450, 305)" opacity={effectiveType === "resource" ? 1 : 0.75}>
            <rect
              x="-110"
              y="-12"
              width="220"
              height="24"
              rx="12"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="1"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#92400E"
              fontSize="9.5"
              fontFamily="JetBrains Mono"
              fontWeight="500"
            >
              Resource W-14 touches multiple executions
            </text>
          </g>
        </svg>

        {/* Explanatory footer strip */}
        <div className="mt-2 pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive event-object map: click any chip above to isolate lifecycle</span>
          </div>
          <span className="text-neutral-400">Illustrative OCEL 2.0 graph</span>
        </div>
      </div>
    </div>
  );
};

export default HeroProcessMap;
