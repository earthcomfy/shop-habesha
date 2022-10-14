import React, { useContext, useEffect, useState } from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/outline";
import { quantity, sum } from "../../utils/helper-functions";
import DisplayContext from "../../context/display-context";
import Link from "next/link";
import StoreContext from "../../context/store-context";
import { useRouter } from "next/router";
import Search from "./search";
import Logout from "./logout";

export const NavBar = () => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart, customer } = useContext(StoreContext);
  const [isCheckout, setIsCheckout] = useState(true);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/checkout" || router.pathname === "/payment") {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [router.pathname]);

  return (
    <>
      <nav className="px- px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link href="/">
            <a className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              ShopHabesha
            </a>
          </Link>
          <Search />
          <div className="flex md:order-2">
            {/* <ThemeToggler /> */}

            {customer ? (
              <>
                <button
                  className="text-gray-500 text-sm dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg p-2.5"
                  onClick={() => setModal(true)}
                >
                  Logout
                </button>

                <Link href="/customer">
                  <a className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5">
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </Link>
              </>
            ) : (
              <Link href="/sign-in">
                <a className="text-gray-500 text-sm dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg p-2.5">
                  Log in
                </a>
              </Link>
            )}

            {!isCheckout ? (
              <button
                type="button"
                className=" text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5 
               
              inline-flex items-center px-4 py-2 "
                onClick={() => updateCartViewDisplay()}
              >
                <ShoppingBagIcon
                  className="-ml-2 mr-1 h-6 w-6"
                  aria-hidden="true"
                />
                <span>
                  {cart.items.length > 0
                    ? cart.items.map(quantity).reduce(sum)
                    : 0}
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </nav>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
};

export default NavBar;
