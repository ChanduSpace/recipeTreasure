import React from "react";
import api from "../api";
import {
  HeartFilled,
  HeartOutlined,
  BookOutlined,
  BookFilled,
} from "@ant-design/icons";

export default function RecipeCard({
  id,
  title,
  user,
  description,
  photo,
  profilePicture,
  likedByMe,
  bookmarkedByMe,
}) {
  const [liked, setLiked] = React.useState(likedByMe);
  const [bookmarked, setBookmarked] = React.useState(bookmarkedByMe);

  const handleRecipePage = () => {
    window.location.href = `/recipe/${id}`;
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // prevent navigation
    try {
      await api.post(`/like/${id}`);
      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      await api.post(`/bookmark/${id}`);
      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  return (
    <div
      onClick={handleRecipePage}
      className="flex justify-center bg-white rounded-lg p-4 items-start gap-6 w-[70%]"
    >
      {/* Photo */}
      <div className="w-40 h-28 bg-gray-200 rounded-md flex items-center justify-center">
        {photo ? (
          <img
            src={photo}
            alt={title}
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <span className="text-gray-500 font-medium">Photo</span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xs">{description}</p>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-6 h-6 bg-gray-300">
              <img
                className="w-6 h-6 object-cover rounded-full"
                src={profilePicture}
                alt=""
              />
            </div>
            <p>{user}</p>
          </div>
          <div className="flex gap-6 mt-1 mr-12 text-gray-600 text-sm">
            {/* Like Button */}
            <button
              className={`flex items-center gap-1 hover:text-red-500 ${
                liked ? "text-red-500" : ""
              }`}
              onClick={handleLike}
            >
              {liked ? <HeartFilled /> : <HeartOutlined />}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className="flex items-center gap-1 hover:text-yellow-500"
            >
              {bookmarked ? <BookFilled /> : <BookOutlined />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
