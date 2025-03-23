import { useState, useEffect, useCallback } from "react";

const useIOSPostMessage = () => {
  const [dataFromIOSPostMessage, setDataFromIOSPostMessage] = useState(null);

  const iosPostMessageEventHandler = useCallback((e) => {
    setDataFromIOSPostMessage(e.detail.data);
  }, []);

  useEffect(() => {
    window.addEventListener("iosPostMessageData", iosPostMessageEventHandler);

    return () => {
      window.removeEventListener(
        "iosPostMessageData",
        iosPostMessageEventHandler
      );
    };
  }, [iosPostMessageEventHandler]);

  return dataFromIOSPostMessage;
};

export default useIOSPostMessage;
