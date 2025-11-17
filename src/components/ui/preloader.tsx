import { RotatingLines } from "react-loader-spinner";

export function Loader() {
  return (
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color="#172554"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );

}
