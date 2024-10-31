import { Client } from "https://deno.land/x/postgres/mod.ts";

export default new Client({
  user: "dev",
  database: "recipe-manager",
  hostname: "127.0.0.1",
  port: 5432,
  password: "pass",
});
