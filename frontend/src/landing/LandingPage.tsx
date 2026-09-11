import React, { useEffect } from "react";
import { ArrowRight, Github } from "lucide-react";
import { LandingNav } from "./components/LandingNav";
import { HeroProcessMap } from "./components/HeroProcessMap";
import { ObjectCentricComparison } from "./components/ObjectCentricComparison";
import { WorkflowStory } from "./components/WorkflowStory";
import { ProcessAreaStory } from "./components/ProcessAreaStory";
import { ModelLanguageTabs } from "./components/ModelLanguageTabs";
import { ConformanceStory } from "./components/ConformanceStory";
import { WorkbenchMosaic } from "./components/WorkbenchMosaic";
import { PlayoutStory } from "./components/PlayoutStory";
import { ResearchSection } from "./components/ResearchSection";
import { LandingFaq } from "./components/LandingFaq";
import { LandingFooter } from "./components/LandingFooter";
import { TRUST_STRIP, GITHUB_REPO_URL } from "./content";
import "./landing.css";

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO title
    const originalTitle = document.title;
    document.title = "TOTeM — Object-Centric Process Mining";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const handleScrollToWorkflow = () => {
    const el = document.getElementById("workflow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="totem-landing-root flex flex-col min-h-screen">
      {/* Accessible skip link */}
      <a href="#main-content" className="totem-skip-link">
        Skip to main content
      </a>

      {/* Sticky Header Navigation */}
      <LandingNav />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 w-full">
        {/* SECTION 2 — HERO */}
        <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E4E4E7] totem-grid-bg relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono font-medium text-neutral-700 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>OPEN-SOURCE OBJECT-CENTRIC PROCESS MINING</span>
              </div>

              {/* Primary H1 */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0B0D0F] leading-[1.08] font-sans">
                See the process{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    between the objects.
                  </span>
                  <span
                    className="absolute left-0 bottom-1.5 w-full h-3 bg-blue-100/60 -z-0 rounded"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-sans max-w-3xl mx-auto">
                TOTeM turns OCEL 2.0 event data into process areas, variants, object-centric models,
                and conformance evidence—without forcing complex operations into a single case notion.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B0D0F] hover:bg-neutral-800 text-white text-sm font-semibold shadow-xs transition hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
                >
                  <Github className="w-4 h-4" />
                  <span>Explore on GitHub</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleScrollToWorkflow}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-semibold border border-neutral-300 shadow-2xs transition cursor-pointer"
                >
                  <span>Explore the workflow</span>
                </button>

                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-mono text-neutral-600 hover:text-black transition"
                >
                  <span>Documentation & FAQ</span>
                </a>
              </div>

              {/* Restrained Trust Strip */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {TRUST_STRIP.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 bg-white/70 backdrop-blur-xs border border-neutral-200 rounded-lg text-left shadow-2xs"
                  >
                    <div className="text-xs font-mono font-bold text-neutral-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      {item.label}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-sans mt-0.5">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Living Process Map Inline SVG */}
            <HeroProcessMap />
          </div>
        </section>

        {/* SECTION 3 — WHY OBJECT-CENTRIC */}
        <ObjectCentricComparison />

        {/* SECTION 4 — 6-STAGE WORKFLOW */}
        <WorkflowStory />

        {/* SECTION 5 — PROCESS AREA DECOMPOSITION (Dark Theater) */}
        <ProcessAreaStory />

        {/* SECTION 6 — 4 MODEL FORMALISMS & OCEL EDITOR */}
        <ModelLanguageTabs />

        {/* SECTION 7 — CONFORMANCE & DIAGNOSTICS */}
        <ConformanceStory />

        {/* SECTION 8 — WORKBENCH BENTO & DUCKDB SQL */}
        <WorkbenchMosaic />

        {/* SECTION 9 — PLAYOUT SIMULATION */}
        <PlayoutStory />

        {/* SECTION 10 — RESEARCH & CITATIONS */}
        <ResearchSection />

        {/* SECTION 11 — FAQ ACCORDION */}
        <LandingFaq />

        {/* SECTION 12 & 13 — FINAL CTA & FOOTER */}
        <LandingFooter />
      </main>
    </div>
  );
};

export default LandingPage;
