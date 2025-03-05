import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart?.items || []); // Ensure it's always an array

  return (
    <Link to="/cart" className="relative text-white hover:text-yellow-400">
      <FaShoppingCart size={22} />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartItems.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
