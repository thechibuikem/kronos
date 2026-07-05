import { FaGithub } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { setAccessToken } from "../slices/Authenthicated.Slice";
import { getUrls } from "@/config";

const { backendUrl } = getUrls();

function OauthBtn() {
  const handleOauthClick = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `${backendUrl}/api/v1/auth/github`;
  };

  return (
    <button
      onClick={handleOauthClick}
      className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl
        bg-[#111118] border border-[#1e293b] text-[#e2e8f0] text-sm font-medium
        hover:border-[#06b6d4] hover:bg-[#0d1117] transition-all duration-150 cursor-pointer"
    >
      <FaGithub className="text-lg" />
      Continue with GitHub
    </button>
  );
}

export default OauthBtn;
