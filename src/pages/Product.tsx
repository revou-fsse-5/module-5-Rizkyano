import React from "react";
import ListProduct from "../components/ListCard";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useFilterData from "../Context/useFilterData";
import { useParams } from "react-router-dom";

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
}

const Product: React.FC<ProductProps> = ({ onAddCart, onRemoveCart, cart }) => {
  const { category } = useParams();
  const { products } = useFilterData(category ? category : "");

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
