"use client";

interface CurateLogoProps {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: { icon: 20, text: "text-sm" },
  md: { icon: 28, text: "text-lg" },
  lg: { icon: 40, text: "text-2xl" },
};

// SVG curve mark traced from logo-test.jpg
// The sweeping upward curve: raw content enters at the dark base, what's curated rises
function CurveMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="curve-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* Main curve — exponential growth arc from bottom-left to top-right */}
      <path
        d="M4 38 C4 38 6 30 8 26 C10 22 12 20 15 17 C18 14 21 12 24 9 C27 6 30 4 34 2 L36 2 C32 5 28 8 25 11 C22 14 19 17 16 20 C13 23 10 27 8 32 C7 35 6 38 6 38 Z"
        fill="url(#curve-grad)"
      />
    </svg>
  );
}

export function CurateLogo({ variant = "full", size = "md", className = "" }: CurateLogoProps) {
  const s = SIZES[size];

  if (variant === "wordmark") {
    return (
      <span className={`font-semibold tracking-tight lowercase ${s.text} ${className}`}>
        curate
      </span>
    );
  }

  if (variant === "mark") {
    return (
      <span className={className}>
        <CurveMark size={s.icon} />
      </span>
    );
  }

  // Full: mark + wordmark
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <CurveMark size={s.icon} />
      <span className={`font-semibold tracking-tight lowercase ${s.text}`}>
        curate
      </span>
    </span>
  );
}
