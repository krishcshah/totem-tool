import React, { useState } from "react";
import { RESEARCH_CITATIONS } from "../content";
import { Terminal, Check, Copy, ExternalLink } from "lucide-react";

export const ResearchSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("pip install totem-lib");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="totem-section-target py-20 sm:py-32 border-b border-[#E4E4E7] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
            RESEARCH SOFTWARE, BUILT TO BE USED
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-6">
            Formal models. Inspectable implementation. Practical workbench.
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed font-sans totem-measure">
            Developed through object-centric process-mining research at RWTH Aachen University,
            TOTeM brings research models and algorithms into an open, hands-on environment for
            exploring real event data.
          </p>
        </div>

        {/* Research Publication Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
          {RESEARCH_CITATIONS.map((paper) => (
            <article
              key={paper.title}
              className="rounded-xl border border-[#E4E4E7] bg-[#F7F7F2] p-6 shadow-xs flex flex-col justify-between h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="font-bold text-black">{paper.venue}</span>
                  <span>{paper.year}</span>
                </div>

                <h3 className="font-sans font-bold text-base text-[#0B0D0F] leading-snug">
                  {paper.title}
                </h3>

                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {paper.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">{paper.authors}</span>
                {paper.link && (
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
                    aria-label={`DOI publication for ${paper.title} (opens in new tab)`}
                  >
                    <span>DOI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Architecture Pipeline Strip */}
        <div className="rounded-xl border border-[#E4E4E7] bg-[#F7F7F2] p-6 sm:p-8 mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block">
                MODULAR ARCHITECTURE
              </span>
              <h3 className="text-xl font-bold text-[#0B0D0F]">
                Five decoupled layers. One coherent platform.
              </h3>
            </div>
            <p className="text-xs text-neutral-500 font-mono">
              Use and evolve each subsystem independently
            </p>
          </div>

          {/* Pipeline flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center font-mono text-xs">
            <div className="p-3 bg-white rounded border border-[#E4E4E7] shadow-2xs">
              <div className="font-bold text-black">React 19 + TS</div>
              <div className="text-[10px] text-neutral-500 mt-1">Interactive UI & Editors</div>
            </div>
            <div className="p-3 bg-white rounded border border-[#E4E4E7] shadow-2xs">
              <div className="font-bold text-black">Django REST</div>
              <div className="text-[10px] text-neutral-500 mt-1">Thin API & Sessions</div>
            </div>
            <div className="p-3 bg-white rounded border border-blue-300 shadow-2xs">
              <div className="font-bold text-blue-600">totem-lib</div>
              <div className="text-[10px] text-blue-700 mt-1">Python Analysis Core</div>
            </div>
            <div className="p-3 bg-white rounded border border-[#E4E4E7] shadow-2xs">
              <div className="font-bold text-black">DuckDB</div>
              <div className="text-[10px] text-neutral-500 mt-1">Columnar OCEL Storage</div>
            </div>
            <div className="p-3 bg-white rounded border border-[#E4E4E7] shadow-2xs">
              <div className="font-bold text-black">Electron / Web</div>
              <div className="text-[10px] text-neutral-500 mt-1">Desktop & Hosted Shell</div>
            </div>
          </div>
        </div>

        {/* Standalone Python Core: Terminal Panel */}
        <div className="rounded-xl border border-[#E4E4E7] bg-[#0D1014] text-slate-100 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="font-sans font-bold text-lg text-white">
                Use the analysis core without the web interface.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-xl">
              <code className="text-emerald-400 font-mono">totem-lib</code> has no web or UI
              dependencies. Import OCEL 2.0 logs, mine temporal relations, discover process areas,
              and check conformance directly from Python.
            </p>
          </div>

          {/* Terminal Command Snippet */}
          <div className="flex items-center gap-3 bg-[#161C26] border border-[#232B36] rounded-lg px-4 py-3 font-mono text-xs text-slate-200 shrink-0">
            <span className="text-slate-500 select-none">$</span>
            <span className="text-emerald-400 font-semibold">pip install totem-lib</span>
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
              title="Copy install command"
              aria-label="Copy pip install command"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
