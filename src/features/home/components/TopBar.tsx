import Introtext from "./Introtext";
import SearchComponent from "./SearchComponent";

function TopBar() {
  return (
    <section className="flex flex-col gap-y-8 pt-8 lg:flex-row md:items-center justify-between">
        <Introtext/>
        <SearchComponent/>
    </section>
  )
}

export default TopBar