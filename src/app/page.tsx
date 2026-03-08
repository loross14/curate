"use client";

import { useState, useCallback, useEffect } from "react";
import { Clip } from "@/lib/clips";
import { DEMO_CAMPAIGNS, CampaignWithClips } from "@/lib/campaigns";
import { CampaignDashboard } from "@/components/CampaignDashboard";
import { CampaignHero } from "@/components/CampaignHero";
import { ClipCard, DesktopClipView } from "@/components/ClipCard";
import { ActionBar } from "@/components/ActionBar";
import { Header } from "@/components/Header";
import { QueueSidebar } from "@/components/QueueSidebar";
import { SessionSummary } from "@/components/SessionSummary";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

type AppView = "dashboard" | "hero" | "session" | "summary";

export default function Home() {
  const [view, setView] = useState<AppView>("dashboard");
  const [activeCampaign, setActiveCampaign] = useState<CampaignWithClips | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [shipped, setShipped] = useState<Clip[]>([]);
  const [skipped, setSkipped] = useState<Clip[]>([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const layout = isDesktop ? "desktop" : "mobile";

  const currentClip = clips[currentIndex];
  const remaining = clips.length - currentIndex;

  // Campaign selection
  const handleSelectCampaign = useCallback((campaign: CampaignWithClips) => {
    setActiveCampaign(campaign);
    setView("hero");
  }, []);

  // Start curation session
  const handleStartSession = useCallback(() => {
    if (!activeCampaign) return;
    setClips([...activeCampaign.clips]);
    setCurrentIndex(0);
    setShipped([]);
    setSkipped([]);
    setSwipeDirection(null);
    setView("session");
  }, [activeCampaign]);

  // Back to dashboard
  const handleBackToDashboard = useCallback(() => {
    setActiveCampaign(null);
    setView("dashboard");
  }, []);

  // Back to hero from session
  const handleBackToHero = useCallback(() => {
    setView("hero");
  }, []);

  // Clip navigation
  const advanceClip = useCallback(() => {
    setTimeout(() => {
      setSwipeDirection(null);
      if (currentIndex + 1 >= clips.length) {
        setView("summary");
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

  // Keyboard controls (only during session)
  useEffect(() => {
    if (view !== "session") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "l") handleShip();
      if (e.key === "ArrowLeft" || e.key === "h") handleSkip();
      if (e.key === "Escape") handleBackToHero();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleShip, handleSkip, handleBackToHero, view]);

  // ═══ DASHBOARD ═══
  if (view === "dashboard") {
    return (
      <CampaignDashboard
        campaigns={DEMO_CAMPAIGNS}
        onSelectCampaign={handleSelectCampaign}
        layout={layout}
      />
    );
  }

  // ═══ CAMPAIGN HERO ═══
  if (view === "hero" && activeCampaign) {
    return (
      <CampaignHero
        campaign={activeCampaign}
        onStartSession={handleStartSession}
        onBack={handleBackToDashboard}
        layout={layout}
      />
    );
  }

  // ═══ SESSION SUMMARY ═══
  if (view === "summary") {
    return (
      <SessionSummary
        shipped={shipped}
        skipped={skipped}
        campaignName={activeCampaign?.name}
        onNewSession={handleStartSession}
        onBackToCampaign={handleBackToHero}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  // ═══ CURATION SESSION ═══
  if (isDesktop) {
    return (
      <div className="h-dvh flex flex-col">
        <Header
          remaining={remaining}
          shipped={shipped.length}
          skipped={skipped.length}
          layout="desktop"
          campaignName={activeCampaign?.name}
          onBack={handleBackToHero}
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
        campaignName={activeCampaign?.name}
        onBack={handleBackToHero}
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
