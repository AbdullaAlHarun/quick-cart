import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 500);
    }
  }, [cartItems]);

  return (
    <Link to="/cart" className={`relative text-white hover:text-yellow-400 ${highlight ? "animate-bounce" : ""}`}>
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
