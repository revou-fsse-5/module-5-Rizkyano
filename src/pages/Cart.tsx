import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/Contsant";
import TableCart from "../components/TableCart";

interface ProductValues {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartValues {
  cart: number[];
  setCart: (cart: number[]) => void;
}
const Cart: React.FC<CartValues> = ({ cart, setCart }) => {
  const [products, setProducts] = React.useState<ProductValues[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      if (!response) {
        throw new Error("Error while fethcing data");
      }
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const cartItems = products.filter((product) => cart.includes(product.id));
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div style={{ width: "100vw", position: "fixed", top: "100px", zIndex: 100, backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <TableCart cartItems={cartItems} totalPrice={totalPrice} onClearCart={clearCart} />
    </div>
  );
};

export default Cart;
