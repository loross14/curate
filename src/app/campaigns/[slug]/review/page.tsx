"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipCard, DesktopClipView } from "@/components/ClipCard";
import { ActionBar } from "@/components/ActionBar";
import { Header } from "@/components/Header";
import { QueueSidebar } from "@/components/QueueSidebar";
import { SessionSummary } from "@/components/SessionSummary";
import { useLayout } from "@/lib/hooks";
import { useReviewSession } from "@/lib/useReviewSession";

export default function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const layout = useLayout();
  const session = useReviewSession(slug);

  const shouldRedirect = !session.loading && (!session.campaign || session.clips.length === 0);

  useEffect(() => {
    if (shouldRedirect) {
      router.push(`/campaigns/${slug}`);
    }
  }, [shouldRedirect, router, slug]);

  if (session.loading || layout === null || shouldRedirect) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm animate-pulse">loading clips…</p>
      </div>
    );
  }

  if (session.done) {
    return (
      <SessionSummary
        shipped={session.shipped}
        skipped={session.skipped}
        campaignName={session.campaign!.name}
        onNewSession={session.handleNewSession}
        onBackToCampaign={session.handleBack}
        onBackToDashboard={() => router.push("/")}
      />
    );
  }

  if (layout === "desktop") {
    return (
      <div className="h-dvh flex flex-col">
        <Header
          remaining={session.remaining}
          shipped={session.shipped.length}
          skipped={session.skipped.length}
          layout="desktop"
          campaignName={session.campaign!.name}
          onBack={session.handleBack}
        />
        <div className="flex-1 flex overflow-hidden">
          <QueueSidebar
            clips={session.clips}
            currentIndex={session.currentIndex}
            shipped={session.shipped}
            skipped={session.skipped}
            onJumpTo={session.jumpTo}
          />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 flex p-6 overflow-hidden">
              {session.currentClip && (
                <DesktopClipView clip={session.currentClip} swipeDirection={session.swipeDirection} />
              )}
            </main>
            <ActionBar onSkip={session.handleSkip} onShip={session.handleShip} layout="desktop" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      <Header
        remaining={session.remaining}
        shipped={session.shipped.length}
        skipped={session.skipped.length}
        layout="mobile"
        campaignName={session.campaign!.name}
        onBack={session.handleBack}
      />
      <main className="flex-1 flex items-center justify-center px-4 pb-4 overflow-hidden">
        {session.currentClip && (
          <ClipCard clip={session.currentClip} swipeDirection={session.swipeDirection} layout="mobile" />
        )}
      </main>
      <ActionBar onSkip={session.handleSkip} onShip={session.handleShip} layout="mobile" />
    </div>
  );
}
