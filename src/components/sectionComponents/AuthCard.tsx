import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import KronosLogo from "../handCraftedlUi/KronosLogo";
import OauthBtn from "../handCraftedlUi/OauthBtn";
import AuthForm from "../handCraftedlUi/AuthForm";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/centralStore"; //adjust path if needed
import { toggleExistingUser } from "@/redux/auth/Slices/ExistingUserSlice"; //reducer
import { useContext } from "react";
import { AppContext } from "@/api/Context";
import ErrorBanner from "../handCraftedlUi/ErrorBanner";

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

  // const userState = useSelector((state: RootState) => state.existingUser);
  // console.log("is existing user:", userState);

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
