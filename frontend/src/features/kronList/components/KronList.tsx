//1. importing dependencies
import TopBar from "../../home/components/TopBar"
import KronUpdateWrapper from "./KronUpdateWrapper";
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";


// 3. main functional component
function KronList() {
  // .1  importing repos state from redux
  const { krons } = useAllKronsHandler(); 

  // .2 main krons component
  return (
    <section className="w-full h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">
      <TopBar searchArray={krons} />
      <KronUpdateWrapper />
    </section>
  );
}

export default KronList;





    // //.2.2 run refresh-logic on 401 && request hasn't been retried
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   //2.2.1 if refresh is ongoing anywhere
    //   if (isRefreshing) {
    //     return new Promise((resolve, reject) => {
    //       failedQueue.push({ resolve, reject });
    //     }) //2.2.1.2 Put this failed request inside a promise
    //       .then((token) => {
    //         originalRequest.headers.Authorization = "Bearer " + token;
    //         return api(originalRequest); // After refresh completes, retry this request with the new token.
    //       })
    //       .catch((err) => Promise.reject(err));
    //   }



















