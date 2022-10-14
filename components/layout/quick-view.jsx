import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { formatPrices } from "../../utils/prices";
import Link from "next/link";
import StoreContext from "../../context/store-context";

export default function QuickView({ open, setOpen, id }) {
  const { products, cart } = useContext(StoreContext);
  const product = products.filter((product) => product.id === id);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={product[0].thumbnail}
                        alt={product[0].title}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {product[0].title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <p className="text-2xl text-gray-900">
                          {formatPrices(cart, product[0].variants[0])}
                        </p>

                        <div className="inline-flex items-center mt-4 px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-blue-600 ">
                          {product[0].handle}
                        </div>

                        <div className="mt-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            Description
                          </h3>

                          <div className="mt-4">
                            <span className="text-gray-600 space-y-2 text-sm">
                              {product[0].description}
                            </span>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <Link href={`/product/${id}`}>
                          <a>
                            <button
                              type="submit"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              View Full Detail
                            </button>
                          </a>
                        </Link>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
