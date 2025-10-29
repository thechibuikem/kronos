import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./ui/card";
import OauthBtn from "./OauthBtn";
import AuthForm from "./AuthForm";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/centralStore"; //adjust path if needed
import { toggleExistingUser } from "@/features/auth/Slices/ExistingUserSlice"; //reducer


export default function AuthCard() {
  const dispatch = useDispatch();
  const isExistingUser = useSelector(
    (state: RootState) => state.existingUser.isExistingUser
  );

  const userState = useSelector((state: RootState) => state.existingUser);
  console.log("is existing user:", userState);

  // State for mode: login or signup
  const handleIsExistingUserToggle = () => {
    dispatch(toggleExistingUser());
  };

  return (
    <Card className="w-full max-w-sm h-fit mx-auto">
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
        <OauthBtn/>
      </CardFooter>
    </Card>
  );
}
