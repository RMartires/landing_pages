import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const DASHBOARD_COOKIE = "dashboard_session";

export function hashToken(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function getDashboardSessionToken(): string {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    throw new Error("Missing DASHBOARD_PASSWORD");
  }
  return hashToken(password);
}

export function verifyDashboardSessionToken(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  try {
    const expected = getDashboardSessionToken();
    const actualBuffer = Buffer.from(token);
    const expectedBuffer = Buffer.from(expected);

    if (actualBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(actualBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export async function isDashboardAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_COOKIE)?.value;
  return verifyDashboardSessionToken(token);
}

export async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT ?? "landing-pages";
  return hashToken(`${salt}:${ip}`);
}
