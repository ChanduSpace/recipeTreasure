import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import api from "../api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/recipe/${id}`);
        setRecipe(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!recipe) return <p className="text-center mt-20">Recipe not found</p>;
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-center flex-col items-center px-6 py-10 mt-15 w-[60%] ">
          {/* Header Section */}
          <div className="flex justify-between items-center w-full max-w-4xl mb-6 border-l-[#EFC81A] border-l-2 pl-2">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                <Avatar size="large" icon={<UserOutlined />} />
              </div>
              <div>
                <p className="font-medium">
                  {recipe.user?.name || "Unknown User"}
                </p>
                <p className="text-gray-500 text-sm">
                  {recipe.user ? "1 Recipe" : ""}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-6 text-gray-700 text-sm">
              <button className="flex items-center gap-1 hover:text-red-500">
                ♡ Like Recipe
              </button>
              <button className="flex items-center gap-1 hover:text-yellow-500">
                🔖 Bookmark Recipe
              </button>
            </div>
          </div>

          {/* Recipe Title */}
          <div className="w-full max-w-4xl border-b border-yellow-400 text-center pb-2 mb-6">
            <h1 className="text-2xl font-bold text-[#EFC81A]">
              {recipe.title}
            </h1>
          </div>

          {/* Recipe Image */}
          <div className="w-full max-w-md h-60 bg-gray-200 flex items-center justify-center rounded-md mb-8">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 font-medium">No Photo</span>
            )}
          </div>

          {/* Recipe Content */}
          <div className="w-full max-w-4xl text-left">
            <h2 className="font-semibold text-lg mb-3">Making Process:</h2>

            {/* Ingredients */}
            <p className="mb-2">
              <span className="font-semibold">Ingredients:</span>{" "}
              {Array.isArray(recipe.ingredients)
                ? recipe.ingredients.join(", ")
                : recipe.ingredients || "Not provided"}
            </p>

            {/* Description */}
            <p className="mb-4">
              <span className="font-semibold">Description:</span>{" "}
              {recipe.description}
            </p>

            {Array.isArray(recipe.instructions) &&
              recipe.instructions.length > 0 && (
                <div className="mb-4">
                  <span className="font-semibold">Instructions:</span>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Video Link */}
            <p>
              <span className="font-semibold">Video Link:</span>{" "}
              <a
                href="https://www.youtube.com/videolink"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
              >
                https://www.youtube.com/&lt;videolink&gt;
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
