import useApi from "@/hooks/useApi";
import { api } from "../lib/axios";

// For fetching public api endpoints
export const fetcher = async (url: string) => {
  try {
    const res = await api.get(url, { withCredentials: true });
    return res.data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
}

// For fetching authenticated api endpoints 
export const fetcherWithAccessToken = async (url: string) => {
  const apiWithInterceptor = useApi();
  
  try {
    const res = await apiWithInterceptor.get(url);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching data with access token:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data with access token");
  }
}