import Recipe from "../models/Recipe.js";
import Like from "../models/Like.js";
import Bookmark from "../models/Bookmark.js";
import Comment from "../models/Comment.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Create recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const userId = req.user.id;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipes",
      });
      imageUrl = result.secure_url;
    }

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      image: imageUrl,
      user: userId,
    });

    return res.status(201).json({ message: "Recipe created", recipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 📖 Get all recipes (with likes, bookmarks, comments)
export const getRecipes = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const recipes = await Recipe.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Enrich each recipe with extra data
    const enriched = await Promise.all(
      recipes.map(async (recipe) => {
        const [likesCount, userLike, userBookmark, comments] =
          await Promise.all([
            Like.countDocuments({ recipe: recipe._id }),
            userId ? Like.findOne({ recipe: recipe._id, user: userId }) : null,
            userId
              ? Bookmark.findOne({ recipe: recipe._id, user: userId })
              : null,
            Comment.find({ recipe: recipe._id })
              .populate("user", "name email")
              .sort({ createdAt: -1 }),
          ]);

        return {
          ...recipe.toObject(),
          likes: likesCount,
          likedByMe: !!userLike,
          bookmarkedByMe: !!userBookmark,
          comments,
        };
      })
    );

    return res.status(200).json({ recipes: enriched });
  } catch (error) {
    console.error("Get recipes error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 📖 Get single recipe (with details)
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;

    const recipe = await Recipe.findById(id).populate("user", "name email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const [likesCount, userLike, userBookmark, comments] = await Promise.all([
      Like.countDocuments({ recipe: recipe._id }),
      userId ? Like.findOne({ recipe: recipe._id, user: userId }) : null,
      userId ? Bookmark.findOne({ recipe: recipe._id, user: userId }) : null,
      Comment.find({ recipe: recipe._id })
        .populate("user", "name email")
        .sort({ createdAt: -1 }),
    ]);

    return res.status(200).json({
      ...recipe.toObject(),
      likes: likesCount,
      likedByMe: !!userLike,
      bookmarkedByMe: !!userBookmark,
      comments,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
