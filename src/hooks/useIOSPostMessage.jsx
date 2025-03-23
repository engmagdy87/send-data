import { useState, useEffect, useCallback } from "react";

const useIOSPostMessage = () => {
  const [dataFromIOSPostMessage, setDataFromIOSPostMessage] = useState(null);

  const iosPostMessageEventHandler = useCallback((e) => {
    setDataFromIOSPostMessage(e.data);
  }, []);

  useEffect(() => {
    window.addEventListener("message", iosPostMessageEventHandler);

    return () => {
      window.removeEventListener("message", iosPostMessageEventHandler);
    };
  }, [iosPostMessageEventHandler]);

  return dataFromIOSPostMessage;
};

export default useIOSPostMessage;
