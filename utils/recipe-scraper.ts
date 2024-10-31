// deno-lint-ignore-file no-explicit-any
// Importing deno_dom for HTML and DOM parsing
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { Recipe } from "../types.ts";

async function fetchRecipeJson(url: string): Promise<any | null> {
  try {
    // get recipe webpage html
    const response = await fetch(url);
    const html = await response.text();

    // parse for recipe
    const doc = new DOMParser().parseFromString(html, "text/html");

    if (!doc) {
      console.error("Failed to parse HTML document.");
      return null;
    }

    //  Look for script tags to find recipes
    let recipeData: any = null;

    const scriptTags = doc.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scriptTags.forEach((script) => {
      const jsonText = script.textContent;
      if (jsonText) {
        try {
          const data = JSON.parse(jsonText);

          const jsonItems = Array.isArray(data) ? data : [data];

          jsonItems.forEach((item) => {
            if (item["@type"] && item["@type"].includes("Recipe")) {
              recipeData = item;
            }
          });
        } catch (error) {
          console.error("Failed to parse JSON-LD:", error);
        }
      }
    });

    if (recipeData) {
      return mapToRecipe(recipeData);
    } else {
      console.warn(`No Recipe JSON-LD found in ${url}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching or processing the URL ${url}:`, error);
    return null;
  }
}

function mapToRecipe(input: any): Recipe {
  return {
    "@context": input["@context"] || "https://schema.org",
    "@type": input["@type"] || "Recipe",
    name: input.name || "Unknown Recipe",
    recipeYield: input.recipeYield || "1 serving",
    recipeCategory: input.recipeCategory || "Uncategorized",
    recipeIngredient: Array.isArray(input.recipeIngredient)
      ? input.recipeIngredient
      : [],
    recipeInstructions: input.recipeInstructions || "No instructions provided",
  };
}

export default fetchRecipeJson;
