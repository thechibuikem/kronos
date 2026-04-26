//1. importing dependencies

import { FaGithub } from "react-icons/fa";
import { Button } from "@/features/home/ui/button";
import { useEffect } from "react";
import { getUrls } from "@/config";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../slices/Authenthicated.Slice";



// 2. destructuring backend url
const {backendUrl}= getUrls()

// 3. functional component
function OauthBtn() {

  // function that runs on click of signUp With Github btn
  const handleOauthClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = `${backendUrl}/api/v1/auth/github`;
    //first going to github oauth stuff
    window.location.href = endpoint;
  };

  {
    /* oauth button */
  }
  return (
    <Button
      variant="outline"
      className="w-full hover:bg-[#00000020] hover:shadow-md cursor-pointer"
      onClick={handleOauthClick}
    >
      <FaGithub/>
      Continue With Github
    </Button>
  );
}

export default OauthBtn;
