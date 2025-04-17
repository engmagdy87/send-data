import { useState, useEffect } from "react";

// Extend the Window interface to include iosJSInjectionData
declare global {
  interface Window {
    iosJSInjectionData?: any;
  }
}

const useIOSJSInjection = () => {
  const [dataFromIOSJSInjection, setDataFromIOSJSInjection] = useState(null);

  useEffect(() => {
    if (window?.iosJSInjectionData) {
      setDataFromIOSJSInjection(window.iosJSInjectionData);
    }
  }, []);

  return dataFromIOSJSInjection;
};

export default useIOSJSInjection;
