import axios from "axios";
import { getToken } from "../store/authTokenStore";
import { toast } from "react-toastify";

axios.interceptors.request.use(
  (req) => {
    const { token } = getToken();
    req.headers.Authorization = "bearer " + token;

    return Promise.resolve(req);
  },
  (error) => {
    console.log("error from axios interceptor");

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return Promise.reject(error);
  }

  toast.error("An unexpected error occurred.", { theme: "colored" });

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
