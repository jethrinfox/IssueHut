import redirectAuth from "@/utils/auth/redirectAuth"
import { connection } from "next/server"

import SignOut from "./SignOut"

export default async function SignOutPage() {
  await redirectAuth()
  await connection()

  return (
    <div className="flex h-screen">
      <SignOut />
    </div>
  )
}
