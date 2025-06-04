import { validateRequest } from "@/server/utils/validateRequest"

const validateIsAdmin = async () => {
  const session = await validateRequest()

  return !!session?.user?.isAdmin
}

export default validateIsAdmin
