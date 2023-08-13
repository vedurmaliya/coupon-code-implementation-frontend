import React from "react";
import Logo from "./images/black.png";

function Navbar() {
  return (
    <nav className=" bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Company Logo" className=" mr-2" />
        </div>
        <div className="flex space-x-4">
          <a href="#" className=" hover:text-gray-600 px-4 py-4">
            Products
          </a>
          <a href="#" className=" hover:text-gray-600 px-4 py-4">
            Services
          </a>
          <a href="#" className=" hover:text-gray-600 px-4 py-4">
            Home
          </a>
          <a href="#" className=" hover:text-gray-600 px-4 py-4">
            About Us
          </a>
          <a href="/cart" className=" hover:text-gray-600 px-4 py-4">
            Cart
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
