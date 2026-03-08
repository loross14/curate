"use client";

function SkipIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ShipIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface ActionBarProps {
  onSkip: () => void;
  onShip: () => void;
  layout?: "mobile" | "desktop";
}

export function ActionBar({ onSkip, onShip, layout = "mobile" }: ActionBarProps) {
  if (layout === "desktop") {
    return (
      <div className="flex items-center justify-center gap-4 py-4 border-t border-[#1a1a1a]">
        <button
          onClick={onSkip}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all active:scale-95"
        >
          <SkipIcon size={18} />
          <span className="text-sm font-medium">Skip</span>
          <kbd className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded ml-1 text-zinc-500">←</kbd>
        </button>

        <button
          onClick={onShip}
          className="flex items-center gap-2 px-8 py-3 rounded-xl border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500 transition-all active:scale-95 glow-pulse"
        >
          <ShipIcon size={20} />
          <span className="text-sm font-medium">Ship</span>
          <kbd className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded ml-1 text-zinc-500">→</kbd>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-8 pb-8 pt-4">
      <button
        onClick={onSkip}
        className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all active:scale-90"
        aria-label="Skip clip"
      >
        <SkipIcon size={28} />
      </button>
      <button
        onClick={onShip}
        className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-green-500/40 text-green-400 hover:bg-green-500/10 hover:border-green-500 transition-all active:scale-90 glow-pulse"
        aria-label="Ship clip"
      >
        <ShipIcon size={36} />
      </button>
    </div>
  );
}
