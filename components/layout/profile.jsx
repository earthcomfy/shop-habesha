import { useContext, useEffect } from "react";

import Link from "next/link";
import StoreContext from "../../context/store-context";
import { useRouter } from "next/router";
import {
  UserIcon,
  ViewListIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

const sideBarElements = [
  { name: "Profile", to: "/customer", icon: <UserIcon /> },
  { name: "Orders", to: "/customer/orders", icon: <ViewListIcon /> },
  {
    name: "Addresses",
    to: "/customer/addresses",
    icon: <LocationMarkerIcon />,
  },
];

export default function Profile({ children }) {
  const router = useRouter();
  const { customer } = useContext(StoreContext);

  useEffect(() => {
    if (!customer) {
      router.push("/");
    }
  }, [customer, router]);

  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="" aria-label="Sidebar">
        <div className="overflow-y-auto h-screen py-4 px-3 bg-gray-50 border-r border-gray-200 dark:bg-gray-800">
          <ul className="space-y-2">
            {sideBarElements.map((element, idx) => (
              <li key={idx}>
                <Link href={element.to}><a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    >
                      {element.icon}
                    </div>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {element.name}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-4 bg-white dark:bg-gray-800">
        <div className="">{children}</div>
      </div>
    </div>
  );
}
