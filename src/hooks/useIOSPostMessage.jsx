import { useState, useEffect, useCallback } from "react";

const useIOSPostMessage = () => {
  const [dataFromIOSPostMessage, setDataFromIOSPostMessage] = useState(null);
  const [dataFromIOSPostMessageCustom, setDataFromIOSPostMessageCustom] =
    useState(null);

  const iosPostMessageEventHandlerMessage = useCallback((e) => {
    setDataFromIOSPostMessage(e?.data);
  }, []);

  const iosPostMessageEventHandlerCustom = useCallback((e) => {
    setDataFromIOSPostMessageCustom(e?.token);
  }, []);

  useEffect(() => {
    window.addEventListener("message", iosPostMessageEventHandlerMessage);

    return () => {
      window.removeEventListener("message", iosPostMessageEventHandlerMessage);
    };
  }, [iosPostMessageEventHandlerMessage]);

  useEffect(() => {
    window.addEventListener(
      "iosPostMessageData",
      iosPostMessageEventHandlerCustom
    );

    return () => {
      window.removeEventListener(
        "iosPostMessageData",
        iosPostMessageEventHandlerCustom
      );
    };
  }, [iosPostMessageEventHandlerCustom]);

  return { dataFromIOSPostMessage, dataFromIOSPostMessageCustom };
};

export default useIOSPostMessage;
