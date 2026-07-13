import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import Layout from "@/features/home/components/Layout";
import { useFetchKrons } from "@/hooks/useFetchKrons";
import { useFetchRepos } from "@/hooks/useFetchRepos";
import { useEffect } from "react";

function Dashboard() {
useEffect(() => {
  useFetchRepos()
  useFetchKrons()

}, []);
  return (
    <section className="flex bg-[#0a0a0f] min-h-screen h-full w-full overflow-x-hidden">
      <VerticalNavigation />
      <div className="flex-1 min-w-0">
        <Layout />
      </div>
    </section>
  );
}

export default Dashboard;
