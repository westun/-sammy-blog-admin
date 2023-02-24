import axios from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/authConstants";

const authHeader = "bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

axios.interceptors.request.use(
  (req) => {
    req.headers.Authorization = authHeader;

    return Promise.resolve(req);
  },
  (error) => {
    console.log("error from axios interceptor");

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
