import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    ingredients: [
      {
        type: String,
      },
    ],

    instructions: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
