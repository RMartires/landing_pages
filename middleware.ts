import { NextResponse, type NextRequest } from "next/server";
import {
  extractSubdomain,
  getRootDomain,
  isDashboardSubdomain,
} from "@/lib/domain";
import {
  DASHBOARD_COOKIE,
  verifyDashboardSessionTokenEdge,
} from "@/lib/auth-edge";
import { getLandingPage } from "@/landing-pages/registry";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = extractSubdomain(host, getRootDomain());
  const { pathname } = request.nextUrl;

  if (isDashboardSubdomain(subdomain)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname =
      pathname === "/" ? "/dashboard" : `/dashboard${pathname}`;

    if (pathname.startsWith("/dashboard")) {
      return await protectDashboard(request);
    }

    return NextResponse.rewrite(dashboardUrl);
  }

  if (subdomain) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    const page = getLandingPage(subdomain);

    if (pathname === "/privacy" || pathname === "/terms") {
      return NextResponse.next();
    }

    if (!page) {
      return NextResponse.rewrite(new URL("/sites/not-found", request.url));
    }

    if (pathname.startsWith("/sites/")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname =
      pathname === "/" ? `/sites/${subdomain}` : `/sites/${subdomain}${pathname}`;

    return NextResponse.rewrite(rewriteUrl);
  }

  if (pathname.startsWith("/sites/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard")) {
    return await protectDashboard(request);
  }

  return NextResponse.next();
}

async function protectDashboard(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/dashboard/login" ||
    pathname.startsWith("/api/dashboard/login")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(DASHBOARD_COOKIE)?.value;
  if (await verifyDashboardSessionTokenEdge(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/dashboard")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/dashboard/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
