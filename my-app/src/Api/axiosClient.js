import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://6725-14-241-131-38.ap.ngrok.io",
  headers: {
    Accept: "application/json",
  },
});
export default axiosClient;
