import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/userRoute.js";
import recipeRoute from "./route/recipeRoute.js";
import likeRoute from "./route/likeRoute.js";
import bookmarkRoute from "./route/bookmarkRoute.js";
import commentRoute from "./route/commentRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ ok: true, service: "RecipeTreasure API" });
});

// Routes
app.use("/user", userRoute);
app.use("/recipe", recipeRoute);
app.use("/like", likeRoute);
app.use("/bookmark", bookmarkRoute);
app.use("/comment", commentRoute);

// Start
const PORT = process.env.PORT || 7777;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed. Exiting.", err);
    process.exit(1);
  });
