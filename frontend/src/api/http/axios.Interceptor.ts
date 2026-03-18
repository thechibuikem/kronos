//1. importing dependencies
import axios from "axios";
import { store } from "../../store/store";
import { setAuthenticated } from "../../features/auth/slices/Authenthicated.Slice";
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
  //.1 Loop through all queued promises.
  failedQueue.forEach((prom) => {
    // .2 If refresh failed, sequentially reject all waiting requests.
    if (error) prom.reject(error);
    //.3 If refresh succeeded,sequentially  give them the new token.
    else prom.resolve(token);
  });
  //Clear failedQueue
  failedQueue = [];
};

// 7. axios request interceptor
api.interceptors.request.use(
  // .1 Adjusting config
  (config) => {
    // .1.1 Pull the latest access-token from Redux.
    const state = store.getState();
    const token = state.authenticated.isAuthenticated;

    //.1.2 attach access-token to our request config if any 
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  // .2 edge case where there's an error setting up request.
  (error) => Promise.reject(error),
);

// 8. axios response interceptor
api.interceptors.response.use(
  // .1 return response immediately if successful
  (response) => response, 
  // .2 handling uncessful requests
  async (error) => {
    //.2.1 grab request that failed
    const originalRequest = error.config;



    //.2.2 run refresh-logic on 401 && request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      //2.2.1 filter out requests if any refresh is ongoing
      if (isRefreshing) {
        try{ 
          const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }) 
         originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest); // After refresh completes, retry this request with the new token.
      }//2.2.1.2 Put this failed request inside a promise
        catch(err){
          Promise.reject(err);
      }}


      // Mark this request so we don't trigger infinite loops.
      originalRequest._retry = true;
      // 
      isRefreshing = true;
      try {
        // Call the backend refresh endpoint.
        const res = await axios.post(
          `${backendUrl}/api/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;

        // Save the new access-token to Redux.
        store.dispatch(setAuthenticated(newAccessToken));

        // console.log(newAccessToken)

        // Resolve all queued requests using the new token.
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the failed request that triggered the refresh.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed (maybe refresh-token expired).
        // Reject all queued requests.
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
