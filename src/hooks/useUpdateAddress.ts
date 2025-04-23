import { useCallback } from "react";

export const useUpdateAddress = () => {
  // Send refreshToken message to Android
  const sendMessageToAndroid = useCallback(() => {
    if (window.AndroidBridge?.updateAddress) {
      window.AndroidBridge.updateAddress({
        message: "Hello Android Native App from updateAddress!",
      });
    }
  }, []);

  // Send refreshToken message to iOS
  const sendMessageToiOS = useCallback(() => {
    if (window.webkit?.messageHandlers?.updateAddress) {
      window.webkit.messageHandlers.updateAddress.postMessage({
        message: "Hello iOS Native App from updateAddress!",
      });
    }
  }, []);

  // Trigger refreshToken for both platforms
  const updateAddress = useCallback(() => {
    sendMessageToAndroid();
    sendMessageToiOS();
  }, [sendMessageToAndroid, sendMessageToiOS]);

  return {
    updateAddress,
  };
};

export default useUpdateAddress;
