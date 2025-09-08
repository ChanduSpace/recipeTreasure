import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/Recipe.js";
import User from "./models/user.js";

dotenv.config();

const ALLOWED_CATEGORIES = ["Salad", "Appetizer", "Main Course", "Dessert"];

const INGREDIENTS = [
  "Tomatoes",
  "Onions",
  "Garlic",
  "Olive oil",
  "Cheese",
  "Chicken",
  "Beef",
  "Fish",
  "Lettuce",
  "Spinach",
  "Potatoes",
  "Carrots",
  "Rice",
  "Pasta",
  "Eggs",
  "Milk",
  "Butter",
  "Flour",
  "Basil",
  "Pepper",
];

const INSTRUCTIONS = [
  "Chop all vegetables finely.",
  "Heat oil in a pan.",
  "Add spices and stir for 2 minutes.",
  "Cook until golden brown.",
  "Boil for 10 minutes.",
  "Mix all ingredients well.",
  "Bake in oven at 180°C for 20 minutes.",
  "Garnish with herbs before serving.",
  "Serve hot with bread or rice.",
  "Let it rest for 5 minutes before eating.",
];

// Helper: get random items
function getRandomItems(arr, count) {
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Helper: create sample recipe for a user
function makeRecipe(userId, category, index) {
  const title = `${category} Recipe ${index + 1}`;
  const ingredients = getRandomItems(INGREDIENTS, 5);
  const instructions = getRandomItems(INSTRUCTIONS, 4);

  return {
    user: userId,
    title,
    description: `A delicious ${category.toLowerCase()} dish with ${ingredients.join(
      ", "
    )}.`,
    category,
    ingredients,
    instructions,
    image: `https://placehold.co/600x400?text=${encodeURIComponent(title)}`,
  };
}

async function seedRecipes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    const users = await User.find();
    if (users.length === 0) {
      console.log("⚠️ No users found. Please create users first.");
      process.exit(1);
    }

    // wipe old recipes
    await Recipe.deleteMany();
    console.log("🗑️ Old recipes removed");

    let recipesToInsert = [];

    users.forEach((user, uIndex) => {
      ALLOWED_CATEGORIES.forEach((category) => {
        for (let i = 0; i < 10; i++) {
          recipesToInsert.push(makeRecipe(user._id, category, i));
        }
      });
      console.log(`👤 User ${uIndex + 1}: Prepared 40 recipes`);
    });

    await Recipe.insertMany(recipesToInsert);
    console.log(`🍴 ${recipesToInsert.length} recipes added successfully!`);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding recipes:", error);
    process.exit(1);
  }
}

seedRecipes();
