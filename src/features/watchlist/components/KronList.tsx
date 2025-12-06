import KronCard from "./KronCard"
import { type kronType } from "./KronCard"
import AddKron from "./AddKron"

function KronList() {
const kronLimit:number = 4
const KronList:kronType[] = [
    {name:"kronos",
    link:"https://www.google.com",
    desc:"lorem lorem lorem lorem "},
     {name:"kronos",
    link:"https://www.google.com",
    desc:"lorem lorem lorem lorem "},
     {name:"kronos",
    link:"https://www.google.com",
    desc:"lorem lorem lorem lorem lorem lorem lorem lorem"},
     {name:"kronos",
    link:"https://www.google.com",
    desc:"lorem lorem lorem lorem lorem lorem lorem lorem"},
     {name:"kronos",
    link:"https://www.google.com",
    desc:"lorem lorem lorem lorem"},
]


  return (
    <section className="bg-bue-500 w-full mt-8 grid grid-cols-2 gap-[1rem] lg:grid-cols-4 items-center justify-between md:gap-x-8 md:gap-y-16 px-4 md:px-8 mx-auto">
        {KronList.slice(0,kronLimit).map((kron,index)=>(
            <KronCard
             key={index}
             name={kron.name}
             link={kron.link}
             desc={kron.desc}
             />
            ))}
<AddKron/>
    </section>
  )
}

export default KronList