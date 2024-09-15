import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";

const App: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);

  const handleAddToCart = (id: number) => {
    setCart((prevCart) => [...prevCart, id]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item !== id));
  };

  const cartCount = cart.length;

  return (
    <>
      <Router>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/:category" element={<Product onAddCart={handleAddToCart} onRemoveCart={handleRemoveFromCart} cart={cart} />} />
            <Route path="/product" element={<Product onAddCart={handleAddToCart} onRemoveCart={handleRemoveFromCart} cart={cart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddCart={handleAddToCart} onRemoveCart={handleRemoveFromCart} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
