import db from "./db.ts";
import { Recipe } from "./types.ts";
import fetchRecipeJson from "./utils/recipe-scraper.ts";

const PORT = 2345;

const funcMap = new Map<string, (params: any) => Promise<unknown>>();

funcMap.set("/get-recipe", async ({ body }) => {
  return await fetchRecipeJson(body.url);
});

// main traffic handler, routes requests to transactions
const trafficHandler = async (req: Request) => {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);

  console.log("Headers:", req.headers);

  let body = {};
  if (req.body) {
    body = await req.json();
    console.log("Body:", body);
  }

  const toReturn = await funcMap.get(url.pathname)?.({ body });

  console.log("Got Recipe Object:");
  console.log(toReturn);

  return new Response(toReturn.toString());
};

//setup
await db.connect();
console.log("Connected to database.");

// entry point
Deno.serve({ port: PORT }, trafficHandler);
console.log(`Recipe Manager Running on Port ${PORT}`);
