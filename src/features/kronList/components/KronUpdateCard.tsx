import { Card } from "@/features/home/ui/card"
import { AiOutlineDelete } from "react-icons/ai";

interface kron{
  name:string
}

function KronUpdateCard({name}:kron) {
  return (
<Card className="w-full flex flex-row justify-between px-4 md:px-8 transparent-cards py-3 text-[1rem]">
  <h2>{name}</h2>
  <AiOutlineDelete size={"1.25rem"} className="hover:text-blue-950"/>
</Card>
  )
}

export default KronUpdateCard