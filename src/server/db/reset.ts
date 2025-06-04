import { getTableName, sql, type Table } from "drizzle-orm";

import db from ".";
import * as schema from "./schema";

if (!process.env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  await db.run(sql.raw(`DROP TABLE IF EXISTS ${getTableName(table)}`));
}

for (const table of [
  schema.sessions,
  schema.issues,
  schema.lists,
  schema.projects,
  schema.users,
]) {
  await resetTable(db, table);
}
