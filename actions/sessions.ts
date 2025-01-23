"use server";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  name: string;
};

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // hash 알고리즘
    .setIssuedAt() // 발급시간을 현재시간
    .setExpirationTime("1d") // 만료시간 1일
    .sign(encodeKey);
};

export const verify = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodeKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("토큰 검증에 실패하였습니다.");
  }
};

export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect("/login");
  }

  return session;
};
