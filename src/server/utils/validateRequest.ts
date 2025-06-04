import { cookies } from "next/headers"
import { cache } from "react"

import {
  type SessionValidationResult,
  validateSessionToken,
} from "../auth/utils"

export const validateRequest = cache(
  async (): Promise<SessionValidationResult> => {
    const token = (await cookies()).get("session")?.value ?? null
    if (token === null) {
      return { session: null, user: null }
    }
    const result = await validateSessionToken(token)
    return result
  },
)
