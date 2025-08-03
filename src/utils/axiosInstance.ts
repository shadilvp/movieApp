import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://movieapp-server-b7ua.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
