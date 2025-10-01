import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recipes");
  const [recipes, setRecipes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // fetch own recipes with pagination
  const fetchRecipe = async (pageNum = 1) => {
    try {
      const { data } = await api.get(
        `/recipe/my-recipes?page=${pageNum}&limit=5`
      );
      setRecipes(data.recipes);
      setPage(data.page);
      setTotal(data.total);
    } catch (err) {
      console.log("fetching recipe failed", err);
    }
  };

  // fetch liked recipes
  const fetchLikedRecipes = async () => {
    try {
      const { data } = await api.get("/like/my-likes");
      setRecipes(data.likedRecipes);
    } catch (err) {
      console.error("Error fetching liked recipes", err);
    }
  };
  // Fetch bookmarked recipes
  const fetchBookmarkedRecipes = async () => {
    try {
      const { data } = await api.get("/bookmark/my-bookmarks");
      setRecipes((data.bookmarks || []).map((b) => b.recipe));
    } catch (err) {
      console.error("Error fetching bookmarked recipes", err);
    }
  };

  // fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setProfile(data.user);
      } catch (error) {
        console.log("fetch error", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // switch tab -> fetch data accordingly
  useEffect(() => {
    if (activeTab === "recipes") {
      fetchRecipe(page);
    } else if (activeTab === "liked") {
      fetchLikedRecipes();
    } else if (activeTab === "bookmarked") {
      fetchBookmarkedRecipes();
    }
  }, [activeTab, page]);

  // handle profile photo upload
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const { data } = await api.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile((prev) => ({
        ...prev,
        ...data.user,
      }));
      alert("Profile photo updated!");
    } catch (err) {
      console.error("Update error", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipe/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-menu/${id}`);
  };

  const handleUnlike = async (id) => {
    try {
      await api.post(`/like/${id}`); // toggle like
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Unlike failed", err);
    }
  };
  const handleRemoveBookmark = async (id) => {
    try {
      await api.post(`/bookmark/${id}`); // toggle bookmark
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Remove bookmark failed", err);
    }
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto mt-18 w-[60%]">
        {/* Profile Section */}
        <div className="pl-3 mb-6 pb-3 border-b-[#EFC81A] border-b-1">
          <h2 className="border-l-2 pl-2 border-yellow-400 text-lg font-semibold">
            Your Profile !!!
          </h2>
        </div>

        <div className="flex items-center gap-6 mb-10">
          {/* Profile Photo */}
          <div className="flex flex-col justify-center items-center">
            {profile?.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-40 h-40 rounded-md object-cover"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-600">Profile Photo</span>
              </div>
            )}
            <label className="bg-[#EFC81A] text-white text-xs px-3 py-1 mt-2 rounded hover:bg-yellow-500 cursor-pointer">
              Edit Profile
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <p>
              <span className="text-[#EFC81A] font-semibold">Name:</span>{" "}
              {profile?.name}
            </p>
            <p>
              <span className="text-[#EFC81A] font-semibold">Email:</span>{" "}
              {profile?.email}
            </p>
            <p>
              <span className="text-[#EFC81A] font-semibold">
                Phone Number:
              </span>{" "}
              9876543210
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
          {activeTab === "recipes" && recipes.length === 0 && (
            <p className="text-gray-500 text-center">
              You haven’t added any recipes yet.
            </p>
          )}

          {activeTab === "liked" && recipes.length === 0 && (
            <p className="text-gray-500 text-center">
              You haven’t liked any recipes yet.
            </p>
          )}

          {activeTab === "bookmarked" && recipes.length === 0 && (
            <p className="text-gray-500 text-center">
              You haven’t bookmarked any recipes yet.
            </p>
          )}

          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="flex gap-8 p-4 cursor-pointer"
            >
              {/* Left Photo */}
              <div className="w-50 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    className="w-50 h-28 object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">Photo</span>
                )}
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(recipe._id);
                        }}
                        className="text-xs h-6 px-2 py-1 bg-[#EFC81A] text-white rounded hover:bg-yellow-500"
                      >
                        Edit Menu
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(recipe._id);
                        }}
                        className="text-xs h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete Menu
                      </button>
                    </>
                  )}

                  {activeTab === "liked" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlike(recipe._id);
                      }}
                      className="text-xs h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Unlike Menu
                    </button>
                  )}

                  {activeTab === "bookmarked" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBookmark(recipe._id);
                      }}
                      className="text-xs h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
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
            <div className="absolute inset-0 bg-black/60 !bg-opacity-40"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-[#EFC81A] font-semibold mb-4">
                Are you sure to delete the recipe?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="text-xs h-6 px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="text-xs h-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination only for "recipes" tab */}
        {activeTab === "recipes" && (
          <Pagination
            current={page}
            total={total}
            pageSize={5}
            onChange={(p) => setPage(p)}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
