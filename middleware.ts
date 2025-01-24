import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "./actions/sessions";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constants/routes";

/**
 * 미들웨어 함수
 * 모든 페이지 요청 전에 실행되며 인증 및 권한 검사를 수행합니다.
 *
 * @param request - Next.js 요청 객체
 * @returns NextResponse 객체
 */
export async function middleware(request: NextRequest) {
  // 현재 요청된 URL의 경로를 추출
  const { pathname } = request.nextUrl;

  // 현재 경로가 공개 라우트(로그인, 회원가입 등)인지 확인
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 쿠키에서 세션 정보를 가져와서 유효성 검증
  const cookie = (await cookies()).get("session")?.value;
  const session = await verify(cookie);

  // 비공개 라우트에 접근하려 하는데 세션이 없는 경우
  // 로그인 페이지로 리다이렉트
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  // 이미 로그인된 사용자가 공개 라우트(로그인, 회원가입 등)에 접근하려는 경우
  // 회원가입 페이지로 리다이렉트
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_UP, request.nextUrl));
  }

  // 위의 조건에 해당하지 않는 경우 정상적으로 다음 처리로 진행
  return NextResponse.next();
}

/**
 * 미들웨어 설정 객체
 * 미들웨어가 실행될 경로 패턴을 지정합니다.
 */
export const config = {
  matcher: [
    /**
     * 다음 경로들을 제외한 모든 요청에 미들웨어를 적용합니다:
     * - /api/* : API 라우트
     * - /_next/static/* : 정적 파일 (CSS, JS 등)
     * - /_next/image/* : Next.js 이미지 최적화
     * - /favicon.ico : 파비콘
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
