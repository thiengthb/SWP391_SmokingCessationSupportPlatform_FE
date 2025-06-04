import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext";
import ReduxProvider from "./redux/provider/Provider.tsx";
import router from "./router/index.tsx";
import "./index.css";

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
