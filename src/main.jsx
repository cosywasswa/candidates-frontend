import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.jsx";
import store from "./components/redux/store.js";
import { UserProvider } from "./components/authentication/context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  </StrictMode>
);
