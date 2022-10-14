import React, { useEffect, useState, useContext } from "react";
import { RadioGroup } from "@headlessui/react";
import { MinusSmIcon, PlusIcon } from "@heroicons/react/outline";
import StoreContext from "../../context/store-context";
import { resetOptions } from "../../utils/helper-functions";
import { createClient } from "../../utils/client";
import { formatPrices } from "../../utils/prices";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState();
  const { addVariantToCart, cart } = useContext(StoreContext);
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  });

  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product));
    }
  }, [product]);

  const handleQtyChange = (action) => {
    if (action === "inc") {
      if (
        options.quantity <
        product.variants.find(({ id }) => id === options.variantId)
          .inventory_quantity
      )
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity + 1,
          size: options.size,
        });
    }
    if (action === "dec") {
      if (options.quantity > 1)
        setOptions({
          variantId: options.variantId,
          quantity: options.quantity - 1,
          size: options.size,
        });
    }
  };

  const handleAddToBag = () => {
    addVariantToCart({
      variantId: options.variantId,
      quantity: options.quantity,
    });
    if (product) setOptions(resetOptions(product));
  };

  return (
    <div className="bg-white">
      <div>
        <>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {formatPrices(cart, product.variants[0])}
              </p>

              <div className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      {" "}
                      Choose a size{" "}
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.variants
                        .slice(0)
                        .reverse()
                        .map((size, idx) => (
                          <RadioGroup.Option
                            key={idx}
                            value={size}
                            className={({ active }) =>
                              classNames(
                                size
                                  ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                  : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.title}
                                </RadioGroup.Label>
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Quantity */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Quantity
                  </h3>
                  <div className="mt-4 inline-flex rounded-md shadow-sm">
                    <button
                      className="py-2 px-4 text-sm font-medium text-blue-700 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      onClick={() => handleQtyChange("dec")}
                    >
                      <MinusSmIcon
                        className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                    <p className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {options.quantity}
                    </p>
                    <button
                      className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      onClick={() => handleQtyChange("inc")}
                    >
                      <PlusIcon
                        className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleAddToBag()}
                >
                  Add to bag
                </button>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-6 min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.thumbnail}
                  alt="thumbnail"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8">
                {product.images.slice(0, 3).map((pic) => (
                  <div
                    key={product.id}
                    className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block"
                  >
                    <img
                      src={pic.url}
                      alt={pic.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

//create a Medusa client
const client = createClient();

export async function getStaticPaths() {
  // Call an external API endpoint to get products
  const { products } = await client.products.list();

  // Get the paths we want to pre-render based on the products
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the product `id`.
  // If the route is like /product/prod_1, then params.id is 1
  const { product } = await client.products.retrieve(params.id);

  // Pass post data to the page via props
  return { props: { product } };
}

export default Product;
