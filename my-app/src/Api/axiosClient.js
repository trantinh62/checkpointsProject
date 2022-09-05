import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://548c-118-69-61-80.ap.ngrok.io",
  headers: { "Content-Type": "application/json" },
});
export default axiosClient;
