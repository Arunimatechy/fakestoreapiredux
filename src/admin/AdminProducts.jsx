import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  addProduct,
  updateProduct,
} from "../features/products/productsSlice";
import ProductModal from "../components/ProductModal";

const AdminProducts = () => {
  const products = useSelector(state => state.products.items);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleSave = (data) => {
    if (selected) {
      dispatch(updateProduct(data));
    } else {
      dispatch(addProduct({ ...data, id: Date.now() }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* Products list */}
      <div className="bg-white shadow rounded divide-y">
        {products.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4"
          >
            <span className="font-medium truncate max-w-xs">
              {p.title}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteProduct(p.id))}
                className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={open}
        product={selected}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminProducts;


