import React from "react";

interface ProductWindowProps {
  title: string;
  viewLabel?: string;
  caption?: string;
  imageSrc?: string;
  imageAlt?: string;
  eager?: boolean;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Clean architectural frame for displaying authentic repository screenshots
 * and live interactive workbench mockups without fake browser URLs.
 */
export const ProductWindow: React.FC<ProductWindowProps> = ({
  title,
  viewLabel,
  caption,
  imageSrc,
  imageAlt,
  eager = false,
  dark = false,
  className = "",
  children,
}) => {
  return (
    <figure
      className={`rounded-lg border overflow-hidden transition-shadow duration-300 ${
        dark
          ? "bg-[#14181F] border-[#242B35] text-slate-100 shadow-xl shadow-black/40"
          : "bg-white border-[#E4E4E7] text-[#0B0D0F] shadow-sm hover:shadow-md"
      } ${className}`}
    >
      {/* Restrained window header */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between text-xs select-none ${
          dark ? "bg-[#0D1014]/80 border-[#242B35]" : "bg-neutral-50/80 border-[#E4E4E7]"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[11px] font-medium tracking-tight truncate ml-1">
            {title}
          </span>
        </div>
        {viewLabel && (
          <span
            className={`font-mono text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
              dark
                ? "bg-[#242B35] text-slate-300"
                : "bg-neutral-200/70 text-neutral-700"
            }`}
          >
            {viewLabel}
          </span>
        )}
      </div>

      {/* Body content */}
      <div className="relative w-full overflow-hidden bg-neutral-900/5">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-auto block object-contain select-none"
          />
        ) : (
          children
        )}
      </div>

      {caption && (
        <figcaption
          className={`px-3 py-2 text-xs border-t font-sans leading-relaxed ${
            dark
              ? "bg-[#0D1014]/60 border-[#242B35] text-slate-400"
              : "bg-neutral-50/50 border-[#E4E4E7] text-neutral-600"
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ProductWindow;
