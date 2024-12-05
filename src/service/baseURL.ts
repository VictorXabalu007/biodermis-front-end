import axios from "axios";
import Api from "./api";

const BiodermisApi = axios.create({
  baseURL: Api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default BiodermisApi;
