import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Wrapping around a Provider to allow access to the store
  <Provider store={store}>
    <App />
  </Provider>
);
