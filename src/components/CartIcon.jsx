// src/components/CartIcon.jsx
import { Link } from "react-router-dom";

const CartIcon = () => {
  return (
    <Link to="/cart" className="relative text-white">
      🛒
    </Link>
  );
};

export default CartIcon;
