import db from "./db.ts";
import fetchRecipeJson from "./utils/recipe-scraper.ts";

const PORT = 2345;

const funcMap = new Map<string, () => Promise<unknown>>();

funcMap.set("/onion", async () => {
  return await db.queryObject("SELECT id, name, quantity FROM inventory");
});

const trafficHandler = async (req: Request) => {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);

  const myRecipe = await fetchRecipeJson(
    `https://www.allrecipes.com/recipe/228293/curry-stand-chicken-tikka-masala-sauce/`,
  );

  console.log(myRecipe);

  console.log("Headers:", req.headers);

  if (req.body) {
    const body = await req.text();
    console.log("Body:", body);
  }

  return new Response("Hello, World!");
};

//setup
await db.connect();
console.log("Connected to database.");

// entry point
Deno.serve({ port: PORT }, trafficHandler);
console.log(`Recipe Manager Running on Port ${PORT}`);
