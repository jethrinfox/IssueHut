import { env } from "@/env"
import { type Client, createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import connection from "./connection"
import * as schema from "./schema"

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined
}

export const client = globalForDb.client ?? createClient(connection)
if (env.NODE_ENV !== "production") globalForDb.client = client

export const db = drizzle(client, {
  logger: env.ENV === "development",
  schema,
})

export type db = typeof db

export default db
