import { LoginError } from "@/utils/errors"
import { hash, verify } from "@/utils/passwordHash"
import crypto from "crypto"

import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "../auth/utils"
import { db } from "../db"
import { users } from "../db/schema"
import { signInSchema } from "../db/schema/user"

export const AUTH_COMMON_ERROR_MESSAGE = "Usuario o contraseña incorrectos"

async function getUserByUsername(name: string) {
  const user = await db.query.users.findFirst({
    where: ({ username }, { eq }) => eq(username, name),
  })

  if (!user) {
    throw new Error(AUTH_COMMON_ERROR_MESSAGE)
  }

  return user
}

function parseUserAuthData(data: unknown) {
  return signInSchema.parse(data)
}

const authorizeUser = async (data: unknown) => {
  try {
    const { password, username } = parseUserAuthData(data)

    const existingUser = await getUserByUsername(username)

    const validPassword = await verify(existingUser.password, password)

    if (!validPassword) {
      throw LoginError(AUTH_COMMON_ERROR_MESSAGE)
    }

    const token = generateSessionToken()
    const session = await createSession(token, existingUser.id)
    await setSessionTokenCookie(token, session.expiresAt)
  } catch (error) {
    throw LoginError(AUTH_COMMON_ERROR_MESSAGE)
  }
}

export const createUser = async ({
  password,
  username,
}: {
  password: string
  username: string
}): Promise<void> => {
  try {
    const checkUserExists = async () => {
      try {
        await getUserByUsername(username)
        return true // User was found
      } catch (error) {
        return false // User was not found
      }
    }

    const userExists = await checkUserExists()

    if (userExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password)
    const userId = crypto.randomUUID()

    const result = await db.insert(users).values({
      id: userId,
      password: passwordHash,
      username,
    })

    if (result.rowsAffected !== 1) {
      throw new Error("Error creating user")
    }
  } catch (error) {
    throw new Error("Error creating user")
  }
}

export default authorizeUser
