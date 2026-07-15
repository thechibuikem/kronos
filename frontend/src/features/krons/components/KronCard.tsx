import { LuGithub, LuArrowUpRight, LuLock, LuGlobe } from "react-icons/lu";
import { type Kron } from "../slices/allKron.Slice";

// export type kronType = {
//   name: string;
//   link: string;
//   desc: string;
// };

export default function KronCard({
  repoName,
  repoUrl,
  owner,
  isPrivate,
}: Partial<Kron>) {
  return (
    <div
      className="relative w-full aspect-square flex flex-col justify-between p-3.5 rounded-2xl
      bg-[#111118] border border-[#1e293b] hover:border-[#334155] hover:-translate-y-0.5
      transition-all duration-150"
    >
      {/* top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a0a0f] border border-[#1e293b]">
          <LuGithub size={14} color="#06b6d4" />
        </div>
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#475569] hover:text-[#94a3b8] transition-colors"
        >
          <LuArrowUpRight size={14} />
        </a>
      </div>

      {/* mid */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-[#e2e8f0] truncate">
          {repoName}
        </h3>
        <p className="text-xs text-[#475569] truncate">{owner}</p>
      </div>

      {/* bottom */}
      <div className="flex items-center justify-between">
        <span
          className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md
          bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
        >
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          Tracking
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[#475569]">
          {isPrivate ? (
            <>
              <LuLock size={9} />
              Private
            </>
          ) : (
            <>
              <LuGlobe size={9} />
              Public
            </>
          )}
        </span>
      </div>
    </div>
  );
}
