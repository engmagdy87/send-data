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
  const [token, setToken] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  // Called by native app after WebView loads
  const initBreadFast = useCallback((tokenFromNative: string, lang: string) => {
    setToken(tokenFromNative);
    setLanguage(lang);
  }, []);

  // Called by native app after refreshing token
  const tokenRefreshed = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  // Trigger native apps to refresh token
  const refreshToken = useCallback(() => {
    const oldToken = "Old Token";

    if (window.AndroidBridge?.refreshToken) {
      window.AndroidBridge.refreshToken(oldToken);
      console.log("Sent refreshToken to Android");
    }

    if (window.webkit?.messageHandlers?.refreshToken) {
      window.webkit.messageHandlers.refreshToken.postMessage(oldToken);
      console.log("Sent refreshToken to iOS");
    }
  }, []);

  // Set up interval to call refreshToken every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 10000); // 10 seconds in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [refreshToken]);

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
