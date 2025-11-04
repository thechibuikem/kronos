import { Button } from "../ui/button"
import { useEffect } from "react"

function OauthBtn() {
// function that watches login/signup page on reload retrievs that token from search key if any
useEffect(()=>{
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  localStorage.setItem("token", token);
   window.location.reload();
}
},[])

    
// function that runs on click of signUp With Github btn
const handleOauthClick = async(e:React.FormEvent)=>{
e.preventDefault();
  const endpoint = 'http://localhost:5000/api/auth/github'

//first going to github oauth stuff
 window.location.href=endpoint}


    {/* oauth button */}
    return (          
        <Button variant="outline" className="w-full hover:bg-[#00000020] hover:shadow-md cursor-pointer"
        onClick={handleOauthClick}>
          Continue With Github
        </Button>
  )
}

export default OauthBtn
