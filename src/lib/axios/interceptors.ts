import type { AxiosError, AxiosInstance } from "axios";

export const setupInterceptors = (
  instance: AxiosInstance,
  getAccessToken: () => string | null,
  refreshToken: () => Promise<string>
) => {
    const requestInterceptor = createRequestInterceptor(instance, getAccessToken);
    const responseInterceptor = createResponseInterceptor(instance, refreshToken);
    
    return () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.response.eject(responseInterceptor);
    };
};

export const createRequestInterceptor = (axiosInstance: AxiosInstance, getAccessToken: () => string | null) => {
    return axiosInstance.interceptors.request.use(
    config => {
      const token = getAccessToken();
      if (!config.headers["Authorization"] && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

export const createResponseInterceptor = (
  axiosInstance: AxiosInstance,
  refreshToken: () => Promise<string>
) => {
  return axiosInstance.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;
      if (
        error?.config &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshErr) {
          return Promise.reject(refreshErr);
        }
      }
      return Promise.reject(error);
    }
  );
};