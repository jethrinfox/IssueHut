import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

const redirectIfAuth = async (customRoute?: string) => {
  const session = await getServerAuthSession();

  if (!session) {
    return;
  }

  redirect(customRoute ?? "login");
};

export default redirectIfAuth;
