import { useState, useEffect } from "react";

const useIOSJSInjection = () => {
  // const [dataFromIOSJSInjection, setDataFromIOSJSInjection] = useState(null);

  // useEffect(() => {
  //   if (window?.iosJSInjectionData) {
  //     setDataFromIOSJSInjection(window.iosJSInjectionData);
  //   }
  // }, []);

  // return dataFromIOSJSInjection;

  //----------------------------

  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if window.receiveToken exists and override it to update React state
    alert;
    if (window.receiveToken) {
      // const originalReceiveToken = window.receiveToken;
      window.receiveToken = (user, token) => {
        console.log("Received token from iOS in React:", token);
        setAuthToken(token); // Set React state
        setUser(user); // Set React state
        // originalReceiveToken(token); // Call original to keep localStorage behavior
      };

      // If the token was already set before React mounted, retrieve it from localStorage
      // const storedToken = localStorage.getItem("authToken");
      // if (storedToken) {
      //   setAuthToken(storedToken);
      // }
    }
  }, []);

  useEffect(() => {
    const handleTokenReceived = (event) => {
      setAuthToken(event.detail); // Update state with token from event
    };

    window.addEventListener("tokenReceived", handleTokenReceived);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("tokenReceived", handleTokenReceived);
    };
  }, []);

  return { user, token: authToken };
};

export default useIOSJSInjection;
