import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
} from "../controllers/recipeController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Create recipe (needs login)
router.post("/", auth, upload.single("image"), createRecipe);

// Get all recipes (auth optional, but if logged in → extra info)
router.get("/", auth, getRecipes);

// Get single recipe
router.get("/:id", auth, getRecipeById);

export default router;
