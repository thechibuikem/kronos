import { useContext } from "react";
import { AppContext } from "@/api/Context";
import { X } from "lucide-react";



// interface ErrorBannerProps {
//   message: string;
//   onClose: () => void;
// }

export default function ErrorBanner(){

    // setting up context
 const context = useContext(AppContext);
  if (!context) {
    console.log("use of context isn't permitted at Banner");
  } // guard to check if context's okay

  const { setAuthErrorMsg ,authErrorMsg} = context; //destructuring from comntext


  return (
    <div className="flex items-center justify-between p-3 my-0 bg-red-50 border border-red-200 shadow-md rounded-lg text-red-700 absolute w-full scale-92 hover:scale-95 transition-all duration-200">
      <span className="text-sm font-medium">{authErrorMsg}</span>
      <button
        onClick={()=>{setAuthErrorMsg("")}}
        className="ml-4 p-1 hover:bg-red-100 rounded transition-colors cursor-pointer"
        aria-label="Close error"
      >
        <X size={18} />
      </button>
    </div>
  );
}
