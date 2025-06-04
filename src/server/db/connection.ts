import { env } from "@/env"

const connection = {
  authToken: env.TURSO_AUTH_TOKEN ?? "",
  url: env.TURSO_CONNECTION_URL ?? "file:./local.db",
}

export default connection
