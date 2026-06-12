const STRIP_PREFIXES = ["www.", "dashboard."];

/**
 * Builds a landing page URL from the host the user is currently on,
 * so links work on localhost (any port) and in production.
 */
export function buildPageUrl(host: string, slug: string): string {
  let root = host.toLowerCase();
  for (const prefix of STRIP_PREFIXES) {
    if (root.startsWith(prefix)) {
      root = root.slice(prefix.length);
    }
  }
  const protocol = root.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${slug}.${root}`;
}

export function displayHost(url: string): string {
  return url.replace(/^https?:\/\//, "");
}
