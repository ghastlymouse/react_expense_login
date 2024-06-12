import axios from "axios";
import store from "../redux/config/configStore";
import { logout } from "../redux/slices/auth.slice";

export const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export const jsonApi = axios.create({
  baseURL: "http://localhost:5055",
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.response.data.message);
    if (
      error.response.data.message ===
      "토큰이 만료되었습니다. 다시 로그인 해주세요."
    ) {
      return store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
