import db, { client } from ".";
import * as seeds from "./seeds";

if (!process.env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

await seeds.users(db);

client.close();
