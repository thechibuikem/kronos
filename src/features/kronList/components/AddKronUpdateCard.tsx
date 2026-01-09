import { Card } from "@/features/home/ui/card"
import { IoIosAdd } from "react-icons/io";


// add button at Kron List Page
function AddKronUpdateCard() {
  return (
     <Card className="w-full px-4 md:px-8 -mt-[1rem] transparent-cards border-2 border-dashed py-2">
        <IoIosAdd size={"1.5rem"} className="hover:text-blue-950 mx-auto"/>
</Card>
  )
}

export default AddKronUpdateCard