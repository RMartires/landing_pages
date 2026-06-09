import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DASHBOARD_COOKIE, getDashboardSessionToken } from "@/lib/auth";
import { dashboardLoginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = dashboardLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const expectedPassword = process.env.DASHBOARD_PASSWORD;
    if (!expectedPassword || parsed.data.password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(DASHBOARD_COOKIE, getDashboardSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dashboard login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(DASHBOARD_COOKIE);
  return NextResponse.json({ success: true });
}
