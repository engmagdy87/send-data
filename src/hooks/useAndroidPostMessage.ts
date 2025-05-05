import { useState, useEffect, useCallback } from "react";

const useAndroidPostMessage = () => {
  const [dataFromAndroidPostMessage, setDataFromAndroidPostMessage] =
    useState(null);
  const [
    dataFromAndroidPostMessageCustom,
    setDataFromAndroidPostMessageCustom,
  ] = useState(null);

  const androidPostMessageEventHandlerMessage = useCallback((e) => {
    if (e.origin.includes("freshchat")) return;
    setDataFromAndroidPostMessage(e?.data);
  }, []);

  const androidPostMessageEventHandlerCustom = useCallback((e) => {
    setDataFromAndroidPostMessageCustom(e?.detail);
  }, []);

  useEffect(() => {
    window.addEventListener("message", androidPostMessageEventHandlerMessage);

    return () => {
      window.removeEventListener(
        "message",
        androidPostMessageEventHandlerMessage
      );
    };
  }, [androidPostMessageEventHandlerMessage]);

  useEffect(() => {
    window.addEventListener(
      "androidPostMessageData",
      androidPostMessageEventHandlerCustom
    );

    return () => {
      window.removeEventListener(
        "androidPostMessageData",
        androidPostMessageEventHandlerCustom
      );
    };
  }, [androidPostMessageEventHandlerCustom]);

  return { dataFromAndroidPostMessage, dataFromAndroidPostMessageCustom };
};

export default useAndroidPostMessage;
