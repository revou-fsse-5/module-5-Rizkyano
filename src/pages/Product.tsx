import React from "react";
import ListProduct from "../components/ListCard";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import useFilterData from "../Context/useFilterData";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants/Contsant";
import { GetServerSideProps } from "next";

interface ProductValues {
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
  products: ProductValues[];
}

const Product: React.FC<ProductProps> = ({ products, onAddCart, onRemoveCart, cart }) => {
  return (
    <div className="p-6">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product: ProductValues) => (
              <ListProduct
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                onAddCart={() => onAddCart(product.id)}
                onRemoveCart={() => onRemoveCart(product.id)}
                inCart={cart.includes(product.id)}
              />
            ))}
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;
  const endpoint = category ? `${API_URL}/category/${category}` : API_URL;

  try {
    const response = await axios.get(endpoint);

    if (!response.data) {
      throw new Error("Error while fetching data");
    }

    return {
      props: {
        products: response.data,
        category: category || "",
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        products: [],
        category: category || "",
      },
    };
  }
};
