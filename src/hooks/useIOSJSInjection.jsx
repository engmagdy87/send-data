import { useState, useEffect } from "react";

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
