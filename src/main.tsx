import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WebSocketProvider } from './context/WebSocketContext';
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "./redux/provider/Provider.tsx";
import router from "./router/index.tsx";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ReduxProvider>
          <WebSocketProvider> 
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <RouterProvider router={router} />
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  className: "sonner-toast",
                  style: {
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                  },
                }}
              />
            </ThemeProvider>  
          </WebSocketProvider>  
        </ReduxProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
