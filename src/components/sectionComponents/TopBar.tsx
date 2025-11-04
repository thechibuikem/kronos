import Introtext from "../handCraftedlUi/Introtext";
import SearchComponent from "../sectionComponents/SearchComponent";

function TopBar() {
  return (
    <section className="flex flex-col gap-y-8 pt-8 lg:flex-row md:items-center justify-between">
        <Introtext/>
        <SearchComponent/>
    </section>
  )
}

export default TopBar