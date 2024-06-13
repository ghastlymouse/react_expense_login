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

jsonApi.interceptors.request.use(
  async (config) => {
    const { data } = await authApi.get("/user");
    if (data?.success) return config;
    return Promise.reject(new Error("사용자 정보 조회에 실패 했습니다."));
  },
  (error) => Promise.reject(error)
);
