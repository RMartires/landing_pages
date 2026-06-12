"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { exampleVideos } from "./example-videos";

export function ExampleVideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(exampleVideos.length - 1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = exampleVideos[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => undefined);
  }, [activeIndex]);

  function goTo(index: number) {
    setActiveIndex((index + exampleVideos.length) % exampleVideos.length);
  }

  return (
    <div className="relative">
      <div
        className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur sm:p-4"
        style={{ boxShadow: `0 0 60px ${active.glowColor}` }}
      >
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-400 sm:mb-3">
          <span>Example videos</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
            AI generated
          </span>
        </div>

        <div className="relative mx-auto aspect-[9/16] max-h-[240px] overflow-hidden rounded-xl bg-black sm:max-h-[360px] lg:max-h-[420px]">
          <video
            ref={videoRef}
            key={active.src}
            playsInline
            autoPlay
            loop
            muted
            poster={active.poster}
            controlsList="nodownload"
            className="h-full w-full object-cover"
          >
            <source src={active.src} type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
            <p className="text-sm font-medium text-white">{active.name}</p>
            <p className="text-xs text-zinc-400">
              {activeIndex + 1} of {exampleVideos.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
            aria-label="Next video"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 hidden grid-cols-5 gap-2 sm:mt-4 sm:grid">
          {exampleVideos.map((video, index) => (
            <button
              key={video.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[9/16] w-full overflow-hidden rounded-lg border-2 transition ${
                index === activeIndex
                  ? "border-violet-400"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`Show ${video.name} example`}
            >
              <video
                playsInline
                muted
                loop
                autoPlay
                poster={video.poster}
                className="h-full w-full object-cover"
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
