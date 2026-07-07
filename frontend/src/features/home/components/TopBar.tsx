import Introtext from "./Introtext";
import SearchComponent from "./SearchComponent";
import { type Repo } from "@/features/repos/slices/allRepo.Slice";
import type { Kron } from "@/features/krons/slices/allKron.Slice";

interface TopBarProps {
  searchArray: Repo[];
}

function TopBar({ searchArray }: TopBarProps) {
  return (
    <section className="flex flex-col gap-y-5 lg:flex-row lg:items-center justify-between">
      <Introtext />
      <SearchComponent searchArray={searchArray} />
    </section>
  );
}

export default TopBar;
