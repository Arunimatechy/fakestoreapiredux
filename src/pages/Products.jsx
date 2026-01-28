import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearch } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { filtered, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <input
        placeholder="Search product"
        className="border p-2 w-full mb-4"
        onChange={e => dispatch(setSearch(e.target.value))}
      />

      <div className="grid md:grid-cols-4 gap-4">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default Products;
