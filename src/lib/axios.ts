import axios from "axios";

// Create Axios instance with proper configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // This is crucial for CORS with credentials
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    console.log("Full URL:", `${config.baseURL}${config.url}`);
    
    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Response Error:", error.message);
    return Promise.reject(error);
  }
);
