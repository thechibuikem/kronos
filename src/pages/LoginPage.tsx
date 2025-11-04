import LogInLeft from "../components/sectionComponents/LogInLeft";
import AuthCard from "@/components/sectionComponents/AuthCard";

const LoginPage = () => {
  return (
    <div className=" h-screen w-screen flex bg-[#f7f7f7] items-center">
      <LogInLeft />
      <AuthCard />
    </div>
  );
};

export default LoginPage;
