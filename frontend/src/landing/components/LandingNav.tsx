import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github, ArrowRight, Download } from "lucide-react";
import { TotemMark } from "./TotemMark";
import { LANDING_NAV_LINKS, GITHUB_REPO_URL } from "../content";

export const LandingNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopDownloadUrl = import.meta.env.VITE_DESKTOP_DOWNLOAD_URL;

  // Scroll listener for sticky elevation and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to detect active section
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
        }
      );

      LANDING_NAV_LINKS.forEach((item) => {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        isScrolled
          ? "bg-[#F7F7F2]/80 backdrop-blur-xl backdrop-saturate-180 border-b border-black/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand lockup */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[#0B0D0F] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-blue-600 rounded-sm"
            aria-label="TOTeM Home"
          >
            <TotemMark size={28} primaryColor="#0B0D0F" secondaryColor="#2563EB" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="font-sans font-bold text-lg tracking-tight leading-none text-[#0B0D0F]">
                TOTeM
              </span>
              <span className="hidden md:inline-block text-[11px] font-mono text-neutral-500 tracking-normal border-l border-neutral-300 pl-2">
                Object-centric process mining
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop navigation links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {LANDING_NAV_LINKS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "text-[#0B0D0F] font-semibold bg-black/5"
                    : "text-neutral-600 hover:text-black hover:bg-black/5"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Conditional Desktop Installer Download */}
          {desktopDownloadUrl && (
            <a
              href={desktopDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-700 hover:text-black border border-[#E4E4E7] bg-white rounded-md transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label="Download Desktop application (opens in new tab)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Desktop</span>
            </a>
          )}

          {/* Primary CTA: Open GitHub */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0B0D0F] hover:bg-neutral-800 rounded-md shadow-xs transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
            aria-label="Explore TOTeM on GitHub (opens in new tab)"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-[#0B0D0F] rounded-md"
            aria-label="Explore TOTeM on GitHub (opens in new tab)"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#E4E4E7] bg-[#F7F7F2] px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {LANDING_NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-200/60 rounded-md transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0B0D0F] rounded-md shadow-xs"
              aria-label="Explore TOTeM on GitHub (opens in new tab)"
            >
              <Github className="w-4 h-4" />
              <span>Explore on GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNav;
