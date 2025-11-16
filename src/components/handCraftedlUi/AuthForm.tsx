import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewOrExistingUsersHandlers } from "@/redux/auth/hooks/useExistingUserHandlers";
import { useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/app/centralStore";
import { setAuthenticated } from "@/redux/auth/Slices/AuthenthicatedSlice"; //importing my action
import { useNavigate } from "react-router-dom";
import { toggleExistingUser } from "@/redux/auth/Slices/ExistingUserSlice";
import { AppContext } from "@/Context/Context";
import { baseBackendUrl } from "@/App";


export default function AuthForm() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authenticated
  ); //getting redux state that would hold token

  const { isExistingUser } = useNewOrExistingUsersHandlers(); //destructuring from redux
  // console.log(isAuthenticated);
  // console.log(isExistingUser);

  const context = useContext(AppContext);

  if (!context) {
    console.log("use of context isn't permitted at AuthForm");
  } // guard to check if context's okay

  const { setAuthErrorMsg } = context; //destructuring from comntext

  let token: string = localStorage.getItem("token") || ""; // getting token from local storage if it exists there, else let it be an empty string

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // refs to hold input box and their relay messages
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  //   function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email: string = emailRef.current?.value || ""; // setting email and password variables to hold screen content
    const password: string = passwordRef.current?.value || "";

    // dynamically targetting backend endpoint depending on if we're dealing with new or existing user
    const endpoint = isExistingUser
      ? `${baseBackendUrl}api/auth/login`
      : `${baseBackendUrl}api/auth/signup`;

    // grabbing response from express backend api
    const res = await fetch(endpoint, {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), //send email and password to backend for processing
    });

    // try catch block to hold parsed response
    let data; // data variable to provide jwt token
    try {
      data = await res.json();
      setAuthErrorMsg(data.error)
      console.log("Backend response:", data);
      // if my data from backend is a token grab it
   
      } catch (err) {
      console.error("Error parsing JSON:", err); // handle JSON parsing errors
      return;
    }
//setting access token
           if (data.accessToken) {
        token = data.accessToken;
        //update redux state with token
        dispatch(setAuthenticated(token));
        dispatch(toggleExistingUser());
        navigate("/dashboard", { replace: true }); //dashboard route
  };

    // handling backend response
    if (!res.ok) {
      console.error("Backend response was not okay:", res, res.statusText);
      setAuthErrorMsg(data.error);
      return
    }
  }

  //finally what is being returned
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        {/* Email field */}
        <div className="grid gap-2">
          {/* input label that would also relay message incase user exists */}
          {/* the input box itself */}
          <Input
            id="email"
            type="email"
            placeholder="dev.ataraxia7@gmail.com"
            required
            ref={emailRef}
            // clear error message on changing input bar
            onChange={() => {
            setAuthErrorMsg("")
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
