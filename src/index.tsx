import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configStore";
import App from "./App";
import "antd/dist/reset.css";
import "./styles/index.scss";
console.log("init");
console.log({ store: store.getState() });

const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
