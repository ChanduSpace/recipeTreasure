import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const urlQuery = useQuery().get("q") || ""; // get query from URL
  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Function to fetch results
  const fetchResults = async (searchTerm, searchCategory) => {
    if (!searchTerm && !searchCategory) return;
    setLoading(true);
    try {
      const { data } = await api.get("/recipe/search", {
        params: { query: searchTerm, category: searchCategory },
      });
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Auto-run if redirected with ?q=...
  useEffect(() => {
    if (urlQuery) {
      fetchResults(urlQuery, "");
    }
  }, [urlQuery]);

  // 🔹 Manual search button click
  const handleSearch = () => {
    fetchResults(query, category);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-20 w-full">
        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search recipes..."
            className="border px-4 py-2 rounded w-72"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Salad">Salad</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-[#EFC81A] px-4 py-2 rounded text-white"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && <p>Searching...</p>}

        {/* Results */}
        <div className="flex flex-col items-center gap-4 w-[60%]">
          {results.length > 0
            ? results.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  id={recipe._id}
                  title={recipe.title}
                  description={recipe.description}
                  photo={recipe.image}
                  user={recipe.user.name}
                  profilePicture={recipe.user.profilePicture}
                  likedByMe={recipe.likedByMe}
                  bookmarkedByMe={recipe.bookmarkedByMe}
                />
              ))
            : !loading && <p className="text-gray-500">No recipes found.</p>}
        </div>
      </div>
    </>
  );
};

export default Search;
