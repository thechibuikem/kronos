import LogInLeft from "../components/LogInLeft";
import AuthCard from "@/features/auth/components/AuthCard";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0a0a0f]">
      <LogInLeft />
      <AuthCard />
    </div>
  );
};

export default LoginPage;
