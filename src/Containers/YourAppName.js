import { Provider } from "react-redux";
import store from "../Store/configStore";
import App from "./App";

function YourAppName() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default YourAppName;
