import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";
import { useNavigate } from "react-router";
import {
  UserOutlined,
  HeartFilled,
  HeartOutlined,
  BookOutlined,
  BookFilled,
} from "@ant-design/icons";

export default function Feed() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFeed = async (pageNum = 1) => {
    try {
      const { data } = await api.get(`/recipe/feed?page=${pageNum}&limit=5`);
      setRecipes(data.recipes);
      setPage(data.page);
      setTotal(data.total);
    } catch (err) {
      console.error("Error fetching feed", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchFeed(page);
  }, [page]);

  // Toggle like
  const handleLike = async (id) => {
    try {
      await api.post(`/like/${id}`);
      fetchFeed(page); // refresh feed
    } catch (err) {
      console.error("Like error", err);
    }
  };

  //   Toggle bookmark
  const handleBookmark = async (id) => {
    try {
      await api.post(`/bookmark/${id}`);
      fetchFeed(page);
    } catch (err) {
      console.error("Bookmark error", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-30 pb-6 max-w-4xl mx-auto mt-18  ">
        <h2 className="text-xl font-bold mb-6">🍴 Recipe Feed</h2>
        <div className="space-y-4  flex flex-col items-center justify-center">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="p-4 shadow drop-shadow-2xl rounded-lg  hover:shadow-md cursor-pointer w-[40vw] h-[auto]"
            >
              {/* User Info + Title */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={recipe.user?.profilePicture || "/default-avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">
                    {recipe.user?.name || "Unknown User"}
                  </span>
                </div>
              </div>
              {/* Recipe Image */}
              <div className="w-full h-65 bg-gray-200 rounded-lg mb-3">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div className="w-[70%]">
                  <h3 className="text-lg font-semibold ">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>
                <span className="text-[#EFC81A] font-semibold">
                  {recipe.category}
                </span>
              </div>
              <div className="flex justify-between mt-3 text-gray-600 text-sm">
                <button
                  className={`flex items-center gap-1 hover:text-red-500 ${
                    recipe.likedByMe ? "text-red-500" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(recipe._id);
                  }}
                >
                  {recipe.likedByMe ? (
                    <>
                      {" "}
                      <HeartFilled />
                    </>
                  ) : (
                    <>
                      <HeartOutlined />
                    </>
                  )}{" "}
                  ({recipe.likes || 0})
                </button>
                <button
                  className={`flex items-center gap-1 hover:text-blue-500 ${
                    recipe.bookmarkedByMe ? "text-blue-500" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmark(recipe._id);
                  }}
                >
                  {recipe.bookmarkedByMe ? (
                    <>
                      <BookFilled />
                    </>
                  ) : (
                    <>
                      <BookOutlined />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            current={page}
            total={total}
            pageSize={5}
            onChange={(p) => setPage(p)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
