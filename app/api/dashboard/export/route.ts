import { NextResponse } from "next/server";
import { isDashboardAuthenticated } from "@/lib/auth";
import { createSupabaseAdmin, type SignupRow } from "@/lib/supabase";

function escapeCsv(value: string | null | undefined): string {
  const safe = value ?? "";
  if (/[",\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

export async function GET() {
  if (!(await isDashboardAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("signups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Dashboard export error:", error);
      return NextResponse.json(
        { error: "Unable to export signups" },
        { status: 500 },
      );
    }

    const signups = (data ?? []) as SignupRow[];
    const headers = [
      "created_at",
      "email",
      "page_slug",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "referrer",
      "landing_path",
    ];

    const rows = signups.map((signup) =>
      [
        signup.created_at,
        signup.email,
        signup.page_slug,
        signup.utm_source,
        signup.utm_medium,
        signup.utm_campaign,
        signup.utm_content,
        signup.utm_term,
        signup.referrer,
        signup.landing_path,
      ]
        .map((value) => escapeCsv(value))
        .join(","),
    );

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="signups.csv"',
      },
    });
  } catch (error) {
    console.error("Dashboard export API error:", error);
    return NextResponse.json(
      { error: "Unable to export signups" },
      { status: 500 },
    );
  }
}
