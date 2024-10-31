// Defines a recipe as defined by schema.org
export type Recipe = {
  "@context": string;
  "@type": string;
  name: string;
  recipeYield: string;
  recipeCategory: string;
  recipeIngredient: string[];
  recipeInstructions: string;
};

// Define the structure for referenceable ingredients
type IngredientReference = {
  ingredientID: string;
  name: string;
  quantity: string;
};

// Define the structure for the translated recipe format (output format)
type TranslatedRecipe = {
  name: string;
  recipeYield: string;
  recipeCategory: string;
  recipeIngredient: IngredientReference[];
  recipeInstructions: string;
};
