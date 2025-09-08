import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RecipeForm() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = { photo, title, description, category };
    console.log(recipeData);
    alert("Recipe Posted Successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center align-middle min-h-screen mt-22 ">
        <div className="!border-b-[#EFC81A] border-b-1 mb-3 w-[50%] ">
          <h2 className="text-md font-semibold text-gray-800 mb-4  !border-l-[#EFC81A] border-l-2 pl-2">
            Add The Recipe Of Your Choice !
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[500px]  rounded-2xl flex items-center justify-center flex-col mb-20"
        >
          {/* Photo Upload */}
          <div className="border-gray-300 border-1 rounded-lg h-70 flex items-center justify-center bg-gray-100 mb-3 overflow-hidden w-full">
            {photo ? (
              <img
                src={photo}
                alt="Recipe"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">No Photo Uploaded</span>
            )}
          </div>

          <label className="block w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="upload-photo"
            />
            <span className="bg-[#EFC81A] text-white py-2 px-4 block text-center rounded-lg cursor-pointer hover:bg-yellow-300">
              Upload Photo
            </span>
          </label>

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 mt-3 outline-none"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Ingredients & Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 mt-3 h-28 resize-none outline-none"
            required
          />

          {/* Categories */}
          <div className="flex justify-center gap-4 mt-4">
            {["Salad", "Appetizer", "Main Course", "Dessert"].map((cat) => (
              <label
                key={cat}
                className="flex justify-center items-center space-x-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-[#EFC81A]"
                  required={true}
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-[50%] bg-[#EFC81A] text-white py-2 rounded-lg mt-5 hover:bg-yellow-500"
          >
            Post Recipe !!!
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
