import { useEffect, useState } from "react";
import Profile from "../../components/layout/profile";
import { createClient } from "../../utils/client";
import { formatMoneyAmount } from "../../utils/prices";
import { useRouter } from "next/router";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [pages, setPages] = useState(0);
  const router = useRouter();
  const p = router.query.p ? parseInt(router.query.p - 1) : 0;

  useEffect(() => {
    const client = createClient();

    client.customers
      .listOrders({
        limit: 20,
        offset: 20 * p,
      })
      .then((result) => {
        setOrders(result.orders);
        setPages(Math.ceil(result.count / result.limit));
      });
  }, [p]);

  return (
    <Profile>
      <div className="mt-8 mx-auto px-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Payment Status
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.id}
                </th>
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.status}</td>
                <td className="py-4 px-6">{order.payment_status}</td>
                <td className="py-4 px-6">
                  {formatMoneyAmount(
                    {
                      currencyCode: order.currency_code,
                      amount: order.total,
                    },
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Profile>
  );
}
