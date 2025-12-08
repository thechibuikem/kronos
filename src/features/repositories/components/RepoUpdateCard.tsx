import { Card } from "@/features/home/ui/card"
import { IoIosAdd } from "react-icons/io";

interface Repo{
  name:string,
  link:string
}

function RepoUpdateCard({name,link}:Repo) {
  return (
    <Card className="w-full flex flex-row justify-between px-4 md:px-4 transparent-cards py-3 text-[1rem]">
      <a href={link}>{name}</a>
      <IoIosAdd size={"1.5rem"} className="hover:text-blue-950" />
    </Card>
  );
}

export default RepoUpdateCard;