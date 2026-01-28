import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    dispatch(placeOrder({ items: cart, total }));
    dispatch(clearCart());
    alert("Order placed!");
  };

  return <button onClick={handleCheckout}>Confirm Order</button>;
};

export default Checkout;
