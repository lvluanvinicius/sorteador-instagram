import { type NextRequest, NextResponse } from "next/server";
import { FetchError, get } from "@/services/app";

export async function middleware(request: NextRequest) {
  try {
    const cookiesString = request.headers.get("cookie");

    const response = await get(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
      headers: {
        Accept: "application/json",
        cookie: cookiesString as string,
      },
    });

    if (response.status) {
      return NextResponse.next();
    }

    throw new Error(response.message);
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: ["/account/:path*", "/home/:path*", "/raffle-maker/:path*"],
};
