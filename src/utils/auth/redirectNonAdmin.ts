import { redirect } from "next/navigation"

import validateIsAdmin from "./validateIsAdmin"

const redirectNonAdmin = async () => {
  const isAdmin = await validateIsAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }
}

export default redirectNonAdmin
