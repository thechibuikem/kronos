import { type kronType } from "../handCraftedlUi/KronCard"
import KronUpdateCard from "../handCraftedlUi/KronUpdateCard"
import AddKronUpdateCard from "../handCraftedlUi/AddKronUpdateCard"

function KronUpdateWrapper() {
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
    <section className="bg-bue-500 w-full mt-8 gap-[2rem] flex flex-col px-4 md:px-8 mx-auto">
      
      <h1 className="text-3xl text-white">
        My Krons
      </h1>

        {/* group of krons */}
        <figure className="w-full  gap-[1rem] flex flex-col">
           {KronList.slice(0,kronLimit).map((kron,index)=>(
            <KronUpdateCard
             key={index}
             name={kron.name}
             />
            ))}
        </figure>
       
<AddKronUpdateCard/>
    </section>
  )
}

export default KronUpdateWrapper