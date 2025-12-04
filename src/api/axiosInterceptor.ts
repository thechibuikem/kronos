import axios from "axios";
import { store } from "../store/centralStore";
import { setAuthenticated } from "../redux/auth/Slices/AuthenthicatedSlice";
// import { baseBackendUrl } from "../App";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
})// Create a single axios instance. This prevents repeating config everywhere.


let isRefreshing = false // This flag prevents multiple refresh-token calls from firing at the same time.

let failedQueue: any[] = []// When multiple requests fail with 401 while refresh is ongoing, we store them.



const processQueue = (error: any, token: string | null = null) => {
  // Loop through all queued promises and resolve/reject them depending on refresh result.
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);// If refresh failed, reject all waiting requests.
    else prom.resolve(token)// If refresh succeeded, give them the new token.
  });
  failedQueue = []; //Clear
}//handle waiting requests

// ====================== REQUEST INTERCEPTOR ======================
api.interceptors.request.use(
  (config) => {
    // Pull the latest access-token from Redux.
    const state = store.getState();
    const token = state.authenticated.isAuthenticated;

    // setting access token in request headers
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// ====================== RESPONSE INTERCEPTOR ======================
api.interceptors.response.use(
  (response) => response, // If response is successful, return it immediately.

  async (error) => {
    const originalRequest = error.config;//error.config contains the request that failed

    //run refresh-logic on 401 errors and if request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {

      // If another refresh is already happening:
      if (isRefreshing) {
        // Put this failed request inside a promise that waits
        // for the refresh process to finish.
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest); // After refresh completes, retry this request with the new token.
          })
          .catch((err) => Promise.reject(err));
      }

      // Mark this request so we don't trigger infinite loops.
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the backend refresh endpoint.
        // Reason: we need a new access-token because the old one expired
        const res = await axios.post("http://localhost:5000/api/auth/refresh-token",{},{withCredentials:true});

        const newAccessToken = res.data.accessToken;

        // Save the new access-token to Redux.
        // Reason: future requests must use this updated token.
        store.dispatch(setAuthenticated(newAccessToken));

        console.log(newAccessToken)

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
    console.log(error)
    return Promise.reject(error);
  }
);

export default api;