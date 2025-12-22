import KronUpdateCard from "./KronUpdateCard"
import AddKronUpdateCard from "./AddKronUpdateCard"
import { useAllKronsHandler } from "../handlers/allKrons.Handlers"
import { useEffect } from "react"


function KronUpdateWrapper() {
const {krons,getKrons} = useAllKronsHandler()


console.log("krons at frontend :",krons)

useEffect(()=>{
  getKrons()
},[])


  return (
    <section className="bg-bue-500 w-full mt-8 gap-[2rem] flex flex-col px-4 md:px-8 mx-auto">
      
      <h1 className="text-3xl text-white">
        My Krons
      </h1>
      
        {/* group of krons */}
        <figure className="w-full  gap-[1rem] flex flex-col">
           {/* {KronList.slice(0,kronLimit).map((kron,index)=>( */}
           {krons.map((kron,index)=>(
            <KronUpdateCard
             key={index}
             name={kron.repoName}
             />
            ))}
        </figure>
       
<AddKronUpdateCard/>
    </section>
  )
}

export default KronUpdateWrapper