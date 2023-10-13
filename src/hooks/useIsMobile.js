/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export function useIsMobile(width = 767) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= width);
    }

    // Initial check on mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile };
}
