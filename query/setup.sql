-- ============
-- Schema Setup
-- ============

-- Holds the master list of ingredients with unique IDs
CREATE TABLE Ingredient (
    ingredientID VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Holds ingredients that may exist in our recipes (amount used in a recipe)
CREATE TABLE IngredientReference (
    ingredientID VARCHAR(255),
    quantity VARCHAR(100) NOT NULL,
    PRIMARY KEY (ingredientID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE
);

-- Holds our recipes
CREATE TABLE Recipe (
    name VARCHAR(255) PRIMARY KEY,
    recipeYield VARCHAR(100) NOT NULL,
    recipeCategory VARCHAR(100) NOT NULL,
    recipeInstructions TEXT NOT NULL
);

-- Join table between recipes and ingredients
CREATE TABLE RecipeIngredient (
    recipeName VARCHAR(255),
    ingredientID VARCHAR(255),
    PRIMARY KEY (recipeName, ingredientID),
    FOREIGN KEY (recipeName) REFERENCES Recipe(name) ON DELETE CASCADE,
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE
);

-- Personal inventory table to track the quantity and measurement of ingredients you own
CREATE TABLE PersonalInventory (
    ingredientID VARCHAR(255),
    quantity DECIMAL(10, 2) NOT NULL,
    measurement VARCHAR(50) NOT NULL,
    PRIMARY KEY (ingredientID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE
);
