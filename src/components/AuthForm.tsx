import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewOrExistingUsersHandlers } from "@/features/auth/hooks/useExistingUserHandlers";
import { useRef,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/app/centralStore";
import { setAuthenticated } from "@/features/auth/Slices/AuthenthicatedSlice"; //importing my action
import { useNavigate } from "react-router-dom";
import { toggleExistingUser } from "@/features/auth/Slices/ExistingUserSlice";

export default function AuthForm() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authenticated
  ); //getting redux state that would hold token
  const { isExistingUser } = useNewOrExistingUsersHandlers();
  console.log(isAuthenticated);
  console.log(isExistingUser);
  
  
  // getting token from local storage if it exists there, else let it be an empty string
  let token: string = localStorage.getItem("token") || "";
  const BACKENDURL:string = "http://localhost:5000";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  // refs to hold input box and their relay messages
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordMessageRef = useRef<HTMLAnchorElement | null>(null);
  const emailMessageRef = useRef<HTMLHeadingElement | null>(null);

  //   function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const email:string = emailRef.current?.value || "";  // setting email and password variables to hold screen content
    const password:string = passwordRef.current?.value || "";

    // dynamically targetting backend endpoint depending on if we're dealing with new or existing user
    const endpoint = isExistingUser
      ? `${BACKENDURL}/api/auth/login`
      : `${BACKENDURL}/api/auth/signup`;

    // grabbing response from express backend api
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), //send email and password to backend for processing
    });

    // handling backend response
    if (!res.ok) {
      return console.error("Backend response was not okay:",res, res.statusText);
    }
 
    let data;// data variable to provide jwt token

    // try catch block to hold parsed response
    try {
      data = await res.json();
      console.log("Backend response:", data);
      // if my data from backend is a token grab it
      if (data.token) {
        token = data.token;
        //update redux state with token
        dispatch(setAuthenticated(token));
        // Storing in local storage for persisiance, for persistence
        localStorage.setItem("token", token);
        dispatch(toggleExistingUser())
        navigate('/dashboard',{replace:true})//dashboard route
      }
      // how ever if my data contains an existing user Error message
      else if (data.relay) {
        if (emailMessageRef.current && !isExistingUser) {
          emailMessageRef.current.textContent = data.error;
        }
        //if I'm on login form and 
        else if (passwordMessageRef.current && isExistingUser) {
          passwordMessageRef.current.textContent = data.error
        }
      }
      else if (data.oldEmail){
        if(emailMessageRef.current && isExistingUser){
          emailMessageRef.current.textContent = data.error
        }
      }
    } catch (err) {
      // handle JSON parsing errors
      console.error("Error parsing JSON:", err);
      return;
    }

    // clear inputs
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

//use effect to clear, error messages on change of a value
useEffect(() => {
  if (emailMessageRef.current) {
    emailMessageRef.current.textContent = "";
  }else if(passwordMessageRef.current){
    passwordMessageRef.current.textContent = "";
  }
}, [isExistingUser,passwordMessageRef.current])


  //finally what is being returned
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        {/* Email field */}
        <div className="grid gap-2">
          {/* input label that would also relay message incase user exists */}
          <span className="flex justify-between">
            <Label htmlFor="email">Email</Label>
            {/* the message itself */}
            <h5 className="text-sm text-red-500" ref={emailMessageRef}>
              {" "}
            </h5>
          </span>
          {/* the input box itself */}
          <Input
            id="email"
            type="email"
            placeholder="dev.ataraxia7@gmail.com"
            required
            ref={emailRef}
            // clear error message on changing input bar
            onChange={() => {
              if (emailMessageRef.current) {
                emailMessageRef.current.textContent = "";
              }
            }}
          />
        </div>
        {/* Password field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            {/* input label that would also relay message incase user exists */}
            <Label htmlFor="password">Password</Label>

            {/* forgot password link */}
            <a
              href="#"
              ref={passwordMessageRef}
              className="ml-auto inline-block text-sm underline-offset-4 hover:text-red-500"
            >
              {isExistingUser ? "Forgot your password?" : ""}
            </a>
          </div>
          <Input id="password" type="password" ref={passwordRef} required />
        </div>

        {/* auth submit button */}
        <Button type="submit" className="w-full">
          {isExistingUser ? "Log In" : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}
