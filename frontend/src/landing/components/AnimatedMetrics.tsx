import React, { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number; // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number) => string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 900,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatter,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered, value]);

  useEffect(() => {
    if (!hasTriggered) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * value;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasTriggered, value, duration]);

  const formatted = formatter
    ? formatter(displayValue)
    : displayValue.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

interface AnimatedProgressBarProps {
  percentage: number;
  className?: string;
  barClassName?: string;
  durationMs?: number;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  percentage,
  className = "w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden",
  barClassName = "bg-blue-600 h-full rounded-full",
  durationMs = 1000,
}) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setWidth(percentage);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(percentage);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div ref={containerRef} className={className}>
      <div
        className={barClassName}
        style={{
          width: `${width}%`,
          transition: `width ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      />
    </div>
  );
};
