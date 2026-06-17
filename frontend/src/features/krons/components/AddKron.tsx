import { LuPlus } from "react-icons/lu";

export default function AddKron() {
  return (
    <div
      className="h-fit w-full aspect-square rounded-2xl border-[1.5px] border-dashed border-[#1e293b]
        flex justify-center items-center cursor-pointer
        hover:border-[#06b6d4] hover:bg-[#0d0d15] transition-all duration-150 group"
    >
      <LuPlus
        size={28}
        className="text-[#334155] group-hover:text-[#06b6d4] transition-colors"
      />
    </div>
  );
}
