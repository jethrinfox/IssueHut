import { sha256 } from "@oslojs/crypto/sha2"
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding"
import { eq, getTableColumns } from "drizzle-orm"
import { cookies } from "next/headers"

import db from "../db"
import users, { type Session, sessions, type User } from "../db/schema/user"

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6),
    id: sessionId,
    userId,
  }
  await db.insert(sessions).values(session)
  return session
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const { password: _, ...userColumns } = getTableColumns(users)
  const result = await db
    .select({ session: sessions, user: userColumns })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))
  if (!result[0]) {
    return { session: null, user: null }
  }
  const { session, user } = result[0]
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id))
    return { session: null, user: null }
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 3) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 6)
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id))
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  ;(await cookies()).set("session", token, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export async function deleteSessionTokenCookie() {
  ;(await cookies()).set("session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export type SessionValidationResult =
  | { session: null; user: null }
  | { session: Session; user: Omit<User, "password"> }
