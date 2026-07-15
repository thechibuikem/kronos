import KronosLogo from "../../home/components/KronosLogo";

export default function LogInLeft() {
  return (
    <figure className="relative hidden md:flex flex-col justify-between w-[42%] h-full bg-[#0d0d15] border-r border-[#1a1a2e] p-12 overflow-hidden">
      {/* Cyan ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.07)_0%,transparent_70%)]" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-48 h-48 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Logo */}
      <KronosLogo />

      {/* Hero copy */}
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight leading-snug text-[#e2e8f0]">
            Your repos.
            <br />
            <span className="text-[#06b6d4]">Understood.</span>
          </h1>
          <p className="mt-3 text-sm text-[#64748b] leading-relaxed max-w-[280px]">
            Kronos watches your GitHub activity and surfaces what actually
            matters — delivered straight to your inbox.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-semibold tracking-tight text-[#e2e8f0]">
              6h
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#475569]">
              Sync cycle
            </span>
          </div>
          <div className="w-px h-8 bg-[#1e293b]" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-semibold tracking-tight text-[#e2e8f0]">
              5
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#475569]">
              Risk signals
            </span>
          </div>
          <div className="w-px h-8 bg-[#1e293b]" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-semibold tracking-tight text-[#e2e8f0]">
              AI
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#475569]">
              Powered
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#334155]">
        © 2026 Kronos · Built for engineers
      </p>
    </figure>
  );
}
