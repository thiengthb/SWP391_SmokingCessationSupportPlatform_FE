import { useState, useEffect } from "react";

/**
 * A custom hook that checks if a media query matches
 * @param query The media query to check
 * @returns A boolean indicating whether the media query matches
 * @example
 * const isDesktop = useMediaQuery("(min-width: 768px)");
 * if (isDesktop) {
 *   // do something for desktop
 * }
 */
export function useMediaQuery(query: string): boolean {
  // Initialize state with a function to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Exit early if we're not in a browser environment
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    // Set initial match
    setMatches(mediaQueryList.matches);

    // Create event listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
      return () => {
        mediaQueryList.removeEventListener("change", handleChange);
      };
    } 
    // Fallback for older browsers (e.g. Safari < 14)
    else {
      // @ts-ignore - TypeScript doesn't know about this deprecated API
      mediaQueryList.addListener(handleChange);
      return () => {
        // @ts-ignore
        mediaQueryList.removeListener(handleChange);
      };
    }
  }, [query]); // Re-run effect if query changes

  return matches;
}
