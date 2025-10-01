import express from "express";
import {
  toggleBookmark,
  getMyBookmarks,
} from "../controllers/bookmarkController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get("/my-bookmarks", auth, getMyBookmarks);

// Toggle bookmark
router.post("/:recipeId", auth, toggleBookmark);

// Get all my bookmarks
router.get("/", auth, getMyBookmarks);

export default router;
