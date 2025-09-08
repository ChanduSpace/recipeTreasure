import React, { useState } from "react";

import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

const Category = () => {
  const [category, setCategory] = useState("Appetizer");
  console.log(category);

  const change = () => {
    console.log("clicked");
    setCategory("Salad");
  };
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
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
      <button className="cursor-pointer" onClick={change}>
        button
      </button>
    </>
  );
};

export default Category;
