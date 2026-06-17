import KronCard from "../../krons/components/KronCard";
import { type kronType } from "../../krons/components/KronCard";
import AddKron from "../../krons/components/AddKron";

function KronList() {
  const kronLimit: number = 4;
  const KronList: kronType[] = [
    {
      name: "kronos",
      link: "https://www.google.com",
      desc: "lorem lorem lorem lorem ",
    },
    {
      name: "kronos",
      link: "https://www.google.com",
      desc: "lorem lorem lorem lorem ",
    },
    {
      name: "kronos",
      link: "https://www.google.com",
      desc: "lorem lorem lorem lorem lorem lorem lorem lorem",
    },
    {
      name: "kronos",
      link: "https://www.google.com",
      desc: "lorem lorem lorem lorem lorem lorem lorem lorem",
    },
    {
      name: "kronos",
      link: "https://www.google.com",
      desc: "lorem lorem lorem lorem",
    },
  ];

  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-4">
        Your Krons
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {KronList.slice(0, kronLimit).map((kron, index) => (
          <KronCard
            key={index}
            name={kron.name}
            link={kron.link}
            desc={kron.desc}
          />
        ))}
        <AddKron />
      </div>
    </section>
  );
}

export default KronList;
