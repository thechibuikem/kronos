// StatusStrip replaces the old ChartAndAnalysis section.
// TODO: wire these four values to real handlers/state instead of the placeholders below.
//   - lastSync      → timestamp of most recent webhook/cron event
//   - kronsTracked  → repos.length from your watchlist state
//   - insightsSent  → count of emails sent this week (Resend logs / your own counter)
//   - nextSync      → time remaining until next 6h cron run

interface StatusStripProps {
  lastSync?: string;
  kronsTracked?: number;
  insightsSent?: number;
  nextSync?: string;
}

function StatusStrip({
  lastSync = "12 min ago",
  kronsTracked = 0,
  insightsSent = 0,
  nextSync = "—",
}: StatusStripProps) {
  const cells = [
    { label: "Last Sync", value: lastSync, dot: true },
    { label: "Krons Tracked", value: String(kronsTracked) },
    { label: "Insights Sent", value: `${insightsSent} this week`, cyan: true },
    { label: "Next Sync", value: nextSync },
  ];

  return (
    <div className="flex gap-px bg-[#1a1a2e] border border-[#1a1a2e] rounded-xl overflow-hidden">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex-1 bg-[#0d0d15] px-5 py-4 flex flex-col gap-1"
        >
          <span className="text-[11px] uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
            {cell.dot && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            )}
            {cell.label}
          </span>
          <span
            className={`text-[19px] font-semibold tracking-tight ${
              cell.cyan ? "text-[#06b6d4]" : "text-[#e2e8f0]"
            }`}
          >
            {cell.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatusStrip;
