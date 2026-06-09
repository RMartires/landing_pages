"use client";

import { useEffect } from "react";
import { captureAttributionFromWindow } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromWindow();
  }, []);

  return null;
}
