import axios from "axios";
import dayjs from "dayjs";
import { auth } from "./firebase-auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

api.interceptors.request.use(
  async (config: any) => {
    try {
      const tokenDecoded = await auth.currentUser?.getIdTokenResult(false);

      const exp = dayjs.unix(Number(tokenDecoded?.claims?.exp));
      const now = dayjs();

      let token = "";
      if (exp.diff(now, "minute") > 5) {
        token = (await auth.currentUser?.getIdToken(false)) ?? "";
      } else {
        token = (await auth.currentUser?.getIdToken(true)) ?? "";
      }

      if (token.length > 0) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    } catch (error) {
      auth.signOut();
    }
    
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401 && window.location.pathname !== "/") {
      // await auth.signOut();
      // return (window.location.href = "/");
    }
    return Promise.reject(error);
  }
);

export default api;
