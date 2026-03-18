import {
  Card,
  CardFooter,
} from "@/features/home/ui/card";
// import KronosLogo from "../../home/components/KronosLogo";
import OauthBtn from "./OauthBtn";
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


  return (
    <Card className="p-16 md:w-full max-w-sm h-fit flex mx-auto justify-center items-center relative">
{ authErrorMsg && (<ErrorBanner />)}

      <CardFooter className="flex-col gap-2">
        {/* oauth button */}
        <OauthBtn />
      </CardFooter>
    </Card>
  );
}
