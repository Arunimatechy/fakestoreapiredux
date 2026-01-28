import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between">
          <span>{item.title} × {item.qty}</span>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>
    </>
  );
};

export default Cart;
