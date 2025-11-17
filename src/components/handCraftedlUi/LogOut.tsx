import { FaPowerOff } from "react-icons/fa6";
import { baseBackendUrl } from "@/App";
import axios from "axios";

 function LogOut() {

    const endpoint =`${baseBackendUrl}api/auth/logout`;

    const handleLogOut = async ()=>{
    await axios.post(endpoint,{},{withCredentials:true})
    window.location.reload()
    }

  return (
 <button
      className={`py-2 px-4 gap-1 flex items-center justify-start rounded-sm cursor-pointer hover:scale-105 transition-all duration-500`}
      onClick={handleLogOut}
    >
      <FaPowerOff />
      <h3 className="text-xl text-[#ecececbd]">Log Out</h3>
    </button>
  )
}

export default LogOut




