import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { LuAlarmClockMinus } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/home/ui/card"

export type kronType = {
  name:string,
  link:string,
  desc:string
}

export default function KronCard({name,link,desc}:kronType) {
  return (
    <Card className="h-fit w-full md:w-[12rem] aspect-square flex flex-col gap-y-[1.5rem] transparent-cards">
      <CardHeader style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <CardTitle style={{fontSize:"1rem"}}>{name}</CardTitle>
{/*  */}

<a href={link} target="blank">
    <BsArrowUpRightCircleFill style={{
    height: "1.5rem",
    width: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    borderRadius: "9999px"}}/>
    </a>

      </CardHeader>
      {/* the container housing the wires */}
      <CardContent className="">
          <LuAlarmClockMinus style={{ color: "#ecececbd", fontSize: "2rem" }} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-4 md:font-medium text-sm h-[2.5rem]">
              {desc}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}