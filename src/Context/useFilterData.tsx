import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/Contsant";

export default function useFilterData(category: string) {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const endpoint = category ? `${API_URL}/category/${category}` : API_URL;

    try {
      const response = await axios.get(endpoint);
      console.log(endpoint);
      if (!response) {
        throw new Error("Error while fethcing data");
      }
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  console.log("products", products);
  return {
    products,
  };
}
