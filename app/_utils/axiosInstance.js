import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
