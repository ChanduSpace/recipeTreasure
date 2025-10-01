import React from "react";
import Navbar from "../components/Navbar";
import { ArrowRightOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const category = [
    {
      name: "Salad",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    },
    {
      name: "Appetizer",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    },
    {
      name: "Main Course",
      image: "https://images.unsplash.com/photo-1604909053259-44a0e20a21c4",
    },
    { name: "Dessert", image: "" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategory = (cat) => {
    navigate(`/category/${cat.name}`);
    console.log(cat);
    console.log("clicked");
  };
  const handleFeed = () => {
    navigate("/feed");
  };
  return (
    <>
      <Navbar />
      <div>
        <section className="flex justify-center items-center mt-30 mb-10 h-auto gap-40">
          <div className="flex-col justify-center items-center">
            <h1 className="text-5xl text-gray-600 mb-7">
              Discover Recipe <br />& Delicious Food
            </h1>
            <div className="border-[#EFC81A] border-1 rounded-full relative h-12 pl-2.5">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Your Favorite Food "
                type="text"
                className="!outline-none !border-none !mt-2.5 ml-4 w-[80%] placeholder-gray-300"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 bg-[#EFC81A] rounded-[100%] h-10 w-10 mt-1 mr-1 text-white "
              >
                <ArrowRightOutlined />
              </button>
            </div>
            <button
              onClick={handleFeed}
              className="border p-2 curser-pointer mt-7 rounded text-black font-medium hover:bg-[#EFC81A] hover:text-white"
            >
              FEED
            </button>
          </div>
          <div>
            <img
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt=""
              className="h-[300px] rounded-lg"
            />
          </div>
        </section>
        <div className=" pb-6 pl-3 border-b-[#EFC81A] border-b-1 mx-30">
          <h1 className="border-l-[#EFC81A] border-l-2 pl-4 text-lg ">
            Check Out Other Recipes Of Your Choice !
          </h1>
          <div className="p-6 flex gap-3">
            {category.map((cat) => {
              return (
                <div
                  onClick={() => handleCategory(cat)}
                  className="flex flex-col justify-center items-center mx-10 curser-pointer"
                  key={cat.name}
                >
                  <img
                    src={cat.image}
                    className="h-30 w-30 bg-gray-200 rounded-lg mb-2 object-cover"
                  />
                  <h1 className="text-sm text-gray-600">{cat.name}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
