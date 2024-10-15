import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {HashRouter} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
    <Provider store={store}>
            <App />
    </Provider>
    </HashRouter>
  </StrictMode>
);
