import React from "react";
import Navbar from "../components/Navbar";
import { ArrowRightOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <section className="flex justify-center items-center h-screen gap-40">
          <div className="flex-col justify-center items-center">
            <h1 className="text-5xl text-gray-600 mb-7">
              Discover Recipe <br />& Delicious Food
            </h1>
            <div className="border-[#EFC81A] border-1 rounded-full relative h-12 pl-2.5">
              <input
                placeholder="Search Your Favorite Food "
                type="text"
                className="!outline-none !border-none !mt-2.5 ml-4 w-[80%] placeholder-gray-300"
              />
              <button className="absolute right-0 bg-[#EFC81A] rounded-[100%] h-10 w-10 mt-1 mr-1 text-white ">
                <ArrowRightOutlined />
              </button>
            </div>
          </div>
          <div>
            <img
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt=""
              className="h-[300px] rounded-lg"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
