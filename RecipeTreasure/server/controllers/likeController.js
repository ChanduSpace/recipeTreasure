import Like from "../models/Like.js";
import Recipe from "../models/Recipe.js";

// Toggle like (like/unlike)
export const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const existing = await Like.findOne({ user: userId, recipe: recipeId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ message: "Unliked recipe" });
    }

    const like = await Like.create({ user: userId, recipe: recipeId });
    return res.status(201).json({ message: "Liked recipe", like });
  } catch (error) {
    console.error("Toggle like error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Count likes for a recipe
export const getLikes = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const count = await Like.countDocuments({ recipe: recipeId });
    return res.status(200).json({ recipeId, likes: count });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
