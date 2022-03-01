import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "../Store/configStore";
import App from "./App";

function YourAppName() {
  return (
    <Provider store={store}>
      <ConfigProvider direction="rtl">
        <App />
      </ConfigProvider>
    </Provider>
  );
}

export default YourAppName;
