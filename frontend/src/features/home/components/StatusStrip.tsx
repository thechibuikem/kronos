import { useEffect, useState } from "react";
import { useAllKronsHandler } from "@/features/krons/handlers/allKrons.Handlers";
import { useAllReposHandler } from "@/features/repos/handlers/allRepo.Handlers";

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function StatusStrip() {
  const { krons } = useAllKronsHandler();
  const { repos } = useAllReposHandler();
  const clock = useClock();

  return (
    <div className="flex items-center justify-between px-7 py-5 bg-[#0d0d15] border border-[#1a1a2e] rounded-2xl">
      {/* left */}
      <div className="flex items-center gap-3">
        <div className="relative w-3 h-3 shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
          <span className="absolute inset-0 rounded-full bg-emerald-500" />
        </div>
        <span className="text-[15px] font-medium text-[#e2e8f0]">
          Kronos is <span className="text-[#06b6d4]">watching</span>
        </span>
      </div>

      {/* right */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-0.5 min-w-[72px]">
          <span className="text-[26px] font-bold tracking-tight text-[#e2e8f0] tabular-nums leading-none">
            {krons.length}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#475569]">
            Krons
          </span>
        </div>

        <div className="w-px h-9 bg-[#1e293b]" />

        <div className="flex flex-col items-center gap-0.5 min-w-[72px]">
          <span className="text-[26px] font-bold tracking-tight text-[#06b6d4] tabular-nums leading-none">
            {repos.length}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#475569]">
            Repos
          </span>
        </div>

        <div className="w-px h-9 bg-[#1e293b]" />

        <span className="text-[22px] font-semibold text-[#334155] tabular-nums tracking-tight min-w-[90px] text-center">
          {clock}
        </span>
      </div>
    </div>
  );
}

export default StatusStrip;
