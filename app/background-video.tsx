"use client";

import { useEffect, useRef } from "react";

const playbackRate = 0.8;
const baseVideoOpacity = 0.8;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const applyPlaybackRate = () => {
      video.defaultPlaybackRate = playbackRate;
      video.playbackRate = playbackRate;
    };

    applyPlaybackRate();
    video.addEventListener("loadedmetadata", applyPlaybackRate);

    return () => {
      video.removeEventListener("loadedmetadata", applyPlaybackRate);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let animationFrame = 0;

    const updateOpacity = () => {
      const fadeStart = window.innerHeight * 0.55;
      const fadeEnd = window.innerHeight * 1.15;
      const progress = Math.min(
        Math.max((window.scrollY - fadeStart) / (fadeEnd - fadeStart), 0),
        1,
      );
      video.style.opacity = String(baseVideoOpacity * (1 - progress));
      animationFrame = 0;
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateOpacity);
      }
    };

    updateOpacity();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="site-background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="site-video-overlay" aria-hidden="true" />
    </>
  );
}
