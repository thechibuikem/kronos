import { Loader } from "@/features/loading/components/preloader";

function LoadingPage() {
  return (
    <section className="w-screen h-screen bg-[#0a0a0f] flex flex-col justify-center items-center gap-5">
      <Loader size={28} />
      <p className="text-xs text-[#334155] tracking-widest uppercase">
        Loading
      </p>
    </section>
  );
}

export default LoadingPage;
