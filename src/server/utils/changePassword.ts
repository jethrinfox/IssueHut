import { hash, verify } from "@/utils/passwordHash"
import { eq } from "drizzle-orm"

import { db } from "../db"
import users, { type ChangePassword } from "../db/schema/user"

const changePassword = async (
  userId: string,
  { new_password, old_password }: ChangePassword,
): Promise<void> => {
  try {
    const existingUser = await db.query.users.findFirst({
      where: (user) => eq(user.id, userId),
    })

    if (!existingUser) {
      throw new Error("El usuario no existe...")
    }

    const validPassword = await verify(existingUser.password, old_password)

    if (!validPassword) {
      throw new Error("La contrasena es invalida...")
    }

    const passwordHash = await hash(new_password)

    await db
      .update(users)
      .set({
        password: passwordHash,
      })
      .where(eq(users.id, userId))
  } catch (error) {
    console.error("🚀 ~ error", error)
    throw new Error("Un error a ocurrido...")
  }
}

export default changePassword
