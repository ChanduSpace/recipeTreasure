import Bookmark from "../models/Bookmark.js";
import Recipe from "../models/Recipe.js";

// Toggle bookmark
export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const existing = await Bookmark.findOne({ user: userId, recipe: recipeId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ message: "Removed bookmark" });
    }

    const bookmark = await Bookmark.create({ user: userId, recipe: recipeId });
    return res.status(201).json({ message: "Bookmarked recipe", bookmark });
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all bookmarks of logged-in user
export const getMyBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.find({ user: userId }).populate({
      path: "recipe",
      select: "title description image ingredients category", // pick only needed fields
    });
    const bookmarkedRecipes = bookmarks
      .map((bookmarks) => bookmarks.recipe)
      .filter((r) => r !== null); // in case a recipe got deleted
    console.log("bookmarkedRecipes:", bookmarkedRecipes);

    return res.status(200).json({ bookmarks });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
