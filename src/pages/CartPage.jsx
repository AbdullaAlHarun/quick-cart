import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCheckSquare, AiFillCheckSquare } from "react-icons/ai";
import visaLogo from "../assets/visa.png";
import mastercardLogo from "../assets/mastercard.png";
import paypalLogo from "../assets/paypal.png";
import applePayLogo from "../assets/applepay.png";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});
  const [showModal, setShowModal] = useState(false); // ✅ Manage modal state

  const toggleSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Cart Items */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-lg font-semibold">All Items ({cartItems.length})</h2>

            {/* ✅ Updated Clear Cart Button */}
            <button
              onClick={() => setShowModal(true)} // ✅ Show the modal
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-all focus:ring-2 focus:ring-red-400"
            >
              Clear Cart
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-gray-400"
                  onClick={() => toggleSelection(item.id)}
                >
                  {selectedItems[item.id] ? <AiFillCheckSquare size={22} /> : <AiOutlineCheckSquare size={22} />}
                </button>
                <img src={item.image.url} alt={item.title} className="w-20 h-20 object-cover rounded-md" loading="lazy" />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-sm">${item.discountedPrice.toFixed(2)} each</p>
                  <select
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                    className="border px-2 py-1 mt-2 rounded-md focus:ring-2 focus:ring-blue-400"
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="font-bold text-lg">${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 focus:ring-2 focus:ring-red-400"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold border-b pb-3">Order Summary</h2>
          <div className="py-3 text-lg flex justify-between">
            <span>Estimated Price:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Payment Methods */}
          <div className="mt-4">
            <h3 className="text-md font-semibold">We Accept</h3>
            <div className="flex items-center gap-3 mt-2">
              <img src={visaLogo} alt="Visa" className="w-12" />
              <img src={mastercardLogo} alt="Mastercard" className="w-12" />
              <img src={paypalLogo} alt="PayPal" className="w-12" />
              <img src={applePayLogo} alt="Apple Pay" className="w-12" />
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
           className="w-full bg-gray-900 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-800 transition-all focus:ring-2 focus:ring-gray-500"
          >
            Checkout Now
          </button>
        </div>
      </div>

     {/* Modal for Clear Cart */}
     {showModal && (
      <div
        className="fixed inset-0 flex justify-center items-center z-50"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} 
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <p className="text-gray-600 mt-2">This will remove all items from your cart.</p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(clearCart());
                setShowModal(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Yes, Clear Cart
            </button>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default CartPage;
