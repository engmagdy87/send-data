import useIOSPostMessage from "./hooks/useIOSPostMessage";
import useIOSJSInjection from "./hooks/useIOSJSInjection";
import useMobileBridge from "./hooks/useMobileBridge";
import "./App.css";

function App() {
  const dataFromIOSPostMessage = useIOSPostMessage();
  const dataFromIOSJSInjection = useIOSJSInjection();
  const { token, language, refreshToken } = useMobileBridge();

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
  };

  return (
    <>
      <h3>Test Data Transmission Between WebView and iOS App</h3>
      <div className="card-border">
        <h4>Send Data to iOS App using postMessage</h4>
        <button onClick={sendDataToNative}>Send</button>
      </div>
      <div className="card-border">
        <h4>Received Data from iOS app using postMessage</h4>
        {dataFromIOSPostMessage?.dataFromIOSPostMessage ? (
          <p style={{ width: "100%" }}>
            {JSON.stringify(dataFromIOSPostMessage.dataFromIOSPostMessage)}
          </p>
        ) : (
          <p style={{ opacity: 0.4 }}>
            No data received yet using <br />
            postMessage (updated)
          </p>
        )}
        <hr />
        {dataFromIOSPostMessage?.dataFromIOSPostMessageCustom ? (
          <p style={{ width: "100%" }}>
            {JSON.stringify(
              dataFromIOSPostMessage.dataFromIOSPostMessageCustom
            )}
          </p>
        ) : (
          <p style={{ opacity: 0.4 }}>
            No data received yet using
            <br />
            custom postMessage
          </p>
        )}
      </div>
      <div className="card-border">
        <h4>
          Received Data from iOS app using <br /> JS Injection
        </h4>
        {dataFromIOSJSInjection ? (
          <p style={{ width: "100%" }}>
            {JSON.stringify(dataFromIOSJSInjection)}
          </p>
        ) : (
          <p style={{ opacity: 0.4 }}>
            No data received yet using <br />
            JS Injection
          </p>
        )}
      </div>

      <br />
      <br />
      <br />
      <div>
        <h1>Dummy Web</h1>
        <div>Token: {token ?? "No token yet"}</div>
        <div>Language: {language ?? "No language yet"}</div>
        <button onClick={refreshToken}>Refresh Token</button>
      </div>
    </>
  );
}

export default App;
