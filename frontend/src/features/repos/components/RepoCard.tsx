import axios from "axios";
import { LuGithub, LuPlus, LuLock } from "react-icons/lu";
import { useAllKronsHandler } from "@/features/krons/handlers/allKrons.Handlers";
import { type Kron } from "@/features/krons/slices/allKron.Slice";
import { Loader } from "@/features/loading/components/preloader";
import { getUrls } from "@/config.ts";
import { useState } from "react";

const { backendUrl } = getUrls();

interface WebhookData {
  repo: string;
  owner: string;
}

type RepoCardProps = Pick<Kron, "repoName" | "repoUrl" | "owner"> &
  Partial<Kron>;

function RepoCard({
  repoName,
  repoUrl,
  githubOwnerId,
  repoId,
  isPrivate,
  owner,
}: RepoCardProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateKronUiHandler } = useAllKronsHandler();
  const kronData: Partial<Kron> = { githubOwnerId, repoId };
  const webhookData: WebhookData = { repo: repoName, owner };

  async function addKron() {
    try {
      setIsLoading(true);
      await axios.post(
        `${backendUrl}/api/v1/krons/kron`,
        { kronData },
        { withCredentials: true },
      );
      await axios.post(
        `${backendUrl}/api/v1/changeDetection/webhook`,
        { kronData, webhookData },
        { withCredentials: true },
      );
      await updateKronUiHandler(kronData);
    } catch (error) {
      console.log("error adding kron", error);
    } finally {
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
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[#e2e8f0] hover:text-[#06b6d4] transition-colors"
          >
            {repoName}
          </a>
          {isPrivate && (
            <span className="flex items-center gap-1 text-[11px] text-[#475569]">
              <LuLock size={10} />
              Private
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader size={20} />
      ) : (
        <button
          onClick={addKron}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-transparent
            text-[#475569] hover:text-[#06b6d4] hover:border-[#06b6d4]/20 hover:bg-[#06b6d4]/5
            transition-all duration-150 cursor-pointer"
          title="Add to Krons"
        >
          <LuPlus size={16} />
        </button>
      )}
    </div>
  );
}

export default RepoCard;
