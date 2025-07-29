import useRefreshToken from './useRefreshToken'
import { useAuth } from '@/contexts/AuthContext';
import { publicApi } from '@/lib/axios';
import i18n from '@/lib/i18n';
import { useEffect } from 'react';

const useApi = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestInterceptor = publicApi.interceptors.request.use(
            config => {
                config.headers["Accept-Language"] = i18n.language;
                if (!config.headers['Authorization'] && auth?.accessToken) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseInterceptor = publicApi.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 401 && !originalRequest?.sent) {
                        originalRequest.sent = true;
                        const newAccessToken = await refresh();
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return publicApi(originalRequest);
                    
                }
                return Promise.reject(error);
            }
        );

        return () => {
            publicApi.interceptors.request.eject(requestInterceptor);
            publicApi.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, refresh]);

  return publicApi;
}

export default useApi;
