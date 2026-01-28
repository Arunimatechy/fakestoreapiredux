import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector(state => state.orders);

  return (
    <>
      {orders.map(o => (
        <div key={o.id} className="border p-3">
          <p>Order #{o.id}</p>
          <p>Status: {o.status}</p>
          <p>Total: ${o.total}</p>
        </div>
      ))}
    </>
  );
};

export default Orders;
