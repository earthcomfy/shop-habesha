import Link from "next/link";
import { createClient } from "../utils/client";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";

import Landing from "../components/layout/landing";
import Footer from "../components/layout/footer";
import ProductsCard from "../components/layout/product-card";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext);

  return (
    <>
      <Landing />
      <div
        id="products"
        className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14"
      >
        <div className="flex flex-col w-full mb-6 lg:flex-row md:mb-8">
          <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
            <span className="inline-block mb-2">Some of our best products</span>
            <div className="h-1 ml-auto duration-300 origin-left transform bg-blue-600" />
          </h2>
        </div>
        {products && <ProductsCard products={products} quickview={true} />}
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
