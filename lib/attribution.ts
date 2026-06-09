export type AttributionData = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  referrer?: string | null;
  landing_path?: string | null;
};

export const ATTRIBUTION_STORAGE_KEY = "landing_attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function parseAttributionFromSearchParams(
  searchParams: URLSearchParams,
): Partial<AttributionData> {
  const data: Partial<AttributionData> = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      data[key] = value;
    }
  }

  return data;
}

export function readStoredAttribution(): AttributionData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AttributionData;
  } catch {
    return null;
  }
}

export function storeAttribution(data: AttributionData): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
}

export function captureAttributionFromWindow(): AttributionData {
  const params = new URLSearchParams(window.location.search);
  const fromParams = parseAttributionFromSearchParams(params);
  const existing = readStoredAttribution() ?? {};

  const merged: AttributionData = {
    ...existing,
    ...fromParams,
    referrer: existing.referrer || document.referrer || null,
    landing_path:
      existing.landing_path ||
      `${window.location.pathname}${window.location.search}`,
  };

  storeAttribution(merged);
  return merged;
}
