import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [dataFromIOSPostMessage, setDataFromIOSPostMessage] = useState("");
  const [dataFromIOSJSInjection, setDataFromIOSJSInjection] = useState("");

  useEffect(() => {
    if (window?.iosJSInjectionData) {
      setDataFromIOSJSInjection(window.iosJSInjectionData);
    }
  }, []);

  const iosPostMessageEventHandler = useCallback((e) => {
    setDataFromIOSPostMessage(e.detail.data);
  }, []);

  useEffect(() => {
    window.addEventListener("iosPostMessageData", iosPostMessageEventHandler);

    return () => {
      window.removeEventListener(
        "iosPostMessageData",
        iosPostMessageEventHandler
      );
    };
  }, [iosPostMessageEventHandler]);

  const sendDataToNative = () => {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.updateAddress
    ) {
      window.webkit.messageHandlers.updateAddress.postMessage({
        message: "Hello iOS Native App!",
      });
    }
    alert(
      "Sent data => " + JSON.stringify({ message: "Hello iOS Native App!" })
    );
  };

  return (
    <>
      <h2>Test Data Transmission Between WebView and iOS App</h2>
      <div className="card">
        <button onClick={sendDataToNative}>Send Data To Native iOS App</button>
      </div>
      <div className="card-border">
        <h3>Received Data from iOS app using postMessage:</h3>
        {dataFromIOSPostMessage ? (
          <p style={{ width: "100%" }}>
            {JSON.stringify(dataFromIOSPostMessage)}
          </p>
        ) : (
          <p style={{ opacity: 0.4 }}>No data received yet using postMessage</p>
        )}
      </div>
      <br />
      <br />
      <div className="card-border">
        <h3>Received Data from iOS app using JS Injection:</h3>
        {dataFromIOSJSInjection ? (
          <p style={{ width: "100%" }}>
            {JSON.stringify(dataFromIOSJSInjection)}
          </p>
        ) : (
          <p style={{ opacity: 0.4 }}>
            No data received yet using JS Injection
          </p>
        )}
      </div>
    </>
  );
}

export default App;
