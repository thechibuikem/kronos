import TopBar from "../../home/components/TopBar"
import RepoUpdateWrapper from "@/features/repositories/components/RepoUpdateWrapper";
function RepoList() {
  return (
// 

<section className="w-full h-fit grid grid-rows-[minmax(0,50px)_minmax(0,400px)_minmax(0,fit)]">

<TopBar />
<RepoUpdateWrapper/>

    </section>
  )
}

export default RepoList;