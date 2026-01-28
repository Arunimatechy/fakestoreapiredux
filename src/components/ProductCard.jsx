import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white border rounded-xl p-4 flex flex-col hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain"
        />
        <h3 className="mt-3 font-semibold line-clamp-2">
          {product.title}
        </h3>
      </Link>

      <p className="text-gray-600 mt-1 font-medium">
        ${product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

