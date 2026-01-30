import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItem } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard"; // ✅ correct import

const Products = () => {
  const dispatch = useDispatch();
  const { filtered, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductItem());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;


