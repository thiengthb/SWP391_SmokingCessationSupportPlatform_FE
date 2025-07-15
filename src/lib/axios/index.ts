import axios from "axios";
import { setupInterceptors } from "./interceptors";
import i18n from "../i18n";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Language": i18n.language,
  },
  withCredentials: true, 
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Language": i18n.language,
  },
  withCredentials: true, 
});

export const setUpAuthInterceptors = (getAccessToken: () => string | null, refreshToken: () => Promise<string>) => {
  return setupInterceptors(
    authApi,
    getAccessToken,
    refreshToken
  );
}