import React, { useState } from "react";
import { FAQ_ITEMS } from "../content";
import { ChevronDown } from "lucide-react";

export const LandingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="totem-section-target py-20 sm:py-32 border-b border-[#E4E4E7] bg-[#F7F7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0D0F] leading-tight mb-4">
            Clear answers about object-centric process mining.
          </h2>
          <p className="text-base text-neutral-600 font-sans">
            Technical and architectural details grounded in the current codebase.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="rounded-xl border border-[#E4E4E7] bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans font-semibold text-sm sm:text-base text-[#0B0D0F] hover:bg-neutral-50 transition cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-black" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="px-5 pb-5 pt-1 text-sm text-neutral-600 font-sans leading-relaxed border-t border-neutral-100"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFaq;
