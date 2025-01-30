import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { QuizzesProvider } from "./context/quizzesContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <UserProvider>
      <SearchProvider>
        <QuizzesProvider>
          <div id="modal-root">
            <App />
          </div>
        </QuizzesProvider>
      </SearchProvider>
    </UserProvider>
  // </StrictMode>
);
