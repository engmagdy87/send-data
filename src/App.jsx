import useIOSPostMessage from "./hooks/useIOSPostMessage";
import useIOSJSInjection from "./hooks/useIOSJSInjection";
import useRefreshToken from "./hooks/useRefreshToken";
import useUpdateAddress from "./hooks/useUpdateAddress";
import "./App.css";

function App() {
  const dataFromIOSPostMessage = useIOSPostMessage();
  const dataFromIOSJSInjection = useIOSJSInjection();
  const { token, language, refreshToken } = useRefreshToken();
  const { updateAddress } = useUpdateAddress();

  const sendDataToNative = () => {
    updateAddress();
  };

  return (
    <>
      <h3>Test Data Transmission Between WebView and iOS App</h3>
      <div className="card-border">
        <h4>
          Received Data from iOS app using <br /> Functions
        </h4>
        <h5>
          Token will be refresh automatically after 10 sec or by click on the
          button
        </h5>
        <p style={{ width: "100%" }}>
          <div>Token: {token ?? "No token yet"}</div>
          <div>Language: {language ?? "No language yet"}</div>
          <br />
          <button onClick={refreshToken}>Get Refresh Token</button>
        </p>
      </div>
      <div className="card-border">
        <h4>Send Data to Android and iOS App using postMessage</h4>
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
    </>
  );
}

export default App;
