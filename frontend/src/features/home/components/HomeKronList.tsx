import KronCard from "../../krons/components/KronCard";
import AddKron from "../../krons/components/AddKron";
import { type Kron } from "@/features/krons/slices/allKron.Slice";

interface kronListProps {
  kronArray: Partial <Kron> [];
}


function KronList({kronArray}: kronListProps) {


  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-4">
        Your Krons
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {kronArray.map((kron, index) => (
          <KronCard
            key={index}
            repoName={kron.repoName}
            repoUrl={kron.repoUrl}
            owner={kron.owner}
            // desc={kron.desc}
          />
        ))}
        <AddKron />
      </div>
    </section>
  );
}

export default KronList;
