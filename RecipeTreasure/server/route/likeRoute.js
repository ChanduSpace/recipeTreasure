import express from "express";
import { toggleLike, getLikes } from "../controllers/likeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Toggle like/unlike
router.post("/:recipeId", auth, toggleLike);

// Get like count
router.get("/:recipeId", getLikes);

export default router;
