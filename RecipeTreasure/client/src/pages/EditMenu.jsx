import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function EditRecipePage() {
  const { id } = useParams(); // Recipe ID from URL
  const navigate = useNavigate();

  // Simulating fetching recipe details (replace with API call)
  const [recipe, setRecipe] = useState({
    image: "",
    title: "",
    description: "",
    category: "Salad",
  });

  useEffect(() => {
    // Simulate fetching recipe by ID
    const fetchRecipe = async () => {
      // Example recipe data
      const fetchedRecipe = {
        id,
        image: "https://via.placeholder.com/300",
        title: "Recipe Name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi...",
        category: "Appetizer",
      };
      setRecipe(fetchedRecipe);
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdate = () => {
    console.log("Updated Recipe:", recipe);
    // Call API to update recipe in DB here
    navigate("/profile"); // Redirect back to profile page
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center align-middle min-h-screen mt-22 ">
        <div className="!border-b-[#EFC81A] border-b-1 mb-3 w-[50%] pl-4">
          <h2 className="text-md font-semibold text-gray-800 mb-4  !border-l-[#EFC81A] border-l-2 pl-2">
            Add The Recipe Of Your Choice !
          </h2>
        </div>
        <div className="max-w-2xl px-4 py-2 flex flex-col items-center justify-center">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <div className="w-80 h-60 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-600">Photo</span>
              )}
            </div>
            <label className="bg-[#EFC81A] text-white py-2 px-4 block text-center rounded-lg cursor-pointer hover:bg-yellow-300">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Title */}
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Recipe Name"
            className="w-full border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 mt-3 outline-none "
          />

          {/* Description */}
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            rows="5"
            placeholder="Ingredients & Description"
            className="w-full border-gray-300 border-0 rounded-lg bg-gray-100 px-3 py-2 mt-3 h-28 resize-none outline-none"
          />

          {/* Category */}
          <div className="flex justify-center gap-4 mt-4">
            <span className="font-medium mr-2">Category:</span>
            {["Salad", "Appetizer", "Main Course", "Dessert"].map((cat) => (
              <label
                key={cat}
                className="flex justify-center items-center space-x-1 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={recipe.category === cat}
                  onChange={handleChange}
                  className="bg-[#EFC81A]"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="w-[50%] bg-[#EFC81A] text-white py-2 rounded-lg mt-5 hover:bg-yellow-500"
          >
            Update Recipe !!
          </button>
        </div>
      </div>
    </>
  );
}
