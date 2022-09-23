import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://bc9e-118-69-61-80.ap.ngrok.io/",
  headers: { "Content-Type": "application/json" },
});
export default axiosClient;
