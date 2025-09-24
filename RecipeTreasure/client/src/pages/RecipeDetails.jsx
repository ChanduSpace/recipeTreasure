import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Avatar, Input, Button } from "antd";
import {
  UserOutlined,
  HeartFilled,
  HeartOutlined,
  BookOutlined,
  BookFilled,
} from "@ant-design/icons";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import api from "../api";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const fetchDetails = async () => {
    try {
      const res = await api.get(`/recipe/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.log("Error fetching recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const toggleLike = async () => {
    try {
      await api.post(`/like/${id}`);
      fetchDetails(); // refresh likes
    } catch (err) {
      console.error("Like error", err.response?.data || err.message);
    }
  };

  const toggleBookmark = async () => {
    try {
      await api.post(`/bookmark/${id}`);
      fetchDetails(); // refresh bookmarks
    } catch (err) {
      console.error("Bookmark error", err.response?.data || err.message);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await api.post(`/comment/${id}`, { text: newComment });
      setNewComment("");
      fetchDetails(); // refresh comments
    } catch (err) {
      console.error("Comment error", err.response?.data || err.message);
    }
  };

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
              {recipe.user?.profilePicture ? (
                <img
                  src={recipe.user.profilePicture}
                  alt={recipe.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center">
                  <Avatar size="large" icon={<UserOutlined />} />
                </div>
              )}
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
              <button
                className={`flex items-center gap-1 hover:text-red-500 ${
                  recipe.likedByMe ? "text-red-500" : ""
                }`}
                onClick={toggleLike}
              >
                {recipe.likedByMe ? (
                  <>
                    {" "}
                    <HeartFilled /> <p>Liked</p>
                  </>
                ) : (
                  <>
                    <HeartOutlined />
                    <p>Like</p>
                  </>
                )}{" "}
                ({recipe.likes || 0})
              </button>
              <button
                className={`flex items-center gap-1 hover:text-blue-500 ${
                  recipe.bookmarkedByMe ? "text-blue-500" : ""
                }`}
                onClick={toggleBookmark}
              >
                {recipe.bookmarkedByMe ? (
                  <>
                    <BookFilled />
                    <p>Bookmarked</p>
                  </>
                ) : (
                  <>
                    <BookOutlined />
                    <p>Bookmark</p>
                  </>
                )}
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
          <div className="w-full max-w-md h-60 bg-gray-200 flex items-center justify-center rounded-lg mb-8">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover w-full h-full rounded-lg"
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

            {/* Video Link (placeholder) */}
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

          {/* Comments Section */}
          <div className="w-full max-w-4xl mt-10">
            <h2 className="text-lg font-semibold mb-3">Comments</h2>
            {recipe.comments?.length === 0 && (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
            {recipe.comments?.map((c) => (
              <div key={c._id} className="flex gap-3 mb-3">
                {c.user?.profilePicture ? (
                  <img
                    src={c.user.profilePicture}
                    alt={c.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Avatar size="small" />
                )}
                <div>
                  <p className="font-semibold text-sm">{c.user?.name}</p>
                  <p className="text-gray-700 text-sm">{c.text}</p>
                </div>
              </div>
            ))}

            {/* Add comment box */}
            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onPressEnter={addComment}
              />
              <Button
                type="primary"
                className="!bg-[#EFC81A]"
                onClick={addComment}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
