"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Clip } from "./clips";
import { CampaignWithClips } from "./campaigns";
import { fetchCampaignBySlug } from "./data";
import { supabase } from "./supabase";

const HARDCODED_USER_ID = "00000000-0000-0000-0000-000000000001";

interface ReviewSession {
  campaign: CampaignWithClips | null;
  clips: Clip[];
  currentClip: Clip | undefined;
  currentIndex: number;
  remaining: number;
  shipped: Clip[];
  skipped: Clip[];
  swipeDirection: "left" | "right" | null;
  done: boolean;
  loading: boolean;
  handleShip: () => void;
  handleSkip: () => void;
  handleBack: () => void;
  handleNewSession: () => void;
  jumpTo: (index: number) => void;
}

export function useReviewSession(slug: string): ReviewSession {
  const router = useRouter();

  const [campaign, setCampaign] = useState<CampaignWithClips | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [shipped, setShipped] = useState<Clip[]>([]);
  const [skipped, setSkipped] = useState<Clip[]>([]);

  const done = currentIndex >= clips.length && clips.length > 0;
  const currentClip = clips[currentIndex];
  const remaining = clips.length - currentIndex;
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Create a session in Supabase when clips load successfully
  useEffect(() => {
    if (!campaign || clips.length === 0 || sessionIdRef.current) return;

    supabase
      .from("sessions")
      .insert({
        campaign_id: campaign.id,
        user_id: HARDCODED_USER_ID,
        status: "active",
        total_clips: clips.length,
      })
      .select("id")
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to create session:", error);
          return;
        }
        sessionIdRef.current = data.id;
      });
  }, [campaign, clips.length]);

  // Complete session when all clips are reviewed
  useEffect(() => {
    if (!done || !sessionIdRef.current) return;

    const sessionId = sessionIdRef.current;
    supabase
      .from("sessions")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        shipped: shipped.length,
        skipped: skipped.length,
      })
      .eq("id", sessionId)
      .then(({ error }) => {
        if (error) console.error("Failed to complete session:", error);
      });
  }, [done, shipped.length, skipped.length]);

  useEffect(() => {
    fetchCampaignBySlug(slug).then((data) => {
      if (data) {
        setCampaign(data);
        setClips([...data.clips]);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [slug]);

  // Clean up any pending advance timer on unmount
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const advanceClip = useCallback(() => {
    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      setSwipeDirection(null);
      setCurrentIndex((i) => i + 1);
    }, 400);
  }, []);

  const saveDecision = useCallback((clip: Clip, decision: "ship" | "skip") => {
    if (!sessionIdRef.current || !campaign) return;
    // Fire-and-forget — don't block the UI
    supabase
      .from("decisions")
      .insert({
        session_id: sessionIdRef.current,
        clip_id: clip.id,
        campaign_id: campaign.id,
        user_id: HARDCODED_USER_ID,
        decision,
      })
      .then(({ error }) => {
        if (error) console.error("Failed to save decision:", error);
      });
  }, [campaign]);

  const handleShip = useCallback(() => {
    if (swipeDirection || !currentClip) return;
    setShipped((prev) => [...prev, currentClip]);
    setSwipeDirection("right");
    saveDecision(currentClip, "ship");
    advanceClip();
  }, [currentClip, swipeDirection, advanceClip, saveDecision]);

  const handleSkip = useCallback(() => {
    if (swipeDirection || !currentClip) return;
    setSkipped((prev) => [...prev, currentClip]);
    setSwipeDirection("left");
    saveDecision(currentClip, "skip");
    advanceClip();
  }, [currentClip, swipeDirection, advanceClip, saveDecision]);

  const handleBack = useCallback(() => {
    router.push(`/campaigns/${slug}`);
  }, [router, slug]);

  const handleNewSession = useCallback(() => {
    // Reset session ID so a new one is created
    sessionIdRef.current = null;
    setCurrentIndex(0);
    setShipped([]);
    setSkipped([]);
    setSwipeDirection(null);
  }, []);

  const jumpTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (done || loading) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "l") handleShip();
      if (e.key === "ArrowLeft" || e.key === "h") handleSkip();
      if (e.key === "Escape") handleBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleShip, handleSkip, handleBack, done, loading]);

  return {
    campaign, clips, currentClip, currentIndex, remaining,
    shipped, skipped, swipeDirection, done, loading,
    handleShip, handleSkip, handleBack, handleNewSession, jumpTo,
  };
}
