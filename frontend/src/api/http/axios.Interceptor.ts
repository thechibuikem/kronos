//1. importing dependencies
import axios from "axios";
import { store } from "../../store/store";
import { setAccessToken } from "../../features/auth/slices/Authenthicated.Slice";
import { getUrls } from "@/config";

//2. importing backend url from getter function
const { backendUrl } = getUrls();

//3. creating axios instance for axios interceptor, always include cookies
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

//4. isRefreshing flag to prevent multiple refresh-token calls.
let isRefreshing = false; 

//5. Queue to catch multiple failed requests
let failedQueue: any[] = [];

// 6. function to handle requests in failed-Queue; race condition
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error)
      prom.reject(error); 
    else prom.resolve(token);
  });
  failedQueue = []; //Clear failedQueue
};

// 7. axios request interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.authenticated.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error), //edge case where there's an error setting up request.
);

// 8. axios response interceptor
api.interceptors.response.use(
  (response) => response, //return response immediately if successful

  // .2 handling uncessful requests
  async (error) => {
    const originalRequest = error.config;//grab request that failed

    //.2.2 run refresh-logic on 401 && request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      //2.2.1 filter out requests if any refresh is ongoing
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = "Bearer " + token;
          return api(originalRequest); // After refresh completes, retry this request with the new token.
        } catch (err) {
          //2.2.1.2 Put this failed request inside a promise
          Promise.reject(err);
        }
      }

      // avoiding infinite loops
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post(
          `${backendUrl}/api/v1/auth/refresh-token`,
          {},
        );
        const newAccessToken = res.data.data.accessToken;

        store.dispatch(setAccessToken(newAccessToken)); // Save the new access-token to Redux.
        // Resolve all queued requests using the new token.
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the failed request that triggered the refresh.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }
    // If error isn't a 401 or refresh not allowed, reject normally.
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;
