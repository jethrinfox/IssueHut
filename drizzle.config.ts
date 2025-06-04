import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    authToken: env.TURSO_AUTH_TOKEN,
    url: env.TURSO_CONNECTION_URL,
  },
  dialect: "turso",
  out: "./src/server/db/migrations/",
  schema: "./src/server/db/schema",
  verbose: true,
});
