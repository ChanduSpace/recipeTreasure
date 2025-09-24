import Recipe from "../models/Recipe.js";
import Like from "../models/Like.js";
import Bookmark from "../models/Bookmark.js";
import Comment from "../models/Comment.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

// ✅ categories list (for validation + API)
const ALLOWED_CATEGORIES = ["Salad", "Appetizer", "Main Course", "Dessert"];

// ✅ helper: normalize strings/arrays
const normalize = (value) =>
  Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

// ✅ helper: upload image from memory buffer
async function uploadImage(file) {
  if (!file || !file.buffer) return null;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "recipes" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    Readable.from(file.buffer).pipe(stream);
  });
}

// ==================================
// Create Recipe
// ==================================
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      ingredients,
      instructions,
      description = "",
      category,
    } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    let imageUrl = "";
    if (req.file && req.file.buffer) {
      const uploadRes = await uploadImage(req.file);
      imageUrl = uploadRes?.secure_url || "";
    }

    const recipe = await Recipe.create({
      user: req.user.id,
      title,
      description,
      category,
      ingredients: normalize(ingredients),
      instructions: normalize(instructions),
      image: imageUrl,
    });

    res.status(201).json({ message: "Recipe created", recipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res
      .status(error.http_code || 500)
      .json({ message: error.message || "Server error" });
  }
};

// ==================================
// Get all Recipes
// ==================================
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name email");

    const enriched = await Promise.all(
      recipes.map(async (recipe) => {
        const likes = await Like.countDocuments({ recipe: recipe._id });
        const likedByMe = req.user
          ? await Like.exists({ recipe: recipe._id, user: req.user.id })
          : false;
        const bookmarkedByMe = req.user
          ? await Bookmark.exists({ recipe: recipe._id, user: req.user.id })
          : false;
        const comments = await Comment.find({ recipe: recipe._id }).populate(
          "user",
          "name"
        );

        return {
          ...recipe.toObject(),
          likes,
          likedByMe: !!likedByMe,
          bookmarkedByMe: !!bookmarkedByMe,
          comments,
        };
      })
    );

    res.json(enriched);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================================
// Get Recipe by ID
// ==================================
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "user",
      "name email profilePicture"
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const likes = await Like.countDocuments({ recipe: recipe._id });
    const likedByMe = req.user
      ? await Like.exists({ recipe: recipe._id, user: req.user.id })
      : false;
    const bookmarkedByMe = req.user
      ? await Bookmark.exists({ recipe: recipe._id, user: req.user.id })
      : false;
    const comments = await Comment.find({ recipe: recipe._id }).populate(
      "user",
      "name profilePicture"
    );

    res.json({
      ...recipe.toObject(),
      likes,
      likedByMe: !!likedByMe,
      bookmarkedByMe: !!bookmarkedByMe,
      comments,
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================================
// Update Recipe
// ==================================
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    let recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, ingredients, instructions, description, category } =
      req.body;

    if (category && !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (req.file && req.file.buffer) {
      const uploadRes = await uploadImage(req.file);
      recipe.image = uploadRes?.secure_url || recipe.image;
    }

    recipe.title = title || recipe.title;
    recipe.description = description ?? recipe.description;
    recipe.category = category || recipe.category;
    recipe.ingredients = ingredients
      ? normalize(ingredients)
      : recipe.ingredients;
    recipe.instructions = instructions
      ? normalize(instructions)
      : recipe.instructions;

    await recipe.save();
    res.json({ message: "Recipe updated", recipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res
      .status(error.http_code || 500)
      .json({ message: error.message || "Server error" });
  }
};

// ==================================
// Delete Recipe
// ==================================
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================================
// Get Recipes by Category
// ==================================
export const getRecipesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const recipes = await Recipe.find({ category }).populate(
      "user",
      "name email"
    );

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching category recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================================
// Get Categories (for frontend dropdowns)
// ==================================
export const getCategories = (req, res) => {
  res.json(ALLOWED_CATEGORIES);
};

// ==================================
// Search Recipes (by query and/or category)
// ==================================
export const searchRecipes = async (req, res) => {
  try {
    const { query, category } = req.query;

    if ((!query || query.trim() === "") && !category) {
      return res
        .status(400)
        .json({ message: "Search query or category is required" });
    }

    // Build filters
    const filters = {};

    if (query && query.trim() !== "") {
      const regex = new RegExp(query, "i"); // case-insensitive search
      filters.$or = [
        { title: regex },
        { description: regex },
        { ingredients: { $elemMatch: { $regex: regex } } },
        { instructions: { $elemMatch: { $regex: regex } } },
      ];
    }

    if (category) {
      if (!ALLOWED_CATEGORIES.includes(category)) {
        return res.status(400).json({ message: "Invalid category" });
      }
      filters.category = category;
    }

    const recipes = await Recipe.find(filters).populate("user", "name email");

    // ✅ enrich with likes, bookmarks, comments (same as getRecipes)
    const enriched = await Promise.all(
      recipes.map(async (recipe) => {
        const likes = await Like.countDocuments({ recipe: recipe._id });
        const likedByMe = req.user
          ? await Like.exists({ recipe: recipe._id, user: req.user.id })
          : false;
        const bookmarkedByMe = req.user
          ? await Bookmark.exists({ recipe: recipe._id, user: req.user.id })
          : false;
        const comments = await Comment.find({ recipe: recipe._id }).populate(
          "user",
          "name"
        );

        return {
          ...recipe.toObject(),
          likes,
          likedByMe: !!likedByMe,
          bookmarkedByMe: !!bookmarkedByMe,
          comments,
        };
      })
    );

    res.json(enriched);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find({ user: req.user._id })
      .select("title image category description  createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Recipe.countDocuments({ user: req.user._id });

    res.json({ recipes, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};
