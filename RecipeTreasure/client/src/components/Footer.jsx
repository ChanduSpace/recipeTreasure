import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#EFC81A] text-black h-30">
      {/* Logo + Headline */}
      <div className="text-center mb-3">
        <h1 className="text-xl font-semibold">Website Logo here</h1>
        <p className="text-sm">Sub Headline Here</p>
      </div>

      {/* Navigation + Socials */}
      <div className="flex justify-between items-center max-w-5xl mx-auto border-t border-black/20 pt-6">
        {/* Navigation Links */}
        <ul className="flex gap-8 text-sm">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">Add Menu</li>
          <li className="cursor-pointer hover:underline">Search Menu</li>
          <li className="cursor-pointer hover:underline">Your Recipes</li>
        </ul>

        {/* Social Media */}
        <div className="text-sm cursor-pointer hover:underline">
          Social Media Here
        </div>
      </div>
    </footer>
  );
};

export default Footer;
