import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const options = {
  baseURL: "http://localhost:5000/",
  withCredentials: true,
};

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
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
