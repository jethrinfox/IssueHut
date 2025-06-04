import type db from ".."

import { users } from "../schema"
import json from "./data/users.json"

export default async function seed(db: db) {
  await db.insert(users).values(json)
}
