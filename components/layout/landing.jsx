import { ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="place-self-center mr-auto lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Get Your Pure Cotton Hand Woven Habesha Clothing
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Fill your wardrobe with unique, or custom handmade traditional
              Ethiopian clothes. Our clothing is intimately related to the social and cultural
              values we carry.
            </p>
            <Link href="#products">
              <a className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:blue-4 focus:blue-blue-300 dark:focus:blue-blue-900">
                Get started
                <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
              </a>
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://sewasewdesign.com/wp-content/uploads/2021/05/IMG_1309-min-1138x1536.jpg"
              className="w-full h-80"
              alt="clothing-2"
            />
            <img
              src="https://sewasewdesign.com/wp-content/uploads/2021/05/IMG_1586-min-1229x1536.jpg"
              className="mt-4 w-full lg:mt-10 pl-4 h-80"
              alt="clothing"
            />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
              Shop using our website
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              When studying clothing along different periods of
              human history, we can perceive the customs, beliefs, economics,
              values, and technology practiced in that specific historical time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
