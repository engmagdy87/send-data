import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [dataFromIOS, setDataFromIOS] = useState("");

  useEffect(() => {
    window.addEventListener("iosEvent", iosEventHandler);

    return () => {
      window.removeEventListener("iosEvent", iosEventHandler);
    };
  }, []);

  const iosEventHandler = useCallback(
    (e) => {
      alert(e.detail.data);
      console.log(e.detail.data);
      setDataFromIOS(e.detail.data);
    },
    [setDataFromIOS]
  );

  const sendDataToNative = () => {
    // if (window.Android) {
    //   // Android
    //   window.Android.sendData(
    //     JSON.stringify({ message: "Hello Android Native App!" })
    //   );
    // } else
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.updateAddress
    ) {
      // iOS
      window.webkit.messageHandlers.updateAddress.postMessage({
        message: "Hello iOS Native App!",
      });
    }
  };

  return (
    <>
      <h2>Test Data Transmission Between WebView and iOS App</h2>
      <div className="card">
        <button onClick={sendDataToNative}>Send Data To Native App</button>
      </div>
      {dataFromIOS && (
        <>
          <p>Received Data from iOS appp</p>
          <p style={{ width: "100%" }}>{JSON.stringify(dataFromIOS)}</p>
        </>
      )}
    </>
  );
}

export default App;
