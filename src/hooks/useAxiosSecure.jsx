import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-five-bay.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
