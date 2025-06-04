import { validateRequest } from "@/server/utils/validateRequest"
import { redirect } from "next/navigation"

const redirectOnSession = async (path?: string) => {
  const session = await validateRequest()

  if (!!session?.user) {
    redirect(path ?? "/dashboard")
  }
}

export default redirectOnSession
