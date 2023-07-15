import { createContext, useEffect, useState } from "react";

export const isMobileContext = createContext({});

export const IsMobileProvider = (props) => {
  const children = props.children;

  const [isMobile, setIsMobile] = useState();

  const checkIfMobile = () => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Mobile|iPhone|iPad|iPod|Android/i;
    const isMobileDevice = mobileRegex.test(userAgent);
    return isMobileDevice;
  };

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(checkIfMobile());
      }, 1); // Adjust the debounce delay as needed
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <isMobileContext.Provider value={{ isMobile }}>
      {children}
    </isMobileContext.Provider>
  );
};
