import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://checkpoint360webgroup.tk",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
  },
});
export default axiosClient;
