import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../features/orders/ordersSlice";

const AdminOrders = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      <div className="bg-white shadow rounded divide-y">
        {orders.map(o => (
          <div
            key={o.id}
            className="flex items-center justify-between p-4"
          >
            <div>
              <p className="font-medium">Order #{o.id}</p>
              <span
                className={`text-sm ${
                  o.status === "Delivered"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {o.status}
              </span>
            </div>

            {o.status !== "Delivered" && (
              <button
                onClick={() =>
                  dispatch(
                    updateOrderStatus({
                      id: o.id,
                      status: "Delivered",
                    })
                  )
                }
                className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
              >
                Mark Delivered
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;

