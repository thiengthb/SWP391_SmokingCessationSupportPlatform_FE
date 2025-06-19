import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import ReduxProvider from "./redux/provider/Provider.tsx";
import router from "./router/index.tsx";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ReduxProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReduxProvider>
    </AuthProvider>
  </StrictMode>
);
