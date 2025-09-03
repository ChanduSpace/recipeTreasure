import express from "express";
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Add comment to a recipe
router.post("/:recipeId", auth, addComment);

// Get all comments for a recipe
router.get("/:recipeId", getComments);

// Update comment (owner only)
router.put("/:commentId", auth, updateComment);

// Delete comment (owner only)
router.delete("/:commentId", auth, deleteComment);

export default router;
