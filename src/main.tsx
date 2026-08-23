import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./lib/theme";
import { StoreProvider } from "./lib/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>,
);
