import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipesByCategory,
  getCategories,
  searchRecipes,
  getMyRecipes,
  getAllRecipes,
} from "../controllers/recipeController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), createRecipe);
router.get("/", auth, getRecipes);
router.get("/category/:category", auth, getRecipesByCategory);
router.get("/categories", auth, getCategories);
router.get("/search", auth, searchRecipes);
router.get("/my-recipes", auth, getMyRecipes);
router.get("/feed", auth, getAllRecipes);
router.get("/:id", auth, getRecipeById);
router.put("/:id", auth, upload.single("image"), updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;
