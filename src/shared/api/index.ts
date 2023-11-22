import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const options = {
  withCredentials: true,
};

const authInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

const errorInterceptor = async (error: AxiosError) => {
  const res = error.response;

  if (!res) return;

  // const originalRequest = res.config;

  // if (res.status === 401) {
  //   try {
  //     const r = await $api.post<{ accessToken: string }>('/refresh');
  //     localStorage.setItem('token', r.data.accessToken);
  //     // FIXME: сейчас если во постоянно будет возвращаться ошибка, то запрос будет зациклен. надо исправить
  //     return $api.request(originalRequest);
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.error('Не авторизован!');
  //   }
  // }
};

const $api = axios.create(options);
$api.interceptors.request.use(authInterceptor);
$api.interceptors.response.use(c => c, errorInterceptor);

const $apiWithoutErrorInterceptor = axios.create(options);
$apiWithoutErrorInterceptor.interceptors.request.use(authInterceptor);

export { $api, $apiWithoutErrorInterceptor };

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ credentials: 'include' }),
  endpoints: () => ({}),
  reducerPath: 'api',
});

export type FetchRequest<TBody> = {
  url: string;
  body?: TBody;
  method: 'POST' | 'GET' | 'PATCH';
};

export const API = {
  request: async <TBody>(input: RequestInfo | URL, init?: RequestInit | undefined) => {
    const contentType = init?.body instanceof FormData ? undefined : 'application/json';

    const response = await fetch(input, {
      ...init,
      headers: {
        ...(contentType ? { 'Content-Type': contentType } : {}),
        ...init?.headers,
      },
    });

    const data = await response.json();

    return data as TBody;
  },
};
