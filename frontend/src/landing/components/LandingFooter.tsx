import React from "react";
import { TotemMark } from "./TotemMark";
import { GITHUB_REPO_URL, LANDING_NAV_LINKS } from "../content";
import { ArrowRight, Github, Download, BookOpen, Scale } from "lucide-react";

export const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Optional desktop download URL from environment
  const desktopDownloadUrl = import.meta.env.VITE_DESKTOP_DOWNLOAD_URL;

  return (
    <footer className="w-full bg-[#F7F7F2] text-[#0B0D0F]">
      {/* FINAL CTA SECTION */}
      <div className="py-24 sm:py-32 border-b border-[#E4E4E7] relative overflow-hidden">
        {/* Converging Thread Visual Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40" aria-hidden="true">
          <svg viewBox="0 0 1000 400" className="w-full h-full max-w-5xl">
            {/* 4 threads converging into the center */}
            <path d="M 0 50 C 300 50, 400 200, 500 200" stroke="#2563EB" strokeWidth="2.5" fill="none" strokeDasharray="6 6" />
            <path d="M 0 150 C 300 150, 400 200, 500 200" stroke="#8B5CF6" strokeWidth="2.5" fill="none" strokeDasharray="6 6" />
            <path d="M 1000 50 C 700 50, 600 200, 500 200" stroke="#0D9488" strokeWidth="2.5" fill="none" strokeDasharray="6 6" />
            <path d="M 1000 150 C 700 150, 600 200, 500 200" stroke="#D97706" strokeWidth="2.5" fill="none" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Dual-T Center Icon */}
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-2xl bg-black text-white shadow-lg">
            <TotemMark size={36} primaryColor="#FFFFFF" secondaryColor="#60A5FA" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-4">
            Stop flattening the process. Start following the objects.
          </h2>

          <p className="text-base sm:text-lg font-mono text-neutral-600 mb-10 tracking-wide">
            Import · Discover · Inspect · Edit · Check · Simulate
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0B0D0F] hover:bg-neutral-800 text-white text-sm font-semibold shadow-sm transition hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Github className="w-4 h-4" />
              <span>Explore on GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#why"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("why")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-semibold border border-neutral-300 shadow-2xs transition cursor-pointer"
            >
              <span>Why Object-Centric?</span>
            </a>

            {/* Conditional Desktop Download */}
            {desktopDownloadUrl && (
              <a
                href={desktopDownloadUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold border border-blue-200 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Desktop Build</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER METADATA & LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#E4E4E7]">
          {/* Brand & Attribution */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <TotemMark size={24} primaryColor="#0B0D0F" secondaryColor="#2563EB" />
              <span className="font-bold text-lg tracking-tight font-sans">TOTeM</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              The open-source workbench for object-centric process mining, modeling, and conformance checking.
            </p>
            <p className="text-[11px] text-neutral-500 font-sans italic">
              An open-source object-centric process-mining project developed in the research environment of RWTH Aachen University.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-6 text-xs font-mono text-neutral-600" aria-label="Footer Navigation">
            {LANDING_NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-black transition"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`${GITHUB_REPO_URL}/blob/main/README.md`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition inline-flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              <span>Docs</span>
            </a>
            <a
              href={`${GITHUB_REPO_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition inline-flex items-center gap-1"
            >
              <Scale className="w-3 h-3" />
              <span>MIT License</span>
            </a>
          </nav>
        </div>

        {/* Copyright & Technical Footnote */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-neutral-500">
          <div>
            © {currentYear} Lukas Liss & contributors · RWTH Aachen University Chair of Process and Data Science (PADS)
          </div>
          <div>
            Native OCEL 2.0 · DuckDB Core · React 19 · Python totem-tool
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
