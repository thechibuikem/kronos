import { Input } from "@/features/home/ui/input";
import { CiSearch } from "react-icons/ci";
import { TbZoomCancel } from "react-icons/tb";
import { AppContext } from "@/api/Context";
import { useContext } from "react";

function SearchBar() {
  const context = useContext(AppContext);
  const { isSearchOpen, setIsSearchOpen, setSearchValue } = context;

  return (
    <div className="relative flex items-center h-fit">
      <Input
        className="w-full rounded-lg pl-9 pr-4 py-2.5 border border-[#1e293b] bg-[#111118]
          focus-visible:ring-0 text-[#e2e8f0] placeholder:text-[#475569]
          focus-visible:ring-offset-0 focus-visible:border-[#06b6d4] transition-colors"
        placeholder="Search repositories and Krons..."
        onFocus={() => setIsSearchOpen(true)}
        onChange={(event) => {
          setSearchValue(event.target.value);
          setIsSearchOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsSearchOpen(false);
        }}
      />

      <span className="absolute left-3 pointer-events-none">
        <CiSearch size={16} color="#475569" />
      </span>

      <button
        type="button"
        className="absolute right-3 cursor-pointer text-[#475569] hover:text-[#94a3b8]"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          setIsSearchOpen(!isSearchOpen);
          if (isSearchOpen) setSearchValue("");
        }}
      >
        {isSearchOpen ? <TbZoomCancel size={16} /> : null}
      </button>
    </div>
  );
}

export default SearchBar;
