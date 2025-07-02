import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReduxProvider from "./redux/provider/Provider.tsx";
import router from "./router/index.tsx";
import "./index.css";
import { FTNDProvider } from "@/contexts/FTNDContext";
import { SettingProvider } from "./contexts/SettingContext.tsx";
import { Theme } from "./types/setting/index.ts";
import { Toaster } from "@/components/ui/sonner";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ReduxProvider>
          <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="vite-ui-theme">
            <SettingProvider>
              <FTNDProvider>
                <Toaster />
                <RouterProvider router={router} />
              </FTNDProvider>
            </SettingProvider>
          </ThemeProvider>
        </ReduxProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
