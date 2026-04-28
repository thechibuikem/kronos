import TopBar from "../../home/components/TopBar"
import KronUpdateWrapper from "./KronWrapper"

import { useAllReposHandler } from "@/features/repositories/handlers/allRepo.Handlers"

// ====== my kron list ===========//
function WatchList() {
const {repos} = useAllReposHandler()
  return (
// 

<section className="w-full h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">

<TopBar searchArray={repos}/>
<KronUpdateWrapper/>

    </section>
  )
}

export default WatchList