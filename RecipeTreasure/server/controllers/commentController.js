import Comment from "../models/Comment.js";
import Recipe from "../models/Recipe.js";

// ➕ Add comment
export const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Text is required" });

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const comment = await Comment.create({
      user: userId,
      recipe: recipeId,
      text,
    });

    return res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    console.error("Add comment error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 📖 Get comments for a recipe
export const getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipe: recipeId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update a comment (owner only)
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text || comment.text;
    await comment.save();

    return res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ Delete a comment (owner only)
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
