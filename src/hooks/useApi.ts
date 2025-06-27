import useRefreshToken from './useRefreshToken'
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/axios';
import { useEffect } from 'react';

const useApi = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestInterceptor = api.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] && auth?.accessToken) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 403 && !originalRequest?.sent) {
                        originalRequest.sent = true;
                        const newAccessToken = await refresh();
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, refresh]);

  return api;
}

export default useApi;
