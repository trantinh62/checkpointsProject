import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://checkpoint360webgroup.tk",
  baseURL: "https://90e2-14-241-131-38.ap.ngrok.io",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
  },
});
export default axiosClient;
