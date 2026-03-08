"use client";

interface HeaderProps {
  remaining: number;
  shipped: number;
  skipped: number;
  layout?: "mobile" | "desktop";
  campaignName?: string;
  onBack?: () => void;
}

export function Header({ remaining, shipped, skipped, layout = "mobile", campaignName, onBack }: HeaderProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "good morning" : hour < 17 ? "good afternoon" : "good evening";
  const total = shipped + skipped + remaining;
  const progress = total > 0 ? ((shipped + skipped) / total) * 100 : 0;

  if (layout === "desktop") {
    return (
      <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight">CURATE</h1>
              {campaignName && (
                <>
                  <span className="text-zinc-700">/</span>
                  <span className="text-sm text-zinc-400">{campaignName}</span>
                </>
              )}
            </div>
            <p className="text-xs text-zinc-500">{greeting}, curator</p>
          </div>
          <div className="h-8 w-px bg-zinc-800 ml-2" />
          <div className="flex items-center gap-1">
            <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-600 font-mono ml-2">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-400">{shipped} shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-400">{skipped} skipped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="text-zinc-500">{remaining} queued</span>
          </div>
          <kbd className="text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600">esc to exit</kbd>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-3">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div>
          <h1 className="text-lg font-semibold tracking-tight">CURATE</h1>
          {campaignName ? (
            <p className="text-[10px] text-zinc-500 truncate max-w-[140px]">{campaignName}</p>
          ) : (
            <p className="text-xs text-zinc-500">{greeting}, curator</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
        <span className="text-green-500">{shipped} shipped</span>
        <span className="text-zinc-600">·</span>
        <span className="text-red-400">{skipped} skipped</span>
        <span className="text-zinc-600">·</span>
        <span>{remaining} left</span>
      </div>
    </header>
  );
}
