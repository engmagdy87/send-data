import { useState, useEffect } from "react";

const useIOSJSInjection = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  useEffect(() => {
    const handleUserDataReceived = (event) => {
      const { user, token } = event.detail;
      console.log("Received from iOS event:", { user, token });
      setUser(user);
      setToken(token);
    };

    // Listen for the custom event dispatched by iOS
    window.addEventListener("userDataReceived", handleUserDataReceived);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("userDataReceived", handleUserDataReceived);
    };
  }, []);

  // Optional: Handle manual calls to window.receiveToken after initial injection
  useEffect(() => {
    if (window.receiveToken) {
      const originalReceiveToken = window.receiveToken;
      window.receiveToken = (user, token) => {
        console.log("Manual call to receiveToken:", { user, token });
        setUser(user);
        setToken(token);
        originalReceiveToken(user, token); // Preserve original behavior (localStorage, event)
      };
    }
  }, []);

  return { user, token };
};

export default useIOSJSInjection;
