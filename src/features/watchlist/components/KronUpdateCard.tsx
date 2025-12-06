import { Card } from "@/features/home/ui/card"
import { AiOutlineDelete } from "react-icons/ai";

interface kron{
  name:string
}

function KronUpdateCard({name}:kron) {
  return (
<Card className="w-full flex flex-row justify-between px-4 md:px-8 transparent-cards py-4 text-xl">
  <h2>{name}</h2>
  <AiOutlineDelete size={"1.5rem"} className="hover:text-red-950"/>
</Card>
  )
}

export default KronUpdateCard