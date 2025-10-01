import express from "express";

import auth from "../middlewares/auth.js";
import {
  toggleLike,
  getLikes,
  getLikedRecipes,
} from "../controllers/likeController.js";

const router = express.Router();

router.get("/my-likes", auth, getLikedRecipes);

// Toggle like/unlike
router.post("/:recipeId", auth, toggleLike);

// Get like count
router.get("/:recipeId", getLikes);

export default router;
