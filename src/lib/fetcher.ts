import useApi from "@/hooks/useApi";
import { api } from "./axios";

// For fetching public api endpoints
export const fetcher = (url: string) =>
  api.get(url, { withCredentials: true }).then(res => res.data);


export const fetcherWithAccessToken = (url: string) => {
    const apiWithInterceptor = useApi();
    
    return apiWithInterceptor.get(url).then(res => res.data);
}