import { useState, useCallback, useEffect } from "react";

declare global {
  interface Window {
    AndroidBridge?: {
      refreshToken: (token: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        refreshToken?: {
          postMessage: (token: string) => void;
        };
      };
    };
  }
}

export const useMobileBridge = () => {
  const [token, setToken] = useState<string>("defaultToken"); // Initialize with default token
  const [language, setLanguage] = useState<string | null>(null);

  // Called by native app after WebView loads
  const initBreadFast = useCallback((tokenFromNative: string, lang: string) => {
    setToken(tokenFromNative);
    setLanguage(lang);
    console.log(
      `initBreadFast called - Token: ${tokenFromNative}, Language: ${lang}`
    );
  }, []);

  // Called by native app after refreshing token
  const tokenRefreshed = useCallback((newToken: string) => {
    setToken(newToken);
    console.log(`tokenRefreshed called - New Token: ${newToken}`);
  }, []);

  // Send refreshToken message to Android
  const sendMessageToAndroid = useCallback(() => {
    const oldToken = "Old Token";
    if (window.AndroidBridge?.refreshToken) {
      window.AndroidBridge.refreshToken(oldToken);
      console.log("Sent refreshToken to Android");
    } else {
      console.log("AndroidBridge not available");
    }
  }, []);

  // Send refreshToken message to iOS
  const sendMessageToiOS = useCallback(() => {
    const oldToken = "Old Token";
    if (window.webkit?.messageHandlers?.refreshToken) {
      window.webkit.messageHandlers.refreshToken.postMessage(oldToken);
      console.log("Sent refreshToken to iOS");
    } else {
      console.log("webkit.messageHandlers.refreshToken not available");
    }
  }, []);

  // Trigger refreshToken for both platforms
  const refreshToken = useCallback(() => {
    sendMessageToAndroid();
    sendMessageToiOS();
  }, [sendMessageToAndroid, sendMessageToiOS]);

  // Set up interval to call refreshToken every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
      console.log("Automatic refreshToken triggered");
    }, 10000); // 10 seconds in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [refreshToken]);

  // Log token changes for debugging
  useEffect(() => {
    console.log("Current token:", token);
  }, [token]);

  // Expose to window for native to call
  (window as any).initBreadFast = initBreadFast;
  (window as any).tokenRefreshed = tokenRefreshed;

  return {
    token,
    language,
    refreshToken,
  };
};

export default useMobileBridge;
