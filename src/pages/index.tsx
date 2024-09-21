import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import Products from "@/pages/Product";

interface ProductValues {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface DataProps {
  data: ProductValues[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};

export default function ProductList({ data }: DataProps) {
  return (
    <div>
      <Navbar cartCount={0} categories={[]} />
      <Products onAddCart={(id) => console.log(`Add to cart: ${id}`)} onRemoveCart={(id) => console.log(`Remove from cart: ${id}`)} products={data} />
    </div>
  );
}
