import { ConfigProvider } from "antd";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../Store/configStore";
import App from "./App";
import Auth from "../Helpers/Auth";
import { useEffect } from "react";

localStorage.setItem(
  "refresh",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0OTAwMjAzMiwianRpIjoiMGZhZGU2ZDc5YmQ1NDM0NDg2YTg2OGUwODAwOTdlYzEiLCJ1c2VyX2lkIjozfQ.jy6N21iPoadoCpS3HMrbgUC2OVwlX1WMRrF3emJ_4t0"
);

localStorage.setItem(
  "access",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ4OTE1OTMyLCJqdGkiOiJkZmU3NjUzNWVlY2M0MWM5YTk0ZTU2ZTI5YmIxYmNjMCIsInVzZXJfaWQiOjN9.fW4teSK_8oeLKeuaJ1usuDbP0PyTn3Eq2l9GLmQ4GDU"
);

axios.defaults.baseURL = "http://lapluse.ir/examapi";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + Auth.getToken("access");

axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    if (err.response.status === 401) {
      console.log("refreshing access !");
      const access = await Auth.checkLogin();
      localStorage.setItem("access", access);
      config.headers["Authorization"] = "Bearer " + access;
      return axios(config);
    }

    return Promise.reject(err);
  }
);

function YourAppName() {
  useEffect(() => {
    const isLoggedIn = Auth.isLoggedIn();
    if (!isLoggedIn) {
      window.location.replace("http://lapluse.ir/exam-login/");
      return;
    }
    axios.get("/panel/").then((res) => {
      const role = res.data.role;
      console.log(role);
      if (role !== "student") {
        window.location.replace("http://lapluse.ir/exam-login/");
      }
    });
  });

  return (
    <Provider store={store}>
      <ConfigProvider direction="rtl">
        <App />
      </ConfigProvider>
    </Provider>
  );
}

export default YourAppName;
