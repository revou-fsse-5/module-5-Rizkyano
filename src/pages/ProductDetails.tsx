import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductProps {
  onAddCart: (id: number) => void;
  onRemoveCart: (id: number) => void;
  cart: number[];
}

const ProductDetail: React.FC<ProductProps> = ({ onAddCart, onRemoveCart, cart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [inCart, setInCart] = useState<boolean>(false);

  useEffect(() => {
    // Fetch product data
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch product data.", error);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      setInCart(cart.includes(product.id));
    }
  }, [product, cart]);

  return (
    product && (
      <Container maxWidth="lg">
        <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center">
              <img src={product.image} alt={product.title} className="w-64 h-64 object-contain rounded-md shadow-lg mb-4 md:mb-0" />
              <div className="md:ml-8">
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <p className="text-lg font-semibold text-gray-700 mb-4">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>
                <Button size="medium" onClick={() => (inCart ? onRemoveCart(product.id) : onAddCart(product.id))}>
                  {inCart ? "Remove From Cart" : "Add To Cart"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    )
  );
};

export default ProductDetail;
