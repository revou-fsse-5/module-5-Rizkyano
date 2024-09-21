import Navbar from "@/components/Navbar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Products from "@/pages/Product";
import ProductDetail from "@/pages/ProductDetails"; // Import ProductDetail correctly

interface ProductValues {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface DataProps {
  data: ProductValues[] | ProductValues; // Can be either an array of products or a single product
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  let data;

  if (params?.page === "product" && params?.id) {
    // Fetch single product details if 'id' is present
    const productResponse = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    if (productResponse.ok) {
      data = await productResponse.json();
    } else {
      return { notFound: true }; // Return 404 if product not found
    }
  } else {
    // Fetch all products if no specific product ID is given
    const response = await fetch("https://fakestoreapi.com/products");
    data = await response.json();
  }

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: DataProps) {
  const isSingleProduct = !Array.isArray(data); // Check if it's a single product

  return (
    <div>
      <Navbar cartCount={0} categories={[]} />

      {isSingleProduct ? (
        <ProductDetail product={data} cart={[]} onAddCart={(id) => console.log(`Add to cart: ${id}`)} onRemoveCart={(id) => console.log(`Remove from cart: ${id}`)} />
      ) : (
        <Products products={data} onAddCart={(id) => console.log(`Add to cart: ${id}`)} onRemoveCart={(id) => console.log(`Remove from cart: ${id}`)} />
      )}
    </div>
  );
}
