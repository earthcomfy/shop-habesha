import * as Yup from "yup";

import { useContext, useRef } from "react";

import Profile from "../../components/layout/profile";
import StoreContext from "../../context/store-context";
import { createClient } from "../../utils/client";
import { useFormik } from "formik";

export default function CustomerIndex() {
  const { customer, setCustomer } = useContext(StoreContext);
  const buttonRef = useRef();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: customer?.email,
        first_name: customer?.first_name,
        last_name: customer?.last_name,
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        password: Yup.string(),
      }),

      onSubmit: (values) => {
        buttonRef.current.disabled = true;

        const client = createClient();

        if (!values.password) {
          delete values["password"];
        }

        client.customers.update(values).then(({ customer }) => {
          setCustomer(customer);
          alert("Account updated successfully");
          buttonRef.current.disabled = false;
        });
      },
    });

  return (
    <Profile>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-2">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Update Profile
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="mt-4  md:mt-0">
              <div className="mt-3">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
              </div>
              <div className="mt-3">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="last_name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
              </div>

              <div className="mt-2">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            ref={buttonRef}
            className="inline-flex justify-center mt-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            onClick={handleSubmit}
          >
            <span>Save</span>
          </button>
        </div>
      </div>
    </Profile>
  );
}
