export const DASHBOARD_COOKIE = "dashboard_session";

async function hashTokenEdge(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyDashboardSessionTokenEdge(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    return false;
  }

  const expected = await hashTokenEdge(password);
  return token === expected;
}
