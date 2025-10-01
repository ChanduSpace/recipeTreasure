import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

const Category = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      const res = await api.get(`/recipe/category/${category}`);
      setRecipes(res.data);
    };
    fetchCategoryRecipes();
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center flex-col mt-22">
        <div className="w-[60%] pb-8 pl-3 border-b-[#EFC81A] border-b-1 ">
          <h1 className="border-l-[#EFC81A] border-l-2 pl-4 text-lg">
            {category === "Salad"
              ? "Have A Safe Diet !!!"
              : category === "Appetizer"
              ? "Savor the Appetizer: Unwrap Flavorful Beginnings !!!"
              : category === "Main Course"
              ? "Main Course Magic: Where Every Bite Tells a Delicious Story !!!"
              : "Sweet Endings, Happy Beginnings: Indulge in Dessert Delights !!!"}
          </h1>
        </div>
        <div className="flex items-start justify-center flex-col w-[60%]">
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe._id}
                id={recipe._id}
                title={recipe.title}
                user={recipe.user.name}
                ingredients={recipe.ingredients}
                description={recipe.description}
                photo={recipe.image}
                profilePicture={recipe.user.profilePicture}
                likedByMe={recipe.likedByMe}
                bookmarkedByMe={recipe.bookmarkedByMe}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Category;
