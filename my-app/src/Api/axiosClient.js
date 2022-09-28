import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://f7b2-118-69-61-80.jp.ngrok.io/",
  headers: { "Content-Type": "application/json" },
});
export default axiosClient;
