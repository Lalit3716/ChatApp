import { useState, useEffect } from "react";

export default (mediaQuery: string) => {
  const [matches, setMatches] = useState(window.matchMedia(mediaQuery).matches);

  const handleChange = (e: MediaQueryListEvent) => {
    setMatches(e.matches);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [matches]);

  return matches;
};
