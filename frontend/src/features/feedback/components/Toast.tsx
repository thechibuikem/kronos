import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../slices/Toast.Slice";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

interface Props {
  id: string;
  message: string;
  type: "success" | "error";
}

export function Toast({ id, message, type }: Props) {
  const dispatch = useDispatch();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 3500);
    const t2 = setTimeout(() => dispatch(removeToast(id)), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [id, dispatch]);

  const isSuccess = type === "success";

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 min-w-[280px]
        bg-[#111118] border rounded-xl shadow-lg
        transition-all duration-300 ease-out
        ${isSuccess ? "border-emerald-500/20" : "border-red-500/20"}
        ${leaving ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}
      `}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-[9px] shrink-0
          ${isSuccess ? "bg-emerald-500/10" : "bg-red-500/10"}`}
      >
        {isSuccess ? (
          <LuCircleCheck size={16} className="text-emerald-400" />
        ) : (
          <LuCircleX size={16} className="text-red-400" />
        )}
      </div>
      <span className="text-sm font-medium text-[#e2e8f0]">{message}</span>
    </div>
  );
}
