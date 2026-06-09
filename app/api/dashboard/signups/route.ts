import { NextResponse } from "next/server";
import { isDashboardAuthenticated } from "@/lib/auth";
import { createSupabaseAdmin, type SignupRow } from "@/lib/supabase";

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
      console.error("Dashboard signups fetch error:", error);
      return NextResponse.json(
        { error: "Unable to load signups" },
        { status: 500 },
      );
    }

    return NextResponse.json({ signups: (data ?? []) as SignupRow[] });
  } catch (error) {
    console.error("Dashboard signups API error:", error);
    return NextResponse.json(
      { error: "Unable to load signups" },
      { status: 500 },
    );
  }
}
