import { RotatingLines } from "react-loader-spinner";

interface LoaderProps {
  size: number;
}

export function Loader({ size }: LoaderProps) {
  return (
    <RotatingLines
      visible={true}
      height={size}
      width={size}
      color="#06b6d4"
      strokeWidth="3"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
