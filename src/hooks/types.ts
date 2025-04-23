export {};

declare global {
  interface Window {
    AndroidBridge?: {
      updateAddress: (data: { message: string }) => void;
      refreshToken: (token: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        updateAddress?: {
          postMessage: (data: { message: string }) => void;
        };
        refreshToken?: {
          postMessage: (token: string) => void;
        };
      };
    };
  }
}
