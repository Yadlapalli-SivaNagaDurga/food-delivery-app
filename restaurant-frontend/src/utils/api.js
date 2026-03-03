import axios from "axios";

const api = axios.create({
  baseURL: "https://food-delivery-app-z30l.onrender.com",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default api;