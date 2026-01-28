import { useSelector } from "react-redux";

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
  </div>
);

const AdminDashboard = () => {
  const products = useSelector(state => state.products.items);
const orders = useSelector(state => state.orders);
const users = useSelector(state => state.auth.users);
const currentUser = useSelector(state => state.auth.currentUser);


  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome back, {currentUser?.name || "Admin"} 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={products.length} />
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Total Users" value={users.length} />
      </div>

      {/* Order Status Summary */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Order Status</h2>

        <div className="flex gap-6">
          <p>
            🕒 Pending:{" "}
            <b>
              {orders.filter(o => o.status === "Pending").length}
            </b>
          </p>

          <p>
            ✅ Delivered:{" "}
            <b>
              {orders.filter(o => o.status === "Delivered").length}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
