import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import Layout from "@/features/home/components/Layout";

function Dashboard() {
  return (
    <section className="flex bg-[#0a0a0f] h-full min-h-screen relative max-w-screen">
      <VerticalNavigation />
      <Layout />
    </section>
  );
}

export default Dashboard;
