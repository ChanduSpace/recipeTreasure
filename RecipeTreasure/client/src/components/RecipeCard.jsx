import React from "react";

export default function RecipeCard({
  title,
  user,
  ingredients,
  description,
  photo,
}) {
  return (
    <div className="flex justify-center bg-white rounded-lg p-4 items-start gap-6 w-[70%]">
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
        <h3 className="text-lg font-semibold">
          {title} Made By &lt;{user}&gt;
        </h3>
        <p className="font-medium mt-1">{ingredients}</p>
        <p className="text-gray-600 mt-1">{description}</p>

        {/* Actions */}
        <div className="flex gap-6 mt-3 text-gray-600 text-sm">
          <button className="flex items-center gap-1 hover:text-red-500">
            ♡ Like Recipe
          </button>
          <button className="flex items-center gap-1 hover:text-yellow-500">
            🔖 Bookmark Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
