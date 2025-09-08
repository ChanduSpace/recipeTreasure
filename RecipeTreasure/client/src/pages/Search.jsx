import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes] = useState([
    {
      id: 1,
      title: "Recipe Title 1",
      user: "USER NAME",
      ingredients: "Ingredients",
      description: "Description Here",
    },
    {
      id: 2,
      title: "Recipe Title 2",
      user: "USER NAME",
      ingredients: "Ingredients",
      description: "Description Here",
    },
    {
      id: 3,
      title: "Recipe Title 3",
      user: "USER NAME",
      ingredients: "Ingredients",
      description: "Description Here",
    },
    {
      id: 4,
      title: "Recipe Title 4",
      user: "USER NAME",
      ingredients: "Ingredients",
      description: "Description Here",
    },
  ]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-6 mt-22">
        <div className="w-[70%] border-b-[#EFC81A] border-b-1 mb-5">
          {/* Section Heading */}
          <div className=" mb-8 w-[60%] ">
            <h2 className="text-md font-semibold text-gray-800 mb-4  !border-l-[#EFC81A] border-l-2 pl-2">
              Explore Your Cravings Here !!{" "}
            </h2>
          </div>

          {/* Search Bar */}
          <div className="flex w-[50%] max-w-2xl mb-5">
            <input
              type="text"
              placeholder="Recipe name, ingredient, meal type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow border border-[#EFC81A] rounded-md px-3 py-2 outline-none"
            />
            <button className="ml-2 bg-[#EFC81A] text-white px-5 py-2 rounded-md hover:bg-yellow-400">
              Search
            </button>
          </div>
        </div>

        {/* Recipes List */}
        <div className="w-[90%] flex items-center justify-center flex-col gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              user={recipe.user}
              ingredients={recipe.ingredients}
              description={recipe.description}
              photo={recipe.photo}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
