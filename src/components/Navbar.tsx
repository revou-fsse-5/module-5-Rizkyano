import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface NavbarProps {
  cartCount: number;
  categories: string[];
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, categories }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCartOpen = () => {
    router.push("/cart");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    router.push(`/${category}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => router.push("/product")} className="block px-4 py-2 text-gray-800 hover:text-blue-500">
              All Products
            </button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-gray-800 hover:text-blue-500 mx-4 focus:outline-none">
                Category
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
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
              {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => router.push("/login")}>Login</button>}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const getServerSideProps = async () => {
  try {
    // Fetch categories using fetch
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await response.json();

    return {
      props: {
        categories,
        cartCount: 0, // Replace with actual cart count logic if available
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
        cartCount: 0,
      },
    };
  }
};

export default Navbar;
