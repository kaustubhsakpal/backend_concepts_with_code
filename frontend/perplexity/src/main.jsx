import { createRoot } from "react-dom/client";
import "./App/index.css";

import { Provider } from "react-redux";
import store from './App/App.store.js'
import App from "./App/App.jsx";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
