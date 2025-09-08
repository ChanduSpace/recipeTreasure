import React from "react";
import Navbar from "../components/Navbar";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";

export default function RecipeDetail() {
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
                <p className="font-medium">Person Name</p>
                <p className="text-gray-500 text-sm">10 Recipes</p>
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
            <h1 className="text-2xl font-bold text-[#EFC81A]">Recipe Name</h1>
          </div>

          {/* Recipe Image */}
          <div className="w-full max-w-md h-60 bg-gray-200 flex items-center justify-center rounded-md mb-8">
            <span className="text-gray-500 font-medium">Photo</span>
          </div>

          {/* Recipe Content */}
          <div className="w-full max-w-4xl text-left">
            <h2 className="font-semibold text-lg mb-3">Making Process:</h2>

            {/* Ingredients */}
            <p className="mb-2">
              <span className="font-semibold">Ingredients:</span> Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
            </p>

            {/* Description */}
            <p className="mb-4">
              <span className="font-semibold">Description:</span> Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
              Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
              mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
              tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo,
              non suscipit magna interdum eu. Curabitur pellentesque nibh nibh,
              at maximus ante fermentum sit amet. Pellentesque commodo lacus at
              sodales sodales. Quisque sagittis orci ut diam condimentum, vel
              euismod erat placerat. In iaculis arcu eros, eget tempus orci
              facilisis id.
            </p>

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
