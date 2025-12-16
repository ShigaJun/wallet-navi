import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.querySelector("#content")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
