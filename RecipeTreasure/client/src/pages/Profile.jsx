import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard"; // reuse your card
import Footer from "../components/Footer";
import api from "../api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recipes");
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Recipe Title 1",
      ingredients: "Ingredients",
      description: "Description Here",
      photo: null,
    },
    {
      id: 2,
      title: "Recipe Title 2",
      ingredients: "Ingredients",
      description: "Description Here",
      photo: null,
    },
    {
      id: 3,
      title: "Recipe Title 3",
      ingredients: "Ingredients",
      description: "Description Here",
      photo: null,
    },
  ]);

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setProfile(data.user);
      } catch (error) {
        console.log("fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto mt-18 w-[60%]">
        {/* Profile Section */}
        <div className=" pl-3 mb-6 pb-3 border-b-[#EFC81A] border-b-1">
          <h2 className="border-l-2 pl-2 border-yellow-400 text-lg font-semibold">
            Your Profile !!!
          </h2>
        </div>

        <div className="flex items-center gap-6 mb-10">
          {/* Profile Photo */}
          <div className="flex flex-col justify-center items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-600">Profile Photo</span>
            </div>
            <button className="bg-[#EFC81A] text-white text-xs px-3 py-1 mt-2 rounded hover:bg-yellow-500">
              Edit Profile
            </button>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <p>
              <span className="text-[#EFC81A] font-semibold">Name:</span>
              {profile.name}
            </p>
            <p>
              <span className="text-[#EFC81A] font-semibold">Email:</span>
              {profile.email}
            </p>
            <p>
              <span className="text-[#EFC81A] font-semibold">
                Phone Number:
              </span>{" "}
              1234567890
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-l-2 border-[#EFC81A] pl-3 mb-6">
          <h2 className="text-lg font-semibold">Your Recipes !!!</h2>
        </div>

        <div className="flex gap-6 border-b border-b-[#EFC81A] mb-4">
          {["recipes", "liked", "bookmarked"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-[#EFC81A] font-semibold "
                  : "text-gray-600"
              }`}
            >
              {tab === "recipes" && "Recipes"}
              {tab === "liked" && "Liked Recipes"}
              {tab === "bookmarked" && "Bookmarked Recipes"}
            </button>
          ))}
        </div>

        {/* Recipes List */}
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex gap-8 p-4 ">
              {/* Left Photo */}
              <div className="w-50 h-28 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>

              {/* Right Info */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold">{recipe.title}</h3>
                <p className="text-sm">{recipe.ingredients}</p>
                <p className="text-gray-600 text-xs">{recipe.description}</p>

                {/* Action Buttons depending on Tab */}
                <div className="flex gap-3 mt-3">
                  {activeTab === "recipes" && (
                    <>
                      <button className="text-xs  h-6 px-2 py-1 bg-[#EFC81A] text-white rounded hover:bg-yellow-500">
                        Edit Menu
                      </button>
                      <button
                        onClick={() => setDeleteId(recipe.id)}
                        className="text-xs  h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete Menu
                      </button>
                    </>
                  )}

                  {activeTab === "liked" && (
                    <button className="text-xs  h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Unlike Menu
                    </button>
                  )}

                  {activeTab === "bookmarked" && (
                    <button className="text-xs  h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Remove Bookmark
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/60 !bg-opacity-40"></div>

            {/* modal content */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-[#EFC81A] font-semibold mb-4">
                Are you sure to delete the recipe?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="text-xs  h-6 px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="text-xs  h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
