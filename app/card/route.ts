import { NextRequest, NextResponse } from "next/server";

const FALLBACK_DESTINATION = "/work-with-me";
const CARD_PATHNAME = "/card";

export const dynamic = "force-dynamic";

function normalizePathname(pathname: string): string {
  const normalized = pathname.toLowerCase().replace(/\/+$/, "");
  return normalized || "/";
}

function resolveDestination(request: NextRequest): URL {
  const configuredDestination = process.env.BUSINESS_CARD_URL?.trim();
  const destination = configuredDestination || FALLBACK_DESTINATION;

  try {
    const url = new URL(destination, request.url);

    if (
      !["http:", "https:"].includes(url.protocol) ||
      normalizePathname(url.pathname) === CARD_PATHNAME
    ) {
      return new URL(FALLBACK_DESTINATION, request.url);
    }

    return url;
  } catch {
    return new URL(FALLBACK_DESTINATION, request.url);
  }
}

export function GET(request: NextRequest) {
  const url = resolveDestination(request);

  url.searchParams.set("utm_source", "business_card");
  url.searchParams.set("utm_medium", "qr");
  url.searchParams.set("utm_campaign", "business_card");

  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "no-store");

  return response;
}
