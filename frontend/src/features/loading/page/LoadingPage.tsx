import { Loader } from "@/features/loading/components/preloader";

function LoadingPage() {
  return (
    <section className="w-screen h-screen bg-[#0a0a0f] flex flex-col justify-center items-center gap-5">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-[#06b6d4]/40">
        <svg
          viewBox="0 0 16 16"
          width="20"
          height="20"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        >
          <circle cx="8" cy="8" r="3" />
          <line x1="8" y1="1" x2="8" y2="4" />
          <line x1="8" y1="12" x2="8" y2="15" />
          <line x1="1" y1="8" x2="4" y2="8" />
          <line x1="12" y1="8" x2="15" y2="8" />
        </svg>
      </div>
      <Loader size={28} />
      <p className="text-xs text-[#334155] tracking-widest uppercase">
        Loading
      </p>
    </section>
  );
}

export default LoadingPage;
