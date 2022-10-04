import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://0610-118-69-61-80.ap.ngrok.io",
  headers: {
    Accept: "application/json",
  },
});
export default axiosClient;
