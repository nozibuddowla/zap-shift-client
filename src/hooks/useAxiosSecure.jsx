import axios from "axios";
import React, { useEffect, useRef } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    // interceptor request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error("Error getting ID token:", error);
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // interceptor response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const statusCode = error.response?.status;

        // Auto-retry with refreshed token on 401
        if (
          statusCode === 401 &&
          !originalRequest._retry &&
          !isRefreshingRef.current
        ) {
          originalRequest._retry = true;
          isRefreshingRef.current = true;

          if (user) {
            try {
              const newToken = await user.getIdToken(true); // Force refresh
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosSecure(originalRequest);
            } catch (refreshError) {
              console.error("Error refreshing token:", refreshError);
              isRefreshingRef.current = false;
              toast.error("Your session has expired. Please log in again.");
              await logOut();
              navigate("/signin");
              return Promise.reject(refreshError);
            }
          } else {
            isRefreshingRef.current = false;
            toast.error("Please log in to continue.");
            navigate("/signin");
            return Promise.reject(error);
          }
        }

        if (
          (statusCode === 401 && originalRequest._retry) ||
          statusCode === 403
        ) {
          if (statusCode === 403) {
            toast.error("You don't have permission to access this resource.");
          }
          // Don't show toast for 401 here as it was already shown in the refresh catch block
          if (statusCode === 403) {
            navigate("/dashboard");
          }
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
