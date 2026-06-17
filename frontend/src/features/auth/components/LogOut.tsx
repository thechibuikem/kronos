import { FaPowerOff } from "react-icons/fa6";
import axios from "axios";
import { store } from "@/store/store";
import { setAccessToken } from "../slices/Authenthicated.Slice";
import { getUrls } from "@/config";

const { frontendUrl, backendUrl } = getUrls();

function LogOut() {
  const endpoint = `${backendUrl}/api/v1/auth/logout`;

  const handleLogOut = async () => {
    await axios.post(endpoint, {}, { withCredentials: true });
    store.dispatch(setAccessToken(""));
    window.location.replace(frontendUrl);
  };

  return (
    <button
      className="py-2.5 px-3 gap-3 flex items-center w-full rounded-lg cursor-pointer
        text-[#64748b] hover:text-[#f87171] hover:bg-[#0d0d15] transition-all duration-150"
      onClick={handleLogOut}
    >
      <FaPowerOff size={15} />
      <h3 className="text-sm font-medium">Log Out</h3>
    </button>
  );
}

export default LogOut;
