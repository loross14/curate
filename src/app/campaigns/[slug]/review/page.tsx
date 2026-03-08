"use client";

import { use, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clip } from "@/lib/clips";
import { getCampaignBySlug } from "@/lib/campaigns";
import { ClipCard, DesktopClipView } from "@/components/ClipCard";
import { ActionBar } from "@/components/ActionBar";
import { Header } from "@/components/Header";
import { QueueSidebar } from "@/components/QueueSidebar";
import { SessionSummary } from "@/components/SessionSummary";
import { useLayout } from "@/lib/hooks";

export default function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const layout = useLayout();
  const campaign = getCampaignBySlug(slug);

  const [clips] = useState<Clip[]>(() => campaign ? [...campaign.clips] : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [shipped, setShipped] = useState<Clip[]>([]);
  const [skipped, setSkipped] = useState<Clip[]>([]);
  const [done, setDone] = useState(false);

  const currentClip = clips[currentIndex];
  const remaining = clips.length - currentIndex;

  const advanceClip = useCallback(() => {
    setTimeout(() => {
      setSwipeDirection(null);
      if (currentIndex + 1 >= clips.length) {
        setDone(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 400);
  }, [currentIndex, clips.length]);

  const handleShip = useCallback(() => {
    if (swipeDirection || !currentClip) return;
    setShipped((prev) => [...prev, currentClip]);
    setSwipeDirection("right");
    advanceClip();
  }, [currentClip, swipeDirection, advanceClip]);

  const handleSkip = useCallback(() => {
    if (swipeDirection || !currentClip) return;
    setSkipped((prev) => [...prev, currentClip]);
    setSwipeDirection("left");
    advanceClip();
  }, [currentClip, swipeDirection, advanceClip]);

  const handleBack = useCallback(() => {
    router.push(`/campaigns/${slug}`);
  }, [router, slug]);

  const handleNewSession = useCallback(() => {
    setCurrentIndex(0);
    setShipped([]);
    setSkipped([]);
    setSwipeDirection(null);
    setDone(false);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (done) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "l") handleShip();
      if (e.key === "ArrowLeft" || e.key === "h") handleSkip();
      if (e.key === "Escape") handleBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleShip, handleSkip, handleBack, done]);

  if (!campaign) {
    router.push("/");
    return null;
  }

  // No clips to review
  if (clips.length === 0) {
    router.push(`/campaigns/${slug}`);
    return null;
  }

  // Session complete → summary
  if (done) {
    return (
      <SessionSummary
        shipped={shipped}
        skipped={skipped}
        campaignName={campaign.name}
        onNewSession={handleNewSession}
        onBackToCampaign={handleBack}
        onBackToDashboard={() => router.push("/")}
      />
    );
  }

  // Desktop session
  if (layout === "desktop") {
    return (
      <div className="h-dvh flex flex-col">
        <Header
          remaining={remaining}
          shipped={shipped.length}
          skipped={skipped.length}
          layout="desktop"
          campaignName={campaign.name}
          onBack={handleBack}
        />
        <div className="flex-1 flex overflow-hidden">
          <QueueSidebar clips={clips} currentIndex={currentIndex} shipped={shipped} skipped={skipped} />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 flex p-6 overflow-hidden">
              {currentClip && (
                <DesktopClipView clip={currentClip} swipeDirection={swipeDirection} />
              )}
            </main>
            <ActionBar onSkip={handleSkip} onShip={handleShip} layout="desktop" />
          </div>
        </div>
      </div>
    );
  }

  // Mobile session
  return (
    <div className="h-dvh flex flex-col">
      <Header
        remaining={remaining}
        shipped={shipped.length}
        skipped={skipped.length}
        layout="mobile"
        campaignName={campaign.name}
        onBack={handleBack}
      />
      <main className="flex-1 flex items-center justify-center px-4 pb-4 overflow-hidden">
        {currentClip && (
          <ClipCard clip={currentClip} swipeDirection={swipeDirection} layout="mobile" />
        )}
      </main>
      <ActionBar onSkip={handleSkip} onShip={handleShip} layout="mobile" />
    </div>
  );
}
