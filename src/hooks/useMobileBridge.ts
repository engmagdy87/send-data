import { useState, useCallback } from "react";

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
    }

    if (window.webkit?.messageHandlers?.refreshToken) {
      window.webkit.messageHandlers.refreshToken.postMessage(oldToken);
    }
  }, []);

  // Expose to window for native to call
  (window as any).initBreadFast = initBreadFast;
  (window as any).tokenRefreshed = tokenRefreshed;

  return {
    token,
    language,
    refreshToken,
  };
};
