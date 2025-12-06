import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/features/home/ui/card";
import KronosLogo from "../../home/components/KronosLogo";
import OauthBtn from "./OauthBtn";
import AuthForm from "./AuthForm";
import { Button } from "@/features/home/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../../store/centralStore"; //adjust path if needed
import { toggleExistingUser } from "@/features/auth/slices/ExistingUserSlice"; //reducer
import { useContext } from "react";
import { AppContext } from "@/api/Context";
import ErrorBanner from "../../home/components/ErrorBanner";

export default function AuthCard() {
  // setting up context
  const context = useContext(AppContext);
  if (!context) {
    console.log("use of context isn't permitted at Banner");
  } // guard to check if context's okay

  const {authErrorMsg } = context; //destructuring from comntext

  const dispatch = useDispatch();
  const isExistingUser = useSelector(
    (state: RootState) => state.existingUser.isExistingUser
  );
  // State for mode: login or signup
  const handleIsExistingUserToggle = () => {
    dispatch(toggleExistingUser());
  };

  return (
    <Card className=" md:w-full max-w-sm h-fit mx-auto relative">
{ authErrorMsg && (<ErrorBanner />)}
      <CardHeader>
        <CardTitle>
          {isExistingUser ? "Login to your account" : "Sign up on Kronos"}
        </CardTitle>

        <CardDescription>
          {isExistingUser
            ? "Enter your email below to sign up on kronos"
            : "Enter your email below to join us on kronos"}
        </CardDescription>
        <CardAction>
          {/* button to update isLogin redux state */}
          <Button
            variant="link"
            type="button"
            className="cursor-pointer"
            onClick={handleIsExistingUserToggle}
          >
            {isExistingUser ? "Log In" : "Sign Up"}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* html form within card starts */}
        <AuthForm />
        {/* html form within card ends */}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* oauth button */}
        <OauthBtn />

        <div className="pt-4">
          <KronosLogo color="#17255466" />
        </div>
      </CardFooter>
    </Card>
  );
}
