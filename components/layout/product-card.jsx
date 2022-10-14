import { useState } from "react";
import Link from "next/link";

import QuickView from "./quick-view";

export default function ProductsCard({ products, quickview }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt>
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src={product.thumbnail}
                          alt="thumbnail"
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                    </dt>
                    <div className="mt-4 flex justify-between md:mt-2">
                      <dt className="text-lg font-medium text-gray-500 truncate">
                        {product.title}
                      </dt>
                      <dt className="text-xs font-light border border-gray-200 p-1 rounded-lg text-gray-500 truncate">
                        {product.handle}
                      </dt>
                    </div>
                    <dd>
                      <div className="text-sm text-gray-900">
                        {product.description}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="flex justify-between bg-gray-50 px-5 py-3">
              <div className="text-sm">
                {quickview ? (
                  <button
                    className="font-medium text-blue-700 hover:text-blue-900"
                    onClick={() => {
                      setOpen(true);
                      setId(product.id);
                    }}
                  >
                    Quick View
                  </button>
                ) : (
                  <Link
                    href={{ pathname: `/product/[id]`, query: { id: product.id } }}
                  >
                    <a className="font-medium text-blue-700 hover:text-blue-900">
                      View detail
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && <QuickView open={open} setOpen={setOpen} id={id} />}
    </>
  );
}
