import { ConfigProvider } from "antd";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../Store/configStore";
import App from "./App";

axios.defaults.baseURL = "http://51.89.109.247:8000";

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
