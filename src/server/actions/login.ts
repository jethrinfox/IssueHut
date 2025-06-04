"use server";

import { env } from "@/env";
import { LoginError } from "@/utils/errors";
import { headers } from "next/headers";

import authorizeUser, {
  AUTH_COMMON_ERROR_MESSAGE,
} from "../utils/authorizeUser";

const idToRequestCount = new Map<string, number>(); // keeps track of individual users
const rateLimiter = {
  maxRequests: 10,
  windowSize: 10000,
  windowStart: Date.now(),
};

const limit = (ip: string) => {
  // Check and update current window
  const now = Date.now();
  const isNewWindow = now - rateLimiter.windowStart > rateLimiter.windowSize;
  if (isNewWindow) {
    rateLimiter.windowStart = now;
    idToRequestCount.set(ip, 0);
  }

  // Check and update current request limits
  const currentRequestCount = idToRequestCount.get(ip) ?? 0;
  if (currentRequestCount >= rateLimiter.maxRequests) return true;
  idToRequestCount.set(ip, currentRequestCount + 1);

  return false;
};

async function handleLogin(data: unknown) {
  const header = await headers();

  const ip = (header.get("x-forwarded-for") ?? "").split(",")[0] ?? "unknown";

  const isProd = env.ENV === "production";

  if (isProd) {
    const isRateLimited = limit(ip);
    if (isRateLimited) {
      console.log("🚀 ~ rate limited: ", ip);
      throw LoginError(AUTH_COMMON_ERROR_MESSAGE);
    }
  }

  await authorizeUser(data);
}

export default handleLogin;
