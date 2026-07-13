import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import Layout from "@/features/home/components/Layout";

function Dashboard() {
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
