import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./ui/card";
import AuthForm from "./AuthForm";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/centralStore"; //adjust path if needed
import { toggleLogin } from "@/features/auth/Slices/LoggedInSlice"; //reduce

export default function AuthCard() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const authState = useSelector((state: RootState) => state.auth);
  console.log("Full auth state:", authState);

  // State for mode: login or signup
  const handleLoginToggle = () => {
    dispatch(toggleLogin());
  };

  return (
    <Card className="w-full max-w-sm h-fit mx-auto">
      <CardHeader>
        <CardTitle>
          {isLogin ? "Login to your account" : "Sign up on Kronos"}
        </CardTitle>

        <CardDescription>
          {isLogin
            ? "Enter your email below to sign up on kronos"
            : "Enter your email below to join us on kronos"}
        </CardDescription>
        <CardAction>
          {/* button to update isLogin redux state */}
          <Button
            variant="link"
            type="button"
            className="cursor-pointer"
            onClick={handleLoginToggle}
          >
            {isLogin ? "Log In" : "Sign Up"}
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
        <Button variant="outline" className="w-full">
          {isLogin ? "Log In With Github" : "Sign Up With Github"}
        </Button>
      </CardFooter>
    </Card>
  );
}
