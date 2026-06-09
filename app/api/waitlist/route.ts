import { NextResponse } from "next/server";
import { hashIp } from "@/lib/auth";
import { createSupabaseAdmin } from "@/lib/supabase";
import { waitlistSignupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ message: "You're on the list!" });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = await hashIp(ip);

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("signups").insert({
      email: data.email.toLowerCase(),
      page_slug: data.page_slug,
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      utm_content: data.utm_content ?? null,
      utm_term: data.utm_term ?? null,
      referrer: data.referrer ?? null,
      landing_path: data.landing_path ?? null,
      user_agent: data.user_agent ?? null,
      ip_hash: ipHash,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({
          message: "You're already on the waitlist for this page.",
        });
      }

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Unable to save your signup right now." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "You're on the list!" });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Unable to save your signup right now." },
      { status: 500 },
    );
  }
}
