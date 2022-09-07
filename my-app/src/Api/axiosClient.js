import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://52d2-14-241-131-38.ap.ngrok.io",
  headers: { "Content-Type": "application/json" },
});
export default axiosClient;
