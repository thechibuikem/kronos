import axios from "axios";
import { getUrls } from "@/config";
import { LuGithub, LuTrash2 } from "react-icons/lu";
import type { Kron } from "../slices/allKron.Slice";
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";
import { Loader } from "@/features/loading/components/preloader";
import { useState } from "react";

const { backendUrl } = getUrls();

function KronUpdateCard({ repoName, repoId }: Partial<Kron>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getKrons,krons } = useAllKronsHandler();

console.log("krons at KronUpdate",krons)

  async function removeKron() {
    try {
      setIsLoading(true);
      await axios.delete(`${backendUrl}/api/v1/krons/kron/${repoId}`, {
        withCredentials: true,
      });
      await axios.delete(
        `${backendUrl}/api/v1/changeDetection/webhook/${repoId}`,
        { withCredentials: true },
      );
    } catch (err) {
      throw new Error();
    } finally {
      getKrons();
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-between px-5 py-4 bg-[#111118] border border-[#1e293b] rounded-xl hover:border-[#334155] transition-all duration-150">
      <div className="flex items-center gap-3.5">
        <div className="flex items-center justify-center w-9 h-9 rounded-[9px] bg-[#0a0a0f] border border-[#1e293b] shrink-0">
          <LuGithub size={16} color="#06b6d4" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-medium text-[#e2e8f0]">{repoName}</h2>
          <span className="text-[11px] font-mono text-[#475569]">{repoId}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-medium">
          Webhook active
        </span>

        {isLoading ? (
          <Loader size={20} />
        ) : (
          <button
            onClick={removeKron}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-transparent
              text-[#475569] hover:text-[#f87171] hover:border-red-500/20 hover:bg-red-500/5
              transition-all duration-150 cursor-pointer"
          >
            <LuTrash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

export default KronUpdateCard;
