import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";
import { Spin } from "antd";

export default function RecipeForm() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([""]);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const recipeData = new FormData();
    recipeData.append("image", photo);
    recipeData.append("title", title);
    recipeData.append("description", description);
    recipeData.append("category", category);

    // send arrays as comma-separated strings
    recipeData.append("ingredients", ingredients.join(","));
    recipeData.append("instructions", instructions.join(","));

    try {
      await api.post("/recipe", recipeData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Recipe Posted Successfully!");
      // reset form
      setPhoto(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setIngredients([]);
      setInstructions([""]);
      setLoading(false);
    } catch (err) {
      console.error("Error posting recipe:", err.response?.data || err.message);
      alert("Error posting recipe");
    }
  };

  // Remove ingredient chip
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  // Add/remove instructions
  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

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
          className="w-[500px] rounded-2xl flex items-center justify-center flex-col mb-20"
        >
          {/* Photo Upload */}
          <div className="border-gray-300 border-1 rounded-lg h-70 flex items-center justify-center bg-gray-100 mb-3 overflow-hidden w-full">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
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
            placeholder="Short description of recipe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 mt-3 h-20 resize-none outline-none"
            required
          />

          {/* Ingredients as tags */}
          <div className="w-full mt-4">
            <h3 className="font-semibold mb-2">Ingredients</h3>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                >
                  <span>{ing}</span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Type ingredient and press Enter"
              className="w-full border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  e.preventDefault();
                  setIngredients([...ingredients, e.target.value.trim()]);
                  e.target.value = "";
                }
              }}
            />
          </div>

          {/* Instructions */}
          <div className="w-full mt-4">
            <h3 className="font-semibold mb-2">Instructions</h3>
            {instructions.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleInstructionChange(idx, e.target.value)}
                  className="flex-1 border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 outline-none"
                  placeholder={`Step ${idx + 1}`}
                  required
                />
                {instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(idx)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm text-yellow-600 hover:underline"
            >
              + Add step
            </button>
          </div>

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
                  required
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
            {loading ? <Spin /> : "Post Recipe !!!"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
