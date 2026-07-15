import KronUpdateCard from "./KronUpdateCard";
import AddKronUpdateCard from "./AddKronUpdateCard";
import { useAllKronsHandler } from "../handlers/allKrons.Handlers";
import { useEffect } from "react";

function KronWrapper() {
  const { krons, getKrons } = useAllKronsHandler();

  useEffect(() => {
    getKrons();
  }, []);

  return (
    <section className="w-full flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
          Active Krons
        </h2>
        <span className="text-xs text-[#334155] bg-[#111118] border border-[#1e293b] rounded-full px-3 py-0.5">
          {krons.length} tracked
        </span>
      </div>

      <div className="flex flex-col gap-y-2.5">
        {krons.map((kron, index) => (
          <KronUpdateCard
            key={index}
            repoName={kron.repoName}
            repoId={kron.repoId}
          />
        ))}
        <AddKronUpdateCard />
      </div>
    </section>
  );
}

export default KronWrapper;
