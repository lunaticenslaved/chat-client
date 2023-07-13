import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { BASE_URL } from "shared/config";

const options = {
  baseURL: BASE_URL,
  withCredentials: true,
};

const authInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

const errorInterceptor = async (error: AxiosError) => {
  const res = error.response;

  if (!res) return;

  const originalRequest = res.config;

  if (res.status === 401) {
    try {
      const r = await $api.post<{ accessToken: string }>("/refresh");
      localStorage.setItem("token", r.data.accessToken);
      // FIXME: сейчас если во постоянно будет возвращаться ошибка, то запрос будет зациклен. надо исправить
      return $api.request(originalRequest);
    } catch (error) {
      console.error("Не авторизован!");
    }
  }
};

const $api = axios.create(options);
$api.interceptors.request.use(authInterceptor);
$api.interceptors.response.use((c) => c, errorInterceptor);

const $apiWithoutErrorInterceptor = axios.create(options);
$apiWithoutErrorInterceptor.interceptors.request.use(authInterceptor);

export { $api, $apiWithoutErrorInterceptor };

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
  reducerPath: "api",
});
