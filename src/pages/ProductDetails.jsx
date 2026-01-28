import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(state =>
    state.products.items.find(p => p.id === Number(id))
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-xl mx-auto">
      <img src={product.image} className="h-60 mx-auto" />
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p className="font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductDetails;
