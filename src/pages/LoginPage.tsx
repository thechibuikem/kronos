import LogInLeft from "../components/LogInLeft";
import AuthCard from "@/components/AuthCard";

const LoginPage = () => {
  return (
    <div className=" h-screen w-screen flex bg-[#f7f7f7] items-center">
      <LogInLeft />
      <AuthCard />
    </div>
  );
};

export default LoginPage;
