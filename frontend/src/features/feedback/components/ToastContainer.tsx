import { useSelector } from "react-redux";
import {type RootState } from "@/store/store";
import { Toast } from "./Toast";

export function ToastContainer() {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </div>
  );
}
