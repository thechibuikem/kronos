//1. importing dependencies
import VerticalNavigation from "@/features/home/components/VerticalNavigation";
import RepoList from "@/features/repositories/components/RepoList";


//2. functional component
function Repositories() {

  return (
    <section className="flex md:p-8 bg-gradient-to-r from-blue-950 to-blue-100 h-full min-h-screen relative w-screen">
      <VerticalNavigation />
      <RepoList />
    </section>
  );
}

export default Repositories;
