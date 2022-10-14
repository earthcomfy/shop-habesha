import * as Yup from "yup";

import { useContext, useEffect, useRef } from "react";
import Link from "next/link";

import StoreContext from "../context/store-context";
import { createClient } from "../utils/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const { setCustomer, customer } = useContext(StoreContext);
  useEffect(() => {
    if (customer) {
      router.push("/");
    }
  }, [customer, router]);
  const buttonRef = useRef();
  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      }),
      onSubmit: function (values) {
        if (buttonRef.current) {
          buttonRef.current.disabled = true;
        }

        const client = createClient();

        client.auth
          .authenticate({
            email: values.email,
            password: values.password,
          })
          .then(({ customer }) => {
            setCustomer(customer);
          });
      },
    });
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" method="POST" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              ref={buttonRef}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/sign-up">
                <a className="text-blue-600 hover:underline dark:text-blue-500">
                  Dont have an account? Register
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
