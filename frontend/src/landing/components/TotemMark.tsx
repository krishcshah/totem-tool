import React from "react";

interface TotemMarkProps {
  size?: number | string;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  ariaHidden?: boolean;
}

/**
 * Reusable inline SVG component for the TOTeM dual-T mark.
 * Faithfully matches the geometry in `frontend/public/favicon.svg`.
 */
export const TotemMark: React.FC<TotemMarkProps> = ({
  size = 32,
  className = "",
  primaryColor = "currentColor",
  secondaryColor = "currentColor",
  title = "TOTeM mark",
  ariaHidden = false,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={className}
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden ? "true" : undefined}
      aria-label={ariaHidden ? undefined : title}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <g>
        <g transform="translate(123, 123) scale(0.5557)" fill={primaryColor}>
          <path d="M 0 0 H 800 V 160 H 500 V 1000 H 300 V 160 H 0 Z" />
        </g>
        <g transform="translate(456, 345) scale(0.5557)" fill={secondaryColor}>
          <path d="M 0 0 H 800 V 160 H 500 V 1000 H 300 V 160 H 0 Z" />
        </g>
      </g>
    </svg>
  );
};

export default TotemMark;
