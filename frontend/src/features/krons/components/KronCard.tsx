import { LuGithub, LuArrowUpRight } from "react-icons/lu";

export type kronType = {
  name: string;
  link: string;
  desc: string;
};

export default function KronCard({ name, link, desc }: kronType) {
  return (
    <div
      className="relative h-fit w-full aspect-square flex flex-col gap-3.5 p-4.5 rounded-2xl
        bg-[#111118] border border-[#1e293b] hover:border-[#334155] hover:-translate-y-0.5
        transition-all duration-150 cursor-default"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-[34px] h-[34px] rounded-[9px] bg-[#0a0a0f] border border-[#1e293b]">
          <LuGithub size={16} color="#06b6d4" />
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-[#475569] hover:text-[#94a3b8] transition-colors"
        >
          <LuArrowUpRight size={16} />
        </a>
      </div>

      <h3 className="text-sm font-semibold text-[#e2e8f0]">{name}</h3>

      <p className="text-xs text-[#64748b] leading-relaxed mt-auto line-clamp-2">
        {desc}
      </p>
    </div>
  );
}
