import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function AddKronUpdateCard() {

   const navigate = useNavigate();

   function handleClickEvent() {
     navigate("/repos");
   }

  return (
    <button
      className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl
        border-[1.5px] border-dashed border-[#1e293b] bg-transparent
        text-[#475569] text-sm font-medium
        hover:border-[#06b6d4] hover:text-[#06b6d4] hover:bg-[#0d0d15]
        transition-all duration-150 cursor-pointer"
        onClick={handleClickEvent}
    >
      <LuPlus size={16} />
      Add a Kron
    </button>
  );
}

export default AddKronUpdateCard;
