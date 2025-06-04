import { validateRequest } from "@/server/utils/validateRequest"
import { redirect } from "next/navigation"

const redirectAuth = async () => {
  const session = await validateRequest()

  if (!session?.user) {
    redirect("/")
  }
}

export default redirectAuth
