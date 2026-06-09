const LOCALHOST = "localhost";

export function getRootDomain(): string {
  return process.env.ROOT_DOMAIN ?? LOCALHOST;
}

export function extractSubdomain(host: string, rootDomain = getRootDomain()): string | null {
  const hostname = host.split(":")[0].toLowerCase();
  const root = rootDomain.split(":")[0].toLowerCase();

  if (hostname === root || hostname === `www.${root}`) {
    return null;
  }

  if (root === LOCALHOST && hostname.endsWith(`.${LOCALHOST}`)) {
    const subdomain = hostname.slice(0, -(LOCALHOST.length + 1));
    return subdomain && subdomain !== "www" ? subdomain : null;
  }

  if (hostname.endsWith(`.${root}`)) {
    const subdomain = hostname.slice(0, -(root.length + 1));
    return subdomain && subdomain !== "www" ? subdomain : null;
  }

  return null;
}

export function isDashboardSubdomain(subdomain: string | null): boolean {
  return subdomain === "dashboard";
}
