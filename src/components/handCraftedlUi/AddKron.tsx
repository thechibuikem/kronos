import { CgMathPlus } from "react-icons/cg"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function AddKron() {
  return (
    <Card className="h-fit w-full md:w-[12rem] aspect-square transparent-cards border-dashed flex justify-center items-center">
    
      {/* the container housing the wires */}
      <CardContent className="">
          <CgMathPlus style={{ color: "#4a556530", fontSize: "7rem" }} />
      </CardContent>
    </Card>
  )
}