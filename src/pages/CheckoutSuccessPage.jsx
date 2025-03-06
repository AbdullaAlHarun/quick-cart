import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutSuccessPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const totalAmount = location.state?.totalPrice || 0;

  useEffect(() => {
    dispatch(clearCart()); // Clears the cart on page load
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-12 text-center animate-fadeIn">
      {/* Animated Checkmark */}
      <div className="flex justify-center">
        <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 opacity-0 animate-fadeInFast">
        Order Confirmed!
      </h1>

      <p className="text-lg text-gray-600 mb-6 opacity-0 animate-fadeInSlow">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto opacity-0 animate-fadeInSlow">
        <p className="text-lg font-semibold">
          Order Number: <span className="text-blue-500">#123456</span>
        </p>
        <p className="text-lg">
          Total Amount: <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </p>
        <p className="text-gray-500 text-sm">
          A confirmation email has been sent to your inbox.
        </p>
      </div>

      {/* Continue Shopping Button */}
      <div className="mt-6 opacity-0 animate-fadeInSlow">
        <Link
          to="/"
         className="bg-gray-900 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-800 transition-all focus:ring-2 focus:ring-gray-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
