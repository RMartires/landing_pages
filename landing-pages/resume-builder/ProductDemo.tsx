"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { PRODUCT_DEMO_VIDEO } from "./demo-video";

type ProductDemoProps = {
  className?: string;
  label?: string;
  size?: "default" | "large";
};

export function ProductDemo({
  className,
  label = "Product demo",
  size = "default",
}: ProductDemoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={className}>
      <div
        className={`relative overflow-hidden border border-white/10 bg-black shadow-2xl shadow-emerald-950/30 ${
          size === "large" ? "rounded-3xl" : "rounded-2xl"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b border-white/10 ${
            size === "large" ? "px-5 py-3" : "px-4 py-2.5"
          }`}
        >
          <span className={size === "large" ? "text-sm text-zinc-400" : "text-xs text-zinc-400"}>
            {label}
          </span>
          <span
            className={`rounded-full bg-emerald-500/15 font-medium text-emerald-300 ${
              size === "large" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]"
            }`}
          >
            ResumePilot preview
          </span>
        </div>

        <div
          className={`relative bg-[#0a100e] ${
            size === "large"
              ? "aspect-[16/10] min-h-[280px] sm:min-h-[420px] lg:min-h-[520px]"
              : "aspect-video"
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={PRODUCT_DEMO_VIDEO} type="video/webm" />
            Your browser does not support video playback.
          </video>

          <button
            type="button"
            onClick={togglePlayback}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            aria-label={playing ? "Pause demo" : "Play demo"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
