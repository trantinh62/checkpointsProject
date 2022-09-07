import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://3bf9-14-241-131-38.ap.ngrok.io/",
  headers: { "Content-Type": "application/json" },
});
export default axiosClient;
