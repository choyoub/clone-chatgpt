import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constants/routes";
import { cookies } from "next/headers";
import { verify } from "./actions/sessions";

// 이 함수는 내부에서 `await`를 사용하는 경우 `async`로 표시될 수 있습니다
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const cookie = (await cookies()).get("session")?.value;
  const session = await verify(cookie);

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_UP, request.nextUrl));
  }

  return NextResponse.next();
}

// 아래 "Matching Paths"를 참조하여 자세히 알아보세요
export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로를 매칭합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
