import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken(); // Get Firebase ID token
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error("Error getting ID token:", error);
          }
        }
        return config;
      },
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Auto-retry with refreshed token on 401
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          if (user) {
            try {
              const newToken = await user.getIdToken(true); // Force refresh
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosSecure(originalRequest);
            } catch (refreshError) {
              return Promise.reject(refreshError);
            }
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
