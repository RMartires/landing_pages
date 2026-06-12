"use client";

import { useEffect, useRef } from "react";
import { exampleVideos } from "./example-videos";

const galleryVideos = [...exampleVideos, ...exampleVideos];

export function ExampleVideoGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const keepPlaying = () => {
      track.querySelectorAll("video").forEach((video) => {
        if (video.paused) {
          void video.play().catch(() => undefined);
        }
      });
    };

    keepPlaying();
    const interval = window.setInterval(keepPlaying, 2000);
    document.addEventListener("visibilitychange", keepPlaying);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", keepPlaying);
    };
  }, []);

  return (
    <section className="overflow-hidden px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-medium text-violet-300">Creator examples</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          See what FacelessFlow can create
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
          Real faceless video styles — from cinematic POV to viral story formats,
          all generated on autopilot.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07060f] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07060f] to-transparent sm:w-24" />

        <div
          ref={trackRef}
          className="flex w-max animate-[marquee_40s_linear_infinite] gap-4 will-change-transform"
        >
          {galleryVideos.map((video, index) => (
            <div
              key={`${video.name}-${index}`}
              className="group relative w-44 shrink-0 sm:w-52"
              style={{ filter: `drop-shadow(0 0 24px ${video.glowColor})` }}
            >
              <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black">
                <video
                  playsInline
                  autoPlay
                  loop
                  muted
                  poster={video.poster}
                  controlsList="nodownload"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>
              <p className="mt-2 text-center text-xs font-medium text-zinc-300">
                {video.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
