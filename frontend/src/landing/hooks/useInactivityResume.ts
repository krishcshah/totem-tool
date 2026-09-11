import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Hook to manage auto-playing tabs/carousels that automatically resumes
 * auto-cycling after a specified period of user inactivity (default: 30 seconds).
 */
export function useInactivityResume(initial = true, delayMs = 30000) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(initial);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, delayMs);
  }, [delayMs]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return { isAutoPlaying, setIsAutoPlaying, pauseAutoPlay };
}
