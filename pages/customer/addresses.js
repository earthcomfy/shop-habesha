import Profile from "../../components/layout/profile";
import StoreContext from "../../context/store-context";
import { useContext } from "react";

export default function Addresses() {
  const { customer } = useContext(StoreContext);

  return (
    <Profile>
      <div className="mt-8 max-w-6xl mx-auto px-2">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Shipping Addresses
        </h2>

        {customer && customer.shipping_addresses.length === 0 && (
          <p className="text-sm leading-6 font-light mt-2 text-gray-900">
            You do not have any addresses
          </p>
        )}

        {customer &&
          customer.shipping_addresses.map((address) => (
            <dl
              key={address.id}
              className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
            >
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  First Name
                </dt>
                <dd className="text-lg font-semibold">{address.first_name}</dd>
              </div>
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Last Name
                </dt>
                <dd className="text-lg font-semibold">{address.last_name}</dd>
              </div>

              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Address Line 1
                </dt>
                <dd className="text-lg font-semibold">{address.address_1}</dd>
              </div>
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Address Line 2
                </dt>
                <dd className="text-lg font-semibold">{address.address_2}</dd>
              </div>

              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  City
                </dt>
                <dd className="text-lg font-semibold">{address.city}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  Country
                </dt>
                <dd className="text-lg font-semibold">{address.country}</dd>
              </div>
            </dl>
          ))}
      </div>
    </Profile>
  );
}
