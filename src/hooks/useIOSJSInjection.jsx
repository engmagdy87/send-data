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

    window.addEventListener("userDataReceived", handleUserDataReceived);
    return () =>
      window.removeEventListener("userDataReceived", handleUserDataReceived);
  }, []);

  useEffect(() => {
    if (window.receiveToken) {
      const originalReceiveToken = window.receiveToken;
      window.receiveToken = (user, token) => {
        console.log("Manual call to receiveToken:", { user, token });
        setUser(user);
        setToken(token);
        originalReceiveToken(user, token); // Preserve localStorage and event dispatch
      };
    }
  }, []);

  return { user, token };
};

export default useIOSJSInjection;
