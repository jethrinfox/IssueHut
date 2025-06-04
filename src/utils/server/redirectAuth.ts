import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

const redirectAuth = async (customRoute?: string) => {
  const session = await getServerAuthSession();

  if (session) {
    return;
  }

  redirect(customRoute ?? "/login");
};

export default redirectAuth;
