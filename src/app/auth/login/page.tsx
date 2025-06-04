import redirectOnSession from "@/utils/auth/redirectOnSession"
import { connection } from "next/server"

import Login from "./Login"

export default async function LoginPage() {
  await redirectOnSession()
  await connection()

  return (
    <div className="flex h-screen">
      <Login />
    </div>
  )
}
