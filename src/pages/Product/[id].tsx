import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { GetServerSideProps } from "next";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductProps {
  product: Product;
  cart: number[];
  onAddCart: (id: number) => void;
  onRemoveCart: (id: number) => void;
}

const ProductDetail: React.FC<ProductProps> = ({ product, cart, onAddCart, onRemoveCart }) => {
  const [inCart, setInCart] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setInCart(cart.includes(product.id));
  }, [cart, product.id]);

  return (
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
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();

    return {
      props: {
        product,
        cart: [],
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
};
