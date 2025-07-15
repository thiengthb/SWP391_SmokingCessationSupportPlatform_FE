import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import ReduxProvider from "./redux/provider/Provider.tsx";
import router from "./router/index.tsx";
import "./index.css";
import { FTNDProvider } from "@/contexts/FTNDContext";
import { SettingProvider } from "./contexts/SettingContext.tsx";
import { Toaster } from "@/components/ui/sonner";
import { ProfileProvider } from "./contexts/ProfileContext.tsx";
import { Theme } from "./types/enums/Theme.ts";

if (process.env.NODE_ENV === "production") {
  console.log("Production mode: React DevTools are disabled.");
  disableReactDevTools();
} else {
  console.log("Development mode: React DevTools are enabled.");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ProfileProvider>
          <WebSocketProvider>
            <ReduxProvider>
              <ThemeProvider
                defaultTheme={Theme.SYSTEM}
                storageKey="vite-ui-theme"
              >
                <SettingProvider>
                  <FTNDProvider>
                    <Toaster richColors />
                    <RouterProvider router={router} />
                  </FTNDProvider>
                </SettingProvider>
              </ThemeProvider>
            </ReduxProvider>
          </WebSocketProvider>
        </ProfileProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
