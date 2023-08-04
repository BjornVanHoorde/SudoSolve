const { useState, useEffect } = require("react");

export const usePageFocus = () => {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // Listen for focus and blur events
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return isFocused;
};
