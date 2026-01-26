import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  // baseURL: "https://zap-shift-server-five-bay.vercel.app",

  // baseURL: "http://localhost:3000",
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
