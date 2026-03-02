import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default api;