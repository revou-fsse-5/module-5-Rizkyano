import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface NavbarValues {
  cartCount: number;
}

const Navbar: React.FC<NavbarValues> = ({ cartCount }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const isLoggedIn = () => {
    return localStorage.getItem("accessToken");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCartOpen = () => {
    navigate("/cart");
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const navigate = useNavigate();
  const handleCategoryChange = (category: string) => {
    navigate(`/${category}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        console.log(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigate("/product")} key={"All"} className="block px-4 py-2 text-gray-800 hover:text-blue-500">
              All Products
            </button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-gray-800 hover:text-blue-500 mx-4 focus:outline-none">
                Category
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md ">
                  {categories.map((category) => (
                    <button onClick={() => handleCategoryChange(category)} key={category} className="block m-0 px-4 py-2 text-gray-800 hover:text-blue-500">
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <IconButton onClick={handleCartOpen} color="inherit">
              <Badge badgeContent={cartCount} color="secondary"></Badge>
              <ShoppingCartIcon />
            </IconButton>
            <a href="#" className="text-gray-800 hover:text-blue-500 mx-4">
              <Link to={isLoggedIn() ? "#" : "/login"} onClick={isLoggedIn() ? handleLogout : () => {}}>
                {isLoggedIn() ? "Logout" : "Login"}
              </Link>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
